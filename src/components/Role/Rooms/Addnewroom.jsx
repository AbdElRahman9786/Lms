import { useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button, Divider, Input } from "@mui/material";

function Addnewroom(){
    const [roomNumber,setRoomNumber]=useState('');
    const [building,setRoomBuilding]=useState('');
    const [capacity,setRoomCapacity]=useState('');
    let token = Cookies.get('token');
    const navigate=useNavigate();
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
             
        }
    };
    const mutation=useMutation({
        mutationKey: 'addroom',
        mutationFn: async (data) => {
            try {
                return await axios.post('https://localhost:7015/api/ClassRoom', data, config);
            } catch (error) {
                console.error(error);
                return null;
            }
        },
        onSuccess: (data) => {
            console.log('Room added successfully', data);
            navigate('/Allrooms');
        },
        onError: (error) => {
            console.error('Error adding room', error);
        }
     });
    

   
     return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
          {/* Card Container */}
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Add New Room
            </h1>
            
    
            {/* Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6"
            >
              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Room Number
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter room number"
                    fullWidth
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                </div>
    
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Building Number
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter building number"
                    fullWidth
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setRoomBuilding(e.target.value)}
                  />
                </div>
    
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Room Capacity
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter room capacity"
                    fullWidth
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setRoomCapacity(e.target.value)}
                  />
                </div>
              </div>
    
              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={mutation.isPending}
                  className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-all duration-300 ease-in-out"
                  onClick={() => {
                    mutation.mutate({ roomNumber, building, capacity });
                  }}
                >
                  {mutation.isPending ? "LOADING..." : "Add Room"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      );
}
export default Addnewroom;