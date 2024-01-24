import fastify from "fastify";
import multipart from "@fastify/multipart";
export const app = fastify();
import { defineRoute } from "../utils/defineroute";
const port = 3333;

app.register(multipart);
app.register(defineRoute("user.route"));
app
  .listen({
    port: port,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`server running on port ${port}`);
  });
