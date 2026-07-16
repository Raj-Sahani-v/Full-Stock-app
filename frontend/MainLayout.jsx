
import { NavBar } from './src/components/layout/NavBar'
import { Outlet } from 'react-router'
import Footer from './src/components/layout/Footer'

export const MainLayout = () => {
  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
