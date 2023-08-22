
import React, { useEffect, useMemo, useState } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Spinner
} from "@material-tailwind/react";
import CoinSvg from '../Assets/Images/Coin.png'
import StyleImage from '../Assets/Images/StyleImage.svg'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Ethereum, Binance } from '../Assets/data/currency';
import { useAccount, useContractRead, useContractWrite, useNetwork } from 'wagmi';
import { FlexCol, GradientButton, } from './Elements';
import PaymentABI from '../../ABI/payment.json'
import { ethers } from 'ethers';

const CurrencyDetail = ({ selectCoin, setSelectCoin, loading, setErrors, amount, setAmount, className, children, text }) => {
    const { chain, chains } = useNetwork()

    const data = useMemo(() => {
        if (chain?.id == 1 || chain?.id == 84531) return Ethereum.find(itm => itm.name == selectCoin)
        if (chain?.id == 56 || chain?.id == 97) return Binance.find(itm => itm.name == selectCoin)
    }, [selectCoin, chain])

    useEffect(() => {
        setSelectCoin && setSelectCoin('')
        setAmount && setAmount("")
    }, [chain])


    return (
        <>
            <FlexCol className={`bg-[#293A3C] rounded-[20px] p-[2rem] sm:flex-row items-center justify-between gap-4 ${className}`}>
                <FlexCol >
                    <h6 className='text-[1rem] font-inter text-white font-normal'>
                        You {text}
                    </h6>
                    {loading ?
                        <div className="flex my-5 justify-start">
                            <Spinner />
                        </div>
                        :
                        <h6 className='text-[1.38rem] font-inter text-white mt-2 font-semibold flex items-center '>
                            <input
                                name="price"
                                type="number"
                                value={amount}
                                // setAmount={setAmount}
                                onChange={(e) => {
                                    setAmount(e.target.value)
                                    if (selectCoin == "") setErrors("Please Select Coin first")
                                }}
                                className='font-semibold text-[1.38rem] font-inter text-white bg-transparent border-none outline-none w-full text-end mr-1'
                            />
                            {text == "Send" ?
                                "$"
                                :
                                <div className="flex w-8 h-8 -ml-1">
                                    <img src={CoinSvg} />
                                </div>
                            }
                        </h6>

                    }
                </FlexCol>

                {text == "Send" ?
                    <Menu>
                        <MenuHandler >
                            <button
                                className="font-inter border-2 border-white/30 rounded-xl text-white text-[1.38rem] gap-2 py-5 px-4 font-semibold flex items-center"
                            >
                                {data?.icon}
                                {data?.name}
                                <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_12_20" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={1} y={3} width={12} height={9}>
                                        <path d="M10.5 5.54167L7 9.04167L3.5 5.54167H10.5Z" fill="white" stroke="white" strokeWidth={4} strokeLinejoin="round" />
                                    </mask>
                                    <g mask="url(#mask0_12_20)">
                                        <path d="M0 0H14V14H0V0Z" fill="white" />
                                    </g>
                                </svg>
                            </button>
                        </MenuHandler>
                        <MenuList className={`rounded-xl border-2 border-white/30 `}>
                            {(chain?.id == 1 || chain?.id == 84531) &&
                                Ethereum.map(itm => {
                                    return (
                                        <>
                                            <MenuItem
                                                className='flex items-center justify-around font-inter text-base font'
                                                onClick={() => {
                                                    setErrors("")
                                                    setAmount('')
                                                    setSelectCoin(itm?.name)
                                                }}
                                            >
                                                <div className="w-5 h-auto">
                                                    {itm?.icon}
                                                </div>
                                                <p className='text-left w-16'>
                                                    {itm?.name}
                                                </p>
                                            </MenuItem>
                                            <hr className="my-3" />
                                        </>
                                    )
                                })
                            }

                            {(chain?.id == 56 || chain?.id == 97) &&
                                Binance.map(itm => {
                                    return (
                                        <>
                                            <MenuItem
                                                className='flex items-center justify-around font-inter text-base font'
                                                onClick={() => {
                                                    setSelectCoin(itm?.name)
                                                    setAmount('')
                                                    setErrors("")
                                                }}
                                            >
                                                <div className="w-5 h-auto">
                                                    {itm?.icon}
                                                </div>
                                                <p className='text-left w-16'>
                                                    {itm?.name}
                                                </p>
                                            </MenuItem>
                                            <hr className="my-3" />
                                        </>
                                    )
                                })}

                        </MenuList>
                    </Menu>
                    :
                    <button className="font-inter border-2 border-white/30 rounded-xl text-white text-[1.38rem] gap-2 py-5 px-4 font-semibold flex items-center">
                        <div className="flex">
                            <div className="flex w-8 h-8">
                                <img src={CoinSvg} />
                            </div>
                            COIN
                        </div>
                    </button>
                }
                {children}
            </FlexCol>
        </>
    )
}


export const PaymentCard = () => {
    const { isConnected, address } = useAccount()
    const [selectCoin, setSelectCoin] = useState("")
    const [amount, setAmount] = useState("")

    const [swapedAmmount, setSwapedAmmount] = useState()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState('')
    // if (selectCoin == "USDT") {

    const { isFetching, refetch: readContract } = useContractRead({
        address: "0xB329bDad74861Ef1692d5a56E96c9C1Bb30F2776",
        abi: PaymentABI,
        functionName:
            selectCoin == "USDT" ? 'usdtToToken'
                : selectCoin == "BUSD" ? 'busdToToken'
                    : selectCoin == "BnB" ? 'EthToToken'
                        : selectCoin == "Ethereum" ? 'EthToToken'
                            : "",
        args: [amount * 1e18],
        onSuccess(data) {
            // console.log("data", data.toString().split("n").join());
            setLoading(false);
            setSwapedAmmount(ethers.formatEther(data))
        },
        onError(error) {
            console.log("Error", error);
        },
    })

    const { data, isLoading, isSuccess, error, write } = useContractWrite({
        address: '0xB329bDad74861Ef1692d5a56E96c9C1Bb30F2776',
        abi: PaymentABI,
        functionName: 'buyTokenBUSD',
    })
    console.log("🚀Error", error)


    const confirmPayment = () => {
        write({
            args: [ethers.parseEther(swapedAmmount)],
            to: address,
            value: ethers.parseEther(swapedAmmount),
        })
    }

    useEffect(() => {
        if (!selectCoin || selectCoin == undefined) {
        } else if (selectCoin) {
            setErrors("")
            setLoading(true);
            setSwapedAmmount("")
            readContract?.()
        }
    }, [selectCoin])

    // // }

    return (
        <Card className="w-11/12 max-w-xl absolute flex -top-6 left-1/2 transform -translate-x-1/2 ">
            <CardBody>
                <h1 className='font-inter text-[2.75rem] font-black text-center text-black mb-2' >
                    Buy Coins
                </h1>

                <CurrencyDetail
                    selectCoin={selectCoin}
                    setSelectCoin={setSelectCoin}
                    text={"Send"}
                    setErrors={setErrors}
                    amount={amount}
                    setAmount={setAmount}
                />
                <h6 className='text-red-500'>
                    {errors}
                    {console.log("🚀 ~ file: PaymentCard.jsx:205 ~ PaymentCard ~ errors:", errors)}
                </h6>
                <div className="w-full m-7">
                    <img src={StyleImage} />
                </div>
                <CurrencyDetail
                    amount={swapedAmmount}
                    loading={isFetching}
                    className={''}
                    text={"Recieved"}
                />
                <GradientButton
                    onClick={confirmPayment}
                    disabled={!swapedAmmount}
                    className={'mt-10 py-10 text-center w-full text-[2rem]'}
                    text={"Payment Confirm"}
                />
            </CardBody>
        </Card>
    );
}


