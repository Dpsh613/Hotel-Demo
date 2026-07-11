import { useState, useEffect, useRef, useMemo } from "react";
import { FAQData, FAQGroup, FAQItem } from "@/types";

const chunkArray = (arr: any[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size),
  );
};

export function useChatLogic(faqData: FAQData) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"categories" | "questions" | "answer">(
    "categories",
  );
  const [activeGroup, setActiveGroup] = useState<FAQGroup | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<FAQItem | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const groups = faqData?.faq_groups || [];

  // Carousel States
  const [catIndex, setCatIndex] = useState(0);
  const [isHoveringCat, setIsHoveringCat] = useState(false);
  const [qChunkIndex, setQChunkIndex] = useState(0);
  const [isHoveringQ, setIsHoveringQ] = useState(false);

  const questionChunks = useMemo(() => {
    return activeGroup ? chunkArray(activeGroup.items, 3) : [];
  }, [activeGroup]);

  // Categories Carousel
  useEffect(() => {
    if (
      view !== "categories" ||
      !isOpen ||
      groups.length === 0 ||
      isHoveringCat
    )
      return;
    const interval = setInterval(() => {
      setCatIndex((prev) => (prev + 1) % groups.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [view, isOpen, groups.length, isHoveringCat]);

  // Questions Carousel
  useEffect(() => {
    if (view !== "questions" || questionChunks.length <= 1 || isHoveringQ)
      return;
    const interval = setInterval(() => {
      setQChunkIndex((prev) => (prev + 1) % questionChunks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [view, questionChunks.length, isHoveringQ]);

  // Handlers
  const handleSelectCategory = (group: FAQGroup) => {
    setActiveGroup(group);
    setQChunkIndex(0);
    setView("questions");
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const handleSelectQuestion = (item: FAQItem) => {
    setActiveQuestion(item);
    setView("answer");
    setIsTyping(true);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setTimeout(() => setIsTyping(false), 600);
  };

  const handleBack = () => {
    if (view === "answer") {
      setView("questions");
      setActiveQuestion(null);
    } else if (view === "questions") {
      setView("categories");
      setActiveGroup(null);
    }
  };

  // Global Effects
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overscrollBehavior = isOpen ? "none" : "auto";
    return () => {
      document.body.style.overscrollBehavior = "auto";
    };
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    view,
    activeGroup,
    activeQuestion,
    isTyping,
    groups,
    currentCategory: groups[catIndex],
    questionChunks,
    qChunkIndex,
    isHoveringCat,
    setIsHoveringCat,
    isHoveringQ,
    setIsHoveringQ,
    scrollRef,
    handleSelectCategory,
    handleSelectQuestion,
    handleBack,
  };
}
