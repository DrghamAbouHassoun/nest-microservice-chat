import { jwtDecode } from "jwt-decode"
import { IUser } from "../app/features/auth.slice"

const decodeToken = (token: string) => {
  return jwtDecode<IUser>(token)
}

export default decodeToken