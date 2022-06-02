import { Bus } from "src/entity/Bus";
import { getRepository } from "typeorm";

export class CreateBusParams extends Bus {
  name!: string;
  driver!: string;
}

export class UpdateBusParams {
  name?: string;
  driver?: string;
}

export const getBuses = async () => {
  const busRep = getRepository(Bus);
  return await busRep.find();
};

export const createBus = async (params: CreateBusParams) => {
  const busRep = getRepository(Bus);
  return await busRep.save(params);
};

export const updateBus = async (id: number, params: UpdateBusParams) => {
  const busRep = getRepository(Bus);
  return await busRep.update(id, params);
};

export const deleteBus = async (id: number) => {
  const busRep = getRepository(Bus);
  return await busRep.delete(id);
};
