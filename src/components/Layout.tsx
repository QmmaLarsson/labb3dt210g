import { Outlet } from "react-router-dom"
import Header from "./Header"

const Layout = () => {
    return (
        <>
            <div className="page">
                <Header />
                <main><Outlet /></main>
                <footer>&copy; Emma Larsson</footer>
            </div>
        </>
    )
}

export default Layout
