import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/Store/store";
import { fetchAllJobs, deleteJob, clearJobState } from "../../Redux/Slice/jobSlice";
import JobForm from "./JobForm";
import { Helmet } from "react-helmet";

const AdminJobsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
const jobs = useSelector((state: RootState) => state.jobs.jobs || []);
  const loading = useSelector((state: RootState) => state.jobs.loading);
  const error = useSelector((state: RootState) => state.jobs.error);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Job | "";
    direction: "ascending" | "descending";
  }>({ key: "", direction: "ascending" });

  const [feedback, setFeedback] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllJobs()).unwrap();
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setFeedback({
          message: typeof err === 'string' ? err : "Failed to fetch jobs",
          type: 'error'
        });
      }
    };

    fetchData();
    dispatch(clearJobState());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setFeedback({ message: error, type: 'error' });
    }
  }, [error]);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await dispatch(deleteJob(id)).unwrap();
        setFeedback({ message: "Job deleted successfully", type: "success" });
      } catch (err) {
        setFeedback({
          message: typeof err === "string" ? err : "Failed to delete job",
          type: "error",
        });
      }
    }
  };

  const handleFormClose = (success?: boolean, message?: string) => {
    setIsFormOpen(false);
    setEditingJob(null);
    if (success && message) {
      setFeedback({ message, type: 'success' });
    }
  };

  const requestSort = (key: keyof Job) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

const filteredAndSortedJobs = [...jobs]
  .filter((job) => {
    const combined = [
      job.jobTitle,
      job.company_name,
      job.location,
      job.role,
      job.department
    ]
      .filter(Boolean) // remove undefined/null
      .map((field) => String(field).toLowerCase())
      .join(" ");

    return combined.includes(searchTerm.toLowerCase());
  })


  return (
    <section className="relative p-6 text-primary bg-surface rounded-lg">
      <Helmet>
        <title>Job Management System</title>
        <meta name="description" content="Manage job listings from admin panel" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">Job Management System</h1>

      {feedback && (
        <div className={`px-4 py-3 rounded mb-4 ${feedback.type === 'success' ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-red-100 text-red-700 border border-red-400'}`}>
          {feedback.message}
          <button onClick={() => setFeedback(null)} className="float-right font-bold">&times;</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <button className="btn-primary" onClick={() => { setEditingJob(null); setIsFormOpen(true); }}>+ Add Job</button>
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full md:w-64 p-2 border border-color rounded-md input-field"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-blue-500 font-semibold">Loading jobs...</p>
      ) : filteredAndSortedJobs.length === 0 ? (
        <p className="py-4">No jobs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-color rounded-lg shadow-md">
            <thead>
              <tr className="text-primary text-left bg-surface">
                <th className="p-3 border border-color">Title</th>
                <th className="p-3 border border-color">Description</th>
                <th className="p-3 border border-color">Company</th>
                <th className="p-3 border border-color">Logo</th>
                <th className="p-3 border border-color">Location</th>
                <th className="p-3 border border-color">Department</th>
                <th className="p-3 border border-color">Type</th>
                <th className="p-3 border border-color">Timing</th>
                <th className="p-3 border border-color">Experience</th>
                <th className="p-3 border border-color">Role</th>
                <th className="p-3 border border-color">Education</th>
                <th className="p-3 border border-color">Skills</th>
                <th className="p-3 border border-color">Open Positions</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
{filteredAndSortedJobs.map((job) => (
  <tr key={job._id} className="border border-color transition">
    <td className="p-3 border border-color">{job.jobTitle}</td>
    <td className="p-3 border border-color">{job.jobDescription}</td>
    <td className="p-3 border border-color">{job.company_name}</td>
    <td className="p-3 border border-color">
      {job.company_logo ? (
        <img src={job.company_logo} alt="Logo" className="h-8 w-8 object-cover" />
      ) : "—"}
    </td>
    <td className="p-3 border border-color">{job.location}</td>
    <td className="p-3 border border-color">{job.department}</td>
    <td className="p-3 border border-color">{job.employment_type}</td>
    <td className="p-3 border border-color">{job.timing}</td>
    <td className="p-3 border border-color">{job.experienceRequired}</td>
    <td className="p-3 border border-color">{job.role}</td>
    <td className="p-3 border border-color">{job.education}</td>
    <td className="p-3 border border-color">
      {job.skills?.length ? job.skills.join(", ") : "—"}
    </td>
    <td className="p-3 border border-color">{job.open_positions ?? "—"}</td>
    <td className="p-3 flex justify-center items-center gap-2">
      <button className="btn-primary px-3 py-1" onClick={() => handleEdit(job)}>Edit</button>
      <button className="btn-danger px-3 py-1" onClick={() => handleDelete(job._id)}>Delete</button>
    </td>
  </tr>
))}

            </tbody>
          </table>
        </div>
      )}

      {isFormOpen && (
        <JobForm existingJob={editingJob} onClose={handleFormClose} />
      )}
    </section>
  );
};

export default AdminJobsPage;
