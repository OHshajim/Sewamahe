import { myData } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { setCredentials } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { MonetizationPopup } from "./components/MonetizationPopup";
import getWebsiteInfo from "@/actions/getWebsiteInfo";
import { useNavigate } from "react-router-dom";
import TopUp from "./components/TopUp";

export default function Monetization () {
    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate()
    const [info, setInfo] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const [websiteInfo, setWebsiteInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();
    const topup = import.meta.env.VITE_TOP_UP;
    useEffect(() => {
        const fetchData = async () => {
            const result = await myData();
            if (result?.data) {
                setInfo(result.data)
                dispatch(setCredentials(result.data));
            }
        };
        fetchData();
    }, [ user._id, refetch]);

    useEffect(() => {
        getWebsiteInfo().then(({ data }) => {
            setWebsiteInfo(data.data)
        });
    }, [refetch]);
    
    return (
        <div className=" min-h-screen h-full">
            <div className="bg-white h-14 flex items-center px-4">
                <button
                    className="text-xl md:hidden"
                    onClick={() =>{navigate("/dashboard",{replace:true})} }
                >
                    <FiArrowLeft />
                </button>
            </div>
            <div className="flex flex-col justify-center items-center h-full bg-gray-100">
                <div className="shadow-lg bg-white p-8 rounded-lg space-y-10">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="text-[#1e87f0] text-3xl max-md:text-xl font-bold mb-2">
                            Call & Video Call Rate
                        </h1>
                        <p className=" text-[#666666] mb-4 text-center">
                            Enjoy secure and clear communication at a flat rate.
                        </p>
                        <h3 className="text-[#1e87f0] font-semibold text-xl">
                            <span>₹</span>
                            <span>{websiteInfo?.rechargeAmount || topup}</span>
                        </h3>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h4 className="font-medium">Your Current Balance</h4>
                        <h3 className="text-[#27ae60] font-bold text-2xl max-md:text-xl">
                            <span>₹</span>
                            <span>
                                {(
                                    parseFloat(`${user?.balance?.amount}`) || 0
                                ).toFixed(2)}
                            </span>
                        </h3>
                        <div className="flex justify-center gap-3">
                            <TopUp
                                rechargeAmount={websiteInfo?.rechargeAmount || parseFloat(topup)}
                                refetch={refetch}
                                setRefetch={setRefetch}
                                paymentMethod={websiteInfo?.paymentMethod}
                            />
                            <Button
                                className="bg-[#086e05ff] hover:bg-[#086e05d5]  text-white cursor-pointer rounded-md"
                                onClick={() => setShowModal(true)}
                            >
                                Withdraw
                            </Button>
                        </div>
                    </div>
                    <div className="shadow-lg bg-white p-8 rounded-lg space-y-3">
                        <h3 className="mb-3 text-xl text-center">
                            Transaction History
                        </h3>

                        {info?.history?.length ? (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {info.history
                                    .sort(
                                        (a, b) =>
                                            new Date(b.createdAt).getTime() -
                                            new Date(a.createdAt).getTime()
                                    )
                                    .map((tx, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between items-center border p-3 rounded"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {tx.historyType} via{" "}
                                                    {tx.paymentMethod}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {tx.account}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {new Date(
                                                        tx.createdAt
                                                    ).toLocaleString()}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p
                                                    className={`font-bold ${
                                                        tx.historyType ===
                                                        "top-up"
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }`}
                                                >
                                                    {tx.historyType === "top-up"
                                                        ? "+"
                                                        : "-"}
                                                    ₹{tx.amount}
                                                </p>
                                                <span className="text-xs px-2 py-1 rounded bg-gray-200">
                                                    {tx.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-400">
                                No transaction history available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {showModal && (
                <MonetizationPopup
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    info={info}
                    refetch={refetch}
                    setRefetch={setRefetch}
                    websiteInfo={websiteInfo}
                    setShowModal={setShowModal}
                />
            )}
        </div>
    );
};