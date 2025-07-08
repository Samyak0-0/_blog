"use client";

import React, { useState, useEffect } from "react";

type Props = {
  selectedWeek: number | null;
  setSelectedWeek: (week: number | null) => void;
  currentWeek: number;
  setCurrentWeek: (week: number) => void;
};

const Circles = ({
  selectedWeek,
  setSelectedWeek,
  currentWeek,
  setCurrentWeek,
}: Props) => {
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    week: number | null;
  }>({ visible: false, x: 0, y: 0, week: null });

  // Hide context menu on click elsewhere
  useEffect(() => {
    const handleClick = () =>
      setContextMenu({ ...contextMenu, visible: false });
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [contextMenu]);

  return (
    <div className="relative">
      {/* Circles Grid */}
      <div className="grid grid-flow-col grid-rows-5 place-items-center gap-3 m-2 h-[90vh]">
        {weeks.map((week) => (
          <div
            key={week}
            onClick={() => {
                localStorage.setItem("currentWeek", JSON.stringify(week))
                setSelectedWeek(week == selectedWeek? null : week)
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenu({
                visible: true,
                x: e.clientX,
                y: e.clientY,
                week,
              });
            }}
            className={`text-5xl font-sans border-4 ${
              week == selectedWeek
                ? " border-neutral-900 text-black text-6xl"
                : week == currentWeek
                ? " bg-lime-300 border-teal-500 text-white"
                : week < currentWeek
                ? " bg-neutral-700 border-neutral-900 text-white"
                : " bg-neutral-300 text-white border-neutral-600 "
            }`}
            style={{
              height: "100%",
              aspectRatio: "1/1",
              borderRadius: "50%",
              
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              cursor: "pointer",
              userSelect: "none",
              WebkitTextStrokeWidth: week==selectedWeek? "0px" : week == currentWeek? "1px":"1px",
              WebkitTextStrokeColor: week==selectedWeek? "black" : week == currentWeek? "#188c80" :"black"
            }}
            // backgroundColor:
            //     selectedWeek === week
            //       ? "#0070f3"
            //       : currentWeek === week
            //       ? "#00C851" // highlight current week differently
            //       : "#ccc",
          >
            {week}
          </div>
        ))}
      </div>

      {/* Custom Context Menu */}
      {contextMenu.visible && (
        <div
          style={{
            position: "fixed",
            top: contextMenu.y,
            left: contextMenu.x,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => {
              if (contextMenu.week !== null) {
                setCurrentWeek(contextMenu.week);
              }
              setContextMenu({ ...contextMenu, visible: false });
            }}
            className="px-4 py-2 hover:bg-gray-200 text-left w-full"
          >
            Set as Current Week
          </button>
        </div>
      )}
    </div>
  );
};

export default Circles;
