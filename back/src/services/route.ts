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
  const routes = await routeRep.find({ relations: ["bus"] });
  return Promise.all(
    routes.map(async (route) => {
      return {
        ...route,
        start: route.start.toLocaleString("ru-RU"),
        end: route.end.toLocaleString("ru-RU"),
      };
    })
  );
};

export const createRoute = async (params: CreateRouteParams) => {
  const routeRep = getRepository(Route);
  return await routeRep.save({ ...params, bus: { id: params.busId } });
};

export const updateRoute = async (id: number, params: UpdateRouteParams) => {
  const routeRep = getRepository(Route);
  return await routeRep.update(id, params);
};

export const deleteRoute = async (id: number) => {
  const routeRep = getRepository(Route);
  return await routeRep.delete(id);
};

export const getRoutesByBusId = async (busId: number) => {
  const routeRep = getRepository(Route);
  return await routeRep.find({
    where: { bus: { id: busId } },
    relations: ["bus"],
  });
};
