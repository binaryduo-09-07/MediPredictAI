import { useState } from "react";
import symptoms from "../data/symptoms";
import API from "../services/api";

import {
    Activity,
    Brain,
    ShieldAlert,
} from "lucide-react";

import { motion } from "framer-motion";

function SymptomGrid() {

    const [selectedSymptoms, setSelectedSymptoms] =
        useState([]);

    const [prediction, setPrediction] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const toggleSymptom = (symptom) => {

        if (selectedSymptoms.includes(symptom)) {

            setSelectedSymptoms(
                selectedSymptoms.filter(
                    (item) => item !== symptom
                )
            );

        } else {

            setSelectedSymptoms([
                ...selectedSymptoms,
                symptom,
            ]);
        }
    };

    const handlePrediction = async () => {

        setLoading(true);

        try {

            const response = await API.post(
                "/predict",
                {
                    symptoms: selectedSymptoms,
                }
            );

            setPrediction(response.data);

        } catch (error) {

            console.log(error);

        }

        setLoading(false);
    };

    return (
        <div
            id="symptoms"
            className="
        min-h-screen
        px-6
        py-20
        relative
        overflow-hidden
    "
        >

            {/* Background Glow */}

            <div
                className="
                    absolute
                    top-0
                    left-0
                    w-[500px]
                    h-[500px]
                    bg-cyan-500/20
                    blur-[150px]
                    rounded-full
                "
            />

            <div
                className="
                    absolute
                    bottom-0
                    right-0
                    w-[400px]
                    h-[400px]
                    bg-blue-500/20
                    blur-[150px]
                    rounded-full
                "
            />

            {/* Header */}

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center mb-16 relative z-10"
            >

                <h1
                    className="
                        text-6xl
                        md:text-8xl
                        font-black
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-500
                        bg-clip-text
                        text-transparent
                    "
                >
                    MediPredictAI
                </h1>

                <p
                    className="
                        text-gray-400
                        mt-6
                        text-xl
                        max-w-3xl
                        mx-auto
                    "
                >
                    AI-Powered Healthcare Intelligence Platform
                    using Machine Learning and Generative AI
                </p>

            </motion.div>

            {/* Search */}

            <div className="max-w-2xl mx-auto mb-12 relative z-10">

                <input
                    type="text"
                    placeholder="Search symptoms..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                    className="
                        w-full
                        p-5
                        rounded-3xl
                        bg-white/5
                        border
                        border-cyan-400/20
                        text-white
                        outline-none
                        backdrop-blur-xl
                        focus:border-cyan-400
                        transition-all
                    "
                />

            </div>

            {/* Selected Count */}

            <div className="text-center mb-12 relative z-10">

                <span
                    className="
                        px-6
                        py-3
                        rounded-full
                        bg-cyan-500/10
                        border
                        border-cyan-400/20
                        text-cyan-300
                        font-bold
                        backdrop-blur-xl
                    "
                >
                    {selectedSymptoms.length}
                    {" "}
                    Symptoms Selected
                </span>

            </div>

            {/* Symptom Grid */}

            <div
                className="
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-8
                    max-w-7xl
                    mx-auto
                    relative
                    z-10
                "
            >

                {symptoms
                    .filter((symptom) =>
                        symptom.name
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )
                    )
                    .map((symptom) => {

                        const active =
                            selectedSymptoms.includes(
                                symptom.name
                            );

                        return (

                            <motion.div
                                key={symptom.id}

                                whileHover={{
                                    scale: 1.05,
                                    y: -8,
                                }}

                                whileTap={{
                                    scale: 0.95,
                                }}

                                onClick={() =>
                                    toggleSymptom(
                                        symptom.name
                                    )
                                }

                                className={`
                                    p-6
                                    rounded-3xl
                                    cursor-pointer
                                    border
                                    transition-all
                                    duration-300
                                    backdrop-blur-xl
                                    relative
                                    overflow-hidden

                                    ${active
                                        ? `
                                            bg-cyan-500/20
                                            border-cyan-400
                                            shadow-2xl
                                            shadow-cyan-500/20
                                        `
                                        : `
                                            bg-white/5
                                            border-white/10
                                            hover:border-cyan-400/40
                                        `
                                    }
                                `}
                            >

                                <div
                                    className="
                                        text-5xl
                                        mb-4
                                    "
                                >
                                    {symptom.emoji}
                                </div>

                                <h2
                                    className="
                                        text-xl
                                        font-bold
                                        text-white
                                    "
                                >
                                    {symptom.name}
                                </h2>

                            </motion.div>
                        );
                    })}
            </div>

            {/* Predict Button */}

            <div className="flex justify-center mt-16 relative z-10">

                <motion.button

                    whileHover={{
                        scale: 1.05,
                    }}

                    whileTap={{
                        scale: 0.95,
                    }}

                    onClick={handlePrediction}

                    disabled={
                        selectedSymptoms.length === 0
                    }

                    className="
                        px-12
                        py-5
                        rounded-3xl
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-500
                        hover:opacity-90
                        disabled:opacity-40
                        text-black
                        font-black
                        text-xl
                        shadow-2xl
                        shadow-cyan-500/30
                        transition-all
                    "
                >

                    {
                        loading
                            ? "Analyzing..."
                            : "Predict Disease"
                    }

                </motion.button>

            </div>

            {/* Result */}

            {
                prediction && (

                    <motion.div

                        initial={{
                            opacity: 0,
                            y: 40,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        className="
                            max-w-4xl
                            mx-auto
                            mt-20
                            p-10
                            rounded-3xl
                            bg-white/5
                            border
                            border-cyan-400/20
                            backdrop-blur-2xl
                            relative
                            z-10
                        "
                    >

                        <h2
                            className="
                                text-5xl
                                font-black
                                text-cyan-400
                                mb-10
                                text-center
                            "
                        >
                            Diagnosis Result
                        </h2>

                        <div className="space-y-8">

                            <div className="flex items-center gap-4">

                                <Activity
                                    className="text-cyan-400"
                                />

                                <span className="text-gray-400">
                                    Disease:
                                </span>

                                <span className="font-bold text-2xl">
                                    {prediction.disease}
                                </span>

                            </div>

                            <div className="flex items-center gap-4">

                                <Brain
                                    className="text-cyan-400"
                                />

                                <span className="text-gray-400">
                                    Confidence:
                                </span>

                                <span className="font-bold text-cyan-300 text-2xl">
                                    {prediction.confidence}%
                                </span>

                            </div>

                            <div
                                className="
                                    mt-10
                                    p-8
                                    rounded-3xl
                                    bg-cyan-500/10
                                    border
                                    border-cyan-400/20
                                "
                            >

                                <div className="flex items-center gap-3 mb-5">

                                    <ShieldAlert
                                        className="text-cyan-400"
                                    />

                                    <h3
                                        className="
                                            text-3xl
                                            font-bold
                                            text-cyan-300
                                        "
                                    >
                                        AI Care Plan
                                    </h3>

                                </div>

                                <div
                                    className="
                                        whitespace-pre-line
                                        text-gray-300
                                        leading-8
                                    "
                                >
                                    {prediction.care_plan}
                                </div>

                            </div>

                        </div>

                    </motion.div>
                )
            }

        </div>
    );
}

export default SymptomGrid;