import React, { useEffect, useState } from "react";
import Card, { CardComponentProps } from "../components/Card";

/** get rss feed data from the background script */
async function makeRSSRequest(
  url: string
): Promise<{ ok: boolean; error?: string; data?: string }> {
  // @ts-expect-error typescript doesn't know this is an extension and browser is defined
  return await browser.runtime.sendMessage({ type: "fetchRSS", url });
}

interface RSSFeedProps {
  url: string;
  title: string;
}

interface RSSPost {
  title: string;
  description: string;
  link?: string;
  imageUrl?: string | null;
}
const EMPTY_RSS_POST: RSSPost = {
  title: "",
  description: "",
};

const RSSFeed: React.FC<CardComponentProps & RSSFeedProps> = ({
  id,
  close,
  url,
  title,
}) => {
  const [post, setPost] = useState<RSSPost>(EMPTY_RSS_POST);

  // fetch rss feed content
  useEffect(() => {
    const getRSSContent = (xml: Document) => {
      // get the first item
      const item = xml.querySelector("item");
      if (!item) throw new Error("No items found in RSS feed");

      const title = item.querySelector("title")?.textContent;
      if (!title) throw new Error("No title found in RSS feed");

      const description = item.querySelector("description")?.textContent;
      if (!description) throw new Error("No description found in RSS feed");
      // remove any color tags from the description
      const descriptionClean = description.replace(
        /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g,
        ""
      );

      const link = item.querySelector("link")?.textContent;
      if (!link) throw new Error("No link found in RSS feed");

      const imageEnclosureQueries = [
        'enclosure[type="image/jpeg"]',
        'enclosure[type="image/jpg"]',
        'enclosure[type="image/png"]',
      ];

      let imageUrl = null;
      // find the first image
      for (const selector of imageEnclosureQueries) {
        const enclosure = item.querySelector(selector);
        if (enclosure) {
          imageUrl = enclosure.getAttribute("url");
          break;
        }
      }

      setPost({
        title,
        description: descriptionClean,
        link,
        imageUrl,
      });
    };

    const getRSS = async () => {
      try {
        const response = await makeRSSRequest(url);
        if (!response.ok)
          throw new Error("Error fetching RSS feed: " + response.error);

        const text = response.data;
        if (!text) throw new Error("No data received from RSS feed");

        // parse xml from the text
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        getRSSContent(xml);
      } catch (e) {
        setPost({
          title: "Error",
          description: (e as Error).message,
        });
      }
    };
    getRSS();
  }, [url]);

  useEffect(() => {
    const descriptionElement = document.getElementById(`${id}-rss-description`);
    if (!descriptionElement) return;
    descriptionElement.innerHTML = post.description;
  }, [post.description, id]);

  return (
    <Card
      id={id}
      title={title}
      close={close}
      resizeable="nwse"
      initialSize={{ width: 600, height: 400 }}
    >
      <div className="column" style={{ padding: "0 0.7rem" }}>
        <h2>
          <a href={post.link}>{post.title}</a>
        </h2>

        {post.imageUrl ? (
          <img style={{ width: "100%", height: "auto" }} src={post.imageUrl} />
        ) : null}

        <p id={`${id}-rss-description`}></p>
      </div>
    </Card>
  );
};

export default RSSFeed;
