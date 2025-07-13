import { RefObject, useEffect, useState } from "react";

export function useActualSize(ref: RefObject<HTMLElement>) {
  // actual rendered size of the element
  const [actualSize, setActualSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // listen for changes to actual size
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newSize = entry.contentRect;
        setActualSize(newSize);
      }
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return actualSize;
}
