import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet,
    redirect,
} from "@tanstack/react-router";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Abonados from "../Pages/Abonados/Abonados";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Admin from "../Pages/Admin/Admin";
import Inventario from "../Pages/Inventario/Inventario";
import Averias from "../Pages/Averias/Averias";
import Login from "../Pages/Login/Login";

// Helper: ¿hay token guardado?
function isAuthenticated() {
    return !!localStorage.getItem("token");
}

// Layout raíz
const rootRoute = createRootRoute({
    component: function RootLayout() {
        return <Outlet />;
    },
});

// Layout público (con Navbar y Footer)
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
    // Protección: si no hay token, redirige al login
    beforeLoad: () => {
        if (!isAuthenticated()) {
            throw redirect({ to: "/login" });
        }
    },
    component: function DashboardLayout() {
        return <Outlet />;
    },
});

// Rutas públicas
const homeRoute = createRoute({
    getParentRoute: () => publicLayout,
    path: "/",
    component: Home,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    // Si ya está logueado, lo manda directo al dashboard
    beforeLoad: () => {
        if (isAuthenticated()) {
            throw redirect({ to: "/dashboard" });
        }
    },
    component: Login,
});

// Rutas protegidas
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
    loginRoute,
    dashboardLayout.addChildren([
        dashboardRoute,
        abonadosRoute,
        adminRoute,
        averiasRoute,
        inventarioRoute,
    ]),
]);

export const router = createRouter({ routeTree });
