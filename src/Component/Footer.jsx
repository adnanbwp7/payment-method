import React from 'react'
import FB from "../Assets/Images/FB.png"
import LinkedIn from "../Assets/Images/LinkedIn.png"
import InstaFB from "../Assets/Images/Insta.png"
import X from "../Assets/Images/X.png"
import Google from "../Assets/Images/Google.png"
import { FlexRow } from './Elements'


const Footer = () => {
    const social = [
        {
            icon: FB,
            link: ""
        },
        {
            icon: X,
            link: "https://twitter.com/BabyCongOfficia"
        },
        {
            icon: InstaFB,
            link: ""
        },
        {
            icon: LinkedIn,
            link: ""
        },
        {
            icon: Google,
            link: ""
        },
    ]
    return (
        <>
            <FlexRow className={"flex-wrap w-full bg-[#363636] p-9 justify-between h-auto py-10 mt-10 md:mt-0 gap-4"}>

                <h1 className='text-white/70 w-full md:w-7/12 max-w-3xl font-inter text-xl font-normal'>
                    Buy and sell with the lowest fees in the industry Buy and sell with the lowest fees in the industry Buy and sell with the lowest
                </h1>
                <FlexRow className={"justify-between flex-wrap gap-7    "}>
                    {social.map(itm => {
                        return (
                            <>
                                <a href={itm?.link ? itm?.link : "#"} target='_blank'>
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