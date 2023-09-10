import React from 'react'
import NavBarMenu from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    
    <>
    {/* navbarı yerleştir */}
    <NavBarMenu></NavBarMenu>

    {/* diğer tüm bileşenler main içerisinde gelsin */}
    <main>
        
        <Outlet></Outlet>
    
        <form action=""></form>
    
    </main>

    </>
  )
}
