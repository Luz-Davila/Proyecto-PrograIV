import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet
} from "@tanstack/react-router";

import Home from "../Pages/Home";
import Abonados from "../Pages/Abonados/Abonados";


const rootRoute = createRootRoute({
    component: function RootLayout() {
        return (
            <>
                <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
                    <Link to="/" activeProps={{ style: { fontWeight: "bold" } }}>
                        Home
                    </Link>
                    <Link to="/Abonados" activeProps={{ style: { fontWeight: "bold" } }}>
                        Abonados
                    </Link>
                </nav>
                <section id="center">
                    <Outlet />
                </section>
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
    path: "/Abonados",
    component: Abonados,
});

const routeTree = rootRoute.addChildren([homeRoute, abonadosRoute]);

export const router = createRouter({
    routeTree,
});