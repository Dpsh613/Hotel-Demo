"use client";

import { useEffect, useRef, useState } from "react";

export function FloatingScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDraggingState] = useState(false);

  const scrollPos = useRef({ target: 0, current: 0 });
  const isScrolling = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const isInitialized = useRef(false);

  const [isScrollable, setIsScrollable] = useState(true);

  const isDraggingRef = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);

  useEffect(() => {
    const calculateTarget = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) {
        setIsScrollable(false);
        scrollPos.current.target = 0;
        return;
      }

      setIsScrollable(true);

      const scrollTop = window.scrollY;
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));

      const thumbHeight = 18;
      const padding = 16;
      const availableHeight = clientHeight - padding * 2 - thumbHeight;

      const targetPos = padding + progress * availableHeight;
      scrollPos.current.target = targetPos;

      if (!isInitialized.current) {
        scrollPos.current.current = targetPos;
        isInitialized.current = true;
      }
    };

    const handleScroll = () => {
      calculateTarget();

      setIsVisible(true);

      if (isScrolling.current) {
        clearTimeout(isScrolling.current);
      }

      isScrolling.current = setTimeout(() => {
        setIsVisible(false);
      }, 600);
    };

    const animate = () => {
      const ease = isDraggingRef.current ? 1 : 0.2;
      const diff = scrollPos.current.target - scrollPos.current.current;

      if (Math.abs(diff) > 0.01) {
        scrollPos.current.current += diff * ease;
        if (thumbRef.current) {
          thumbRef.current.style.transform = `translateY(${scrollPos.current.current}px)`;
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateTarget, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        calculateTarget();
      });
      resizeObserver.observe(document.body);
    }

    calculateTarget();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateTarget);

      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      if (isScrolling.current) {
        clearTimeout(isScrolling.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      e.preventDefault();

      const deltaY = e.clientY - startY.current;

      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      const availableHeight = clientHeight - 32 - 18;

      const scrollRatio = deltaY / availableHeight;
      const scrollDelta = scrollRatio * maxScroll;

      window.scrollTo(0, startScrollTop.current + scrollDelta);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setIsDraggingState(false);

      document.body.style.userSelect = "";
      document.documentElement.style.removeProperty("scroll-behavior");

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      setIsDraggingState(true);

      startY.current = e.clientY;
      startScrollTop.current = window.scrollY;

      document.body.style.userSelect = "none";

      document.documentElement.style.setProperty(
        "scroll-behavior",
        "auto",
        "important",
      );

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    const thumb = thumbRef.current;

    if (thumb) {
      thumb.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (thumb) {
        thumb.removeEventListener("mousedown", handleMouseDown);
      }

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!isScrollable) return null;

  const isActive = isVisible || isDragging || isHovered;

  return (
    <div
      className="fixed top-0 right-[2px] bottom-0 w-[20px] pointer-events-none z-[100] hidden md:flex justify-center"
      aria-hidden="true"
    >
      <div
        ref={thumbRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          absolute top-0
          w-[14px] h-[14px]
          rounded-full
          pointer-events-auto
          cursor-grab
          active:cursor-grabbing
        `}
        style={{
          backgroundColor: isActive ? "rgba(115, 114, 112, 1)" : "transparent",
          border: "1px solid #A9A9A9",
          boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
          transition: `background-color ${isActive ? "300ms" : "700ms"} ease-in-out, box-shadow ${isActive ? "300ms" : "700ms"} ease-in-out`,
        }}
      />
    </div>
  );
}
