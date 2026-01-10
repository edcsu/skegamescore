import { z } from "zod";

export const formSchema = z.object({
    email: z.email("Invalid email address").max(50, "Email must be at most 50 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(50, "Password must be at most 50 characters long")
});

export type FormSchema = typeof formSchema;