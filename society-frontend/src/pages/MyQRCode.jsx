import React, { useEffect, useState } from "react";
import api from "../api";

const MyQRCode = () => {
  const [qr, setQr] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const res = await api.get("/visitors/generate");
        setQr(res.data.qr); // base64 image
      } catch (err) {
        setError("Failed to fetch QR");
      }
    };

    fetchQR();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4">Your QR Code</h2>
      {error && <p className="text-red-600">{error}</p>}
      {qr ? (
        <img src={qr} alt="QR Code" className="w-64 h-64 border p-2" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyQRCode;
