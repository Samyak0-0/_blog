"use client";

import React, { useState, useEffect } from "react";
import AddDailySnippet from "@/components/adddailysnippet";
import InstagramFetch from "@/components/test";
import { useParams, useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";

const Page = () => {

  const currentDate = new Date();

  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const [month, setMonth] = useState<number|undefined>(currentDate.getMonth()+1)
  // const [month, setMonth] = useState<number|undefined>(JSON.parse(localStorage.getItem("month")) || currentDate.getMonth()+1)
  
  // const [year, setYear] = useState<number|undefined>(currentDate.getFullYear())
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const formattedDate = date?.toISOString().slice(0, 10);
    setMonth(date?.getMonth()+1)
    // setYear(date?.getFullYear())
    console.log(formattedDate, month)
  }, [date])

  useEffect(() => {
    console.log("month: ",month)
  }, [month])

  // const getDaysDifference = () => {
  //   if (!date) return 0;
  //   const diffInMs = Math.abs(date.getTime() - currentDate.getTime());
  //   return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  // };

  console.log(date);

  useEffect(() => {

    localStorage.setItem("month", JSON.stringify(month))
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
  }, [month]);

  // const [postId, setPostID] = useState("DKH6-sxBx0L");
  // const params = useParams();
  // const [postId] = useState(params.postid as string);

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
        
        const data = buffer.map((e) => 
          e.split(","))
        // const ids = data.map((row) => row[0]);
        setPostID(data);

        console.log(data)
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
      <div className="grid grid-cols-4 gap-0">
        {postId.map((post, index) => {
          return (post[1].split("-")[1] == month)? <div className="bg-red-200 border-2 border-s-orange-200"><InstagramFetch postId={post[0]} key={index} fullDate={post[1]} /></div>: null;
        })}
      </div>
    </div>
  );
};

export default Page;
