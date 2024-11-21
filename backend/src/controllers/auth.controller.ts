import bcrypt from "bcryptjs"
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prisma"
import jwt from "../utils/jwt"

class AuthController {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body

    if (!email || !password) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Some required fields are missing",
      })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return next({
        status: StatusCodes.NOT_FOUND,
        message: "User not found",
      })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return next({
        status: StatusCodes.UNAUTHORIZED,
        message: "Invalid password",
      })
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name })

    res.status(StatusCodes.OK).json({ token, user: { id: user.id, email: user.email, name: user.name } })
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Some required fields are missing",
      })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (user) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "User already exists",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    await prisma.user.create({
      data: { email, password: hashedPassword, name },
    })

    res.status(StatusCodes.CREATED).json({ message: "User created" })
  }
}

export default new AuthController()
