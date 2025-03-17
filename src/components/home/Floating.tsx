"use client";
import { useState, useEffect } from "react";
import { ChatCircleDots, XCircle, PaperPlaneRight } from "@phosphor-icons/react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [chat, setChat] = useState<{ user: string; bot: string }[]>([]);
    const [input, setInput] = useState("");
    const [responses, setResponses] = useState<{ [key: string]: string }>({});
    const [randomQuestions, setRandomQuestions] = useState<string[]>([]);

    useEffect(() => {
        fetch("/chatbot.json")
            .then((res) => res.json())
            .then((data) => {
                setResponses(data);
                const keys = Object.keys(data);
                setRandomQuestions(keys.sort(() => 0.5 - Math.random()).slice(0, 5)); 
            });
    }, []);

    const getSuggestedTopics = (userInput: string) => {
        const keywords = userInput.toLowerCase().split(" ");
        const availableTopics = Object.keys(responses);
        let suggested = availableTopics.filter((topic) =>
            keywords.some((keyword) => topic.includes(keyword))
        );
        return suggested.length
            ? `Mungkin maksudmu: ${suggested.slice(0, 3).join(", ")}`
            : "Saya tidak mengerti, coba tanyakan hal lain!";
    };

    const handleSend = (text?: string) => {
        const userInput = text || input;
        if (!userInput.trim()) return;
        const lowerInput = userInput.toLowerCase();
        const botResponse = responses[lowerInput] || getSuggestedTopics(lowerInput);
        setChat([...chat, { user: userInput, bot: botResponse }]);
        setInput("");
    };

    return (
        <div className="fixed bottom-4 right-4 flex flex-col items-end">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-4 rounded-full shadow-2xl hover:opacity-90 transition-all duration-300"
            >
                {isOpen ? <XCircle size={28} /> : <ChatCircleDots size={28} />}
            </button>

            {isOpen && (
                <div className="absolute bottom-16 right-6 w-80 bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl rounded-2xl p-4 border border-gray-300 animate-fade-in-up">
                    <h2 className="text-lg font-semibold text-gray-900">Chatbot</h2>

                    {/* Pertanyaan yang bisa diklik */}
                    <div className="max-h-24 overflow-y-auto mt-2 space-y-2">
                        {randomQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => handleSend(question)}
                                className="block w-full text-left bg-gray-200 text-gray-900 p-2 rounded-lg hover:bg-yellow-500 hover:text-white transition-all"
                            >
                                {question}
                            </button>
                        ))}
                    </div>

                    <div className="h-64 overflow-y-auto border p-2 bg-gray-50 rounded-lg mt-2">
                        {chat.map((msg, index) => (
                            <div key={index} className="mb-3">
                                <p className="font-semibold text-white bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-lg inline-block">
                                    {msg.user}
                                </p>
                                <p className="text-gray-800 bg-gray-300 p-2 rounded-lg inline-block mt-1">
                                    {msg.bot}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex border rounded-full overflow-hidden shadow-md">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Tanyakan sesuatu..."
                            className="flex-1 p-3 text-gray-900 outline-none bg-white placeholder-gray-500"
                        />
                        <button
                            onClick={() => handleSend()}
                            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-4 py-3 hover:opacity-90 transition-all duration-300 flex items-center justify-center"
                        >
                            <PaperPlaneRight size={20} weight="bold" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
