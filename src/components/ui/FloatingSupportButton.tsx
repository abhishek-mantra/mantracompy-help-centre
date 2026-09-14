import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Paperclip,
  Smile,
  FileText,
  RotateCcw,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  agentName?: string;
  agentAvatar?: string;
  text: string;
  timestamp: string;
  attachmentName?: string;
}

// Doodle background pattern identical to Bitrix24 live chat
const DOODLE_BG_DATA_URI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220" opacity="0.09"><g fill="none" stroke="%23043570" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="40" cy="40" r="18"/><text x="29" y="46" font-size="12" font-family="sans-serif" font-weight="bold" fill="%23043570" stroke="none">24</text><path d="M100 28h28v20h-28z"/><path d="M106 28v-6h16v6"/><path d="M170 24a16 16 0 0 1 16 16c0 8-5 12-8 16h-16c-3-4-8-8-8-16a16 16 0 0 1 16-16z"/><path d="M162 60h16"/><path d="M28 115h26v28H28z"/><path d="M34 110l7-11 7 11"/><path d="M95 100a20 20 0 1 0 26 0c-5 4-10 11-10 16h-9c0-5-5-12-10-16z"/><path d="M170 100c0 13-16 24-16 24s-16-11-16-24a16 16 0 1 1 32 0z"/><path d="M30 185c4 0 8 2 8 8v13H20v-13c0-6 4-8 8-8z"/><circle cx="35" cy="172" r="5"/><path d="M96 172h35v28H96z"/><path d="M104 181h20M104 190h15"/><path d="M170 172l16 16-6 6-16-16v-6z"/><circle cx="165" cy="194" r="8"/></g></svg>`;

const TEAM_AVATARS = [
  {
    name: "Gracy",
    isSilhouette: true,
    avatar: "",
  },
  {
    name: "AJ",
    isSilhouette: false,
    avatar: "/assets/images/agent-aj.jpg",
  },
  {
    name: "Lily",
    isSilhouette: false,
    avatar: "/assets/images/agent-lily.jpg",
  },
];

const EMOJIS = ["😊", "👍", "🙏", "❤️", "👋", "🚀", "💡", "🩺", "📋", "✅", "💬", "❓", "🔥", "🙌", "⭐", "🎉", "👏", "😃"];

export function FloatingSupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Focus textarea when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file.name);
      toast.success(`Attached "${file.name}"`);
    }
  };

  const handleAddEmoji = (emoji: string) => {
    setMessageInput((prev) => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const getSmartReply = (userQuery: string): string => {
    const lower = userQuery.toLowerCase();
    if (lower.includes("scribe") || lower.includes("ambient") || lower.includes("voice") || lower.includes("record")) {
      return "Mantra AI Scribe captures clinical dialogue and formats it into standard SOAP notes automatically. You can enable it directly inside any Patient Chart under the 'AI Scribe' tab.";
    }
    if (lower.includes("claim") || lower.includes("1500") || lower.includes("billing") || lower.includes("clearinghouse") || lower.includes("insurance")) {
      return "For CMS-1500 claims and billing, navigate to Bills Hub in MantraPractice. We support automated batch generation, EDI 837P exports, and direct clearinghouse transmission.";
    }
    if (lower.includes("intake") || lower.includes("form") || lower.includes("consent") || lower.includes("patient")) {
      return "Intake packets and consent forms can be customized in Settings > Intake Flows. Patients receive a secure mobile-friendly link and responses flow directly into their EHR chart.";
    }
    if (lower.includes("phone") || lower.includes("contact") || lower.includes("call") || lower.includes("email")) {
      return "Our team is available by phone at +1 (332) 331-8626 (Mon-Fri 8am-8pm EST) or by email at contact@mantrapractice.com.";
    }
    if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
      return "Hello! Thanks for reaching out to MantraPractice Support. How can our team assist with your practice, billing, or EHR workflows today?";
    }
    return "Thank you for reaching out! Our MantraPractice support team is online and reviewing your message. We'll be right with you.";
  };

  const handleSendMessage = () => {
    const text = messageInput.trim();
    if (!text && !attachedFile) return;

    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text || `[Attached file: ${attachedFile}]`,
      timestamp: timeString,
      attachmentName: attachedFile || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessageInput("");
    setAttachedFile(null);
    setShowEmojiPicker(false);
    setIsTyping(true);

    const respondingAgent = TEAM_AVATARS[1]; // AJ

    setTimeout(() => {
      setIsTyping(false);
      const replyText = getSmartReply(text);
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: "agent",
        agentName: respondingAgent.name,
        agentAvatar: respondingAgent.avatar,
        text: replyText,
        timestamp: replyTime,
      };

      setMessages((prev) => [...prev, agentMsg]);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    setMessageInput("");
    setAttachedFile(null);
  };

  return (
    <>
      {/* Floating Action Trigger Button (Bottom-Right Cyan Bubble) */}
      <aside aria-label="MantraPractice Live Chat" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative group size-16 rounded-full bg-[#00a4e4] hover:bg-[#0092cc] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#00a4e4]/30"
          title="MantraPractice Support — We are online"
          aria-label="Toggle MantraPractice Support Chat"
        >
          {/* Subtle radar wave */}
          <span className="absolute inset-0 rounded-full bg-[#00a4e4] animate-ping opacity-25 pointer-events-none" />

          {/* Chat Icon matching screenshot */}
          {isOpen ? (
            <X className="size-7 text-white transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="size-8 fill-white text-white transition-transform duration-200 group-hover:scale-110"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 9H7V9h10v2zm-4 4H7v-2h6v2zm4-8H7V5h10v2z" />
            </svg>
          )}
        </button>
      </aside>

      {/* MantraPractice Support Full Size Window (Taller & Wider matching screenshot) */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[460px] md:w-[480px] h-[680px] sm:h-[720px] max-h-[calc(100vh-7.5rem)] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 font-sans"
          role="dialog"
          aria-modal="true"
          aria-label="MantraPractice Support"
        >
          {/* Header Bar */}
          <div className="bg-[#00a4e4] text-white px-5 py-4 flex items-center justify-between shadow-xs select-none shrink-0">
            <div className="flex items-center gap-2">
              {/* Subtle top-left grip dashes matching Bitrix */}
              <div className="flex flex-col gap-0.5 opacity-60 mr-1">
                <div className="flex gap-0.5">
                  <span className="size-1 rounded-full bg-white" />
                  <span className="size-1 rounded-full bg-white" />
                </div>
                <div className="flex gap-0.5">
                  <span className="size-1 rounded-full bg-white" />
                  <span className="size-1 rounded-full bg-white" />
                </div>
              </div>
              <h2 className="text-[17px] font-semibold text-white tracking-tight">
                MantraPractice Support
              </h2>
            </div>

            <div className="flex items-center gap-1.5">
              {messages.length > 0 && (
                <button
                  onClick={handleResetChat}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
                  title="Clear chat"
                  aria-label="Clear chat"
                >
                  <RotateCcw className="size-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                aria-label="Close support"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Top Banner Section with Tall Doodle Area & 3 Avatars */}
          <div
            className="relative px-6 sm:px-8 pt-10 pb-8 bg-[#f8fbfe] border-b border-slate-100 select-none overflow-hidden shrink-0"
            style={{
              backgroundImage: `url('${DOODLE_BG_DATA_URI}')`,
              backgroundRepeat: "repeat",
            }}
          >
            {/* Heading text */}
            <div className="text-center relative z-10">
              <h3 className="text-2xl sm:text-[30px] font-bold text-[#3e4853] tracking-tight">
                We are online
              </h3>
              <p className="text-sm sm:text-base text-[#7e8790] mt-1.5 font-normal">
                and ready to help!
              </p>
            </div>

            {/* Avatars representation row with side chevrons */}
            <div className="relative z-10 flex items-center justify-between mt-8 sm:mt-9 px-1">
              {/* Left subtle chevron */}
              <div className="size-9 rounded-full bg-white/80 shadow-2xs border border-slate-200/60 flex items-center justify-center text-slate-300">
                <ChevronLeft className="size-5" />
              </div>

              {/* 3 Team Avatars: Gracy, AJ, Lily */}
              <div className="flex items-center justify-center gap-6 sm:gap-10">
                {TEAM_AVATARS.map((agent) => (
                  <div key={agent.name} className="flex flex-col items-center">
                    {agent.isSilhouette ? (
                      <div className="size-16 sm:size-18 rounded-full bg-[#525f6f] ring-4 ring-white shadow-md flex items-center justify-center text-white">
                        <User className="size-9 sm:size-10 text-white/95" />
                      </div>
                    ) : (
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="size-16 sm:size-18 rounded-full object-cover ring-4 ring-white shadow-md"
                      />
                    )}
                    <span className="text-xs sm:text-sm font-semibold text-[#4e555f] mt-2.5">
                      {agent.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right subtle chevron */}
              <div className="size-9 rounded-full bg-white/80 shadow-2xs border border-slate-200/60 flex items-center justify-center text-slate-300">
                <ChevronRight className="size-5" />
              </div>
            </div>
          </div>

          {/* Horizontal Grip Divider matching screenshot */}
          <div className="h-3 bg-white flex items-center justify-center shrink-0 cursor-default border-b border-slate-100">
            <span className="w-8 h-[2px] bg-slate-300 rounded-full" />
          </div>

          {/* Chat Messages Stream (Only appears if conversation has started) */}
          {messages.length > 0 && (
            <div
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5 bg-slate-50/60 border-b border-slate-100 text-xs sm:text-sm"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "agent" && (
                    <img
                      src={msg.agentAvatar || TEAM_AVATARS[1].avatar}
                      alt={msg.agentName || "Support"}
                      className="size-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0 mb-0.5"
                    />
                  )}
                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#00a4e4] text-white rounded-br-xs shadow-xs"
                        : "bg-white text-slate-800 rounded-bl-xs border border-slate-200 shadow-2xs"
                    }`}
                  >
                    {msg.attachmentName && (
                      <div className="flex items-center gap-1.5 text-[11px] bg-black/10 px-2.5 py-1 rounded-md mb-1.5 font-mono">
                        <FileText className="size-3.5" />
                        <span className="truncate max-w-[180px]">{msg.attachmentName}</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`text-[10px] block text-right mt-1.5 ${
                        msg.sender === "user" ? "text-white/80" : "text-slate-400"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="bg-white border border-slate-200 px-3.5 py-2 rounded-full flex items-center gap-1.5 text-xs shadow-2xs">
                    <span>MantraPractice Support is typing</span>
                    <span className="flex gap-0.5 ml-1">
                      <span className="size-1.5 bg-[#00a4e4] rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="size-1.5 bg-[#00a4e4] rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="size-1.5 bg-[#00a4e4] rounded-full animate-bounce" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Attached File Chip (if any) */}
          {attachedFile && (
            <div className="mx-5 mt-2 px-3 py-1.5 bg-sky-50 border border-sky-200 rounded-lg flex items-center justify-between text-xs text-sky-800 shrink-0">
              <div className="flex items-center gap-2 truncate">
                <FileText className="size-4 text-[#00a4e4] shrink-0" />
                <span className="truncate font-mono">{attachedFile}</span>
              </div>
              <button
                onClick={() => setAttachedFile(null)}
                className="text-slate-400 hover:text-slate-700 ml-1 p-0.5 cursor-pointer"
                aria-label="Remove attachment"
              >
                <X className="size-4" />
              </button>
            </div>
          )}

          {/* Message Input Box: Generous Height & Width matching screenshot */}
          <div className="p-5 bg-white shrink-0 relative mt-auto">
            {/* Emoji Picker Popover */}
            {showEmojiPicker && (
              <div className="absolute bottom-20 left-5 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 grid grid-cols-6 gap-1.5 z-50 animate-in zoom-in-95 duration-100">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleAddEmoji(emoji)}
                    className="size-8 flex items-center justify-center text-base hover:bg-slate-100 rounded-lg transition-transform hover:scale-120 cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Tall Blue Bordered Input Box matching screenshot */}
            <div className="border border-[#2fc6f6] focus-within:border-[#00a4e4] focus-within:ring-2 focus-within:ring-[#00a4e4]/20 rounded-md transition bg-white overflow-hidden shadow-2xs">
              <textarea
                ref={textareaRef}
                rows={4}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter message..."
                className="w-full px-4 py-3.5 text-sm sm:text-base text-slate-800 placeholder-[#7e8790] focus:outline-none resize-none bg-transparent min-h-[105px] sm:min-h-[115px]"
              />

              {/* Bottom toolbar inside input: paperclip + smiley */}
              <div className="px-3.5 py-2 flex items-center justify-between border-t border-slate-100 bg-white">
                <div className="flex items-center gap-3.5 text-slate-400">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1 hover:text-slate-700 transition cursor-pointer"
                    title="Attach file"
                    aria-label="Attach file"
                  >
                    <Paperclip className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className={`p-1 transition cursor-pointer ${
                      showEmojiPicker ? "text-[#00a4e4]" : "hover:text-slate-700"
                    }`}
                    title="Add emoji"
                    aria-label="Add emoji"
                  >
                    <Smile className="size-5" />
                  </button>
                </div>

                {messageInput.trim() && (
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="px-3.5 py-1.5 bg-[#00a4e4] hover:bg-[#0092cc] text-white text-xs font-semibold rounded-md transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="Send"
                    aria-label="Send message"
                  >
                    <span>Send</span>
                    <Send className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Footer: Bitrix24 Matching Exact Screenshot */}
          <div className="bg-white px-5 py-3 text-center text-[12.5px] text-[#9aa2ac] border-t border-slate-100 flex items-center justify-center gap-1.5 select-none shrink-0">
            <span>Free CRM, live chat and sites</span>
            <span className="font-bold text-[#00a4e4] flex items-center tracking-tight">
              Bitrix<span className="text-[#00a4e4]">24</span>
              <sup className="text-[9px] ml-0.5">®</sup>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
