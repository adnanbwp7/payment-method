import { Card } from '@material-tailwind/react'
import React, { useEffect, useMemo, useState } from 'react'
import { FlexCol, FlexRow } from './Elements'
import Bar from '../Assets/Images/Bar.png'
import { useAccount, useConnect, useContractRead, useContractReads } from 'wagmi'
import PaymentABI from '../../ABI/payment.json'
import moment, { invalid } from 'moment/moment'
import { paymentAddress } from '../Assets/data/valure'


const CountDownCard = () => {
    // const [data, setData] = useState()
    // const [error, setError] = useState()
    const [preSaleDate, setPreSaleDate] = useState()
    const [preSaleStatus, setPreSaleStatus] = useState()
    const [userBounce, setUserBounce] = useState({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
    })
    const { address } = useAccount()

    const preSaleContract = {
        address: paymentAddress,
        abi: PaymentABI,
    }

    const { data, isError, isLoading } = useContractReads({
        contracts: [
            {
                ...preSaleContract,
                functionName: 'preSaleStartTime',
            },
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
        const obj = Object.assign({}, data)

        if (obj?.[0]?.status == "success") {
            setPreSaleDate(obj?.[0]?.result.toString())
        }
        if (obj?.[1]?.status == "success") {
            setPreSaleStatus(obj?.[1]?.result)
        }
    }, [data])

    const [preSaleTime, setPreSaleTime] = useState();

    const calculatePreSaleTimeLeft = () => {
        const currentDate = new Date();
        const timeLeftInSeconds = moment.unix(preSaleDate).diff(currentDate, 'seconds');
        const duration = moment.duration(timeLeftInSeconds, 'seconds');
        setPreSaleTime(duration);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            calculatePreSaleTimeLeft();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Card className="w-11/12 max-w-3xl flex mt-32 mx-auto bg-white/80 mb-16" id='pre_sale_card'>
                <h1 className='font-semibold font-inter text-4xl text-black mx-auto mt-8'>Pre-Sale Starts</h1>
                {isLoading ?
                    <div className="w-fit text-center mx-auto my-5 font-semibold font-inter text-xl">
                        Loading...
                    </div> :
                    isError ?
                        <h1 className='font-normal font-inter text-xl text-red-500 mx-auto mb-12 mt-3'>No records found.</h1>
                        :
                        <>
                            <h1 className='font-normal font-inter text-xl text-black mx-auto mb-12'>
                                {preSaleTime && moment(Number(preSaleDate?.toString().split('n').join()) * 1000).format("DD MMMM") != "Invalid date" ? moment(Number(preSaleDate?.toString().split('n').join()) * 1000).format("DD MMMM"): ""}
                            </h1>
                            <FlexRow className="justify-between gap-5 text-center w-8/12 mx-auto flex-wrap items-center">
                                <FlexCol className={"mx-auto"}>
                                    <h1 className="text-5xl font-normal text-black bg-white px-5 py-1 mb-3 font-inter capitalize">
                                        {preSaleTime?.days() && preSaleTime?.days() > 0 ? preSaleTime?.days() : "00"}
                                    </h1>
                                    <h1 className="text-base font-normal text-black capitalize">days</h1>
                                </FlexCol>

                                <FlexCol className={"mx-auto"}>
                                    <h1 className="text-5xl font-normal text-black bg-white px-5 py-1 mb-3 font-inter">
                                        {preSaleTime?.hours() && preSaleTime?.hours() > 0 ? preSaleTime?.hours() : "00"}
                                    </h1>
                                    <h1 className="text-base font-normal text-black capitalize">hours</h1>
                                </FlexCol>
                                <FlexCol className={"mx-auto"}>
                                    <h1 className="text-5xl font-normal text-black bg-white px-5 py-1 mb-3 font-inter">
                                        {preSaleTime?.minutes() && preSaleTime?.minutes() > 0 ? preSaleTime?.minutes() : "00"}
                                    </h1>
                                    <h1 className="text-base font-normal text-black capitalize">Minutes</h1>
                                </FlexCol>
                                <FlexCol className={"mx-auto"}>
                                    <h1 className="text-5xl font-normal text-black bg-white px-5 py-1 mb-3 font-inter">
                                        {preSaleTime?.seconds() && preSaleTime?.seconds() > 0 ? preSaleTime?.seconds() : "00"}
                                    </h1>
                                    <h1 className="text-base font-normal text-black capitalize">Seconds</h1>
                                </FlexCol>
                            </FlexRow>
                        </>
                }
                <FlexRow className={'mx-auto mt-12 mb-16'}>
                    <img src={Bar} />
                </FlexRow>
            </Card >
        </>
    )
}

export default CountDownCard