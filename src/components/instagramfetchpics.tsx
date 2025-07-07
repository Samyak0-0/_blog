import React, { useState, useEffect } from "react";

const InstagramFetchPics = ({ postId }: { postId: string }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    const script = document.createElement("script");
    script.setAttribute("src", "https://www.instagram.com/embed.js");
    script.setAttribute("async", "true");
    document.body.appendChild(script);
  }, []);

  if (!isClient) return null;

  return (
    <div>
      <blockquote
        className="instagram-media bg-white border border-transparent rounded shadow-sm m-px min-w-[326px] w-[calc(100%)]"
        data-instgrm-permalink={`https://www.instagram.com/p/${postId}/?utm_source=ig_embed&amp;utm_campaign=loading`}
        data-instgrm-version="14"
      ></blockquote>
    </div>
  );
};

export default InstagramFetchPics;
