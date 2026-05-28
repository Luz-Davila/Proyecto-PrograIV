import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet
} from "@tanstack/react-router";
import Home from "../Pages/Home/Home";
import Abonados from "../Pages/Abonados/Abonados";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Admin from "../Pages/Admin/Admin";
import Inventario from "../Pages/Inventario/Inventario";
import Averias from "../Pages/Averias/Averias";


const rootRoute = createRootRoute({
    component: function RootLayout() {
        return (
            <>
                <Navbar />
                <section id="center">
                    <Outlet />
                </section>
                <Footer />
            </>
        );
    },
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

const abonadosRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/padron",
    component: Abonados,
});

const adminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/directorio",
    component: Admin,
});

const averiasRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/averias",
    component: Averias,
});


const inventarioRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/inventario",
    component: Inventario,
});
const routeTree = rootRoute.addChildren([homeRoute, abonadosRoute, adminRoute, averiasRoute, inventarioRoute]);

export const router = createRouter({
    routeTree,
});