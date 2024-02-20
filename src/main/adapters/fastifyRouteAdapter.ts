import { FastifyRequest } from "fastify/types/request";
import { Controller } from "../../presentation/protocols/controller";
import { FastifyReply } from "fastify/types/reply";

import { HttpRequest } from "../../presentation/protocols/http";

export const adaptRoute = (controller: Controller) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const hhtpRequest: HttpRequest = {
      body: req.body,
    };
    const httpResponse = await controller.handle(hhtpRequest);
    res.status(httpResponse.statusCode).send(httpResponse.body);
  };
};
