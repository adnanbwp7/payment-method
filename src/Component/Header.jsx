import React from 'react'
import { ConnectWalletBtn, FlexCol, FlexRow } from './Elements'
import {
    Navbar,
    MobileNav,
    IconButton,
    Button
} from '@material-tailwind/react'
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import BCong_whitepaper from "../../public/BCONG whitepaper.pdf"
import BCong_Roadmap from "../../public/Roadmap of BCONG Token.pdf"

const Header = () => {
    const pdfFiles = [BCong_whitepaper, BCong_Roadmap]
    const openPDFs = () => {
        pdfFiles.forEach((file, index) => {
            window.open(file, '_blank');
            // setTimeout(() => {
            // }, index * 1000);
            // window.open(url, '_blank');
        });
    };

    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);


    return (
        <>
            {/* <FlexCol className={"w-[95%] h-auto max-w-[1980px] mx-auto justify-between my-6 md:flex-row "}>
                <div className=" mx-auto md:mx-0 rounded-xl text-white w-fit text-[3rem] px-7 py-2 font-semibold hover:cursor-pointer">
                    <span className='text-[#FFD700]'>B</span>CONG
                </div>
                <FlexCol className={"md:gap-5 items-center my-4 md:my-0 mdlg:flex-row"}>
                    <button
                        className='text-[1rem] h-12 font-semibold w-40 bg-white rounded-xl px-6 py-3'
                        onClick={() => window.open(BCong_whitepaper, '_blank')}
                    >
                        Whitepaper
                    </button>
                    <button
                        className='text-[1rem] h-12 font-semibold w-40 bg-white rounded-xl px-6 py-3'
                        onClick={() => window.open(BCong_Roadmap, '_blank')}
                    >
                        Roadmap
                    </button>
                    <ConnectWalletBtn className="text-[1rem] h-12 w-40 font-semibold" />
                </FlexCol>
            </FlexCol> */}

            <Navbar className={`mx-auto w-full h-auto max-w-[1980px] py-2 px-4 lg:px-8 lg:py-4 bg-transparent border-none bg-opacity-0 rounded-none backdrop-saturate-100 backdrop-blur-none shadow-none ${openNav ? "bg-black/40" : "bg-transparent"} pb-10`}>
                <div className="container mx-auto flex items-center justify-between text-black">
                    <div className="text-white w-fit text-[3rem] px-7 py-2 font-semibold hover:cursor-pointer">
                        <span className='text-[#FFD700]'>B</span>CONG
                    </div>
                    <div className="hidden md-lg:block">
                        <FlexCol className={"md:gap-5 items-center my-4 md:my-0 mdlg:flex-row"}>
                            <button
                                className='text-[1rem] h-12 font-semibold w-40 bg-white rounded-xl px-6 py-3'
                                onClick={() => window.open(BCong_whitepaper, '_blank')}
                            >
                                Whitepaper
                            </button>
                            <button
                                className='text-[1rem] h-12 font-semibold w-40 bg-white rounded-xl px-6 py-3'
                                onClick={() => window.open(BCong_Roadmap, '_blank')}
                            >
                                Roadmap
                            </button>

                            {/* <GradientButton
                        // onClick={connect}
                        className="text-white text-[1rem] h-12 w-40 font-semibold "
                        text={"Wallet Connect"}
                    /> */}
                            <ConnectWalletBtn className="text-[1rem] h-12 w-40 font-semibold" />
                        </FlexCol>
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-8 w-8 p-3 text-inherit md-lg:hidden "
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"

                                className="h-8 w-8 text-white"
                                viewBox="0 0 24 24"
                                fill="#fff"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-white"
                                fill="#fff"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
                <MobileNav open={openNav}>
                    <div className="container mx-auto text-black">
                        <FlexCol className={"md:gap-5 items-center my-4 md:my-0 mdlg:flex-row gap-3 justify-center md-lg:justify-stretch"}>
                            <button
                                className='text-[1rem] h-12 font-semibold w-40 bg-white rounded-xl px-6 py-3'
                                onClick={() => window.open(BCong_whitepaper, '_blank')}
                            >
                                Whitepaper
                            </button>
                            <button
                                className='text-[1rem] h-12 font-semibold w-40 bg-white rounded-xl px-6 py-3'
                                onClick={() => window.open(BCong_Roadmap, '_blank')}
                            >
                                Roadmap
                            </button>

                            {/* <GradientButton
                        // onClick={connect}
                        className="text-white text-[1rem] h-12 w-40 font-semibold "
                        text={"Wallet Connect"}
                    /> */}
                            <ConnectWalletBtn className="text-[1rem] h-12 w-40 font-semibold" />
                        </FlexCol>
                    </div>
                </MobileNav>
            </Navbar>

        </>
    )
}

export default Header