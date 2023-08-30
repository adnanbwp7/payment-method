import React from 'react'
import FB from "../Assets/Images/FB.png"
import telegram from "../Assets/Images/telegram.png"
import X from "../Assets/Images/X.png"
import { FlexRow } from './Elements'


const Footer = () => {
    const social = [
        {
            icon: FB,
            link: "https://www.facebook.com/babycongofficial?mibextid=ZbWKwL"
        },
        {
            icon: X,
            link: "https://twitter.com/BabyCongOfficia"
        },
        {
            icon: telegram,
            link: "https://t.me/BabyCongoficial"
        },
    ]
    return (
        <>
            <FlexRow className={"flex-wrap w-full bg-[#363636] p-9 justify-between h-auto py-10 mt-10 md:mt-0 gap-4"}>

                <h1 className='text-white/70 w-full md:w-7/12 max-w-3xl font-inter text-xl font-normal'>
                    Buy and sell with the lowest fees in the industry Buy and sell with the lowest fees in the industry Buy and sell with the lowest
                </h1>
                <FlexRow className={"justify-between flex-wrap gap-7  items-center  "}>
                    {social.map(itm => {
                        return (
                            <>
                                <a href={itm?.link} target='_blank' className='w-[38px] h-[38px]'>
                                    <img src={itm?.icon} />
                                </a>
                            </>
                        )
                    })}
                </FlexRow>

            </FlexRow>
        </>
    )
}

export default Footer