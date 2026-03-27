import { createContext, useState } from "react";
export let mycontext=createContext()
import React from "react";
let GlobalContext=(props)=>{
let[logtoken,setlogtoken]= useState(localStorage.getItem("token"));
let [auth,setauth]=useState()
const [user, setUser] = useState(null);
return <mycontext.Provider value={{logtoken,setlogtoken,auth,setauth,user,setUser}}>
 {props.children}
</mycontext.Provider>
}

// export const mycontext = createContext();

// function GlobalContext=(props) => {
//   const [logtoken, setlogtoken] = useState(() => localStorage.getItem("token"));
// let [auth,setauth]=useState()
//   return (
//     <mycontext.Provider value={{ logtoken, setlogtoken,auth,setauth }}>
//       {props.children}
//     </mycontext.Provider>
//   );
// }

 
export default GlobalContext