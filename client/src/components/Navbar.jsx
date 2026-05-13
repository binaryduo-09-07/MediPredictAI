import { Activity } from "lucide-react";

function Navbar() {

    return (

        <nav
            className="
                fixed
                top-0
                left-0
                w-full
                z-50
                backdrop-blur-xl
                bg-black/20
                border-b
                border-cyan-400/10
            "
        >

            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-6
                    py-5
                    flex
                    justify-between
                    items-center
                "
            >

                <div className="flex items-center gap-3">

                    <Activity
                        className="
                            text-cyan-400
                            w-8
                            h-8
                        "
                    />

                    <h1
                        className="
                            text-2xl
                            font-black
                            text-cyan-400
                        "
                    >
                        MediPredictAI
                    </h1>

                </div>

                <div className="flex gap-8 text-gray-300">

                    <a
                        href="#features"
                        className="hover:text-cyan-400 transition-all"
                    >
                        Features
                    </a>

                    <a
                        href="#symptoms"
                        className="hover:text-cyan-400 transition-all"
                    >
                        Diagnosis
                    </a>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;