import {
  Body,
  Post,
  JsonController,
  Get,
  Param,
  Put,
  Delete,
} from "routing-controllers";
import {
  createRoute,
  CreateRouteParams,
  deleteRoute,
  getRoutes,
  getRoutesByBusId,
  updateRoute,
  UpdateRouteParams,
} from "src/services/route";

@JsonController("/routes")
export class RouteController {
  @Get("")
  async getRoutes() {
    return {
      result: await getRoutes(),
    };
  }
  @Post("")
  async createRoute(@Body() params: CreateRouteParams) {
    return {
      result: await createRoute(params),
    };
  }
  @Put("/:id")
  async updateRoute(
    @Param("id") id: number,
    @Body() params: UpdateRouteParams
  ) {
    return {
      result: await updateRoute(id, params),
    };
  }
  @Delete("/:id")
  async deleteRoute(@Param("id") id: number) {
    return {
      result: await deleteRoute(id),
    };
  }
  @Get("/bus/:busId")
  async getRoutesByBusId(@Param("busId") busid: number) {
    return {
      result: await getRoutesByBusId(busid),
    };
  }
}
