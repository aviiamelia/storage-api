import { FastifyInstance } from "fastify";
const path = "/user";

const userRoute = async (app: FastifyInstance) => {
  app.get(path, async (request, response) => {
    response.status(200).send({ message: "deu certo" });
  });
};

export default userRoute;
