import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

const validateRequest = (schema: ZodSchema) => (req:Request, res: Response,next: NextFunction) => {
    try {
        console.log(typeof(req.body.price))
        req.body = schema.parse(req.body);
        next();
    } catch (error:any) {
        res.status(400).json({message: "Validation failed",error})
    }
};

export default validateRequest;