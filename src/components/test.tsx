"use client";
import React, { useState, useEffect } from "react";

const InstagramFetch = ({ postId }: { postId: string }) => {
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
        className="instagram-media bg-red-600 border border-transparent rounded shadow-sm m-px max-w-[540px] min-w-[326px] w-[calc(100%-2px)]"
        data-instgrm-captioned
        data-instgrm-permalink={`https://www.instagram.com/p/${postId}/?utm_source=ig_embed`}
        data-instgrm-version="14"
      >
        
      </blockquote>
      {/* <script async src="//www.instagram.com/embed.js"></script> */}
    </div>
  );
};

export default InstagramFetch;
