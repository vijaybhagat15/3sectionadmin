import { z } from "zod";

/************************************************************************************
 * Zod Validations for Registration
 ************************************************************************************/
export const registrationValidationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


/************************************************************************************
 * Zod Validations for Superadmin Login
 ************************************************************************************/
export const loginValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/************************************************************************************
 * Zod Validations for Profile Update
 ************************************************************************************/
export const profileUpdateValidationSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits").optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
});
