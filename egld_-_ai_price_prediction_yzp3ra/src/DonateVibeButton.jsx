import React, { useState } from "react";

// MultiversX web wallet URL and token details
const WALLET_URL = "https://wallet.multiversx.com";
const TOKEN_ID = "VIBEOX-d0e9a9";
const DONATION_AMOUNT = 0.5; // 0.5 VIBE
const TOKEN_DECIMALS = 18;
const RECEIVER = "erd19rh60fsqaay27cs4t29us0kwpr5745gynrdflzdvug8uvygjr4sqlnvduj"; // TODO: Replace with your address

function getTxUrl({ receiver, amount, tokenId, decimals }) {
  // MultiversX web wallet transfer URL for ESDT tokens
  const value = (amount * 10 ** decimals).toLocaleString("fullwide", { useGrouping: false });
  const data = `ESDTTransfer@${Buffer.from(tokenId).toString("hex")}@${parseInt(value).toString(16)}`;
  return `${WALLET_URL}/send?receiver=${receiver}&data=${data}`;
}

export default function DonateVibeButton() {
  const [loading, setLoading] = useState(false);

  const handleDonate = () => {
    setLoading(true);
    // Open MultiversX wallet with prefilled tx
    const url = getTxUrl({
      receiver: RECEIVER,
      amount: DONATION_AMOUNT,
      tokenId: TOKEN_ID,
      decimals: TOKEN_DECIMALS
    });
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <button
      onClick={handleDonate}
      disabled={loading}
      style={{
        marginTop: "2.2rem",
        background: "#1de9b6",
        color: "#0a0f1c",
        border: "2px solid #1de9b6",
        borderRadius: "14px",
        padding: "0.6rem 1.5rem",
        fontWeight: 800,
        fontSize: "1.1rem",
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: "0 0 8px #1de9b6cc",
        transition: "all 0.15s"
      }}
    >
      {loading ? "Redirecting..." : "👍 Like the prediction – donate VIBE"}
    </button>
  );
}
