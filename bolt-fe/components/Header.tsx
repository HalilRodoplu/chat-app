import React from 'react';
import Image from "next/image";

const Header = () => {
    return (
        <div className="flex justify-between items-center bg-[#212121] text-white p-4 shadow-md">
            {/* Ortadaki Chatbot Yazısı */}
            <div className="items-center text-2xl font-bold">
                Chatbot
            </div>
            <div className="items-center text-2xl font-bold">
                Chat
            </div>

            {/* User Banner - Sağda */}
            <div className="flex items-center space-x-4">
                <span>John Doe</span>
                <Image
                    src="/placeholder.jpg"
                    alt="User Profile"
                    className="w-10 h-10 rounded-xl border-2 border-white"
                    width={24}
                    height={24}
                />
            </div>
        </div>
    );
};

export default Header;
