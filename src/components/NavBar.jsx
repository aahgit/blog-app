import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogoutBtn } from "../components"

const NavBar = () => {

    const navigate = useNavigate()
    const links = [
        {
            label: "Home",
            routs: "/",
            imgurl: "/icons/home.svg"
        },
        {
            label: "Profile",
            routs: "/profile",
            imgurl: "/icons/profile.svg"
        },
        {
            label: "Search",
            routs: "/search",
            imgurl: "/icons/search.svg"
        },

        {
            label: "Upload",
            routs: "/upload",
            imgurl: "/icons/upload.svg"
        },
        {
            label: "Settings",
            routs: "/settings",
            imgurl: "/icons/settings.svg"
        },
    ];

    return (
        <div>
            <nav className='w-screen bg-indigo-500 h-16 flex items-center justify-evenly'>
                LOGO
                {links.map((link) => (
                    <NavLink to={link.routs} key={link.label}
                        className={({ isActive }) =>
                            isActive ? "border-b-2 border-black" : ""
                        }
                    >{link.label}</NavLink>
                ))}
                <LogoutBtn />
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar
