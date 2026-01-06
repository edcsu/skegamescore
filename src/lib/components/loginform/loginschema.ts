import { z } from "zod";
import type { email } from "zod/v4";

export const formSchema = z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(6).max(50)
});

export type FormSchema = typeof formSchema;