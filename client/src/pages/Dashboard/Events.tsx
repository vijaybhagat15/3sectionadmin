import { useState } from "react";

export default function Events() {
    const [events] = useState([
        { id: 1, title: "Admin Meeting", date: "2025-03-06", type: "meeting" },
        { id: 2, title: "School Inspection", date: "2025-03-08", type: "inspection" },
        { id: 3, title: "System Maintenance", date: "2025-03-10", type: "maintenance" },
        { id: 4, title: "Quarterly Review", date: "2025-03-15", type: "meeting" },
        { id: 5, title: "New School Onboarding", date: "2025-03-20", type: "onboarding" }
    ]);

    // Function to determine border color based on event type
    const getBorderColor = (type: string) => {
        switch (type) {
            case "meeting":
                return "border-blue-500";
            case "inspection":
                return "border-green-500";
            case "maintenance":
                return "border-red-500";
            case "onboarding":
                return "border-yellow-500";
            default:
                return "border-gray-500";
        }
    };

    return (
        <section className="bg-surface p-4 rounded-xl shadow-md">
            <h3 className="font-medium mb-4">Upcoming Events</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className={`p-3 border-l-3 ${getBorderColor(event.type)} bg-surface rounded`}
                    >
                        <div className="flex justify-between items-center">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-primary">{event.date}</div>
                        </div>
                        <div className="text-sm mt-2 backGroundColor text-secondary rounded-full px-2 py-0.5 inline-block">
                            {event.type}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

