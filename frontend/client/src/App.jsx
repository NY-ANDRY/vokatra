import { useState } from 'react'
import { NavProvider } from './contexts/NavContext';
import { HeaderProvider } from "./contexts/HeaderContext";
import AppRoutes from './AppRoutes.jsx'
import Header from './pages/layout/Header.jsx'
import SideBar from './pages/layout/Sidebar.jsx'

function App() {

  return (
    <div className="bg-[#fafafa] leading-5 text-sm text-neutral-900 font-[i]">
      <NavProvider>
        <HeaderProvider>
          <div className="flex w-screen h-screen overflow-x-hidden">
            {/* <div className="sidebar flex-col border-zinc-300 border-r-[0.5px]"> */}
              {/* <SideBar /> */}
            {/* </div> */}
            <div className="flex flex-col flex-1">
              <Header />
              <div id='content' className='flex-1 flex-grow overflow-y-auto'>
                <AppRoutes />
              </div>
            </div>
          </div>
        </HeaderProvider>
      </NavProvider>
    </div>
  )
}

export default App
