  import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import GlobalContext, {mycontext} from "./components/GlobalContext";
import Threads from "./animations/Threads";
function App() {
  return (<> 
  <div className="bg-black min-h-screen"> 
  <ToastContainer/>
   <GlobalContext> 
      <NavBar />
    {/* <Threads>  */}
      <Outlet />
      {/* </Threads> */}
   </GlobalContext>
   </div>
      </>
  );
}

export default App;
