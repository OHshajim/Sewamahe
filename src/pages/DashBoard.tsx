import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { useEffect } from "react";
import Picture from "../components/Picture";
import { myData } from "@/actions/auth";
import { setCredentials } from "@/features/auth/authSlice";
import { FiArrowLeft } from "react-icons/fi";

export const DashBoard = ({ isHome, setisHome }) => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const result = await myData();
            if (result?.data) {
                dispatch(setCredentials(result.data));
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className={` h-screen ${isHome ? "" : " max-md:hidden"}`}>
            <div className="bg-white h-14 flex items-center px-4">
                <button className="text-xl md:hidden" onClick={()=>setisHome(false)}>
                    <FiArrowLeft />
                </button>
            </div>
            <div className="flex flex-col justify-center items-center h-full bg-gray-100">
                <div className="flex flex-col items-center">
                    <h3 className="text-3xl text-center font-bold py-10 text-gray-500">
                        {user?.firstName} {user?.lastName}
                    </h3>
                    <Picture user={user ?? {}} size={120} />
                </div>
                <div className="my-20 max-w-md mx-auto text-center">
                    <p className="text-gray-700 text-sm">
                        Search for someone to start a conversation,
                        <br />
                        Add contacts to your favorites to reach them faster.
                    </p>
                </div>
            </div>
        </div>
    );
};