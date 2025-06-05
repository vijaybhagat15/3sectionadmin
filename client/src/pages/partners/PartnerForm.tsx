import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxSelector";
import { Helmet } from "react-helmet";
import {
  addPartner,
  updatePartner,
  clearPartnerState,
} from "../../Redux/Slice/partnerSlice";

interface PartnerFormProps {
  existingPartner?: {
    _id: string;
    companyName: string;
    logo?: string;
  };
  onClose: (success?: boolean, message?: string) => void;
}

const PartnerForm: React.FC<PartnerFormProps> = ({ existingPartner, onClose }) => {
  const dispatch = useAppDispatch();
  const [companyName, setCompanyName] = useState(existingPartner?.companyName || "");
  const [logo, setLogo] = useState(existingPartner?.logo || "");
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
    if (!companyName.trim()) return setError("Company name is required");

    try {
      if (existingPartner) {
        await dispatch(
          updatePartner({
            id: existingPartner._id,
            data: { companyName, logo },
          })
        ).unwrap();
        onClose(true, "Partner updated successfully");
      } else {
        await dispatch(
          addPartner({ companyName, logo })
        ).unwrap();
        onClose(true, "Partner created successfully");
      }
    } catch (err: any) {
      setError(err || "Something went wrong");
    } finally {
      dispatch(clearPartnerState());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <Helmet>
        <title>{existingPartner ? "Edit Partner" : "Add Partner"}</title>
        <meta name="description" content="Create or edit a partner" />
      </Helmet>

      <div className="bg-surface text-primary  p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-primary">
          {existingPartner ? "Edit Partner" : "Add Partner"}
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              className="w-full p-2 rounded border bg-background text-primary"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
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
              {existingPartner ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerForm;
