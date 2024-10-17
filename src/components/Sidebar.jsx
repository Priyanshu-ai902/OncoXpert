import React, { useState } from 'react';
import { navLinks } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { IoSunnySharp } from 'react-icons/io5';
import { LuHeartHandshake } from 'react-icons/lu';

const Icon = ({ styles, name, Icon, isActive, handleClick }) => {
    const isIconActive = isActive === name;
    return (
        <div
            className={`h-12 w-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out transform ${isIconActive ? 'bg-[#2c2f32] scale-110' : 'bg-[#1c1c24] hover:scale-105'
                } ${styles}`}
            onClick={handleClick}
        >
            {/* Applying text-white for icon color */}
            {Icon && <Icon className={`h-6 w-6 text-white ${!isIconActive ? 'grayscale' : ''}`} />}
        </div>
    );
};


const Sidebar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("dashboard");

    return (
        <div className="fixed top-0 left-0 h-full w-20 
        bg-[#1c1c24] flex flex-col items-center py-8 shadow-lg">
            {/* Add top margin for LuHeartHandshake */}
            <Link to='/' className="mb-16">
                <div className="rounded-lg bg-[#2c2f32] p-2 hover:shadow-xl transition-all">
                    <LuHeartHandshake size={40} color="#1ec070" />
                </div>
            </Link>

            {/* Icons with small gaps between them */}
            <div className="flex flex-col items-center flex-1 space-y-4">
                {
                    navLinks.map((link) => (
                        <Icon
                            key={link.name}
                            {...link}
                            isActive={isActive}
                            handleClick={() => {
                                setIsActive(link.name);
                                navigate(link.link);
                            }}
                        />
                    ))
                }
            </div>

            {/* Add margin for IoSunnySharp at the bottom */}
            <Icon styles="shadow-secondary mb-8" Icon={IoSunnySharp} />
        </div>
    );
};

export default Sidebar;
