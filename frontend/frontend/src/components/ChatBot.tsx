import React, { useState, useRef, FormEvent, ChangeEvent } from "react";
import "../styles/ChatBot.css";

interface Link {
  url: string;
  text: string;
}

type MessageType = "user" | "bot";

interface Message {
  type: MessageType;
  text: string;
  links?: Link[];
}

const ChatBot: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const Backend = import.meta.env.VITE_BACKEND as string;

  // Dynamically adjust the height of the textarea
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  // Handle submit: add user message and start bot response
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    setAlert("");
    const userMessage: Message = { type: "user", text: query };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    let response = "";
    const socket = new WebSocket(`${Backend}/ask`);

    socket.onopen = () => {
      socket.send(JSON.stringify({ query }));
      // Add an initial empty bot message to update later
      setMessages(prev => [...prev, { type: "bot", text: "..." }]);
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);

      if (data.done) {
        if (data.error) {
          setAlert(data.error);
        }
        socket.close();
      } else {
        if (data.links) {
          const processedLinks: Link[] = data.links.map((link: string) => {
            let domain: string;
            try {
              domain = new URL(link).hostname;
            } catch {
              domain = link.replace(/^https?:\/\//, "").split("/")[0];
            }
            return { url: link, text: domain };
          });

          setMessages(prevMessages => {
            const msgs = [...prevMessages];
            const last = msgs[msgs.length - 1];
            if (last.type === "bot") {
              last.links = processedLinks;
            }
            return msgs;
          });
        } else {
          response += data.response;
          setMessages(prevMessages => {
            const msgs = [...prevMessages];
            const last = msgs[msgs.length - 1];
            if (last.type === "bot") {
              last.text = response;
            }
            return msgs;
          });
        }
      }
    };

    socket.onclose = () => {
      setLoading(false);
      setQuery("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    };

    // Clear query immediately
    setQuery("");
  };

  // Helper to render formatted text with bold markers
  const renderFormattedMessage = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIndex) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <div key={lineIndex}>
          {parts.map((part, partIndex) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <b key={partIndex}>{part.slice(2, -2)}</b>
            ) : (
              <span key={partIndex}>{part}</span>
            )
          )}
        </div>
      );
    });
  };

  return (
    <div className="page-container">
      <div className="Chat">
        <div className="Chatbox">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.type === "user" ? "user-message" : "bot-message"}
            >
              {msg.text.split("\n").map((para, i) => (
                <p key={i} style={{ margin: "0 0 0.5rem 0" }}>
                  {renderFormattedMessage(para)}
                </p>
              ))}
              {msg.links &&
                msg.links.map((link, i) => (
                  <p key={`link-${i}`}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.text}
                    </a>
                  </p>
                ))}
            </div>
          ))}
          {loading && <div className="bot-message">...</div>}
          {alert && <div className="bot-message">{alert}</div>}
        </div>
        <form className="Chat__form" onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            className="Chat__input"
            value={query}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <div className="Chat__button__submit_container">
            <button className="Chat__button__submit" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
