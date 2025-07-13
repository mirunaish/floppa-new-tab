import React, { useCallback, useEffect, useState, ReactNode } from "react";
import "./Card.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Coords, Size } from "../utils/types";
import { FaGripVertical, FaMinus } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";

// props of component that uses card
export interface CardComponentProps {
  id: string;
  close: (id: string) => void;
  visible: boolean;
}

interface CardProps {
  id: string;
  title: string;
  children: ReactNode;
  buttons?: () => ReactNode;
  padding?: boolean;
  close?: (id: string) => void;
  initialSize?: Size;
  resizeable?: boolean | string;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  children,
  buttons,
  padding = true,
  close,
  initialSize = { width: "auto", height: "auto" },
  resizeable = false,
}) => {
  // position stored in local storage
  const [position, setPosition] = useLocalStorage(`${id}-position`, {
    x: 100,
    y: 100,
  });
  // size stored in local storage
  const [size, setSize] = useLocalStorage<Size>(`${id}-size`, initialSize);

  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 }); // where in the div i clicked

  const [isMoving, setIsMoving] = useState(false); // am i dragging the card?
  const [movingPosition, setMovingPosition] = useState<Coords>(position); // position while moving

  const [isResizing, setIsResizing] = useState(false); // am i resizing the card?
  const [resizingSize, setResizingSize] = useState<Size>(size); // size while resizing

  // if local storage position changes, also change moving position
  useEffect(() => {
    setMovingPosition(position);
  }, [position]);

  // if local storage size changes, also change resizing size
  useEffect(() => {
    setResizingSize(size);
  }, [size]);

  const handleMoveMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = (
        e.target as HTMLElement
      ).parentElement?.getBoundingClientRect();
      setClickPosition({
        x: e.clientX - (rect?.left ?? 0),
        y: e.clientY - (rect?.top ?? 0),
      });
      setIsMoving(true);

      // disable selecting text while dragging
      document.body.style.userSelect = "none";
    },
    []
  );

  const handleResizeMouseDown = useCallback(() => {
    if (!resizeable) return;

    setIsResizing(true);

    // disable selecting text while dragging
    document.body.style.userSelect = "none";
  }, [resizeable]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMoving) {
        setMovingPosition({
          x: e.clientX - clickPosition.x,
          y: e.clientY - clickPosition.y,
        });
      }
      if (isResizing && resizeable) {
        setResizingSize({
          width: e.clientX - movingPosition.x,
          height: e.clientY - movingPosition.y,
        });
      }
    },
    [isMoving, isResizing, resizeable, clickPosition, movingPosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsMoving(false);
    setIsResizing(false);

    // save final position to localstorage
    if (movingPosition) setPosition(movingPosition);
    // save final size to localstorage
    if (resizingSize && resizeable) setSize(resizingSize);

    // reenable selecting text
    document.body.style.userSelect = "";
  }, [movingPosition, resizeable, resizingSize, setPosition, setSize]);

  useEffect(() => {
    if (isMoving || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    // cleanup function: remove event listeners
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, isMoving, isResizing]);

  const [minimized, setMinimized] = useLocalStorage(`${id}-minimized`, false);

  return (
    <div
      className="card"
      style={{
        position: "absolute",
        top: movingPosition.y,
        left: movingPosition.x,

        width: resizingSize.width,
        height: resizeable == "ew" || minimized ? "auto" : resizingSize.height,
        minWidth: "min-content",
        minHeight: minimized ? 0 : 100,

        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* title bar */}
      <div
        id={`${id}-titlebar`}
        className="card__title"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          onMouseDown={handleMoveMouseDown}
          style={{
            flexGrow: 1,
            cursor: isMoving ? "grabbing" : "grab",
            padding: "0.4rem 1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0.6rem",
            whiteSpace: "nowrap",
          }}
        >
          <div className="theme-icon" />
          {title}
        </div>
        {/* custom buttons, if given */}
        {buttons ? (
          <div
            style={{
              padding: "0.4rem 0.6rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            {buttons()}
          </div>
        ) : null}
        {/* three default buttons */}
        <div
          style={{
            padding: "0.4rem 0.6rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          {/* minimize */}
          <FaMinus
            style={{ cursor: "pointer" }}
            onClick={() => setMinimized(!minimized)}
          />
          {/* resize */}
          <FaRegSquare
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSize(initialSize);
              setResizingSize(initialSize);
            }}
          />
          {/* close */}
          <FaX
            style={{ cursor: "pointer" }}
            onClick={close ? () => close(id) : () => {}}
          />
        </div>
      </div>

      <div
        className="card__body"
        style={{
          padding: padding ? (minimized ? "0rem 1rem" : "0.6rem 1rem") : 0,
          height: minimized ? 0 : "100%",
        }}
      >
        {children}
      </div>

      {/* resize icon in bottom corner */}
      {resizeable && !minimized && (
        <div
          style={{
            position: "absolute",
            bottom: -4.5,
            right: 0,
            cursor: `${resizeable}-resize`,
            color: "var(--primary)",
          }}
          onMouseDown={handleResizeMouseDown}
        >
          <FaGripVertical size={12} />
        </div>
      )}
    </div>
  );
};

export default Card;
