import z, { success } from "zod/v4";

const articleSchema = z.object({
    firstname: z.string().min(3, "First name is required").max(50, "First name must be at most 50 characters long"),
    lastname: z.string().min(3, "Last name is required").max(50, "Last name must be at most 50 characters long"),
});

export default async function schemaValidation(formData: FormData) {
    const data = {
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
    };

    const result = await articleSchema.safeParseAsync(data);
    if (!result.success) {
       return { success: false, error: z.treeifyError(result.error)};   // ZodError instance
    } else {
       return { success: true, data: result.data };    // article data conforming to the schema
    }
}