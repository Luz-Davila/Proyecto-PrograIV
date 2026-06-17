import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet
} from "@tanstack/react-router";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Abonados from "../Pages/Abonados/Abonados";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Admin from "../Pages/Admin/Admin";
import Inventario from "../Pages/Inventario/Inventario";
import Averias from "../Pages/Averias/Averias";

// Layout público (con Navbar y Footer) — para el landing
const rootRoute = createRootRoute({
    component: function RootLayout() {
        return <Outlet />;
    },
});

const publicLayout = createRoute({
    getParentRoute: () => rootRoute,
    id: "public",
    component: function PublicLayout() {
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

// Layout del dashboard (sin Navbar, sin Footer)
const dashboardLayout = createRoute({
    getParentRoute: () => rootRoute,
    id: "dashboard-layout",
    component: function DashboardLayout() {
        return <Outlet />;
    },
});

const homeRoute = createRoute({
    getParentRoute: () => publicLayout,
    path: "/",
    component: Home,
});

const dashboardRoute = createRoute({
    getParentRoute: () => dashboardLayout,
    path: "/dashboard",
    component: Dashboard,
});

const abonadosRoute = createRoute({
    getParentRoute: () => dashboardLayout,
    path: "/padron",
    component: Abonados,
});

const adminRoute = createRoute({
    getParentRoute: () => dashboardLayout,
    path: "/directorio",
    component: Admin,
});

const averiasRoute = createRoute({
    getParentRoute: () => dashboardLayout,
    path: "/averias",
    component: Averias,
});

const inventarioRoute = createRoute({
    getParentRoute: () => dashboardLayout,
    path: "/inventario",
    component: Inventario,
});

const routeTree = rootRoute.addChildren([
    publicLayout.addChildren([homeRoute]),
    dashboardLayout.addChildren([
        dashboardRoute,
        abonadosRoute,
        adminRoute,
        averiasRoute,
        inventarioRoute,
    ]),
]);

export const router = createRouter({ routeTree });