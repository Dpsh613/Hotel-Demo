import { useState } from "react";

export function useLightbox(imageCount: number) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  const open = (index = 0) => {
    setCurrentIndex(index);
    setZoomLevel(1.0);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setZoomLevel(1.0);
  };

  const next = () => {
    setCurrentIndex((i) => (i + 1) % imageCount);
    setZoomLevel(1.0);
  };

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + imageCount) % imageCount);
    setZoomLevel(1.0);
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setZoomLevel(1.0);
  };

  const zoomIn = () => {
    setZoomLevel((prev) => (prev === 1.0 ? 1.3 : prev === 1.3 ? 1.6 : 1.6));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => (prev === 1.6 ? 1.3 : prev === 1.3 ? 1.0 : 1.0));
  };

  return {
    isOpen,
    currentIndex,
    open,
    close,
    next,
    prev,
    goTo,
    zoomLevel,
    zoomIn,
    zoomOut,
  };
}
