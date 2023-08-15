import Login from "../Auth/Login/Login.jsx";
import Register from "../Auth/Register/Register.jsx";
import Home from "../Home/Home.jsx";
import Documents from "../Pages/Documents/Documents.jsx";


const publicRoutes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/documents', component: Documents},
    {path: '/register', component: Register},
    {path: '/', component: Home}
]

export default publicRoutes;