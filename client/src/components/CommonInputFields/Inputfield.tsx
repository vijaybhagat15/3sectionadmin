//ederp\client\src\components\CommonInputFields\Inputfield.tsx
import { File } from "node:buffer";
import React, { useState, ChangeEvent } from "react";
import { FiUpload } from "react-icons/fi";

// Extend with option type for select inputs
interface Option {
  value: string;
  label: string;
}

// Extended InputfieldProps to handle all types of inputs including select
export interface InputfieldProps {
  label?: string;
  name: string;
  value?: string | number | readonly string[] | undefined|File;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type: string;
  error?: string;
  required?: boolean;
  accept?: string;
  placeholder?: string;
  disabled?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  rows?: number;
  cols?: number;
  multiple?: boolean;
  className?: string;
  altText?: string;
  options?: Option[]; // Added options for select type
  onFileUrlChange?: (urls: string[], files: File[]) => void; // New prop for handling file URLs
}

/**********************************************************
 * @description Inputfield component for all types of input
 **********************************************************/
const Inputfield: React.FC<InputfieldProps> = ({ label, name, value, onChange, type, error, required, accept, placeholder, disabled, min, max, step, pattern, rows = 4, cols, multiple, className = "", options = [], onFileUrlChange }) => {

  const [isFocused, setIsFocused] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Enhanced handleFileChange to convert images to URL strings
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setFileName(multiple ? `${files.length} files selected` : files[0].name);

      // Convert files to array for easier handling
      const fileArray = Array.from(files);
      const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));

      // Create URLs only for image files
      if (imageFiles.length > 0) {
        const urls: string[] = [];
        const processedFiles: File[] = [];

        // Process each image file
        imageFiles.forEach(file => {
          const reader = new FileReader();

          reader.onload = (event) => {
            if (event.target?.result) {
              const url = event.target.result as string;
              urls.push(url);
              processedFiles.push(file);

              // When all files are processed, update state and call the callback
              if (urls.length === imageFiles.length) {
                setImageUrls(urls);
                if (onFileUrlChange) {
                  onFileUrlChange(urls, processedFiles);
                }
              }
            }
          };

          reader.readAsDataURL(file);
        });
      }
    } else {
      setFileName("");
      setImageUrls([]);
      if (onFileUrlChange) {
        onFileUrlChange([], []);
      }
    }

    // Still call original onChange to maintain compatibility
    onChange(e);
  };

  const baseInputClasses = `w-full px-4 py-2 border border-color rounded-lg text-text-primary input-field ${isFocused ? "ring-2 ring-primary ring-opacity-50" : ""} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div>
      <label className="block text-secondary text-sm font-medium mb-1">
        {label} {required && <span className="error-color">*</span>}
      </label>

      {type === "file" ? (
        <div>
          <label
            className={`cursor-pointer flex items-center gap-2 border mt-1 border-color p-2 rounded-md w-full transition-all ${isFocused ? "ring-2 ring-primary ring-opacity-50" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FiUpload className="text-gray-500" />
            {fileName ? (
              <span className="text-secondary">{fileName}</span>
            ) : (
              <span className="text-sm text-secondary font-medium">
                Upload File
              </span>
            )}
            <input
              type="file"
              className="hidden"
              name={name}
              onChange={handleFileChange}
              accept={accept}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              multiple={multiple}
            />
          </label>

          {/* Preview for image files */}
          {imageUrls.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative w-16 h-16 overflow-hidden rounded border border-gray-200">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value as string}
          onChange={onChange}
          className={baseInputClasses}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          cols={cols}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value as string}
          onChange={onChange as (e: ChangeEvent<HTMLSelectElement>) => void}
          className={baseInputClasses}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiple={multiple}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={baseInputClasses}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          accept={type === "file" ? accept : undefined}
          multiple={type === "file" ? multiple : undefined}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}

      {error && <p className="error-color text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Inputfield;
