import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response } from "express";
import axios from "axios";

export class VinMiddleware implements ExpressMiddlewareInterface {

  use(req: Request, res: Response, next?: (err?: any) => any): any {
    axios({
      method: "get",
      url: `http://api.carmd.com/v3.0/decode?vin=${req.body.vin}`,
      headers: {
        "authorization": "Basic ZTJmMWE3ZTAtMWYyOC00M2EwLTkyZDgtNWU1ZTk3ZWI2Zjhk",
        "partner-token": "1bb30426d49d4ce6aad7ff86660b2cf9"
      }
    })
      .then(data => {
        req.body.make = data.data.data.make;
        req.body.year = data.data.data.year;
        req.body.model = data.data.data.model;
        next();
      })
      .catch(err => {
        console.log(err);
      });
  }
}