import z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password should atleast contain 6 characters"),
  username: z
    .string()
    .min(3, "Username must contain atleast 3 characters")
    .max(60, "Username must be less than 60 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers and hyphens. It must start and end with a letter or number"
    )
    .refine(
      (val) => !val.includes("--"),
      "Username connot contain consecutive hyphens"
    )
    .transform((val) => val.toLowerCase()),
});
