import { useState } from "react";

export default function Home() {
  const [tab, setTab] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>

      <h2>HR Assistant</h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setTab("chat")}>Chat</button>
        <button onClick={() => setTab("leave")}>Leave Policy</button>
        <button onClick={() => setTab("onboarding")}>Onboarding</button>
        <button onClick={() => setTab("claims")}>Claims</button>
        <button onClick={() => setTab("maternity")}>Maternity</button>
      </div>

      {/* TAB CONTENT */}

      {tab === "chat" && (
        <>
          <div style={{ height: 300, overflowY: "auto", border: "1px solid #ddd", padding: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                textAlign: m.role === "user" ? "right" : "left",
                margin: 8,
                background: m.role === "user" ? "#DCF8C6" : "#eee",
                padding: 10,
                borderRadius: 10
              }}>
                {m.text}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", marginTop: 10 }}>
            <input
              style={{ flex: 1, padding: 10 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask HR..."
            />
            <button onClick={send}>Send</button>
          </div>
        </>
      )}

      {tab === "leave" && <p>12 PL | 6 SL | 6 CL. Apply 7 days in advance.</p>}
      {tab === "onboarding" && <p>Get credentials → Complete profile → Meet manager.</p>}
      {tab === "claims" && <p>Submit claims via HRMS before 20th with invoice.</p>}
      {tab === "maternity" && <p>26 weeks maternity leave (paid).</p>}

    </div>
  );
}
