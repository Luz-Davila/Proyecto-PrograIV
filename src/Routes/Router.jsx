import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet
} from "@tanstack/react-router";

import Home from "../Pages/Home/Home";
import Inventario from "../Pages/Inventario/Inventario";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

const rootRoute = createRootRoute({
    component: function RootLayout() {
        return (
            <>
                {/* ✅ Navbar del proyecto */}
                <Navbar />

                {/* 📄 Contenido de las páginas */}
                <section id="center">
                    <Outlet />
                </section>

                {/* ✅ Footer del proyecto */}
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

const inventarioRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/inventario",
    component: Inventario,
});

const routeTree = rootRoute.addChildren([
    homeRoute,
    inventarioRoute
]);

export const router = createRouter({
    routeTree,
});