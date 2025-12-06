import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { TextStreamChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { MemoizedMarkdown } from "./MemoizedMarkdown";
import "../styles/chatbot.css";

export default function ChatBot() {
	const [isOpen, setIsOpen] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const [input, setInput] = useState("");

	const { messages, sendMessage, status } = useChat({
		transport: new TextStreamChatTransport({
			api: "/api/chat",
		}),
		messages: [
			{
				id: "welcome",
				role: "assistant",
				parts: [
					{
						type: "text",
						text: "👋 Halo! Saya asisten AI untuk portfolio Fitra. Saya bisa membantu Anda mengetahui tentang project-project yang telah dikerjakan Fitra, skill yang dimiliki, atau artikel yang ditulis. Ada yang ingin ditanyakan?",
					},
				],
			},
		],
	});

	const isLoading = status === "streaming" || status === "submitted";

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const toggleChat = () => {
		setIsOpen(!isOpen);
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (input.trim()) {
			sendMessage({ text: input });
			setInput("");
		}
	};

	const suggestedQuestions = [
		"Apa saja project yang pernah dikerjakan?",
		"Skill apa yang dimiliki Fitra?",
		"Ceritakan tentang project Seorangabi",
		"Artikel apa saja yang pernah ditulis?",
	];

	const handleSuggestedQuestion = (question: string) => {
		sendMessage({ text: question });
	};

	return (
		<div className="chatbot-container">
			{/* Chat Toggle Button */}
			<button
				type="button"
				onClick={toggleChat}
				className={`chatbot-toggle ${isOpen ? "open" : ""}`}
				aria-label="Toggle chat"
			>
				{isOpen ? (
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Close chat</title>
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				) : (
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Open chat</title>
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
					</svg>
				)}
			</button>

			{/* Chat Window */}
			{isOpen && (
				<div className="chatbot-window">
					<div className="chatbot-header">
						<div className="chatbot-header-content">
							<div className="chatbot-avatar">🤖</div>
							<div>
								<h3>Portfolio Assistant</h3>
								<p>Tanyakan tentang Fitra & Projects</p>
							</div>
						</div>
					</div>

					<div className="chatbot-messages">
						{messages.map((message: UIMessage, index: number) => (
							<div
								key={message.id || index}
								className={`message ${message.role === "user" ? "message-user" : "message-assistant"}`}
							>
								<div className="message-content">
									{message.role === "assistant" && (
										<div className="message-avatar">🤖</div>
									)}
									<div className="message-text">
										{message.parts.map((part) => {
											if (part.type === "text") {
												return (
													<MemoizedMarkdown
														key={`${message.id}-text`}
														id={message.id}
														content={part.text}
													/>
												);
											}
										})}
									</div>
									{message.role === "user" && (
										<div className="message-avatar message-avatar-user">👤</div>
									)}
								</div>
							</div>
						))}

						{isLoading && (
							<div className="message message-assistant">
								<div className="message-content">
									<div className="message-avatar">🤖</div>
									<div className="message-text">
										<div className="typing-indicator">
											<span />
											<span />
											<span />
										</div>
									</div>
								</div>
							</div>
						)}

						{messages.length === 1 && !isLoading && (
							<div className="suggested-questions">
								<p className="suggested-label">Contoh pertanyaan:</p>
								{suggestedQuestions.map((question) => (
									<button
										type="button"
										key={question}
										onClick={() => handleSuggestedQuestion(question)}
										className="suggested-question"
									>
										{question}
									</button>
								))}
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>

					<form onSubmit={handleFormSubmit} className="chatbot-input-form">
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Ketik pertanyaan Anda..."
							disabled={isLoading}
							className="chatbot-input"
						/>
						<button
							type="submit"
							disabled={isLoading || !input.trim()}
							className="chatbot-send-button"
							aria-label="Send message"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Send</title>
								<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
							</svg>
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
