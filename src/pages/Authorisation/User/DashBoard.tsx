import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { useEffect, useState } from "react";
import Picture from "../components/Picture";
import { myData } from "@/actions/auth";
import { setCredentials } from "@/features/auth/authSlice";

export const DashBoard = () => {
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
        <div className="flex flex-col justify-center items-center  min-h-screen bg-gray-100">
            <div className="">
                <h3 className="text-3xl text-center font-bold py-10 text-gray-600">
                    {user?.firstName} {user?.lastName}
                </h3>
                <Picture user={user ?? {}} size={250} />
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