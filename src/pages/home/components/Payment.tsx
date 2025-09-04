const Payment=()=> {
    return (
        <section id="payment" className="py-16 px-6 bg-gray-100">
            <h2 className="text-2xl font-bold text-center mb-8">
                Payments &amp; Wallet Features
            </h2>

            <div className="max-w-2xl mx-auto text-lg text-gray-700">
                <p>
                    Experience smooth, transparent payments with{" "}
                    <strong className="font-semibold text-gray-900">
                        Razorpay
                    </strong>{" "}
                    and{" "}
                    <strong className="font-semibold text-gray-900">
                        Paygic
                    </strong>{" "}
                    integrated.
                </p>

                <ul className="mt-6 list-none space-y-3">
                    <li>🔹 Instant top-ups via Razorpay or Paygic</li>
                    <li>🔹 Flexible withdrawals for consultants</li>
                    <li>🔹 Real-time balance and history tracking</li>
                    <li>🔹 Automatic per-minute billing during calls</li>
                    <li>🔹 Low balance alerts &amp; payment confirmations</li>
                </ul>
            </div>
        </section>
    );
}
export default Payment;