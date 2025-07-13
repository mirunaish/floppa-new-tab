import React, { useCallback, useState } from "react";
import Card, { CardComponentProps } from "../components/Card";
import { NoteInfo } from "../utils/types";
import { FaPencil } from "react-icons/fa6";
import TextInput from "../components/TextInput";

interface NoteProps {
  editNote: (text: string) => void;
}

const Note: React.FC<CardComponentProps & NoteInfo & NoteProps> = ({
  id,
  title,
  text,
  close,
  editNote,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingNote, setEditingNote] = useState(text);

  const submit = useCallback(() => {
    editNote(editingNote);
    setIsEditing(false);
  }, [editNote, editingNote]);

  const cancel = useCallback(() => {
    setIsEditing(false);
    setEditingNote(text);
  }, [text]);

  return (
    <Card
      key={id}
      id={id}
      title={title}
      close={close}
      resizeable="nwse"
      requireConfirmForClose
      buttons={() => (
        <FaPencil className="click" onClick={() => setIsEditing(true)} />
      )}
    >
      {isEditing ? (
        <div
          className="expand column"
          style={{
            gap: 12,
            alignItems: "center",
          }}
        >
          <TextInput
            type="textarea"
            value={editingNote}
            onChange={setEditingNote}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Escape") {
                cancel();
              }
            }}
          />
          <div
            className="row"
            style={{
              justifyContent: "space-around",
              gap: 16,
              width: "100%",
            }}
          >
            <button onClick={cancel}>Cancel</button>
            <button onClick={submit}>Save</button>
          </div>
        </div>
      ) : (
        <div>
          {text.split("\n").map((line) => (
            <>
              {line}
              <br />
            </>
          ))}
        </div>
      )}
    </Card>
  );
};

export default Note;
