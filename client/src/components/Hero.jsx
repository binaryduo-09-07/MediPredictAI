import { motion } from "framer-motion";

function Hero() {

    return (

        <section
            className="
                min-h-screen
                flex
                items-center
                justify-center
                relative
                overflow-hidden
                px-6
            "
        >

            <div
                className="
                    absolute
                    top-0
                    left-0
                    w-[500px]
                    h-[500px]
                    bg-cyan-500/20
                    blur-[140px]
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
                    blur-[140px]
                    rounded-full
                "
            />

            <motion.div

                initial={{
                    opacity: 0,
                    y: 50,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                transition={{
                    duration: 1,
                }}

                className="
                    text-center
                    relative
                    z-10
                    max-w-5xl
                "
            >

                <h1
                    className="
                        text-6xl
                        md:text-8xl
                        font-black
                        leading-tight
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-500
                        bg-clip-text
                        text-transparent
                    "
                >
                    AI-Powered
                    <br />
                    Healthcare Intelligence
                </h1>

                <p
                    className="
                        text-gray-400
                        text-xl
                        mt-8
                        leading-9
                    "
                >
                    Predict diseases using Machine Learning,
                    symptom analysis,
                    and Generative AI-powered healthcare assistance.
                </p>

                <a
                    href="#symptoms"
                >

                    <button
                        className="
                            mt-12
                            px-10
                            py-5
                            rounded-3xl
                            bg-gradient-to-r
                            from-cyan-400
                            to-blue-500
                            text-black
                            font-black
                            text-xl
                            shadow-2xl
                            shadow-cyan-500/30
                            hover:scale-105
                            transition-all
                        "
                    >
                        Start Diagnosis
                    </button>

                </a>

            </motion.div>

        </section>
    );
}

export default Hero;