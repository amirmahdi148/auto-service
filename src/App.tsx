import {Routes , Route} from "react-router";
import {Homepage} from "./pages/Homepage.tsx";

function App() {


  return (
    <>
     <Routes>
        <Route path='/' element={<Homepage/>}></Route>
     </Routes>
    </>
  )
}

export default App
