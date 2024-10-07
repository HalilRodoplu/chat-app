import { useState, useEffect, FormEvent } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons/faPaperPlane";
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';  // Toast ekledik
import ReactLoading from 'react-loading';

interface Question {
    questionText: string;
}

interface Answer {
    answerText: string;
}

const Chatbot: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [input, setInput] = useState<string>("");
    const [chatNumber] = useState<number>(1);
    const [lastRespondDatetime, setLastRespondDatetime] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getUserId = () => {
        let userId: string = localStorage.getItem('userId');
        if (!userId) {
            userId = uuidv4();
            localStorage.setItem('userId', userId);
        }
        return userId;
    };

    const userId = getUserId();

    useEffect(() => {
        const fetchQuestionsAndAnswers = async () => {
            try {
                setLoading(true);

                const questionsResponse = await fetch("http://localhost:3001/questions");
                if (!questionsResponse.ok) throw new Error("Failed to fetch questions");

                const questionsData = await questionsResponse.json();
                if (Array.isArray(questionsData) && questionsData.length > 0 && questionsData[0].chatQuestions) {
                    setQuestions(questionsData[0].chatQuestions);
                }

                const answersResponse = await fetch(`http://localhost:3001/user-answers/${userId}/${chatNumber}`);
                if (!answersResponse.ok) throw new Error("Failed to fetch answers");

                const answersData = await answersResponse.json();
                if (Array.isArray(answersData.chatAnswers)) {
                    setAnswers(answersData.chatAnswers);
                    const answeredQuestions = answersData.chatAnswers.filter(answer => answer.answerText !== "");
                    setCurrentQuestionIndex(answeredQuestions.length);
                    if (answersData.lastRespondDatetime) setLastRespondDatetime(answersData.lastRespondDatetime);
                }

                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error("Failed to load data. Please try again.");
                console.error("Failed to fetch questions and answers:", error);
            }
        };

        fetchQuestionsAndAnswers();
    }, [userId, chatNumber]);

    const saveAnswer = async (answerIndex: number, answerText: string) => {
        try {
            const response = await fetch(`http://localhost:3001/user-answers/${userId}/${chatNumber}/${answerIndex}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ answerText }),
            });

            if (!response.ok) throw new Error("Failed to save answer");

            const now = new Date().toISOString();
            setLastRespondDatetime(now);
        } catch (error) {
            toast.error("Failed to save answer. Please try again.");
            console.error("Failed to save answer:", error);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) {
            toast.error("Input cannot be empty.");
            return;
        }

        setAnswers((prev) => {
            const updatedAnswers = [...prev];
            updatedAnswers[currentQuestionIndex] = { answerText: input.trim() };
            return updatedAnswers;
        });

        setInput("");
        setCurrentQuestionIndex((prev) => prev + 1);

        await saveAnswer(currentQuestionIndex, input.trim());
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <ReactLoading type="spin" color="white" height={'2%'} width={'2%'} />
            </div>
        );
    }

    return (
        <div className="h-[95%] flex flex-col bg-[#212121] shadow-md rounded overflow-auto">
            <div className="flex-grow overflow-auto p-4">
                {questions.slice(0, currentQuestionIndex).map((q, index) => (
                    <div key={index} className="mb-4">
                        <p className="font-bold text-[#e3e3e3] text-left h-10">{q.questionText}</p>
                        <p className="text-[#e3e3e3] text-right h-10">{answers[index]?.answerText || ""}</p>
                    </div>
                ))}
            </div>

            {currentQuestionIndex < questions.length ? (
                <div className="p-4 bg-[#212121]">
                    <p className="font-bold my-5 text-[#e3e3e3]">
                        {questions[currentQuestionIndex]?.questionText}
                    </p>
                    {lastRespondDatetime && (
                        <p className="text-right mx-16 p-2 text-[#e3e3e3]">
                            Last response: {new Date(lastRespondDatetime).toLocaleString()}
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-row gap-3 items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full px-4 py-3 bg-[#2f2f2f] rounded-full text-[#e3e3e3] placeholder-[#b3b3b3]"
                            placeholder="Message Chatbot"
                        />
                        <button
                            type="submit"
                            className=" flex bg-[#676767] hover:scale-110 duration-300 p-3 rounded-xl text-[#ffffff]"
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </form>
                </div>
            ) : (
                <p className="flex right-0 text-green-600 font-bold p-4">Welcome to Bolt Insight</p>
            )}
        </div>
    );
};

export default Chatbot;
