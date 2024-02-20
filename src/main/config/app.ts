import fastify from "fastify";
import multipart from "@fastify/multipart";
import userRoute from "../../routes/user.route";
import cors from "@fastify/cors";

export const app = fastify();
app.register(multipart);
app.register(userRoute);
app.register(cors, { origin: true });
