import ActivityChart from "./ActivityChart";
import SchoolPerformanceChart from "./SchoolPerformanceChart";
import ApplicationChart from "./ApplicationChart";
import CalenderData from "./CalenderData";
import Events from "./Events";
import SystemNotifications from "./SystemNotifications";
import RecentActive from "./RecentActive";

import { Helmet } from "react-helmet";

const Dashboard: React.FC = () => {

  return (
    <section className="p-6 w-full text-primary overflow-y-auto">
      <Helmet>
        <title>Dashboard - Super Admin Panel</title>
        <meta name="description" content="View key metrics, charts, and system information for the admin dashboard." />
      </Helmet>



      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ActivityChart />
        <SchoolPerformanceChart />
      </div>

      {/* Application Usage Chart */}
      <ApplicationChart />



      {/* Calendar and Events Section */}
      <div className="grid h-96 grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CalenderData />
        <Events />
      </div>

      {/* Recent Activity and System Notifications */}
      <div className="grid grid-cols-1 gap-6">
        <RecentActive />
        <SystemNotifications />
      </div>
    </section>
  );
};

export default Dashboard;