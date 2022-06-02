import { Route } from "src/entity/Route";
import { getRepository } from "typeorm";

export class CreateRouteParams extends Route {
  name!: string;
  start!: Date;
  end!: Date;
  busId!: number;
}

export class UpdateRouteParams {
  name?: string;
  start?: Date;
  end?: Date;
  busId?: number;
}

export const getRoutes = async () => {
  const routeRep = getRepository(Route);
  return await routeRep.find();
};

export const createRoute = async (params: CreateRouteParams) => {
  const routeRep = getRepository(Route);
  return await routeRep.save(params);
};

export const updateRoute = async (id: number, params: UpdateRouteParams) => {
  const routeRep = getRepository(Route);
  return await routeRep.update(id, params);
};

export const deleteRoute = async (id: number) => {
  const routeRep = getRepository(Route);
  return await routeRep.delete(id);
};
