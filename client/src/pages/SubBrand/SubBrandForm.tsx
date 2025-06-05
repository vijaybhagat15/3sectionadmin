import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxSelector";
import { Helmet } from "react-helmet";
import {
  addSubBrand,
  updateSubBrand,
  clearSubBrandState,
} from "../../Redux/Slice/subBrandSlice";

interface SubBrandFormProps {
  existingSubBrand?: {
    _id: string;
    name: string;
    description?: string;
    logo?: string;
  };
  onClose: (success?: boolean, message?: string) => void;
}

const SubBrandForm: React.FC<SubBrandFormProps> = ({ existingSubBrand, onClose }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(existingSubBrand?.name || "");
  const [description, setDescription] = useState(existingSubBrand?.description || "");
  const [logo, setLogo] = useState(existingSubBrand?.logo || "");
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogo(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Sub brand name is required");

    try {
      if (existingSubBrand) {
        await dispatch(
          updateSubBrand({
            id: existingSubBrand._id,
            data: { name, description, logo },
          })
        ).unwrap();
        onClose(true, "Sub brand updated successfully");
      } else {
        await dispatch(
          addSubBrand({ name, description, logo })
        ).unwrap();
        onClose(true, "Sub brand created successfully");
      }
    } catch (err: any) {
      setError(err || "Something went wrong");
    } finally {
      dispatch(clearSubBrandState());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <Helmet>
        <title>{existingSubBrand ? "Edit Sub Brand" : "Add Sub Brand"}</title>
        <meta name="description" content="Create or edit a sub brand" />
      </Helmet>

      <div className="bg-surface text-primary p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-primary">
          {existingSubBrand ? "Edit Sub Brand" : "Add Sub Brand"}
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded border bg-background text-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full p-2 rounded border bg-background text-primary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Logo Upload</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 rounded border bg-background text-primary"
            />
            {logo && (
              <img
                src={logo}
                alt="Preview"
                className="mt-2 w-20 h-20 object-cover border rounded"
              />
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary text-white"
            >
              {existingSubBrand ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubBrandForm;
