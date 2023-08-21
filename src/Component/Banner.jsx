import React from 'react'
import { ConnectWalletBtn, FlexCol, GradientButton, PaymentCard } from './Elements'

const Banner = () => {
    return (
        <FlexCol className={'w-11/12 max-w-[1480px] mx-auto flex-wrap gap-3 justify-between my-[7rem] xl:flex-row'}>
            <FlexCol className={'w-full xl:w-[47%]'}>
                <h1 className='font-inter font-black text-[3.75rem] text-white'>
                    Buy and sell with the lowest fees in the industry
                </h1>
                <p className='font-inter font-normal text-[1.25rem]  text-white/70 mt-[1rem]'>
                    Buy and sell with the lowest fees in the industry
                    Buy and sell with the lowest fees in the industry
                    Buy and sell with the lowest fees in the industry
                    Buy and sell with the lowest fees in the industry
                </p>

                <div className="mt-[4rem]">
                    <ConnectWalletBtn className="text-[1.5rem] font-inter  w-fit px-[2.25rem] py-[1.5rem]" />
                </div>
            </FlexCol>

            <FlexCol className={'w-full xl:w-[47%] relative justify-center items-center my-10 xl:my-0'}>
                <FlexCol className={'w-full'}>
                    <GradientButton
                        className={"w-full h-[14.4rem] max-w-[660px] !rounded-[20px] mx-auto"}
                    />
                    <div className="border-2 border-[#5684fe]  w-full max-w-[660px] h-[19.75rem] mx-auto bg-[#5684fe]/10 backdrop-blur-xl mt-[10rem] !rounded-[20px]">
                    </div>
                </FlexCol>

                <PaymentCard />
            </FlexCol>
        </FlexCol>
    )
}

export default Banner