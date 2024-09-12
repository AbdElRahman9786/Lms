import { Link } from "react-router-dom";

function Sidebar(){
    return(
        <>
        <div className="h-[100%] bg-blue-500 text-center text-white px-3 py-5 relative">
            <Link to="/roles/allrooms" className="hover:bg-[#fff] hover:rounded-lg hover:text-black duration-300 px-3 py-5 block "><h3>All Rooms</h3></Link>
            <Link to="/roles/editroom" className="hover:bg-[#fff] hover:rounded-lg hover:text-black duration-300 px-3 py-5 block "><h3>Edit Room</h3></Link>
            <Link to="/roles/addnewroom" className="hover:bg-[#fff] hover:rounded-lg hover:text-black duration-300 px-3 py-5 block "><h3>Add New Room</h3></Link>
<button className="absolute bottom-0  text-center left-0 py-4 w-[100%] bg-[#ddd]  text-black hover:bg-red-500 duration-300">log out</button>
        </div>

       
        </>
    )
}
export default Sidebar;