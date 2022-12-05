import React from "react";
import "./app.scss";
import { Navbar, Footer, ScrollToTop } from "./components";
import { Home, Product, Products } from "./pages";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";


const App = () => {
    const Layout = () => {
        return(
            <div className="app">
                <ScrollToTop>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </ScrollToTop>
            </div>
        );
    };

    const router = createBrowserRouter([
        {
            path:"/",
            element:<Layout />,
            children: [
                {
                    path:"/",
                    element:<Home />,
                },
                {
                    path:"/products/:id",
                    element:<Products />,
                },
                {
                    path:"/product/:id",
                    element:<Product />,
                },
            ],
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App