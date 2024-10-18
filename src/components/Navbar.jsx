import React, { useCallback, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import CustomButton from './CustomButton';
import { LuHeartHandshake } from 'react-icons/lu';
import { GiHamburgerMenu } from 'react-icons/gi';
import { navLinks } from '../constants';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const { ready, authenticated, login, user, logout } = usePrivy();
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [isActive, setIsActive] = useState("dashboard");



    console.log("user info", user)
    const handleLoginLogout = useCallback(() => {
        if (authenticated) {
            logout();
        } else {
            login().then(() => {
                if (user) {
                    // console.log(user)
                }
            });
        }
    }, [authenticated, login, logout, user]);


    return (
        <div className='mb-[35px] flex flex-col-reverse justify-between gap-6 md:flex-row pl-10'>
            <div className="flex h-[52px] max-w-[458px] flex-row rounded-[100px] bg-[#0e0e1c] py-2 pl-4 pr-2 lg:flex-1">
                <input
                    type="text"
                    placeholder="Search for records"
                    className="flex w-full bg-transparent font-epilogue text-[14px] font-normal text-white outline-none placeholder:text-[#aeb9e3]"
                />
                <div className="flex h-full w-[72px] cursor-pointer items-center justify-center rounded-[30px] bg-[#008080]">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png"
                        alt="search"
                        className="h-[25px] w-[25px] object-contain"
                    />
                </div>
            </div>

            <div className="hidden flex-row justify-end gap-2 sm:flex">
                <CustomButton
                    btnType="button"
                    title={authenticated ? "Log Out" : "Log In"}
                    styles={authenticated ? "bg-[#008080]" : "bg-[#8c6dfd]"}
                    handleClick={handleLoginLogout}
                />
            </div>


            <div className="relative flex items-center justify-between sm:hidden">
                <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[10px] bg-[#2c2f32]">
                    <LuHeartHandshake size={40} color="#1ec070" className="p-2" />
                </div>
                <div
                    className="h-[34px] w-[34px] cursor-pointer object-contain"
                    onClick={() => setToggleDrawer((prev) => !prev)}
                >
                    <GiHamburgerMenu className="h-full w-full" />
                </div>

                <div
                    className={`absolute left-0 right-0 top-[60px] z-10 bg-[#1c1c24] py-4 shadow-secondary ${!toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
                        } transition-all duration-700`}
                >
                    <ul className="mb-4">
                        {navLinks.map((link) => (
                            <li
                                key={link.name}
                                className={`flex p-4 ${isActive === link.name && "bg-[#3a3a43]"}`}
                                onClick={() => {
                                    setIsActive(link.name);
                                    setToggleDrawer(false);
                                    navigate(link.link);
                                }}
                            >
                                {/* Render the icon component directly */}
                                <link.Icon
                                    className={`h-[24px] w-[24px] ${isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"} object-contain`}
                                />
                                <p
                                    className={`ml-[20px] font-epilogue text-[14px] font-semibold ${isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"}`}
                                >
                                    {link.name}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="mx-4 flex"></div>
                </div>
            </div>


        </div>
    )
}

export default Navbar
