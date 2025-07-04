import { useState } from 'react'
import { NavProvider } from './contexts/NavContext';
import { HeaderProvider } from "./contexts/HeaderContext";
import { PanierProvider } from "./contexts/PanierContext.jsx";
import AppRoutes from './AppRoutes.jsx'
import Header from './pages/layout/Header.jsx'
import SideBar from './pages/layout/Sidebar.jsx'

function App() {

  return (
    <div className="bg-[#fafafa] leading-5 text-sm text-neutral-900 font-[i]">

      <PanierProvider>
        <NavProvider>
          <HeaderProvider>
            <div className="flex w-screen h-screen overflow-x-hidden">
              <div className="flex flex-col flex-1">
                <div className="z-50">
                  <Header />
                </div>
                <div id='content' className='flex-1 pb-12 xl:pb-0 flex-grow overflow-y-auto'>
                  <AppRoutes />
                </div>
              </div>
            </div>
          </HeaderProvider>
        </NavProvider>
      </PanierProvider>
    </div>
  )
}

export default App
