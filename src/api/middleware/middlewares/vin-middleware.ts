import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response } from "express";
import axios from "axios";

// declare vin middleware class

export class VinMiddleware implements ExpressMiddlewareInterface {

  use(req: Request, res: Response, next: (err?: Error) => any): void {
    // make get request to vin decoding api
    axios({
      method: "get",
      // include vin from req.body in url
      url: `http://api.carmd.com/v3.0/decode?vin=${req.body.vin}`,
      // include headers to verify permission to access external API
      headers: {
        "authorization": process.env.AUTHORIZATION,
        "partner-token": process.env.PARTNER_TOKEN
      }
    })
      .then(data => {
        // check if valid vin
        if(data.data.message.code !== 0) res.status(404).send({
          error: "invalid vin"
        });
        // store the make, model, year in the request body
        req.body.make = data.data.data.make;
        req.body.year = data.data.data.year;
        req.body.model = data.data.data.model;
        // pass off to next middleware/controller
        next();
      })
      .catch(err => {
        console.log("This is the vin api error: ", err);
        next(err);
      });
  }
}