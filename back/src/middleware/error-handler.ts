import { Request, Response } from "express";
import { getLogger } from "log4js";
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";

const logger = getLogger();

@Middleware({ type: "after" })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: Request, res: Response, next: () => any) {
    if (!error.httpCode) {
      logger.warn("Error:", req.method, req.path, error);
    }

    res.status(error.httpCode || 500).send({
      meta: {
        error,
      },
    });

    next();
  }
}
