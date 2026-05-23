import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet
} from "@tanstack/react-router";

import Home from "../Pages/Home";
import Inventario from "../Pages/Inventario/Inventario";

const rootRoute = createRootRoute({
    component: function RootLayout() {
        return (
            <>
                <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
                    <Link to="/" activeProps={{ style: { fontWeight: "bold" } }}>
                        Home
                    </Link>

                     <Link to="/inventario" activeProps={{ style: { fontWeight: "bold" } }}>
                        Inventario
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