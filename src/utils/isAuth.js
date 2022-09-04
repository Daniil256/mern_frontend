import { useSelector } from "react-redux"
import { selectIsAuth } from "../redux/slices/auth"
const isAuth = () => useSelector(selectIsAuth)

export default isAuth