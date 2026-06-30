import {Routes , Route} from "react-router";
import {Header} from "./components/Homepage/Header.tsx";
import {Homepage} from "./pages/Homepage.tsx";
import {Footer} from "./components/Homepage/Footer.tsx";

function App() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-surface group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-container-max-width flex-1">
            <Header/>
            <Routes>
                <Route path='/' element={<Homepage/>}/>
            </Routes>

          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default App
