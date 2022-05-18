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
        "authorization": "Basic ZTJmMWE3ZTAtMWYyOC00M2EwLTkyZDgtNWU1ZTk3ZWI2Zjhk",
        "partner-token": "1bb30426d49d4ce6aad7ff86660b2cf9"
      }
    })
      .then(data => {
        // store the make, model, year in the request body
        req.body.make = data.data.data.make;
        req.body.year = data.data.data.year;
        req.body.model = data.data.data.model;
        // pass of to next middleware/controller
        next();
      })
      .catch(err => {
        console.log(err);
        
      });
  }
}