import z, { success } from "zod/v4";

const articleSchema = z.object({
    gametitle: z.string().min(1, "Game title is required").max(80, "Game title must be at most 80 characters long"),
    articletitle: z.string().min(5, "Article title is required").max(80, "Article title must be at most 80 characters long"),
    description: z.string().min(10, "Game description is required").max(2000, "Game description must be at most 2000 characters long"),
    rating: z.coerce.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5")
});

export default async function schemaValidation(formData: FormData) {
    const data = {
        gametitle: formData.get("gametitle"),
        articletitle: formData.get("articletitle"),
        description: formData.get("description"),
        rating: Number(formData.get("rating"))
    };

    const result = await articleSchema.safeParseAsync(data);
    if (!result.success) {
       return { success: false, error: z.treeifyError(result.error)};   // ZodError instance
    } else {
       return { success: true, data: result.data };    // article data conforming to the schema
    }
}