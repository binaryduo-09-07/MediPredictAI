import { useState } from "react";

import API from "../services/api";

function ChatDoctor() {

    const [message, setMessage] =
        useState("");

    const [chat, setChat] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [displayedText, setDisplayedText] =
        useState("");

    const [loadingStage, setLoadingStage] =
        useState("");

    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMessage = {

            type: "user",

            text: message,
        };

        setChat((prev) => [

            ...prev,

            userMessage,
        ]);

        setMessage("");

        setLoading(true);

        const stages = [

            "Analyzing symptoms...",

            "Checking medical patterns...",

            "Generating healthcare insights...",

            "Preparing AI response...",
        ];

        let index = 0;

        setLoadingStage(
            stages[0]
        );

        const interval = setInterval(() => {

            index =
                (index + 1)
                % stages.length;

            setLoadingStage(
                stages[index]
            );

        }, 1200);

        try {

            const response =
                await API.post(
                    "/chat",
                    {
                        message:
                            userMessage.text,

                        history: chat,
                    }
                );

            const fullText =
                response.data.reply;

            let currentText = "";

            for (
                let i = 0;
                i < fullText.length;
                i++
            ) {

                currentText += fullText[i];

                setDisplayedText(
                    currentText
                );

                await new Promise(
                    (resolve) =>
                        setTimeout(
                            resolve,
                            15
                        )
                );
            }

            const aiMessage = {

                type: "ai",

                text: fullText,
            };

            setChat((prev) => [

                ...prev,

                aiMessage,
            ]);

            setDisplayedText("");

        } catch (error) {

            console.log(error);

        } finally {

            clearInterval(interval);

            setLoading(false);

            setLoadingStage("");
        }
    };

    return (

        <div
            className="
                max-w-4xl
                mx-auto
                mt-24
                px-6
            "
        >

            <h1
                className="
                    text-5xl
                    font-black
                    text-cyan-400
                    text-center
                    mb-10
                "
            >
                AI Doctor
            </h1>

            <div
                className="
                    bg-white/5
                    border
                    border-cyan-400/20
                    rounded-3xl
                    p-6
                    h-[500px]
                    overflow-y-auto
                    space-y-5
                "
            >

                {chat.map((msg, index) => (

                    <div
                        key={index}

                        className={`
                            p-4
                            rounded-2xl
                            whitespace-pre-wrap
                            max-w-[80%]

                            ${msg.type === "user"
                                ? "bg-cyan-500 text-black ml-auto"
                                : "bg-white/10 text-white"
                            }
                        `}
                    >

                        {msg.text}

                    </div>
                ))}

                {loading && (

                    <div
                        className="
                            bg-white/10
                            text-white
                            p-4
                            rounded-2xl
                            w-fit
                            whitespace-pre-wrap
                        "
                    >

                        {loadingStage}

                        <div className="mt-3">

                            {displayedText}

                        </div>

                        <span className="animate-pulse">
                            |
                        </span>

                    </div>
                )}

            </div>

            <div
                className="
                    flex
                    gap-4
                    mt-6
                "
            >

                <input
                    type="text"

                    value={message}

                    onChange={(e) =>
                        setMessage(
                            e.target.value
                        )
                    }

                    placeholder="Describe your symptoms..."

                    className="
                        flex-1
                        p-4
                        rounded-2xl
                        bg-white/5
                        border
                        border-cyan-400/20
                        text-white
                        outline-none
                    "
                />

                <button
                    onClick={sendMessage}

                    className="
                        px-8
                        rounded-2xl
                        bg-cyan-500
                        hover:bg-cyan-400
                        text-black
                        font-bold
                    "
                >

                    Send

                </button>

            </div>

        </div>
    );
}

export default ChatDoctor;