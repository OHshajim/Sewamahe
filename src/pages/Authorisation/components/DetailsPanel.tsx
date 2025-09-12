import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const DetailsPanel = ({ className = "" }) => {
    const selectedUser = null;

    const links = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms Of Use", path: "/terms" },
        { name: "Contact Us", path: "/contact" },
    ];

    if (!selectedUser) {
        return (
            <div
                className={`flex flex-col items-center justify-center h-full p-6 text-center ${className}`}
            >
                <div>
                    <img src="/logo.png" alt="Logo" className="max-w-xs  mb-4" />
                    <h2 className="text-base font-bold mb-2">
                        Welcome To Sewamahe{" "}
                    </h2>
                    <p className="text-muted-foreground">
                        Sewamahe is a messaging app that enables real-time messaging,
                        audio and video calls .
                    </p>
                </div>
                <div className="flex flex-col justify-end h-full text-sm space-y-1">
                    {links.map((l) => (
                        <Link to={l.path} key={l.path} className="text-primary hover:underline">
                            {l.name}
                        </Link>
                    ))}
                    <p className="pt-2">Copyright @Sewamahe <br/> v2.9.2</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`p-6 ${className}`}>
            <div className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src={selectedUser.photo} />
                    <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                <p className="text-muted-foreground">{selectedUser.about}</p>
            </div>
        </div>
    );
};

export default DetailsPanel;
