import { FaUser, FaUserTie, FaUserShield } from "react-icons/fa";

const Rules=()=> {
    const roles = [
        {
            icon: <FaUser className="text-2xl text-blue-600" />,
            title: "User",
            desc: "Browse consultants, initiate calls, and pay per minute. Instant balance top-ups available anytime.",
        },
        {
            icon: <FaUserTie className="text-2xl text-blue-600" />,
            title: "Consultant",
            desc: "Offer professional services, set your rates, and withdraw your earnings instantly through secure gateways.",
        },
        {
            icon: <FaUserShield className="text-2xl text-blue-600" />,
            title: "Admin",
            desc: "Manage users and consultants, oversee transactions, and ensure the platform runs smoothly and securely.",
        },
    ];

    return (
        <section
            id="roles"
            className="py-16 px-6 bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] text-center"
        >
            <h2 className="text-3xl font-bold text-white mb-12">
                Our Three Roles
            </h2>

            <div className="grid gap-8 max-w-5xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
                {roles.map((role, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl p-8 shadow-md hover:-translate-y-2 hover:shadow-xl transition duration-300 text-center"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                            {role.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {role.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {role.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
export default Rules;