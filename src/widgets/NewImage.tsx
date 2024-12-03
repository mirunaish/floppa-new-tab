import React, { useCallback, useState } from "react";
import Card, { CardComponentProps } from "../components/Card";
import TextInput from "../components/TextInput";
import { ImageInfo } from "../utils/types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IMAGES } from "../utils/consts";

const NewImage: React.FC<CardComponentProps> = ({ id, close, visible }) => {
  const [images, setImages] = useLocalStorage("images", IMAGES);
  const createImage = useCallback(
    (image: ImageInfo) => {
      setImages({ ...images, [image.id]: image });
    },
    [images, setImages]
  );
  const removeImage = useCallback(
    (id: string) => {
      const newImages = { ...images };
      delete newImages[id];
      setImages(newImages);
    },
    [images, setImages]
  );

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      {visible && (
        <Card id={id} title="add a new image" close={close}>
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
              value={imageUrl}
              onChange={setImageUrl}
              placeholder="image url"
            />
            <button
              style={{ marginTop: 5 }}
              onClick={() => {
                createImage({ id: crypto.randomUUID(), title, url: imageUrl });
                setTitle("");
                setImageUrl("");
              }}
            >
              add image
            </button>
          </div>
        </Card>
      )}

      {Object.entries(images).map(([id, image]) => (
        <Card
          key={id}
          id={id}
          title={image.title}
          padding={false}
          close={() => removeImage(id)}
          initialSize={{ width: 300, height: "auto" }}
          resizeable="ew"
        >
          <img src={image.url} style={{ width: "100%", height: "100%" }} />
        </Card>
      ))}
    </>
  );
};

export default NewImage;
