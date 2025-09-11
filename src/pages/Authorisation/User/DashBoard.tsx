import { useAppSelector } from "@/hooks/useDispatch";
import { useEffect, useState } from "react";
import Picture from "../components/Picture";
import { myData } from "@/actions/auth";

export const DashBoard = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [info, setInfo] = useState({firstName:"", lastName:"" });

    useEffect(() => {
        const fetchData = async () => {
            const result = await myData();
            setInfo(result.data);
        };
        fetchData();
    }, []);
    console.log(info);
    
    return (
        <div className="flex flex-col justify-center items-center  min-h-screen bg-gray-100">
            <div className="">
                <h3 className="text-3xl text-center font-bold py-10 text-gray-600">{info?.firstName}  {info?.lastName}</h3>
                <Picture user={info} size={300} />
            </div>
            <div className=" my-20 max-w-md mx-auto text-center">
                <p className="text-gray-700">
                    Search for someone to start a conversation,
                    <br />
                    Add contacts to your favorites to reach them faster.
                </p>
            </div>
        </div>
    );
};