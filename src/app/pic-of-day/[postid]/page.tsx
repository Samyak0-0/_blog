"use client";

import React, { useState, useEffect } from "react";
import AddDailySnippet from "@/components/adddailysnippet";
import InstagramFetch from "@/components/instagramfetch";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter()

  useEffect(() => {
    // Check if page has already been reloaded
    const hasReloaded = sessionStorage.getItem('pageReloaded')
    
    if (!hasReloaded) {
      // Mark as reloaded before reloading
      sessionStorage.setItem('pageReloaded', 'true')
      window.location.reload()
    }
    
    // Cleanup function to remove flag when component unmounts
    return () => {
      sessionStorage.removeItem('pageReloaded')
    }
  }, [])

  // const [postId, setPostID] = useState("DKH6-sxBx0L");
  const params = useParams();
  const [postId] = useState(params.postid as string);

  return (
    <div>
      {isAdding ? (
        <AddDailySnippet />
      ) : (
        <div>
          <h1>Pic of the Day</h1>
          <button
            onClick={() => {
              setIsAdding(!isAdding);
            }}
            className="flex mx-2 items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <span className="text-xl">+</span>
            <span>Today&apos;s Entry</span>
          </button>

          <button
            onClick={() => {
              router.push("/pic-of-day/DKH6-sxBx0L");
            }}
            className="flex mx-2 items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <span className="text-xl">+</span>
            <span>Change Post</span>
          </button>
        </div>
      )}
      <InstagramFetch postId={postId} />
    </div>
  );
};

export default Page;
