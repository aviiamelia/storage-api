import { app } from "./config/app";
const port = 3333;

app
  .listen({
    port: port,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`server running on port ${port}`);
  });
