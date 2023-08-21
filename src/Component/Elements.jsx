import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
} from "@material-tailwind/react";
import CoinSvg from '../Assets/Images/Coin.png'
import StyleImage from '../Assets/Images/StyleImage.svg'
import { ConnectButton } from '@rainbow-me/rainbowkit';


export const FlexRow = ({ className, children }) => {
    return (
        <>
            <div className={`flex flex-row ${className}`}>
                {children}
            </div>
        </>
    )
}
export const FlexCol = ({ className, children }) => {
    return (
        <>
            <div className={`flex flex-col ${className}`}>
                {children}
            </div>
        </>
    )
}

export const GradientButton = ({ className, text, onClick, children }) => {
    return (
        <>
            <button
                className={`border-none bg-gradient-to-tr from-[#933FFE] to-[#18C8FF] rounded-xl text-white ${className}`}
                onClick={onClick}
            >
                {text && text}
                {children && children}
            </button>
        </>
    )
}

const CurrencyDetail = ({ className, children, text }) => {
    return (
        <>
            <FlexCol className={`bg-[#293A3C] rounded-[20px] p-[2rem] sm:flex-row items-center justify-between ${className}`}>
                <FlexCol>
                    <h6 className='text-[1rem] font-inter text-white font-normal'>
                        You {text}
                    </h6>
                    <h6 className='text-[1.38rem] font-inter text-white mt-2 font-semibold flex items-center '>
                        500
                        {text == "Send" ?
                            "$"
                            :
                            <div className="flex w-8 h-8">
                                <img src={CoinSvg} />
                            </div>
                        }
                    </h6>
                </FlexCol>

                {text == "Send" ?
                    <Menu>
                        <MenuHandler>
                            <button className="font-inter border-2 border-white/30 rounded-xl text-white text-[1.38rem] gap-2 py-5 px-4 font-semibold flex items-center">
                                $ USD
                                <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_12_20" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={1} y={3} width={12} height={9}>
                                        <path d="M10.5 5.54167L7 9.04167L3.5 5.54167H10.5Z" fill="white" stroke="white" strokeWidth={4} strokeLinejoin="round" />
                                    </mask>
                                    <g mask="url(#mask0_12_20)">
                                        <path d="M0 0H14V14H0V0Z" fill="white" />
                                    </g>
                                </svg>
                            </button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem>Menu Item 1</MenuItem>
                            <MenuItem>Menu Item 2</MenuItem>
                            <MenuItem>Menu Item 3</MenuItem>
                        </MenuList>
                    </Menu>
                    :
                    <button className="font-inter border-2 border-white/30 rounded-xl text-white text-[1.38rem] gap-2 py-5 px-4 font-semibold flex items-center">
                        <div className="flex">
                            <div className="flex w-8 h-8">
                                <img src={CoinSvg} />
                            </div>
                            COIN
                        </div>
                    </button>
                }


                {children}
            </FlexCol>
        </>
    )
}



export const PaymentCard = () => {
    return (
        <Card className="w-11/12 max-w-xl absolute flex -top-6 left-1/2 transform -translate-x-1/2 ">
            <CardBody>
                <h1 className='font-inter text-[2.75rem] font-black text-center text-black mb-2' >
                    Buy Coins
                </h1>
                <CurrencyDetail className={''} text={"Send"} />
                <div className="w-full m-7">
                    <img src={StyleImage} />
                </div>
                <CurrencyDetail className={''} text={"Recieved"} />
                <GradientButton
                    className={'mt-10 py-10 text-center w-full text-[2rem]'}
                    text={"Payment Confirm"}
                />

            </CardBody>
        </Card>
    );
}


export const ConnectWalletBtn = ({ className }) => {
    return (
        <>
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');
                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        <GradientButton
                                            onClick={openConnectModal}
                                            // onClick={connect}
                                            className={`${className}`}
                                            text={"Wallet Connect"}
                                            type="button"
                                        />
                                        // <button   type="button">
                                        //     Connect Wallet
                                        // </button>
                                    );
                                }
                                if (chain.unsupported) {
                                    return (
                                        <GradientButton
                                            onClick={openConnectModal}
                                            // onClick={connect}
                                            className="text-white text-[1rem] h-12 w-40 font-semibold "
                                            text={"Wallet Connect"}
                                            type="Wrong network"
                                        />
                                    );
                                }
                                return (
                                    <div className='flex flex-wrap mx-auto gap-3'>
                                        <button
                                            onClick={openChainModal}
                                            className="rounded-xl mx-auto text-[1rem] h-12 w-40 font-semibold flex items-center justify-evenly bg-white"
                                            type="button"
                                        >
                                            {chain.hasIcon && (
                                                <div
                                                    style={{
                                                        background: chain.iconBackground,
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: 999,
                                                        overflow: 'hidden',
                                                        marginRight: 4,
                                                    }}
                                                    className=""

                                                >
                                                    {chain.iconUrl && (
                                                        <img
                                                            alt={chain.name ?? 'Chain icon'}
                                                            src={chain.iconUrl}
                                                            style={{ width: 12, height: 12 }}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {chain.name}
                                        </button>
                                        <button
                                            onClick={openAccountModal}
                                            type="button"
                                            className="rounded-xl mx-auto text-[1rem] h-12 w-40 font-semibold !bg-white"
                                        >
                                            {account.displayName}
                                            {account.displayBalance
                                                ? ` (${account.displayBalance})`
                                                : ''}
                                        </button>
                                    </div>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </>
    );
};