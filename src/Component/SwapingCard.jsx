import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
} from "@material-tailwind/react";
import { FlexCol, GradientButton, StyleImage } from './Elements';
import { useAccount, useContractReads, useContractWrite } from 'wagmi'
import PaymentABI from '../../ABI/payment.json'
import { paymentAddress } from '../Assets/data/valure';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

const SwapingCard = ({ userBounce, setUserBounce }) => {
    const { isConnected } = useAccount()

    const [preSaleStatus, setPreSaleStatus] = useState()
    const { address } = useAccount()

    const preSaleContract = {
        address: paymentAddress,
        abi: PaymentABI,
    }

    const { data, isError, isLoading, refetch: fetchUserData } = useContractReads({
        contracts: [
            {
                ...preSaleContract,
                functionName: 'presaleStatus',
            },
            {
                ...preSaleContract,
                functionName: 'users',
                args: [address]
            },
        ]
    })

    useEffect(() => {
        isConnected ?
            fetchUserData()
            : ""
    }, [])

    const { isLoading: claimLoading, write: claimToken } = useContractWrite({
        address: paymentAddress,
        abi: PaymentABI,
        functionName: "claimTokens",
        onSuccess(data) {
            toast.success("Token Claimed Successfully!")
            fetchUserData()
        },
        onError(err) {
            toast.error("Token Claim Failed!")
        }
    })

    useEffect(() => {
        const obj = Object.assign({}, data)

        if (obj?.[0]?.status == "success") {
            setPreSaleStatus(obj?.[0]?.result)
        }
        if (obj?.[1]?.status == "success") {
            setUserBounce(Object.assign({}, obj?.[1]?.result))
        }
    }, [data])

    return (
        <>
            <Card className="w-11/12 max-w-xl absolute flex -top-6 left-1/2 transform -translate-x-1/2 ">
                <CardBody>
                    <h1 className='font-inter text-[2.75rem] font-black text-center text-black mb-2' >
                        Claim Tokens
                    </h1>

                    <FlexCol className='bg-[#293A3C] rounded-[20px] p-[2rem] sm:flex-row items-center justify-between gap-4'>
                        <div className='font-inter text-2xl py-3 px-2 text-center text-white font-semibold my-3'>
                            Token Balance:
                        </div>
                        <div className='font-inter text-2xl py-3 px-2 text-center text-white font-semibold my-3'>
                            {userBounce?.[3]?.toString() ? ethers.formatEther(userBounce?.[3]?.toString()).split(".")[0] : 0}
                        </div>
                    </FlexCol>

                    <div className="w-full my-7">
                        <StyleImage />
                    </div>

                    <FlexCol className='bg-[#293A3C] rounded-[20px] p-[2rem] sm:flex-row items-center justify-between gap-4'>
                        <div className='font-inter text-2xl py-3 px-2 text-center text-white font-semibold my-3'>
                            User Bonus:
                        </div>
                        <div className='font-inter text-2xl py-3 px-2 text-center text-white font-semibold my-3'>
                            {userBounce?.[4]?.toString() ? ethers.formatEther(userBounce?.[4]?.toString()).split(".")[0] : 0}
                        </div>
                    </FlexCol>

                    <GradientButton
                        onClick={() => isConnected ? claimToken() : toast.error("Please Connect to Wallet!")}
                        disabled={preSaleStatus || claimLoading}
                        loading={claimLoading}
                        className={'mt-10 py-10 text-center w-full text-[2rem]'}
                        text={"Claim"}
                    />

                </CardBody>
            </Card>
        </>
    )
}

export default SwapingCard