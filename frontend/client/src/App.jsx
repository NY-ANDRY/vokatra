import { NavProvider } from './contexts/NavContext';
import { HeaderProvider } from "./contexts/HeaderContext";
import { PanierProvider } from "./contexts/PanierContext.jsx";
import { MenuProvider } from './contexts/MenuContext.jsx';
import AppRoutes from './AppRoutes.jsx';
import Header from './pages/layout/Header.jsx';

function App() {

  return (
    <div className="bg-[#fafafa] leading-5 text-sm text-neutral-900 font-[i]">

      <MenuProvider>
        <PanierProvider>
          <NavProvider>
            <HeaderProvider>
              <div className="flex w-screen h-screen max-h-screen overflow-x-hidden">
                <div className="flex flex-col flex-1">
                  <div className="z-50">
                    <Header />
                  </div>
                  <div id='content' className='flex-1 pb-12 xl:pb-0 h-full max-h-full flex-grow overflow-hidden relative'>
                    <AppRoutes />
                  </div>
                </div>
              </div>
            </HeaderProvider>
          </NavProvider>
        </PanierProvider>
      </MenuProvider>

    </div>
  )
}

export default App
