import { useState } from "react";

export default function App() {
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState(null); // true | false | null
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    if (mobile.length !== 10) {
      setStatus(null);
      setMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("https://grocery.offershubs.in/send-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ mobile })
      });

      const data = await res.json(); // true / false
      setStatus(data);

      if (data === true) {
        setMessage("Registered user");
      } else {
        setMessage("Not registered");
      }
    } catch (err) {
      setStatus(null);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Mobile Verification
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Enter your mobile number to continue
        </p>

        {/* Input */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="10-digit mobile number"
            value={mobile}
            maxLength={10}
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, ""))
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={sendOtp}
          disabled={loading || mobile.length !== 10}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Checking..." : "Continue"}
        </button>

        {/* Result */}
        {message && (
          <div
            className={`mt-5 rounded-lg px-4 py-3 text-center font-medium
              ${
                status === true
                  ? "bg-green-100 text-green-700"
                  : status === false
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            `}
          >
            {status === true && "✅ "}
            {status === false && "❌ "}
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
