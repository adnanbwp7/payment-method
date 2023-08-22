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
import { Ethereum, Binance } from '../Assets/data/currency';
import { useAccount, useNetwork } from 'wagmi';


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

export const GradientButton = ({ className, disabled, text, onClick, children }) => {
    return (
        <>
            <button
                disabled={disabled}
                className={`border-none ${disabled ? "opacity-50" : 'opacity-100'} bg-gradient-to-tr from-[#933FFE] to-[#18C8FF] rounded-xl text-white ${className}`}
                onClick={onClick}
            >
                {text && text}
                {children && children}
            </button>
        </>
    )
}



export const ConnectWalletBtn = ({ className }) => {
    return (
        <>
            {/* <GradientButton
                className={'mt-10 py-10 text-center w-full text-[2rem]'}
                text={"Connect"}
            /> */}
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