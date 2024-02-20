import { FastifyInstance } from "fastify";
import { makeUserController } from "../factories/user";
import { adaptRoute } from "../adapters/fastifyRouteAdapter";
const path = "/user";

const userRoute = async (app: FastifyInstance) => {
  app.post(path, adaptRoute(makeUserController()));
};

export default userRoute;
