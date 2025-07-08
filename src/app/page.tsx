"use client";

import Circles from "@/components/circles";
import Navbar from "@/components/navbar";
import WeeklyReadme from "@/components/weeklyReadme";
import { useState } from "react";

export default function Home() {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number>(() => {
    const storedValue = localStorage.getItem("currentWeek");
    return storedValue ? JSON.parse(storedValue) : 1;
  });

  return (
    <div>
      <Navbar />
      <Circles
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
      />
      <WeeklyReadme selectedWeek={selectedWeek} />
    </div>
  );
}
