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
    MenuItem,
    Spinner
} from "@material-tailwind/react";
import CoinSvg from '../Assets/Images/Coin.png'
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

export const GradientButton = ({ className, disabled, text, loading, onClick, children }) => {
    return (
        <>
            <button
                disabled={disabled}
                className={`border-none ${disabled ? "opacity-50" : 'opacity-100'} bg-gradient-to-tr from-[#933FFE] to-[#18C8FF] rounded-xl text-white ${className}`}
                onClick={onClick}
            >
                {loading ?
                    <span className="flex mx-auto w-fit">
                        <Spinner className="h-12 w-12" />
                    </span>
                    :
                    <>
                        {text && text}
                        {children && children}
                    </>
                }
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
                            // className='w-full'
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
                                    <div className='flex flex-row justify-between w-full mx-auto gap-3'>
                                        <button
                                            onClick={openChainModal}
                                            className="rounded-xl mx-auto text-[1rem] h-12 w-40 font-semibold flex items-center justify-evenly bg-white"
                                            type="button"
                                        >
                                            {chain.hasIcon && (
                                                <div
                                                    style={{
                                                        background: chain.iconBackground,
                                                        width: 30,
                                                        height: 30,
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
                                                            style={{ width: 30, height: 30 }}
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

export const StyleImage = () => {
    return (
        <svg viewBox="0 0 446 50" width={"100%"} fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1={11} y1={2} x2={11} y2={22} stroke="black" strokeWidth={2} />
            <line x1={11} y1={30} x2={11} y2={50} stroke="black" strokeWidth={2} />
            <g clipPath="url(#clip0_12_83)">
                <path d="M10.5255 24.9013C10.7367 24.5227 10.8422 24.3333 11 24.3333C11.1578 24.3333 11.2633 24.5227 11.4745 24.9013L11.5292 24.9993C11.5892 25.107 11.6192 25.1608 11.6658 25.1963C11.7125 25.2318 11.7708 25.245 11.8875 25.2713L11.9935 25.2953C12.4035 25.3882 12.6083 25.4345 12.6572 25.5913C12.7058 25.748 12.5662 25.9115 12.2867 26.2383L12.2143 26.3228C12.135 26.4157 12.0952 26.4622 12.0773 26.5195C12.0595 26.577 12.0655 26.639 12.0775 26.7628L12.0885 26.8757C12.1307 27.3118 12.1518 27.5298 12.0242 27.6267C11.8965 27.7237 11.7045 27.6352 11.3208 27.4585L11.2213 27.4128C11.1123 27.3625 11.0578 27.3375 11 27.3375C10.9422 27.3375 10.8877 27.3625 10.7785 27.4128L10.6793 27.4585C10.2955 27.6352 10.1035 27.7235 9.97599 27.6268C9.84815 27.5298 9.86932 27.3118 9.91149 26.8757L9.92249 26.763C9.93449 26.639 9.94049 26.577 9.92249 26.5197C9.90482 26.4622 9.86499 26.4157 9.78566 26.323L9.71332 26.2383C9.43382 25.9117 9.29415 25.7482 9.34282 25.5913C9.39165 25.4345 9.59665 25.388 10.0067 25.2953L10.1127 25.2713C10.2292 25.245 10.2873 25.2318 10.3342 25.1963C10.3808 25.1608 10.4108 25.107 10.4708 24.9993L10.5255 24.9013Z" fill="black" />
            </g>
            <line x1={2} y1={2} x2={2} y2={22} stroke="black" strokeWidth={2} />
            <line x1={2} y1={30} x2={2} y2={50} stroke="black" strokeWidth={2} />
            <g clipPath="url(#clip1_12_83)">
                <path d="M1.52549 24.9013C1.73665 24.5227 1.84215 24.3333 1.99999 24.3333C2.15782 24.3333 2.26332 24.5227 2.47449 24.9013L2.52916 24.9993C2.58915 25.107 2.61915 25.1608 2.66582 25.1963C2.71249 25.2318 2.77082 25.245 2.88749 25.2713L2.99349 25.2953C3.40349 25.3882 3.60832 25.4345 3.65716 25.5913C3.70582 25.748 3.56615 25.9115 3.28665 26.2383L3.21432 26.3228C3.13499 26.4157 3.09516 26.4622 3.07732 26.5195C3.05949 26.577 3.06549 26.639 3.07749 26.7628L3.08849 26.8757C3.13066 27.3118 3.15182 27.5298 3.02416 27.6267C2.89649 27.7237 2.70449 27.6352 2.32082 27.4585L2.22132 27.4128C2.11232 27.3625 2.05782 27.3375 1.99999 27.3375C1.94216 27.3375 1.88765 27.3625 1.77849 27.4128L1.67932 27.4585C1.29549 27.6352 1.10349 27.7235 0.975988 27.6268C0.848155 27.5298 0.869322 27.3118 0.911488 26.8757L0.922488 26.763C0.934488 26.639 0.940488 26.577 0.922488 26.5197C0.904822 26.4622 0.864988 26.4157 0.785655 26.323L0.713322 26.2383C0.433822 25.9117 0.294155 25.7482 0.342822 25.5913C0.391655 25.4345 0.596655 25.388 1.00665 25.2953L1.11266 25.2713C1.22916 25.245 1.28732 25.2318 1.33416 25.1963C1.38082 25.1608 1.41082 25.107 1.47082 24.9993L1.52549 24.9013Z" fill="black" />
            </g>
            <line x1={444} y1="4.37114e-08" x2={444} y2={20} stroke="black" strokeWidth={2} />
            <line x1={444} y1={28} x2={444} y2={48} stroke="black" strokeWidth={2} />
            <g clipPath="url(#clip2_12_83)">
                <path d="M443.526 22.9013C443.737 22.5227 443.842 22.3333 444 22.3333C444.158 22.3333 444.263 22.5227 444.475 22.9013L444.529 22.9993C444.589 23.107 444.619 23.1608 444.666 23.1963C444.713 23.2318 444.771 23.245 444.888 23.2713L444.994 23.2953C445.404 23.3882 445.608 23.4345 445.657 23.5913C445.706 23.748 445.566 23.9115 445.287 24.2383L445.214 24.3228C445.135 24.4157 445.095 24.4622 445.077 24.5195C445.06 24.577 445.066 24.639 445.078 24.7628L445.089 24.8757C445.131 25.3118 445.152 25.5298 445.024 25.6267C444.897 25.7237 444.705 25.6352 444.321 25.4585L444.221 25.4128C444.112 25.3625 444.058 25.3375 444 25.3375C443.942 25.3375 443.888 25.3625 443.779 25.4128L443.679 25.4585C443.296 25.6352 443.104 25.7235 442.976 25.6268C442.848 25.5298 442.869 25.3118 442.912 24.8757L442.923 24.763C442.935 24.639 442.941 24.577 442.923 24.5197C442.905 24.4622 442.865 24.4157 442.786 24.323L442.713 24.2383C442.434 23.9117 442.294 23.7482 442.343 23.5913C442.392 23.4345 442.597 23.388 443.007 23.2953L443.113 23.2713C443.229 23.245 443.287 23.2318 443.334 23.1963C443.381 23.1608 443.411 23.107 443.471 22.9993L443.526 22.9013Z" fill="black" />
            </g>
            <line x1={435} y1="4.37114e-08" x2={435} y2={20} stroke="black" strokeWidth={2} />
            <line x1={435} y1={28} x2={435} y2={48} stroke="black" strokeWidth={2} />
            <g clipPath="url(#clip3_12_83)">
                <path d="M434.526 22.9013C434.737 22.5227 434.842 22.3333 435 22.3333C435.158 22.3333 435.263 22.5227 435.475 22.9013L435.529 22.9993C435.589 23.107 435.619 23.1608 435.666 23.1963C435.713 23.2318 435.771 23.245 435.888 23.2713L435.994 23.2953C436.404 23.3882 436.608 23.4345 436.657 23.5913C436.706 23.748 436.566 23.9115 436.287 24.2383L436.214 24.3228C436.135 24.4157 436.095 24.4622 436.077 24.5195C436.06 24.577 436.066 24.639 436.078 24.7628L436.089 24.8757C436.131 25.3118 436.152 25.5298 436.024 25.6267C435.897 25.7237 435.705 25.6352 435.321 25.4585L435.221 25.4128C435.112 25.3625 435.058 25.3375 435 25.3375C434.942 25.3375 434.888 25.3625 434.779 25.4128L434.679 25.4585C434.296 25.6352 434.104 25.7235 433.976 25.6268C433.848 25.5298 433.869 25.3118 433.912 24.8757L433.923 24.763C433.935 24.639 433.941 24.577 433.923 24.5197C433.905 24.4622 433.865 24.4157 433.786 24.323L433.713 24.2383C433.434 23.9117 433.294 23.7482 433.343 23.5913C433.392 23.4345 433.597 23.388 434.007 23.2953L434.113 23.2713C434.229 23.245 434.287 23.2318 434.334 23.1963C434.381 23.1608 434.411 23.107 434.471 22.9993L434.526 22.9013Z" fill="black" />
            </g>
            <line x1={226} y1="4.37114e-08" x2={226} y2={20} stroke="black" strokeWidth={2} />
            <line x1={226} y1={28} x2={226} y2={48} stroke="black" strokeWidth={2} />
            <g clipPath="url(#clip4_12_83)">
                <path d="M225.526 22.9013C225.737 22.5227 225.842 22.3333 226 22.3333C226.158 22.3333 226.263 22.5227 226.475 22.9013L226.529 22.9993C226.589 23.107 226.619 23.1608 226.666 23.1963C226.713 23.2318 226.771 23.245 226.888 23.2713L226.994 23.2953C227.404 23.3882 227.608 23.4345 227.657 23.5913C227.706 23.748 227.566 23.9115 227.287 24.2383L227.214 24.3228C227.135 24.4157 227.095 24.4622 227.077 24.5195C227.06 24.577 227.066 24.639 227.078 24.7628L227.089 24.8757C227.131 25.3118 227.152 25.5298 227.024 25.6267C226.897 25.7237 226.705 25.6352 226.321 25.4585L226.221 25.4128C226.112 25.3625 226.058 25.3375 226 25.3375C225.942 25.3375 225.888 25.3625 225.779 25.4128L225.679 25.4585C225.296 25.6352 225.104 25.7235 224.976 25.6268C224.848 25.5298 224.869 25.3118 224.912 24.8757L224.923 24.763C224.935 24.639 224.941 24.577 224.923 24.5197C224.905 24.4622 224.865 24.4157 224.786 24.323L224.713 24.2383C224.434 23.9117 224.294 23.7482 224.343 23.5913C224.392 23.4345 224.597 23.388 225.007 23.2953L225.113 23.2713C225.229 23.245 225.287 23.2318 225.334 23.1963C225.381 23.1608 225.411 23.107 225.471 22.9993L225.526 22.9013Z" fill="black" />
            </g>
            <line x1={217} y1="4.37114e-08" x2={217} y2={20} stroke="black" strokeWidth={2} />
            <line x1={217} y1={28} x2={217} y2={48} stroke="black" strokeWidth={2} />
            <g clipPath="url(#clip5_12_83)">
                <path d="M216.526 22.9013C216.737 22.5227 216.842 22.3333 217 22.3333C217.158 22.3333 217.263 22.5227 217.475 22.9013L217.529 22.9993C217.589 23.107 217.619 23.1608 217.666 23.1963C217.713 23.2318 217.771 23.245 217.888 23.2713L217.994 23.2953C218.404 23.3882 218.608 23.4345 218.657 23.5913C218.706 23.748 218.566 23.9115 218.287 24.2383L218.214 24.3228C218.135 24.4157 218.095 24.4622 218.077 24.5195C218.06 24.577 218.066 24.639 218.078 24.7628L218.089 24.8757C218.131 25.3118 218.152 25.5298 218.024 25.6267C217.897 25.7237 217.705 25.6352 217.321 25.4585L217.221 25.4128C217.112 25.3625 217.058 25.3375 217 25.3375C216.942 25.3375 216.888 25.3625 216.779 25.4128L216.679 25.4585C216.296 25.6352 216.104 25.7235 215.976 25.6268C215.848 25.5298 215.869 25.3118 215.912 24.8757L215.923 24.763C215.935 24.639 215.941 24.577 215.923 24.5197C215.905 24.4622 215.865 24.4157 215.786 24.323L215.713 24.2383C215.434 23.9117 215.294 23.7482 215.343 23.5913C215.392 23.4345 215.597 23.388 216.007 23.2953L216.113 23.2713C216.229 23.245 216.287 23.2318 216.334 23.1963C216.381 23.1608 216.411 23.107 216.471 22.9993L216.526 22.9013Z" fill="black" />
            </g>
            <defs>
                <clipPath id="clip0_12_83">
                    <rect width={4} height={4} fill="white" transform="translate(9 24)" />
                </clipPath>
                <clipPath id="clip1_12_83">
                    <rect width={4} height={4} fill="white" transform="translate(0 24)" />
                </clipPath>
                <clipPath id="clip2_12_83">
                    <rect width={4} height={4} fill="white" transform="translate(442 22)" />
                </clipPath>
                <clipPath id="clip3_12_83">
                    <rect width={4} height={4} fill="white" transform="translate(433 22)" />
                </clipPath>
                <clipPath id="clip4_12_83">
                    <rect width={4} height={4} fill="white" transform="translate(224 22)" />
                </clipPath>
                <clipPath id="clip5_12_83">
                    <rect width={4} height={4} fill="white" transform="translate(215 22)" />
                </clipPath>
            </defs>
        </svg>
    )
}
