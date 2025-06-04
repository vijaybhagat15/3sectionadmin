import React, { useState, useEffect } from "react";
import { addJob, updateJob } from "../../Redux/Slice/jobSlice";
import { useAppDispatch } from "../../hooks/reduxSelector";
import { Helmet } from "react-helmet";

interface JobFormProps {
  existingPost?: any;
  onClose: (success?: boolean, message?: string) => void;
}

const validateImageSize = (base64String: string): boolean => {
  const base64WithoutHeader = base64String.split(',')[1] || base64String;
  const sizeInBytes = (base64WithoutHeader.length * 3) / 4;
  const sizeInMB = sizeInBytes / (1024 * 1024);
  return sizeInMB < 5;
};

const JobForm: React.FC<JobFormProps> = ({ existingPost, onClose }) => {
  const dispatch = useAppDispatch();

  const [jobTitle, setJobTitle] = useState(existingPost?.jobTitle || "");
  const [company_name, setCompanyName] = useState(existingPost?.company_name || "");
  const [jobDescription, setJobDescription] = useState(existingPost?.jobDescription || "");
  const [company_logo, setCompanyLogo] = useState(existingPost?.company_logo || "");
  const [payAmount, setPayAmount] = useState(existingPost?.payAmount || "");
  const [timing, setTiming] = useState(existingPost?.timing || "");
  const [experienceRequired, setExperienceRequired] = useState(existingPost?.experienceRequired || "");
  const [role, setRole] = useState(existingPost?.role || "");
  const [location, setLocation] = useState(existingPost?.location || "");
  const [department, setDepartment] = useState(existingPost?.department || "");
  const [employment_type, setEmploymentType] = useState(existingPost?.employment_type || "");
  const [education, setEducation] = useState(existingPost?.education || "");
  const [skills, setSkills] = useState<string[]>(existingPost?.skills || []);
  const [skillsInput, setSkillsInput] = useState("");
  const [open_positions, setOpenPositions] = useState(existingPost?.open_positions || 1);

  const [characterCount, setCharacterCount] = useState(jobDescription.length);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCharacterCount(jobDescription.length);
  }, [jobDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!jobTitle.trim() || !company_name.trim() || !jobDescription.trim() || !location.trim()) {
      setError("All required fields must be filled.");
      return;
    }

    if (!company_logo) {
      setError("Please upload a company logo.");
      return;
    }

    if (jobDescription.length < 50) {
      setError("Description must be at least 50 characters long.");
      return;
    }

    setLoading(true);

    const jobPayload = {
      jobTitle: jobTitle.trim(),
      company_name: company_name.trim(),
      jobDescription: jobDescription.trim(),
      company_logo,
      payAmount,
      timing,
      experienceRequired,
      role,
      location,
      department,
      employment_type,
      education,
      skills,
      open_positions,
      ...(existingPost?._id ? { updatedAt: new Date().toISOString() } : { createdAt: new Date().toISOString() })
    };

    try {
      if (existingPost?._id) {
        await dispatch(updateJob({ id: existingPost._id, jobData: jobPayload })).unwrap();
        onClose(true, "Job updated successfully");
      } else {
        await dispatch(addJob(jobPayload)).unwrap();
        onClose(true, "Job created successfully");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to submit job post.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      if (!validateImageSize(base64Data)) {
        setError("Encoded image too large.");
        return;
      }
      setCompanyLogo(base64Data);
      setError(null);
    };
    reader.onerror = () => setError("Error reading file.");
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) {
      setError("Please upload a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      if (!validateImageSize(base64Data)) {
        setError("Encoded image too large.");
        return;
      }
      setCompanyLogo(base64Data);
      setError(null);
    };
    reader.onerror = () => setError("Error reading file.");
    reader.readAsDataURL(file);
  };

  return (
<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
  <Helmet>
    <title>{existingPost ? "Edit Job" : "Post a Job"}</title>
    <meta name="description" content="Create or edit a job posting" />
  </Helmet>
  
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-xl transition-all duration-300">
    <button onClick={() => onClose()} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl">
      ✖
    </button>

    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
      {existingPost ? "Edit Job" : "Post a Job"}
    </h2>

    {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Company Logo Upload */}
      <div>
        <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Company Logo *</label>
        <div
          className={`border-2 border-dashed rounded-xl flex items-center justify-center text-center p-6 transition-all ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            id="logo-upload"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="logo-upload" className="cursor-pointer w-full">
            {company_logo ? (
              <img src={company_logo} alt="Logo preview" className="mx-auto max-h-28 rounded-md object-contain" />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">Click or drag an image here</p>
            )}
          </label>
        </div>
      </div>

      {/* Job Title */}
      <div>
        <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Job Title *</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      {/* Company Name */}
      <div>
        <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Company *</label>
        <input
          type="text"
          value={company_name}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      {/* Job Description */}
      <div>
        <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Job Description *</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          required
        />
        <div className="text-sm text-right text-gray-500 dark:text-gray-400">{characterCount} characters</div>
      </div>
{/* Role */}
<div>
  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Role</label>
  <input type="text" value={role} onChange={(e) => setRole(e.target.value)}           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
 />
</div>

{/* Pay Amount */}
<div>
  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Pay Amount</label>
  <input type="text" value={payAmount} onChange={(e) => setPayAmount(e.target.value)}           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
 />
</div>

{/* Timing */}
<div>
  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Timing</label>
  <input type="text" value={timing} onChange={(e) => setTiming(e.target.value)}           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
 />
</div>

{/* Experience Required */}
<div>
  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Experience Required</label>
  <input type="text" value={experienceRequired} onChange={(e) => setExperienceRequired(e.target.value)}           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
 />
</div>

{/* Location */}
<div>
  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Location *</label>
  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
 />
</div>

{/* Department */}
<div>
  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Department</label>
  <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)}           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
 />
</div>

{/* Employment Type */}
<div>
  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Employment Type</label>
  <input type="text" value={employment_type} onChange={(e) => setEmploymentType(e.target.value)}           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
 />
</div>

{/* Education */}
<div>
  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Education</label>
  <input type="text" value={education} onChange={(e) => setEducation(e.target.value)}           className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
 />
</div>

{/* Skills */}
<div>
  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Skills (comma separated)</label>
  <input
    type="text"
    value={skillsInput}
    onChange={(e) => {
      setSkillsInput(e.target.value);
      setSkills(e.target.value.split(",").map(s => s.trim()).filter(Boolean));
    }}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"

  />
</div>

{/* Open Positions */}
<div>
  <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Open Positions</label>
  <input
    type="number"
    min={1}
    value={open_positions}
    onChange={(e) => setOpenPositions(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"

  />
</div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={() => onClose()}
          className="px-4 py-2 border border-gray-400 dark:border-gray-500 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : existingPost ? "Update Job" : "Post Job"}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default JobForm;
