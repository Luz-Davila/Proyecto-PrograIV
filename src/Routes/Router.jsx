import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

// Layout principal
const rootRoute = createRootRoute({
  component: function RootLayout() {
    return (
      <section style={{ padding: "1rem" }}>
        <Outlet />
      </section>
    );
  },
});

// Home
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <h1>Home</h1>,
});

// Árbol
const routeTree = rootRoute.addChildren([
  homeRoute,
]);

// Router
export const router = createRouter({
  routeTree,
});