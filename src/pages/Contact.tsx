import { useState } from "react";
import axios from "axios";
import configuration from "@/config/configuration";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";


export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${configuration.url}/api/contact/create`,
                form
            );
            if (data.success) {
                setForm({ name: "", email: "", message: "" });
                toast.success("Message sent successfully!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to send message.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <div className="flex flex-1 justify-center items-center py-12 px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        Contact Us
                    </h2>
                    <p className="text-gray-500 mb-6 text-sm md:text-base">
                        We love to hear from you. Fill out the form below to get
                        in touch.
                    </p>

                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition resize-y"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
