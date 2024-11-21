import "dotenv/config"
import jwt, { JwtPayload } from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "secret"

interface IPayload {
  id: number
  email: string
  name: string
}

export default {
  sign: (payload: IPayload) => jwt.sign(payload, SECRET, { expiresIn: "1d", algorithm: "HS256" }),

  verify: (token: string): IPayload => {
    const decoded = jwt.verify(token, SECRET) as JwtPayload // Hacemos un casting a JwtPayload
    return {
      id: decoded.id as number, // Aseguramos que los valores son correctos
      email: decoded.email as string, // Aseguramos que los valores son correctos
      name: decoded.name as string, // Aseguramos que los valores son correctos
    }
  },
}
