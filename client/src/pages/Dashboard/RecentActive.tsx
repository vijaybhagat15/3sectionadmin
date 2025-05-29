import { useState } from "react"


export default function RecentActive() {
    const [activities] = useState([
        { id: 1, title: "New School Registration", date: "2025-03-06", type: "registration" },
        { id: 2, title: "Security Audit Completed", date: "2025-03-08", type: "audit" },
        { id: 3, title: "New School Onboarding", date: "2025-03-10", type: "onboarding" },
        { id: 4, title: "Quarterly Review", date: "2025-03-15", type: "review" },
        { id: 5, title: "New School Onboarding", date: "2025-03-20", type: "onboarding" }
    ])
    return (
        <>
            <div className="bg-surface rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b border-color">
                    <h3 className="font-medium">Recent Activities</h3>
                </div>
                <div className="max-h-[330px] overflow-y-scroll scrollbar-hide hover:scrollbar-show">
                    {activities.map(activity => (
                        <div key={activity.id} className="p-4 bg-surface-hover border border-color">
                            <div className="flex justify-between">
                                <span className="font-medium">{activity.title}</span>
                                <span className="text-sm text-gray-500">{activity.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                {activity.title} has been approved and added to the system.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
