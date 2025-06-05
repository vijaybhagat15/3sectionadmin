import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { fetchAllSubBrands,deleteSubBrand,clearSubBrandState, SubBrand} from "../../Redux/Slice/subBrandSlice";
import { RootState, AppDispatch } from "../../Redux/Store/store";
import SubBrandForm from "./SubBrandForm"; 

const AdminSubBrandPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { subBrands, loading, error } = useSelector(
    (state: RootState) => state.subbrands
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubBrand, setEditingSubBrand] = useState<SubBrand | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    dispatch(fetchAllSubBrands());
    dispatch(clearSubBrandState());
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
    if (window.confirm("Are you sure you want to delete this sub-brand?")) {
      try {
        await dispatch(deleteSubBrand(id)).unwrap();
        setFeedback({ message: "Sub-brand deleted successfully", type: "success" });
      } catch (err) {
        setFeedback({
          message: typeof err === "string" ? err : "Failed to delete sub-brand",
          type: "error",
        });
      }
    }
  };

  const handleFormClose = (success?: boolean, message?: string) => {
    setIsFormOpen(false);
    setEditingSubBrand(null);
    if (success && message) {
      setFeedback({ message, type: "success" });
      dispatch(fetchAllSubBrands());
    }
  };

  return (
    <section className="p-4 rounded-lg shadow max-w-4xl mx-auto">
      <Helmet>
        <title>Sub Brand Management</title>
        <meta name="description" content="Manage sub brands from admin panel" />
      </Helmet>

      <h1 className="text-2xl font-bold mb-4">Sub Brand Management</h1>

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
          setEditingSubBrand(null);
          setIsFormOpen(true);
        }}
      >
        + Add Sub Brand
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border border-collapse">
          <thead>
            <tr className=" text-left">
              <th className="p-2 border">Logo</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subBrands.map((sb) => (
              <tr key={sb._id} className="border">
                <td className="p-2 border">
                  {sb.logo ? <img src={sb.logo} alt="Logo" className="h-8 w-8" /> : "—"}
                </td>
                <td className="p-2 border">{sb.name}</td>
                <td className="p-2 border">{sb.description}</td>
                <td className="p-2 border text-center space-x-2">
                  <button
                    className="btn-primary px-2 py-1"
                    onClick={() => {
                      setEditingSubBrand(sb);
                      setIsFormOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger px-2 py-1"
                    onClick={() => handleDelete(sb._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add/Edit Form */}
      {isFormOpen && (
        <div className="mt-6">
          <SubBrandForm existingSubBrand={editingSubBrand} onClose={handleFormClose} />
          <p>Form UI goes here (SubBrandForm component)</p>
        </div>
      )}
    </section>
  );
};

export default AdminSubBrandPage;
