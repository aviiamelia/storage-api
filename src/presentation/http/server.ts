import fastify from "fastify";
import multipart from "@fastify/multipart";
import userRoute from "../../routes/user.route";
const port = 3333;

const app = fastify();
app.register(multipart);
app.register(userRoute);
app
  .listen({
    port: port,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`server running on port ${port}`);
  });
