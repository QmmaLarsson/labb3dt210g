import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogPostPage from "./pages/BlogPostPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute><AdminPage /></ProtectedRoute>
                )
            },
            {
                path: "/blog/:id",
                element: <BlogPostPage />
            }
        ]
    }
])

export default router;