import React from 'react'

//passing static data
const data = [
    { page: "Home", totalVisits: 5000, avgTime: "3m 20s", exitRate: "30%" },
    { page: "Dashboard", totalVisits: 3500, avgTime: "5m 10s", exitRate: "15%" },
    { page: "Profile", totalVisits: 2000, avgTime: "2m 40s", exitRate: "45%" }
  ];

  const head="border border-gray-300 px-4 py-2"
  const bodyStyling="border border-gray-300 px-4 py-2"

const Table = () => {
  return (
    <div className="p-6">

        {/* title */}
    <h1 className="text-xl font-bold text-center my-2">Total data</h1>

        {/* tablular Information */}
    <table className="p-6 min-h-[300px] border-collapse border w-full ">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className={head}>Page Name</th>
          <th className={head}>Total Visits</th>
          <th className={head}>Avg Time Spent</th>
          <th className={head}>Exit Rate</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="text-center">
            <td className={bodyStyling}>{row.page}</td>
            <td className={bodyStyling}>{row.totalVisits}</td>
            <td className={bodyStyling}>{row.avgTime}</td>
            <td className={bodyStyling}>{row.exitRate}</td>
          </tr>
        ))}
      </tbody>
    </table>

</div>
  )
}

export default Table
