import {
  Body,
  Post,
  JsonController,
  Get,
  Put,
  Param,
  Delete,
} from "routing-controllers";
import {
  getBuses,
  createBus,
  updateBus,
  deleteBus,
  CreateBusParams,
  UpdateBusParams,
} from "src/services/bus";

@JsonController("/buses")
export class BusController {
  @Get("")
  async getBuses() {
    return {
      result: await getBuses(),
    };
  }
  @Post("")
  async createBus(@Body() params: CreateBusParams) {
    return {
      result: await createBus(params),
    };
  }
  @Put("/:id")
  async updateBus(@Param("id") id: number, @Body() params: UpdateBusParams) {
    return {
      result: await updateBus(id, params),
    };
  }
  @Delete("/:id")
  async deleteBus(@Param("id") id: number) {
    return {
      result: await deleteBus(id),
    };
  }
}
