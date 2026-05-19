import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet
} from "@tanstack/react-router";

import Home from "../Pages/Home/Home";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


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



const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({
    routeTree,
});