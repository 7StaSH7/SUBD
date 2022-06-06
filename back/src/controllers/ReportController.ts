import {
  Body,
  Post,
  JsonController,
  Get,
  Put,
  Param,
  Delete,
} from "routing-controllers";
import { getReport } from "src/services/report";

@JsonController("/reports")
export class ReportController {
  @Get("")
  async getReport() {
    return {
      result: await getReport(),
    };
  }
}
