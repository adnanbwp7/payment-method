import React from 'react'
import { ConnectWalletBtn, FlexCol, FlexRow } from './Elements'
// import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
    return (
        <>
            <FlexCol className={"w-[95%] h-auto max-w-[1980px] mx-auto justify-between my-6 md:flex-row "}>
                <div className=" mx-auto md:mx-0 rounded-xl text-white w-fit text-[3rem] px-7 py-2 font-semibold hover:cursor-pointer">
                    <span className='text-[#FFD700]'>B</span>CONG
                </div>
                <FlexCol className={"md:gap-5 items-center my-4 md:my-0 sm:flex-row"}>
                    {/* <GradientButton
                        // onClick={connect}
                        className="text-white text-[1rem] h-12 w-40 font-semibold "
                        text={"Wallet Connect"}
                    /> */}
                    <ConnectWalletBtn className="text-[1rem] h-12 w-40 font-semibold"/>
                </FlexCol>
            </FlexCol>

        </>
    )
}

export default Header