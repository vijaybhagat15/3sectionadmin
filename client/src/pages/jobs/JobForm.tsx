import React, { useState, useEffect } from "react";
import { addJob, updateJob } from "../../Redux/Slice/jobSlice";
import { useAppDispatch } from "../../hooks/reduxSelector";
import { Helmet } from "react-helmet";

interface JobFormProps {
  existingPost?: any; // Using 'any' to accommodate both frontend & backend shapes
  onClose: (success?: boolean, message?: string) => void;
}

const predefinedCategories = [
  "Engineering", "Design", "Marketing", "Sales", "Finance", "HR", "Operations", "IT"
];

const validateImageSize = (base64String: string): boolean => {
  const base64WithoutHeader = base64String.split(',')[1] || base64String;
  const sizeInBytes = (base64WithoutHeader.length * 3) / 4;
  const sizeInMB = sizeInBytes / (1024 * 1024);
  return sizeInMB < 5;
};

const JobForm: React.FC<JobFormProps> = ({ existingPost, onClose }) => {
  const dispatch = useAppDispatch();

  const [jobTitle, setJobTitle] = useState(existingPost?.jobTitle || "");
  const [category, setCategory] = useState(existingPost?.category || "");
  const [company_name, setCompanyName] = useState(existingPost?.company_name || "");
  const [jobDescription, setJobDescription] = useState(existingPost?.jobDescription || "");
  const [company_logo, setCompanyLogo] = useState(existingPost?.company_logo || "");

  const [characterCount, setCharacterCount] = useState(jobDescription.length);
  const [customCategory, setCustomCategory] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCharacterCount(jobDescription.length);
  }, [jobDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedTitle = jobTitle.trim();
    const trimmedCategory = category.trim();
    const trimmedCompany = company_name.trim();
    const trimmedDescription = jobDescription.trim();

    if (!trimmedTitle || !trimmedCategory || !trimmedCompany || !trimmedDescription) {
      setError("All fields are required!");
      return;
    }

    if (!company_logo) {
      setError("Please upload a company logo.");
      return;
    }

    if (trimmedDescription.length < 50) {
      setError("Description must be at least 50 characters long.");
      return;
    }

    setLoading(true);

    try {
      if (existingPost?._id) {
        await dispatch(updateJob({
          id: existingPost._id,
          jobData: {
            jobTitle: trimmedTitle,
            category: trimmedCategory,
            company_name: trimmedCompany,
            jobDescription: trimmedDescription,
            company_logo,
            updatedAt: new Date().toISOString()
          }
        })).unwrap();
        onClose(true, "Job post updated successfully");
      } else {
        await dispatch(addJob({
          jobTitle: trimmedTitle,
          category: trimmedCategory,
          company_name: trimmedCompany,
          jobDescription: trimmedDescription,
          company_logo,
          createdAt: new Date().toISOString()
        })).unwrap();
        onClose(true, "Job post created successfully");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to save job post.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
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
    } else {
      setError("Please upload an image file.");
    }
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

      {/* Category */}
      <div>
        <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-200">Category *</label>
        <div className="relative">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onFocus={() => setShowCategoryDropdown(true)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
          {showCategoryDropdown && (
            <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
              {predefinedCategories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setShowCategoryDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
                >
                  {cat}
                </div>
              ))}
              <div className="flex items-center gap-1 border-t border-gray-200 dark:border-gray-600 px-2 py-2">
                <input
                  type="text"
                  placeholder="Add custom"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="flex-1 px-3 py-1 rounded-l border border-gray-300 dark:border-gray-600 focus:outline-none dark:bg-gray-600 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customCategory.trim()) {
                      setCategory(customCategory.trim());
                      setCustomCategory("");
                      setShowCategoryDropdown(false);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-r"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
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
