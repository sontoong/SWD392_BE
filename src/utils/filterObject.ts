import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

export const filterObject = (obj: object, filterFields: string[]) => {
  return _.pick(obj, filterFields);
};

export const filterRoutes = function (path: string, middleware: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (path !== req.baseUrl) {
      return middleware(req, res, next);
    }
    next();
  };
};
