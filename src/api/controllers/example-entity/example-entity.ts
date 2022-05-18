import { Body, Get, JsonController, Post, Patch, Delete, Param, UseBefore} from "routing-controllers";

import { Cars } from "../../models";
import { VinMiddleware } from "../../middleware";
import bodyParser from "body-parser";

@JsonController("/cars")
export class UserController {
  @Get()
  get(): Promise<Cars[]> {
    return Cars.find();
  }

  @Post()
  @UseBefore(bodyParser.json(), VinMiddleware)
  create(@Body() body: Pick<Cars, "id">): Promise<Cars> {
    return Cars.create(body).save();
  }

  @Patch()
  patch(@Param("id") id: number, @Body() body: Partial<Cars>) {
    return Cars.update(id, body);
  }

  @Delete("/:id")
  remove(@Param("id") id: string) {
    return Cars.delete(id);
  }

}

