import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import Upperheader from "../../UpperHeader/upperheader";
import "./Chatbot.css";

function Chatbot() {

  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Chatbot! Ask me anything about your Health!",
      sentTime: "just now",
      sender: "Chatbot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GOOGLE_API_KEY}`;

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToGeminiAPI(newMessages);
  };

  async function processMessageToGeminiAPI(chatMessages) {
    const userMessage = chatMessages[chatMessages.length - 1].message;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: userMessage,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand that.";

      setMessages([
        ...chatMessages,
        {
          message: botReply,
          sender: "Chatbot",
        },
      ]);
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      setMessages([
        ...chatMessages,
        {
          message: "Sorry, something went wrong. Please try again later.",
          sender: "Chatbot",
        },
      ]);
    }

    setIsTyping(false);
  }

  return (
    <div className="chatbot-wrapper">
      <Upperheader title="ChatBot" name={username} />
      <div className="chatbot-container">
        <MainContainer className="MainContainer">
          <ChatContainer className="ChatContainer">
            <MessageList
              className="MessageList"
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator
                    className="TypingIndicator"
                    content="Chatbot is typing..."
                  />
                ) : null
              }
            >
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`Message ${
                    message.sender === "user" ? "user" : "chatbot"
                  }`}
                >
                  <div
                    className={`avatar ${
                      message.sender === "user" ? "user-avatar" : "chatbot-avatar"
                    }`}
                  ></div>
                  <div className="message-content">{message.message}</div>
                </div>
              ))}
            </MessageList>
            <MessageInput
              className="MessageInput"
              placeholder="Type message here"
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chatbot;
