"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowLeft } from "lucide-react";
import { FAQData, BusinessContact, SocialPlatform } from "@/types";

import { useChatLogic } from "./useChatLogic";
import { ChatFooter } from "./ChatFooter";
import { CategoriesView, QuestionsView, AnswerView } from "./ChatViews";

interface WidgetProps {
  faqData: FAQData;
  contact: BusinessContact;
  social: { platforms: SocialPlatform[] };
}

const premiumEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function FloatingContactWidget({
  faqData,
  contact,
  social,
}: WidgetProps) {
  const chatLogic = useChatLogic(faqData);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* 1. CHAT WINDOW */}
      <AnimatePresence>
        {chatLogic.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: premiumEasing }}
            className="mb-4 w-[90vw] sm:w-[380px] h-[500px] max-h-[80vh] bg-[#FFFFFF] rounded-[12px] shadow-[0_24px_64px_rgba(17,17,16,0.24)] overflow-hidden flex flex-col border border-[#E0DDD8] origin-bottom-right"
          >
            {/* HEADER */}
            <div className="bg-[#1A1A18] text-[#FFFFFF] p-5 shrink-0 relative z-10 flex flex-col justify-center min-h-[85px]">
              <AnimatePresence mode="wait">
                {chatLogic.view !== "categories" && (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    onClick={chatLogic.handleBack}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors group"
                  >
                    <ArrowLeft
                      size={18}
                      className="text-[#999999] group-hover:text-white transition-colors"
                    />
                  </motion.button>
                )}
              </AnimatePresence>

              <div
                className={`transition-all duration-300 ${chatLogic.view !== "categories" ? "pl-10" : ""}`}
              >
                <h3 className="font-bold text-[16px] tracking-tight leading-none">
                  {chatLogic.view === "categories"
                    ? "Hi there! 👋"
                    : chatLogic.activeGroup?.heading}
                </h3>
                <p className="text-[13px] text-[#999999] mt-1.5 leading-none">
                  {chatLogic.view === "categories"
                    ? "How can we help you today?"
                    : "Select a question below"}
                </p>
              </div>
            </div>

            {/* SCROLLABLE CONTENT AREA */}
            <div
              ref={chatLogic.scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain p-5 flex flex-col gap-5 custom-premium-scrollbar relative"
            >
              <AnimatePresence mode="wait">
                {chatLogic.view === "categories" &&
                  chatLogic.groups.length > 0 && (
                    <CategoriesView {...chatLogic} />
                  )}
                {chatLogic.view === "questions" && (
                  <QuestionsView {...chatLogic} />
                )}
                {chatLogic.view === "answer" && chatLogic.activeQuestion && (
                  <AnswerView {...chatLogic} />
                )}
              </AnimatePresence>
            </div>

            {/* FOOTER */}
            <ChatFooter contact={contact} social={social} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => chatLogic.setIsOpen(!chatLogic.isOpen)}
        className="flex items-center justify-center p-4 rounded-full shadow-[0_8px_24px_rgba(17,17,16,0.12)] transition-transform duration-300 hover:scale-105 active:scale-95 bg-[#1A1A18] text-[#FFFFFF] relative z-[101]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={chatLogic.isOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {chatLogic.isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          </motion.div>
        </AnimatePresence>
      </button>

      {/* CUSTOM STYLES */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-premium-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-premium-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-premium-scrollbar::-webkit-scrollbar-thumb { background-color: transparent; border-radius: 4px; transition: background-color 0.3s; }
        .custom-premium-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #E0DDD8; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
      `,
        }}
      />
    </div>
  );
}
