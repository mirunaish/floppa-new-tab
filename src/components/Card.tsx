import React, { useCallback, useEffect, useState, ReactNode } from "react";
import "./Card.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Coords } from "../types";
import { FaMinus } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";

interface CardProps {
  title: string;
  children: ReactNode;
  initialPosition?: Coords;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  initialPosition = { x: 100, y: 100 },
}) => {
  // position stored in local storage
  const [position, setPosition] = useLocalStorage(
    `${title}-position`,
    initialPosition
  );

  const [isMoving, setIsMoving] = useState(false); // am i dragging the card?
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 }); // where in the div i clicked
  const [movingPosition, setMovingPosition] = useState<Coords>(position); // position while moving

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isMoving) return;
      setMovingPosition({
        x: e.clientX - clickPosition.x,
        y: e.clientY - clickPosition.y,
      });
    },
    [isMoving, clickPosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsMoving(false);
    // save final position to localstorage
    if (movingPosition) setPosition(movingPosition);
    // reenable selecting text
    document.body.style.userSelect = "";
  }, [movingPosition, setPosition]);

  useEffect(() => {
    if (isMoving) {
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
  }, [handleMouseMove, handleMouseUp, isMoving]);

  return (
    <div
      className="card"
      style={{
        position: "absolute",
        top: movingPosition.y,
        left: movingPosition.x,

        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="card__title"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          onMouseDown={handleMouseDown}
          style={{ flexGrow: 1, cursor: "move", padding: "0.4rem 1rem" }}
        >
          {title}
        </div>
        <div
          style={{
            padding: "0.4rem 0.6rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <FaMinus style={{ cursor: "pointer" }} />
          <FaRegSquare style={{ cursor: "pointer" }} />
          <FaX style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className="card__body">{children}</div>
    </div>
  );
};

export default Card;
