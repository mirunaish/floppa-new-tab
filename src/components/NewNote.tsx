import React, { useCallback, useState } from "react";
import Card, { CardComponentProps } from "./Card";
import TextInput from "./TextInput";
import { NoteInfo } from "../utils/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

const NewImage: React.FC<CardComponentProps> = ({ id, close, visible }) => {
  const [notes, setNotes] = useLocalStorage(
    "notes",
    {} as Record<string, NoteInfo>
  );
  const createNote = useCallback(
    (note: NoteInfo) => {
      setNotes({ ...notes, [note.id]: note });
    },
    [notes, setNotes]
  );
  const removeNote = useCallback(
    (id: string) => {
      const newNotes = { ...notes };
      delete newNotes[id];
      setNotes(newNotes);
    },
    [notes, setNotes]
  );

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  return (
    <>
      {visible && (
        <Card id={id} title="add a new text note" close={close}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: 5,
            }}
          >
            <TextInput
              value={title}
              onChange={setTitle}
              placeholder="widget title"
            />
            <TextInput
              value={text}
              onChange={setText}
              placeholder="note"
              long={true}
            />
            <button
              style={{ marginTop: 5 }}
              onClick={() => {
                createNote({
                  id: crypto.randomUUID(),
                  title,
                  text: text,
                });
                setTitle("");
                setText("");
              }}
            >
              add text note
            </button>
          </div>
        </Card>
      )}

      {Object.entries(notes).map(([id, note]) => (
        <Card key={id} id={id} title={note.title} close={() => removeNote(id)}>
          {note.text.split("\n").map((line) => (
            <>
              {line}
              <br />
            </>
          ))}
        </Card>
      ))}
    </>
  );
};

export default NewImage;
