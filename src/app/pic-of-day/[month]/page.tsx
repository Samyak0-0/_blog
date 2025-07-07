"use client";

import React, { useState, useEffect } from "react";
import AddDailySnippet from "@/components/adddailysnippet";
import InstagramFetch from "@/components/test";
import { useParams, useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import InstagramFetchPics from "@/components/instagramfetchpics";

const Page = () => {
  const params = useParams();
  const selectedDate = new Date(params.month as string);
  const [date, setDate] = React.useState<Date | undefined>(selectedDate);

  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // if(date == new Date()){
    //   return
    // }
    if (date?.getMonth() + 1 != selectedDate.getMonth() + 1) {
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      router.push(`/pic-of-day/${formattedDate}`);
    }
  }, [date]);

  console.log(date);

  useEffect(() => {
    // Check if page has already been reloaded
    const hasReloaded = sessionStorage.getItem("pageReloaded");

    if (!hasReloaded) {
      // Mark as reloaded before reloading
      sessionStorage.setItem("pageReloaded", "true");
      window.location.reload();
    }

    // Cleanup function to remove flag when component unmounts
    return () => {
      sessionStorage.removeItem("pageReloaded");
    };
  }, []);

  const [postId, setPostID] = useState([]);

  useEffect(() => {
    fetch("/database.csv")
      .then((res) => res.text())
      .then((text) => {
        // Trim, split by newline, and filter out empty lines
        const buffer = text
          .trim()
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);

        const data = buffer.map((e) => e.split(","));
        // const ids = data.map((row) => row[0]);
        setPostID(data);

        console.log(data);
      });
  }, []);

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
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      )}
      <div className="grid grid-cols-3 gap-0">
        {postId.map((post, index) => {
          return post[1].split("-")[1] == selectedDate.getMonth() + 1 ? (
            <div
              className=""
              key={index}
            >
              {/* <InstagramFetch postId={post[0]} key={index} /> */}
              <InstagramFetchPics postId={post[0]} key={index} />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Page;
