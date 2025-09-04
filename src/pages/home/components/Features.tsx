import {
    FaVideo,
    FaShieldAlt,
    FaDownload,
    FaBolt,
    FaWallet,
} from "react-icons/fa";

const Features= () => {
    const features = [
        {
            icon: <FaVideo className="text-3xl text-blue-600 mb-3" />,
            title: "HD Video & Audio",
            desc: "Crystal-clear calls for uninterrupted communication.",
        },
        {
            icon: <FaShieldAlt className="text-3xl text-blue-600 mb-3" />,
            title: "Secure & Private",
            desc: "End-to-end encryption ensures your conversations remain confidential.",
        },
        {
            icon: <FaDownload className="text-3xl text-blue-600 mb-3" />,
            title: "No Downloads Needed",
            desc: "Join sessions directly from your browser — zero installations.",
        },
        {
            icon: <FaBolt className="text-3xl text-blue-600 mb-3" />,
            title: "Per-Minute Charging",
            desc: "Pay only for the time you spend talking to consultants.",
        },
        {
            icon: <FaWallet className="text-3xl text-blue-600 mb-3" />,
            title: "Real-Time Wallet",
            desc: "Instant top-ups, withdrawals, and live transaction tracking.",
        },
    ];

    return (
        <section id="features" className="py-16 px-6 bg-gray-50 text-center">
            <h2 className="text-4xl max-md:text-2xl  mb-10">Why Choose Sawamahe?</h2>
            <div className=" gap-4 flex-row flex flex-wrap justify-center ">
                {features.map((f, i) => (
                    <div
                        key={i}
                        className="bg-white max-w-72 p-8 flex flex-col items-center rounded-xl shadow-md hover:-translate-y-2 transition-transform duration-300 text-center"
                    >
                        {f.icon}
                        <h3 className="text-xl font-semibold mb-2">
                            {f.title}
                        </h3>
                        <p className="text-gray-600">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Features;