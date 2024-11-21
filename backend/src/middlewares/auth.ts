import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import jwt from "../utils/jwt"

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return next({
      status: StatusCodes.UNAUTHORIZED,
      message: "No token provided",
    })
  }

  try {
    const data = jwt.verify(token)
    res.locals.user = { id: data.id, email: data.email, name: data.name } // Guardar en res.locals
    return next()
  } catch (error) {
    return next({
      status: StatusCodes.UNAUTHORIZED,
      message: "Unauthorized",
    })
  }
}
