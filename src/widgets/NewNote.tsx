import React, { useCallback, useState } from "react";
import Card, { CardComponentProps } from "../components/Card";
import TextInput from "../components/TextInput";
import { NoteInfo } from "../utils/types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Note from "./Note";

const NewNote: React.FC<CardComponentProps> = ({ id, close, visible }) => {
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

  const editNote = useCallback(
    (id: string, text: string) => {
      setNotes({ ...notes, [id]: { ...notes[id], text } });
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
        <Card
          id={id}
          title="add a new text note"
          close={close}
          resizeable="nwse"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%",
              gap: 5,
            }}
          >
            <TextInput
              value={title}
              onChange={setTitle}
              placeholder="widget title"
            />
            <TextInput
              style={{ flexGrow: 1 }}
              value={text}
              onChange={setText}
              placeholder="note"
              type="textarea"
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
        <Note
          key={id}
          {...note}
          close={() => removeNote(id)}
          visible={true}
          editNote={(newText) => editNote(id, newText)}
        />
      ))}
    </>
  );
};

export default NewNote;
