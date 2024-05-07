import Homepage from "../pages/Homepage/Homepage"
import SignUp from "../pages/SignUp/SignUp"
import LogIn from "../pages/LogIn/LogIn"

export const routes = [
    {
        path: '/',
        page: Homepage,
    },
    {
        path: '/login',
        page: LogIn,
    },
    {
        path: '/signup',
        page: SignUp,
    }
]