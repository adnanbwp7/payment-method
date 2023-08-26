
import React, { useEffect, useMemo, useState } from 'react'
import {
    Alert,
    Card,
    CardBody,
    Dialog,
    Spinner,
} from "@material-tailwind/react";
import CoinSvg from '../Assets/Images/Coin.png'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Ethereum, Binance } from '../Assets/data/currency';
import { useAccount, useContractRead, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { FlexCol, FlexRow, GradientButton, StyleImage, } from './Elements';
import PaymentABI from '../../ABI/payment.json'
import busdABI from '../../ABI/busdApproveABI.json'
import usdABI from '../../ABI/usdApproveABI.json'
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { BusdApproveAddress, UsdApproveAddress, paymentAddress } from '../Assets/data/valure';

const CurrencyDetail = ({ selectCoin, setSelectCoin, errors, loading, setErrors, amount, setAmount, className, children, text }) => {
    const { chain, chains } = useNetwork()
    const { isConnected, address } = useAccount()


    const data = useMemo(() => {
        if (chain?.id == 1 || chain?.id == 84531) return Ethereum.find(itm => itm.name == selectCoin)
        else if (chain?.id == 56 || chain?.id == 97) return Binance.find(itm => itm.name == selectCoin)
        else return { icon: "$", name: "Coin" }
    }, [selectCoin, chain])

    const dropdown = useMemo(() => {
        if (chain?.id == 1 || chain?.id == 84531) return Ethereum
        if (chain?.id == 56 || chain?.id == 97) return Binance
    }, [selectCoin, chain])

    useEffect(() => {
        setSelectCoin && setSelectCoin('')
        setAmount && setAmount("")
    }, [chain])

    const [modalOpen, setModalOpen] = useState(false)


    return (
        <>
            <FlexCol className={`bg-[#293A3C] rounded-[20px] p-[2rem] sm:flex-row items-center justify-between gap-4 ${className}`}>
                <FlexCol >
                    <h6 className='text-[1rem] font-inter text-white font-normal'>
                        You {text}
                    </h6>
                    {amount && loading ?
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
                                selectCoin == "BnB" ?
                                    <div className='w-8 h-8'>
                                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 2496 2496" style={{ enableBackground: 'new 0 0 2496 2496' }} space="preserve">
                                            <g>
                                                <path style={{ fillRule: 'evenodd', clipRule: 'evenodd', fill: '#F0B90B' }} d="M1248,0c689.3,0,1248,558.7,1248,1248s-558.7,1248-1248,1248 S0,1937.3,0,1248S558.7,0,1248,0L1248,0z" />
                                                <path style={{ fill: '#FFFFFF' }} d="M685.9,1248l0.9,330l280.4,165v193.2l-444.5-260.7v-524L685.9,1248L685.9,1248z M685.9,918v192.3 l-163.3-96.6V821.4l163.3-96.6l164.1,96.6L685.9,918L685.9,918z M1084.3,821.4l163.3-96.6l164.1,96.6L1247.6,918L1084.3,821.4 L1084.3,821.4z" />
                                                <path style={{ fill: '#FFFFFF' }} d="M803.9,1509.6v-193.2l163.3,96.6v192.3L803.9,1509.6L803.9,1509.6z M1084.3,1812.2l163.3,96.6 l164.1-96.6v192.3l-164.1,96.6l-163.3-96.6V1812.2L1084.3,1812.2z M1645.9,821.4l163.3-96.6l164.1,96.6v192.3l-164.1,96.6V918 L1645.9,821.4L1645.9,821.4L1645.9,821.4z M1809.2,1578l0.9-330l163.3-96.6v524l-444.5,260.7v-193.2L1809.2,1578L1809.2,1578 L1809.2,1578z" />
                                                <polygon style={{ fill: '#FFFFFF' }} points="1692.1,1509.6 1528.8,1605.3 1528.8,1413 1692.1,1316.4 1692.1,1509.6" />
                                                <path style={{ fill: '#FFFFFF' }} d="M1692.1,986.4l0.9,193.2l-281.2,165v330.8l-163.3,95.7l-163.3-95.7v-330.8l-281.2-165V986.4 L968,889.8l279.5,165.8l281.2-165.8l164.1,96.6H1692.1L1692.1,986.4z M803.9,656.5l443.7-261.6l444.5,261.6l-163.3,96.6 l-281.2-165.8L967.2,753.1L803.9,656.5L803.9,656.5z" />
                                            </g>
                                        </svg>
                                    </div>
                                    : "$"
                                :
                                <div className="flex w-8 h-8 -ml-1">
                                    <img src={CoinSvg} />
                                </div>
                            }
                        </h6>

                    }
                </FlexCol>

                {text == "Send" ?
                    <>
                        <button
                            onClick={() => {
                                if (isConnected)
                                    setModalOpen(true)
                                else
                                    toast.error("Please Connect to wallet First in order to select")
                            }}
                            className={`font-inter border-2 ${errors ? "border-red-500" : "border-white/30"} rounded-xl text-white text-[1.38rem] gap-2 py-5 px-2 font-semibold flex items-center`}
                        >
                            {data ?
                                <>
                                    {data?.icon} {data?.name}
                                </>
                                :
                                <>
                                    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.8455 8.55C11.019 9.1695 10.6455 9.912 10.6455 10.605C10.6455 11.2995 11.019 12.042 11.8455 12.663C12.6735 13.284 13.8855 13.713 15.288 13.713C15.6858 13.713 16.0674 13.871 16.3487 14.1523C16.63 14.4336 16.788 14.8152 16.788 15.213C16.788 15.6108 16.63 15.9924 16.3487 16.2737C16.0674 16.555 15.6858 16.713 15.288 16.713C13.299 16.713 11.4405 16.11 10.0455 15.063C8.65051 14.016 7.64551 12.456 7.64551 10.6065C7.64551 8.7555 8.65051 7.1955 10.0455 6.1485C11.4405 5.103 13.3005 4.5 15.288 4.5C18.3675 4.5 21.279 5.9745 22.437 8.43C22.521 8.60827 22.5691 8.80134 22.5785 8.99819C22.5879 9.19504 22.5584 9.39181 22.4918 9.57728C22.4251 9.76274 22.3226 9.93326 22.1901 10.0791C22.0575 10.2249 21.8975 10.3432 21.7193 10.4272C21.541 10.5113 21.3479 10.5593 21.1511 10.5687C20.9542 10.5781 20.7574 10.5487 20.572 10.482C20.3865 10.4154 20.216 10.3128 20.0702 10.1803C19.9243 10.0477 19.806 9.88777 19.722 9.7095C19.197 8.589 17.559 7.5 15.2895 7.5C13.887 7.5 12.6735 7.929 11.8455 8.55Z" fill="black" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M18.2355 21.8745C19.062 21.255 19.434 20.5125 19.434 19.8195C19.434 19.125 19.062 18.381 18.234 17.7615C17.4075 17.1405 16.194 16.7115 14.793 16.7115C14.3952 16.7115 14.0136 16.5535 13.7323 16.2722C13.451 15.9909 13.293 15.6093 13.293 15.2115C13.293 14.8137 13.451 14.4321 13.7323 14.1508C14.0136 13.8695 14.3952 13.7115 14.793 13.7115C16.782 13.7115 18.6405 14.3145 20.0355 15.3615C21.4305 16.4085 22.434 17.9685 22.434 19.818C22.434 21.6675 21.4305 23.229 20.034 24.2745C18.639 25.3215 16.782 25.9245 14.793 25.9245C11.7135 25.9245 8.8005 24.45 7.644 21.993C7.47433 21.6332 7.45455 21.2207 7.58901 20.8463C7.72347 20.4718 8.00117 20.1662 8.361 19.9965C8.72083 19.8268 9.13333 19.807 9.50775 19.9415C9.88216 20.076 10.1878 20.3537 10.3575 20.7135C10.8855 21.8355 12.5235 22.9245 14.793 22.9245C16.1955 22.9245 17.4075 22.4955 18.2355 21.8745ZM15 1.5C15.3978 1.5 15.7794 1.65804 16.0607 1.93934C16.342 2.22064 16.5 2.60218 16.5 3V4.5C16.5 4.89782 16.342 5.27936 16.0607 5.56066C15.7794 5.84196 15.3978 6 15 6C14.6022 6 14.2206 5.84196 13.9393 5.56066C13.658 5.27936 13.5 4.89782 13.5 4.5V3C13.5 2.60218 13.658 2.22064 13.9393 1.93934C14.2206 1.65804 14.6022 1.5 15 1.5Z" fill="black" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15 24C15.3978 24 15.7794 24.158 16.0607 24.4393C16.342 24.7206 16.5 25.1022 16.5 25.5V27C16.5 27.3978 16.342 27.7794 16.0607 28.0607C15.7794 28.342 15.3978 28.5 15 28.5C14.6022 28.5 14.2206 28.342 13.9393 28.0607C13.658 27.7794 13.5 27.3978 13.5 27V25.5C13.5 25.1022 13.658 24.7206 13.9393 24.4393C14.2206 24.158 14.6022 24 15 24Z" fill="black" />
                                    </svg>
                                    <p className='text-white/20 '>USD</p>
                                </>
                            }

                            <div className="w-12">
                                <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_12_20" maskUnits="userSpaceOnUse" x={1} y={3} >
                                        <path d="M10.5 5.54167L7 9.04167L3.5 5.54167H10.5Z" fill="white" stroke="white" strokeWidth={4} strokeLinejoin="round" />
                                    </mask>
                                    <g mask="url(#mask0_12_20)">
                                        <path d="M0 0H14V14H0V0Z" fill="white" />
                                    </g>
                                </svg>
                            </div>
                        </button>

                        {/* {isConnected && */}
                        <Dialog open={modalOpen} handler={setModalOpen}
                            className={`rounded-xl border-2 border-white/30 min-w-0 !max-w-xs`}
                        >
                            <FlexRow className={'justify-evenly flex-wrap mb-5'}>
                                <FlexRow className="w-full justify-end mb-3 !items-start  top-0 z-50 transition-all">
                                    <div >
                                        <svg
                                            onClick={() => setModalOpen(false)}
                                            className="cursor-pointer"
                                            width="2.5rem"
                                            height="2.5rem"
                                            viewBox="0 0 41 41"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect x="0.5" y="0.5" width="40" height="40" rx="11.5" fill="white" stroke="#E8ECF4" />
                                            <path d="M27.295 16.115C27.6844 15.7256 27.6844 15.0944 27.295 14.705C26.9056 14.3156 26.2744 14.3156 25.885 14.705L21 19.59L16.115 14.705C15.7256 14.3156 15.0944 14.3156 14.705 14.705C14.3156 15.0944 14.3156 15.7256 14.705 16.115L19.59 21L14.705 25.885C14.3156 26.2744 14.3156 26.9056 14.705 27.295C15.0944 27.6844 15.7256 27.6844 16.115 27.295L21 22.41L25.885 27.295C26.2744 27.6844 26.9056 27.6844 27.295 27.295C27.6844 26.9056 27.6844 26.2744 27.295 25.885L22.41 21L27.295 16.115Z" fill="black" />
                                        </svg>
                                    </div>
                                </FlexRow>
                                {dropdown?.map(itm => {
                                    return (
                                        <button
                                            className='w-full border-2 bg-black/20 rounded-xl max-w-[150px] flex flex-col items-center justify-center font-inter text-base p-2 text-black'
                                            onClick={() => {
                                                setErrors("")
                                                setAmount('')
                                                setSelectCoin(itm?.name)
                                                setModalOpen(false)
                                            }}
                                        >
                                            <div className="w-1/2 h-1/2">
                                                {itm?.icon}
                                            </div>
                                            <p className='text-center font-inter w-full text-[1.38rem] gap-2 py-3 font-semibold '>
                                                {itm?.name}
                                            </p>
                                        </button>
                                    )
                                })
                                }
                            </FlexRow>
                        </Dialog>
                        {/* } */}

                    </>
                    :
                    <button className="font-inter border-2 border-white/30 rounded-xl text-white text-[1.38rem] gap-2 py-5 px-4 font-semibold flex items-center">
                        <div className="flex">
                            <div className="flex w-8 h-8">
                                <img src={CoinSvg} />
                            </div>
                            BCONG
                        </div>
                    </button>
                }
                {children}
            </FlexCol>
        </>
    )
}

export const PaymentCard = ({ userBounce, setUserBounce }) => {
    const { isConnected, address } = useAccount()
    const [selectCoin, setSelectCoin] = useState("")
    const [amount, setAmount] = useState("")

    const payment = paymentAddress
    const UsdApprove = UsdApproveAddress
    const BusdApprove = BusdApproveAddress

    const [swapedAmmount, setSwapedAmmount] = useState()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState('')
    // if (selectCoin == "USDT") {
    const [taransactionHash, setTaransactionHash] = useState()

    const [succesfull, setSuccesfull] = useState()

    const { refetch: fetchUserData } = useContractRead({
        address: payment,
        abi: PaymentABI,
        functionName: 'users',
        args: [address],
        onSuccess(data) {
            setUserBounce(Object.assign({}, data))
        },
        fail(err) {
            // console.log("🚀 ~ file: PaymentCard.jsx:223 ~ fail ~ err:", err)
        },
    })


    const { data, isLoading: paymentConfirmation, isSuccess, isError, error, write: confirm } = useContractWrite({
        address: payment,
        abi: PaymentABI,
        functionName:
            selectCoin == "USDT" ? 'buyTokenUSDT'
                : selectCoin == "BUSD" ? 'buyTokenBUSD'
                    : selectCoin == "BnB" ? 'buyTokenBnb'
                        : '',
        onSuccess(data) {
            setSuccesfull(data?.hash)
            waitForTransaction()
            toast.success("Token Purchased Successfully")
        },
        onError(err) {
            toast.error("Token Purchased Failed")
        }
    })

    const { isFetching, refetch: readContract } = useContractRead({
        address: payment,
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
        onError() {
            toast.error("There was an error while swaping. Please try again!")
            // console.log("Error", error);
        },
    })
    // const { config: configPayment } =
    //     usePrepareContractWrite(
    //         {
    //             address: payment,
    //             abi: PaymentABI,
    //             functionName:
    //                 selectCoin == "USDT" ? 'buyTokenUSDT'
    //                     : selectCoin == "BUSD" ? 'buyTokenBUSD'
    //                         : selectCoin == "BnB" ? 'buyTokenBnb'
    //                             : ''
    //         }
    //     )
    //     ;
    // const { config: myConfig2 } = usePrepareContractWrite({ address: contractAddress2, abi: contractAbi2, functionName: 'func2' });

    const { isLoading } = useWaitForTransaction({
        hash: taransactionHash,
        onSuccess(data) {
            toast.success("Transaction approved Successfully!");
            confirm({
                args: [ethers.parseEther(amount)],
                to: address,
            })
        },
        onError(err) {
            toast.error("Transaction Approval Failed!")
        }
    })

    const { refetch: waitForTransaction } = useWaitForTransaction({
        hash: succesfull,
        onSuccess(data) {
            fetchUserData()
        },
    })

    const { data: usdData, isSuccess: usdSuccess, isLoading: waitingApproval, isError: isUsd, error: errorUsd, write: USD } = useContractWrite({
        address: UsdApprove,
        abi:
            selectCoin == "USDT" ? usdABI
                : selectCoin == "BUSD" ? busdABI
                    : usdABI,
        functionName: 'approve',
        onSuccess(data) {
            setTaransactionHash(data?.hash)
        },
        onError(err) {
            toast.error("Token Approval failed")
        }

    })

    const { data: BusdData, isSuccess: BusdSuccess, isError: isBusd, error: errorBusd, write: BUSD } = useContractWrite({
        address: BusdApprove,
        abi: busdABI,
        functionName: 'approve',
        onSuccess(data) {
            setTaransactionHash(data?.hash)
        },
    })


    // Hook contract functions
    // const { data: paymentData, write: write } = useContractWrite(configPayment);
    // const { data: data2, write: myFunction2 } = useContractWrite(myConfig2);


    // useEffect(() => {
    //     if (isError)
    //         if (error.toString()?.split(":")[0] == "ContractFunctionExecutionError")
    //             toast.error("Insufficient Funds")
    //         else
    //             toast.error("Error while Payment Confimation, Please Try Again")
    // }, [isError])


    const confirmPayment = (confirmation) => {
        if (confirmation == "Click") {
            if (selectCoin == "BnB") {
                confirm({
                    // args: [address, amount],
                    to: address,
                    value: ethers.parseEther(amount),
                })
            } else if (amount < 10) {
                toast.error("Minmum Purchase Amount is 10", { toastId: 1 })
            } else {
                USD({
                    args: [payment, amount * 1e18],
                    to: address,
                    // amount: amount,
                })
                // if (selectCoin == "USDT")
                // else if (selectCoin == "BUSD")
                //     BUSD({
                //         args: [payment, amount * 1e18],
                //         to: address,
                //     })
            }
        }

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
        <>

            {/* {tabsData.map(({ value, desc }) => ( */}
            {/* <TabPanel key={value} value={value}> */}
            {/* {value == "swap" ? */}
            <Card className="w-11/12 max-w-xl absolute flex -top-6 left-1/2 transform -translate-x-1/2 ">
                <CardBody>
                    <h1 className='font-inter text-[2.75rem] font-black text-center text-black mb-2' >
                        Buy BCONG
                    </h1>

                    <CurrencyDetail
                        selectCoin={selectCoin}
                        setSelectCoin={setSelectCoin}
                        text={"Send"}
                        setErrors={setErrors}
                        amount={amount}
                        errors={errors}
                        setAmount={setAmount}
                    />
                    {errors ?
                        <h6 className='text-red-500 my-4'>
                            {errors}
                        </h6>
                        : ""
                    }
                    <div className="w-full my-7">
                        <StyleImage />
                    </div>
                    <CurrencyDetail
                        amount={swapedAmmount}
                        loading={isFetching}
                        className={''}
                        text={"Recieved"}
                    />
                    <GradientButton
                        onClick={() => confirmPayment("Click")}
                        disabled={!swapedAmmount || waitingApproval || isLoading || paymentConfirmation}
                        loading={waitingApproval || isLoading || paymentConfirmation}
                        className={'mt-10 py-10 text-center w-full text-[2rem]'}
                        text={"Payment Confirm"}
                    />
                </CardBody>
            </Card>


        </>
    );
}

