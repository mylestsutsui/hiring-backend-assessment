import { Body, Get, JsonController, Post, Patch, Delete, Param, UseBefore, NotFoundError} from "routing-controllers";
import { Cars } from "../../models";
import { VinMiddleware } from "../../middleware";
import bodyParser from "body-parser";

// controller for handling requests to /cars route
@JsonController("/cars")
export class UserController {
  // get a list of all cars
  @Get()
  getAll(): Promise<Cars[]> {
    return Cars.find();
  }

  // getting single car info given id
  @Get("/:id")
  getOne(@Param("id") id: string): Promise<Cars> {
    const car = Cars.findOne(id);
    if(!car) throw new NotFoundError("Car was not found.");
    return car;
  }

  // add new vehicles to database
  @Post()
  // parse the request body and pass it off to vin decoding middleware
  @UseBefore(bodyParser.json(), VinMiddleware)
  // save the vehicle information from the requst body in the databasae
  create(@Body() body: Pick<Cars, "id">): Promise<Cars> {
    return Cars.create(body).save();
  }

  // update vehicle information
  @Patch("/:id")
  patch(@Param("id") id: string, @Body() body: Partial<Cars>) {
    return Cars.update(id, body);
  }

  // delete vehicles from the database
  @Delete("/:id")
  remove(@Param("id") id: string) {
    return Cars.delete(id);
  }
}