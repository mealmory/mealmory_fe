import { useRef, useState } from "react";

interface RowScrollProps {
  className: string;
  children: React.ReactNode;
}

const RowScrollItems = ({ className, children }: RowScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  function onMouseDown(clickEvt: React.MouseEvent) {
    const container = containerRef.current;
    if (!container) return;

    let frameId: number | null = null;
    const prevScrollX = container.scrollLeft;
    let isDraging = true;
    const mouseMoveHandler = (moveEvt: MouseEvent) => {
      if (!isDraging) return;

      const deltaX = clickEvt.pageX - moveEvt.pageX;
      const targetScrollX = prevScrollX + deltaX;

      const smoothScroll = () => {
        const currentScrollX = container.scrollLeft;
        const distance = targetScrollX - currentScrollX;
        const step = distance * 0.1;

        if (Math.abs(step) > 0.5) {
          container.scrollBy(step, 0);
          frameId = requestAnimationFrame(smoothScroll);
        } else {
          container.scrollLeft = targetScrollX;
        }
      };
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(smoothScroll);
    };
    const mouseUpHandler = () => {
      isDraging = false;
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      document.removeEventListener("mousemove", mouseMoveHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  }

  return (
    <div
      className={"overflow-x-scroll " + (className ?? "")}
      ref={containerRef}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
};

export default RowScrollItems;
