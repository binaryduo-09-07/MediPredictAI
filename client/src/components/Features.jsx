import {
    Brain,
    Activity,
    ShieldCheck,
} from "lucide-react";

function Features() {

    const features = [

        {
            icon: <Brain />,
            title: "AI Disease Prediction",
            desc: "Machine Learning powered disease prediction system.",
        },

        {
            icon: <Activity />,
            title: "Symptom Analysis",
            desc: "Advanced symptom intelligence with real-time analysis.",
        },

        {
            icon: <ShieldCheck />,
            title: "AI Care Plan",
            desc: "Generative AI-powered healthcare guidance system.",
        },
    ];

    return (

        <section
            id="features"
            className="
                py-24
                px-6
            "
        >

            <div className="max-w-7xl mx-auto">

                <h2
                    className="
                        text-5xl
                        font-black
                        text-center
                        text-cyan-400
                        mb-20
                    "
                >
                    Platform Features
                </h2>

                <div
                    className="
                        grid
                        md:grid-cols-3
                        gap-10
                    "
                >

                    {
                        features.map((feature, index) => (

                            <div
                                key={index}

                                className="
                                    p-8
                                    rounded-3xl
                                    bg-white/5
                                    border
                                    border-cyan-400/10
                                    backdrop-blur-xl
                                    hover:border-cyan-400/40
                                    transition-all
                                "
                            >

                                <div
                                    className="
                                        text-cyan-400
                                        mb-5
                                    "
                                >
                                    {feature.icon}
                                </div>

                                <h3
                                    className="
                                        text-2xl
                                        font-bold
                                        mb-4
                                    "
                                >
                                    {feature.title}
                                </h3>

                                <p className="text-gray-400 leading-8">
                                    {feature.desc}
                                </p>

                            </div>
                        ))
                    }

                </div>

            </div>

        </section>
    );
}

export default Features;