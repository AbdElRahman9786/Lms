import { TailSpin } from "react-loader-spinner"

function Loading(){
    return(
        <>
           <div className="flex items-center justify-center absolute top-0 left-0 bottom-0 w-[100%] bg-slate-50 opacity-45">
   <TailSpin
     color="#3b82f6" // Tailwind's blue-400 color
    
   />
 </div>
        </>
    )
}
export default Loading