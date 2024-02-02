import { z } from "zod";

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  isAdmin: z.boolean(),
});

type UserTypeSchema = z.infer<typeof userSchema>;

export { userSchema, UserTypeSchema };
