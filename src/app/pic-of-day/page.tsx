"use client";

import React, { useState } from "react";
import AddDailySnippet from "@/components/adddailysnippet";

const Page = () => {
  const [isAdding, setIsAdding] = useState(false);

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
        </div>
      )}
    </div>
  );
};

export default Page;
