import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet
} from "@tanstack/react-router";

import Home from "../Pages/Home";


const rootRoute = createRootRoute({
    component: function RootLayout() {
        return (
            <>
                <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
                    <Link to="/" activeProps={{ style: { fontWeight: "bold" } }}>
                        Home
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



const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({
    routeTree,
});