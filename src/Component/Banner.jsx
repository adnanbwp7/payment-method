import React, { useEffect, useState } from 'react'
import {  FlexCol, FlexRow, GradientButton } from './Elements'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {
    useAccount,
    useContractReads,
    useNetwork,
} from 'wagmi'

import { ethers } from 'ethers';
import { PaymentCard } from './PaymentCard';
import SwapingCard from './SwapingCard';
import { paymentAddress } from '../Assets/data/valure';
import PaymentABI from '../../ABI/payment.json'



const Banner = () => {
    const [userBounce, setUserBounce] = useState({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
    })

    const tabsData = [
        {
            label: "Buy",
            value: "swap",
            desc: <PaymentCard
                userBounce={userBounce}
                setUserBounce={setUserBounce}
            />
        },
        {
            label: "Claim Tokens",
            value: "claim",
            desc: <SwapingCard
                userBounce={userBounce}
                setUserBounce={setUserBounce}
            />
        },
    ]

    const { activeConnector, isConnected, connector } = useAccount()
    const { chain, chains } = useNetwork()


    const [tokenSold, setTokenSold] = useState(0)
    const [supply, setSupply] = useState(0)

    const preSaleContract = {
        address: paymentAddress,
        abi: PaymentABI,
    }

    const { data, isError, isLoading } = useContractReads({
        contracts: [
            {
                ...preSaleContract,
                functionName: 'totalSupply',
            },
            {
                ...preSaleContract,
                functionName: 'soldToken',
            },

        ]
    })

    useEffect(() => {
        const obj = Object.assign({}, data)

        if (obj?.[0]?.status == "success") {
            setSupply(obj?.[0]?.result.toString())
        }
        if (obj?.[1]?.status == "success") {
            setTokenSold(obj?.[1]?.result)
        }
    }, [data])

    return (
        <FlexCol className={'w-11/12 max-w-[1480px] mx-auto flex-wrap gap-3 justify-between my-[7rem] xl:flex-row'}>
            <FlexCol className={'w-full xl:w-[47%]'}>
                <h1 className='font-inter font-black text-[3.75rem] text-white'>
                    Buy and sell with the lowest fees in the industry
                </h1>
                <p className='font-inter font-normal text-[1.25rem]  text-white/70 mt-[1rem]'>
                    BCONG Presale bonus serves as an incentive for early participants, offering a reward structure based on their contribution amount.
                </p>

                <GradientButton className=' rounded-[20px] p-[2rem] cursor-default items-center justify-between gap-4 my-16'>
                    <FlexRow className={"justify-between w-full"}>
                        <div className='font-inter text-2xl py-3 px-2 text-center text-white font-semibold my-3'>
                            Token Sold:
                        </div>

                        <div className='font-inter text-2xl py-3 px-2 text-center text-white font-semibold my-3'>
                            {tokenSold ? ethers.formatEther(tokenSold).split('.')[0] : 0}
                        </div>
                    </FlexRow>
                    <FlexRow className={"justify-between w-full"}>
                        <div className='font-inter text-2xl py-3 px-2 text-center text-white font-semibold my-3'>
                            Total Supply:
                        </div>
                        <div className='font-inter text-2xl py-3 px-2 text-center text-white font-semibold my-3'>
                            {tokenSold ? ethers.formatEther(supply).split('.')[0] : 0}

                        </div>
                    </FlexRow>
                </GradientButton>
            </FlexCol>


            <FlexCol className={'w-full xl:w-[47%] justify-center items-center my-4 md:my-8 xl:my-0'}>
                <Tabs value="swap" className="flex w-full flex-col mb-8">
                    <TabsHeader className="flex w-full">
                        {tabsData.map(({ label, value }) => (
                            <Tab key={value} value={value} className='font-inter text-xl font-semibold'>
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody>
                        {tabsData.map(({ desc, value }) => (
                            <TabPanel key={value} value={value}>
                                <FlexCol className={'w-full justify-center items-center  my-4 md:my-8  xl:my-0'}>
                                    <FlexCol className={'w-full relative my-20'}>
                                        <FlexCol className={'w-full'}>
                                            <GradientButton
                                                className={"w-full h-[14.4rem] max-w-[660px] !rounded-[20px] mx-auto"}
                                            />
                                            <div className="border-2 border-[#5684fe]  w-full max-w-[660px] h-[19.75rem] mx-auto bg-[#5684fe]/10 backdrop-blur-xl mt-[10rem] !rounded-[20px]">
                                            </div>
                                        </FlexCol>
                                        {desc}

                                    </FlexCol>
                                </FlexCol>
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs >
            </FlexCol>
        </FlexCol>
    )
}

export default Banner