import React, {
  useCallback,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import "./Card.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Coords, Size } from "../utils/types";
import { FaGripVertical, FaMinus } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";
import { useActualSize } from "../hooks/useActualSize";

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
  close: (id: string) => void;
  initialSize?: Size;
  resizeable?: boolean | string;
  requireConfirmForClose?: boolean;
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
  requireConfirmForClose = false,
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  /* --------------------------------- size and position --------------------------------- */

  const actualSize = useActualSize(cardRef);

  // position stored in local storage
  const [_positionP, _setPositionP] = useLocalStorage(`${id}-position`, {
    x: 0.1,
    y: 0.1,
  });
  const [position, _setPosition] = useState({
    x: _positionP.x * window.innerWidth,
    y: _positionP.y * window.innerHeight,
  });
  const setPosition = useCallback(
    (newPosition: Coords) => {
      _setPosition(newPosition);
      _setPositionP({
        x: newPosition.x / window.innerWidth,
        y: newPosition.y / window.innerHeight,
      });
    },
    [_setPositionP]
  );
  useEffect(() => {
    // when the window size changes, update position
    const handleResize = () =>
      _setPosition({
        x: _positionP.x * window.innerWidth,
        y: _positionP.y * window.innerHeight,
      });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [_positionP]);
  // when local storage position changes, update position
  useEffect(() => {
    _setPosition({
      x: _positionP.x * window.innerWidth,
      y: _positionP.y * window.innerHeight,
    });
  }, [_positionP, _setPosition]);

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

  // clip position so it doesn't go off screen
  const clippedPosition = useMemo(() => {
    const newPosition = { ...movingPosition };
    if (newPosition.x < 0) newPosition.x = 0;
    if (newPosition.x + actualSize.width > window.innerWidth) {
      newPosition.x = window.innerWidth - actualSize.width;
    }
    if (newPosition.y + actualSize.height > window.innerHeight) {
      newPosition.y = window.innerHeight - actualSize.height;
    }
    return newPosition;
  }, [actualSize.height, actualSize.width, movingPosition]);

  const [minimized, setMinimized] = useLocalStorage(`${id}-minimized`, false);

  /* ------------------------------------- z index -------------------------------------- */

  const [zIndexes, setZIndexes] = useLocalStorage<Record<string, number>>(
    "z-indexes",
    {},
    true
  );
  const minZIndex = useMemo(
    () => Object.values(zIndexes).reduce((p, c) => Math.min(p, c), Infinity),
    [zIndexes]
  );
  const maxZIndex = useMemo(
    () => Object.values(zIndexes).reduce((p, c) => Math.max(p, c), 0),
    [zIndexes]
  );

  // if my z index is not in local storage, add it
  useEffect(() => {
    if (!zIndexes[id]) {
      setZIndexes({ ...zIndexes, [id]: maxZIndex + 1 });
    }
  }, [id, maxZIndex, setZIndexes, zIndexes]);

  const resetZIndex = useCallback(() => {
    if (zIndexes[id] === maxZIndex) return; // already on top

    let newZIndexes = { ...zIndexes, [id]: maxZIndex + 1 }; // move to top

    // if this was the minimum, subtract the minimum from all z indexes so they don't explode
    if (zIndexes[id] === minZIndex)
      newZIndexes = Object.entries(newZIndexes)
        .map(([id, value]) => [id, value - minZIndex + 1])
        .reduce(
          (p, [id, value]) => ({ ...p, [id as unknown as string]: value }),
          {}
        );

    setZIndexes(newZIndexes);
  }, [id, maxZIndex, minZIndex, setZIndexes, zIndexes]);

  /* --------------------------------- close confirmation --------------------------------- */

  // whether the confirm dialog is open
  const [closeConfirmOpen, setCloseConfirmOpen] = useState(false);

  const closeCard = useCallback(() => {
    if (requireConfirmForClose) {
      setCloseConfirmOpen(true);
    } else close(id);
  }, [close, id, requireConfirmForClose]);

  /* ------------------------------------- render ------------------------------------ */

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        position: "absolute",
        top: clippedPosition.y,
        left: clippedPosition.x,

        width: closeConfirmOpen ? actualSize.width : resizingSize.width,
        height: closeConfirmOpen
          ? actualSize.height
          : resizeable == "ew" || minimized
            ? "auto"
            : resizingSize.height,
        minWidth: "min-content",
        minHeight: minimized ? 0 : 100,

        display: "flex",
        flexDirection: "column",

        zIndex: zIndexes[id] ?? 0,
      }}
      onMouseDown={resetZIndex}
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
            title="minimize"
            className="click"
            onClick={() => setMinimized(!minimized)}
          />
          {/* resize */}
          <FaRegSquare
            title="reset to default size"
            className="click"
            onClick={() => {
              setSize(initialSize);
              setResizingSize(initialSize);
            }}
          />
          {/* close */}
          <FaX title="close" className="click" onClick={closeCard} />
        </div>
      </div>

      <div
        className="card__body"
        style={{
          padding: padding ? (minimized ? "0rem 1rem" : "0.6rem 1rem") : 0,
          height: minimized ? 0 : "100%",
        }}
      >
        {closeConfirmOpen ? (
          <div
            className="expand"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              boxSizing: "border-box",
            }}
          >
            <div
              className="column"
              style={{
                gap: 16,
                alignItems: "stretch",
                overflowY: "scroll",
              }}
            >
              <span>
                Are you sure you want to delete this card? You may lose unsaved
                data.
              </span>
              <div
                className="row"
                style={{
                  gap: 10,
                  justifyContent: "space-around",
                }}
              >
                <button onClick={() => setCloseConfirmOpen(false)}>
                  Cancel
                </button>
                <button onClick={() => close(id)}>Delete</button>
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>

      {/* resize icon in bottom corner */}
      {resizeable && !minimized && !closeConfirmOpen && (
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
