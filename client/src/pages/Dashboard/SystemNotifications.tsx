import { useState } from "react"

export default function SystemNotifications() {
    const [notifications] = useState([
        { id: 1, title: "Scheduled Maintenance", date: "Coming up", type: "maintenance", description: "System maintenance scheduled for March 10, 2025, 2:00 AM - 4:00 AM." },
        { id: 2, title: "Application Update", date: "1 day ago", type: "update", description: "Version 2.4.1 deployed with improved application processing features." },
        { id: 3, title: "Data Backup Complete", date: "2 days ago", type: "backup", description: "Data backup completed successfully." },
        { id: 4, title: "Security Audit Completed", date: "3 days ago", type: "audit", description: "Security audit completed successfully." },
        { id: 5, title: "New School Registration", date: "4 days ago", type: "registration", description: "New school registered with the system." }
    ])

    return (
        <>
            <div className="bg-surface rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b border-color">
                    <h3 className="font-medium">System Notifications</h3>
                </div>
                <div className="max-h-[330px] overflow-y-scroll scrollbar-hide hover:scrollbar-show">
                    {notifications && notifications.map(notification => (
                        <div key={notification.id} className="p-4 bg-surface-hover border border-color">
                            <div className="flex justify-between">
                                <span className="font-medium">{notification.title}</span>
                                <span className="text-sm text-gray-500">{notification.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                {notification.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}
