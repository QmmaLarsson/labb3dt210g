import { Outlet } from "react-router-dom"
import Header from "./Header"

const Layout = () => {
    return (
        <>
            <Header />
            <main><Outlet /></main>
            <footer>Emma Larsson</footer>
        </>
    )
}

export default Layout
