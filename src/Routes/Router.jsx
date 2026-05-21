import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet
} from "@tanstack/react-router";

import Home from "../Pages/Home/Home";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Admin from "../Pages/Admin/Admin";


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

const adminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/directorio",
    component: Admin,
});



const routeTree = rootRoute.addChildren([homeRoute, adminRoute]);

export const router = createRouter({
    routeTree,
});