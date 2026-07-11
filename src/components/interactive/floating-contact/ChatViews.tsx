import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { FAQGroup, FAQItem } from "@/types";

const premiumEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const CategoriesView = ({
  groups,
  currentCategory,
  handleSelectCategory,
  setIsHoveringCat,
}: any) => (
  <motion.div
    key="categories"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col flex-1"
    onMouseEnter={() => setIsHoveringCat(true)}
    onMouseLeave={() => setIsHoveringCat(false)}
  >
    <p className="text-[12px] font-semibold text-[#666666] uppercase tracking-[0.1em] mb-3">
      Suggested Topics
    </p>
    <div className="relative min-h-[60px]">
      <AnimatePresence mode="wait">
        {currentCategory && (
          <motion.button
            key={currentCategory.slug}
            onClick={() => handleSelectCategory(currentCategory)}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.4, ease: premiumEasing }}
            className="absolute inset-0 w-full text-left p-4 text-[14px] font-medium text-[#111111] bg-[#F0EDE8] rounded-[8px] flex justify-between items-center hover:bg-[#E0DDD8] hover:shadow-[0_4px_12px_rgba(17,17,16,0.08)] transition-all group border border-transparent hover:border-[#111111]/5"
          >
            {currentCategory.heading}
            <ChevronRight
              size={16}
              className="text-[#666666] group-hover:text-[#111111] transition-colors"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

export const QuestionsView = ({
  questionChunks,
  qChunkIndex,
  handleSelectQuestion,
  setIsHoveringQ,
}: any) => (
  <motion.div
    key="questions"
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col flex-1"
    onMouseEnter={() => setIsHoveringQ(true)}
    onMouseLeave={() => setIsHoveringQ(false)}
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={qChunkIndex}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.4, staggerChildren: 0.08 }}
        className="flex flex-col gap-2"
      >
        {questionChunks[qChunkIndex]?.map((item: FAQItem, idx: number) => (
          <motion.button
            key={idx}
            onClick={() => handleSelectQuestion(item)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-left p-4 text-[14px] font-medium text-[#111111] bg-[#FFFFFF] rounded-[8px] flex justify-between items-center border border-[#E0DDD8] hover:border-[#C5A97A] hover:bg-[#F0EDE8] hover:shadow-[0_4px_12px_rgba(17,17,16,0.06)] transition-all group"
          >
            <span className="pr-4 leading-[1.4]">{item.question}</span>
            <ChevronRight
              size={16}
              className="text-[#666666] shrink-0 group-hover:text-[#C5A97A] transition-colors"
            />
          </motion.button>
        ))}
      </motion.div>
    </AnimatePresence>
  </motion.div>
);

export const AnswerView = ({ activeQuestion, isTyping }: any) => (
  <motion.div
    key="answer"
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.4, ease: premiumEasing }}
    className="flex flex-col flex-1"
  >
    <div className="mb-4 pb-4 border-b border-[#E0DDD8]">
      <h4 className="text-[15px] font-semibold text-[#111111] leading-[1.4]">
        {activeQuestion.question}
      </h4>
    </div>
    {isTyping ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 text-[#666666] text-[14px]"
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex gap-1"
        >
          <span className="w-1.5 h-1.5 bg-[#666666] rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-[#666666] rounded-full animation-delay-200"></span>
          <span className="w-1.5 h-1.5 bg-[#666666] rounded-full animation-delay-400"></span>
        </motion.div>
        Finding the best answer...
      </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-[14px] text-[#666666] prose prose-sm max-w-none leading-[1.7]"
        dangerouslySetInnerHTML={{ __html: activeQuestion.answer }}
      />
    )}
  </motion.div>
);
