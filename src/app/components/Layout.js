import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

const Layout = () => {
    return (
        <main className='flex flex-col'>
            <NavBar />
            <Outlet />
        </main>
    )
}

export default Layout
