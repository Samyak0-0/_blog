"use client";

import Circles from "@/components/circles";
import Navbar from "@/components/navbar";
import WeeklyJournal from "@/components/weeklyJournal";
import { useState, useEffect } from "react";

export default function Home() {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number>(0)

  useEffect(() => {
    const storedValue = localStorage.getItem("currentWeek");
    if (storedValue) {
      try {
        setCurrentWeek(JSON.parse(storedValue));
      } catch {
        setCurrentWeek(1);
      }
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Circles
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
      />
      <WeeklyJournal selectedWeek={selectedWeek} />
    </div>
  );
}
