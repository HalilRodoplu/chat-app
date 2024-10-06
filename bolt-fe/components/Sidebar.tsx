import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight, faArrowLeft, faPlus} from "@fortawesome/free-solid-svg-icons";

interface Chat {
    id: number;
    chatName: string;
    chatNumber: number;
}

interface SidebarProps {
    chats: Chat[];
    onSelectChat: (id: number) => void;
}

const Sidebar = ({ chats, onSelectChat }: SidebarProps) => {
    console.log("chats----", chats);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="h-screen flex">
            {/* Sidebar İçerik */}
            <div
                className={`bg-[#171717] text-white ${isOpen ? 'w-64' : 'w-0'} overflow-hidden transition-all duration-300`}>
                {isOpen && (
                    <div className="p-4">
                        <h2 className="text-xl font-bold">Chats</h2>
                        <ul className="mt-4">
                            {chats.map((chat) => (
                                <li
                                    key={chat.id}
                                    onClick={() => onSelectChat(chat.id)}
                                    className="py-2 px-4 hover:bg-gray-700 cursor-pointer"
                                >
                                    {chat.chatName}
                                </li>
                            ))}
                            <li className="bg-[#444444] rounded-lg my-1 py-2 flex flex-col items-center text-center">
                                <button onClick={() => alert("It's a future you need too wait")}>
                                    <FontAwesomeIcon icon={faPlus} /> Add New Chat
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Toggle Button - Sidebar kapalıyken sadece bu görünecek */}
            <button
                onClick={toggleSidebar}
                className={`bg-[#212121] text-slate-500 p-2 hover:bg-[#262626] rounded absolute top-4 ${isOpen ? 'left-64' : 'left-4'} transition-all duration-400`}
            >
                {isOpen ? <FontAwesomeIcon icon={faArrowLeft}/> : <FontAwesomeIcon icon={faArrowRight}/>}
            </button>
            {/*<button*/}
            {/*    onClick={toggleSidebar}*/}
            {/*    className={`bg-[#212121] text-slate-500 p-2 hover:bg-[#262626] rounded absolute top-4 ${isOpen ? 'left-64' : 'left-4'} transition-all duration-400`}*/}
            {/*>*/}
            {/*    New Chat*/}
            {/*</button>*/}
        </div>
    );
};

export default Sidebar;
