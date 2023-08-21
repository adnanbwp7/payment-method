import { Card } from '@material-tailwind/react'
import React from 'react'
import { FlexCol, FlexRow } from './Elements'
import Bar from '../Assets/Images/Bar.png'


const CountDownCard = () => {
    return (
        <>
            <Card className="w-11/12 max-w-3xl flex my-32 mx-auto bg-white/80 mb-48" id='pre_sale_card'>
                <h1 className='font-semibold font-inter text-4xl text-black mx-auto mt-8'>Per Sale Starts</h1>
                <h1 className='font-normal font-inter text-xl text-black mx-auto mb-12'>1 September</h1>

                <FlexRow className="justify-between gap-5 text-center w-8/12 mx-auto flex-wrap items-center">
                    <FlexCol className={"mx-auto"}>
                        <h1 className="text-5xl font-normal text-black bg-white px-5 py-1 mb-3 font-inter">40</h1>
                        <h1 className="text-base font-normal text-black capitalize">days</h1>
                    </FlexCol>

                    <FlexCol className={"mx-auto"}>
                        <h1 className="text-5xl font-normal text-black bg-white px-5 py-1 mb-3 font-inter">40</h1>
                        <h1 className="text-base font-normal text-black capitalize">hours</h1>
                    </FlexCol>
                    <FlexCol className={"mx-auto"}>
                        <h1 className="text-5xl font-normal text-black bg-white px-5 py-1 mb-3 font-inter">40</h1>
                        <h1 className="text-base font-normal text-black capitalize">Minutes</h1>
                    </FlexCol>
                    <FlexCol className={"mx-auto"}>
                        <h1 className="text-5xl font-normal text-black bg-white px-5 py-1 mb-3 font-inter">40</h1>
                        <h1 className="text-base font-normal text-black capitalize">Secondss</h1>
                    </FlexCol>
                </FlexRow>

                <FlexRow className={'mx-auto mt-12 mb-16' }>
                    <img src={Bar}/>
                </FlexRow>
            </Card >
        </>
    )
}

export default CountDownCard