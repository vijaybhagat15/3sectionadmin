import { useState } from "react";

export default function CalenderData() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="bg-surface p-4 rounded-xl shadow-md">
        <h3 className="font-medium mb-4">{formatDate(selectedDate)}</h3>

        {/* Simple Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-medium text-sm">
              {day}
            </div>
          ))}

          {/* This would be dynamically generated in a real implementation */}
          {Array.from({ length: 35 }).map((_, i) => {
            const day = i - 2; // Offset to make 1st of month fall on correct day
            return (
              <div
                key={i}
                className={`text-center p-2 rounded cursor-pointer ${
                  day === selectedDate.getDate()
                    ? "bg-primary text-primary"
                    : day > 0 && day <= 31
                    ? "bg-surface-hover text-secondary"
                    : "text-secondary"
                }`}
                onClick={() =>
                  day > 0 &&
                  day <= 31 &&
                  setSelectedDate(new Date(2025, 2, day))
                }
              >
                {day > 0 && day <= 31 ? day : ""}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
