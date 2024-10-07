"use client"
import Sidebar from '../components/Sidebar';
import {useState} from 'react';
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";

const Home: React.FC = () => {
    const [selectedChat, setSelectedChat] = useState<number | null>(null);

    const chats = [
        {id: 1,chatNumber: 1, chatName: "Chat about cats"},
        {id: 2,chatNumber: 2, chatName: "Chat about dogs"},
    ];

    const handleSelectChat = (id: number) => {
        setSelectedChat(id);
    };

    return (
        <div className="h-screen flex flex-col">
            <div>
                <Header />
            </div>

            <div className="flex flex-grow h-full">
                <Sidebar chats={chats} onSelectChat={handleSelectChat} />

                <main className="flex-grow bg-[#212121] p-4">
                    <Chatbot />
                </main>
            </div>
        </div>
    );
};

export default Home;
