import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import {
  fetchAllPartners,
  deletePartner,
  clearPartnerState,
  Partner,
} from "../../Redux/Slice/partnerSlice";
import { RootState, AppDispatch } from "../../Redux/Store/store";
import PartnerForm from "./PartnerForm";

const AdminPartnerPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { partners, loading, error } = useSelector(
    (state: RootState) => state.partners
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    dispatch(fetchAllPartners());
    dispatch(clearPartnerState());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setFeedback({ message: error, type: "error" });
    }
  }, [error]);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this partner?")) {
      try {
        await dispatch(deletePartner(id)).unwrap();
        setFeedback({ message: "Partner deleted successfully", type: "success" });
      } catch (err) {
        setFeedback({
          message: typeof err === "string" ? err : "Failed to delete partner",
          type: "error",
        });
      }
    }
  };

  const handleFormClose = (success?: boolean, message?: string) => {
    setIsFormOpen(false);
    setEditingPartner(null);
    if (success && message) {
      setFeedback({ message, type: "success" });
      dispatch(fetchAllPartners());
    }
  };

  return (
    <section className="p-4 rounded-lg shadow max-w-4xl mx-auto">
      <Helmet>
        <title>Partner Management</title>
        <meta name="description" content="Manage partners from admin panel" />
      </Helmet>

      <h1 className="text-2xl font-bold mb-4">Partner Management</h1>

      {feedback && (
        <div
          className={`mb-4 p-3 rounded ${
            feedback.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <button
        className="btn-primary mb-4"
        onClick={() => {
          setEditingPartner(null);
          setIsFormOpen(true);
        }}
      >
        + Add Partner
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border border-collapse">
          <thead>
            <tr className=" text-left">
              <th className="p-2 border">Logo</th>
              <th className="p-2 border">Company Name</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner._id} className="border">
                <td className="p-2 border">
                  {partner.logo ? (
                    <img src={partner.logo} alt="Logo" className="h-8 w-8 object-contain" />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-2 border">{partner.companyName}</td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    className="btn-primary px-2 py-1"
                    onClick={() => {
                      setEditingPartner(partner);
                      setIsFormOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger px-2 py-1"
                    onClick={() => handleDelete(partner._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isFormOpen && (
        <div className="mt-6">
          <PartnerForm existingPartner={editingPartner} onClose={handleFormClose} />
        </div>
      )}
    </section>
  );
};

export default AdminPartnerPage;
