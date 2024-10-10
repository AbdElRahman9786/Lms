import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Loading/Loading"; // Assuming you already have a Loading component

function EditRoom() {
  let { roomNumber } = useParams();
  let token = Cookies.get("token");
  let navigate = useNavigate();
  const [capacity, setCapacity] = useState("");
  const queryClient = useQueryClient(); // Use this to invalidate queries

  // Configuration for axios headers
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // React Query Mutation for Editing the Room Capacity
  const editRoomMutation = useMutation({
    mutationFn: async (newCapacity) => {
      
         await axios.put(
          `https://localhost:7015/api/ClassRoom/${roomNumber}/Capacity`,
           newCapacity,
          config
        );
    },
    onSuccess:()=>{
        
        queryClient.invalidateQueries('rooms');
        navigate("/allrooms");
    },
    onError: (err) => {
        alert(err.message);
      },
  })


  const handleSubmit = (e) => {
    e.preventDefault();
    const capacityValue = Number(capacity);

    // Check if the input is a valid number
    if (isNaN(capacityValue)) {
      console.error("Invalid capacity value");
      return;
    }

    // Trigger the mutation to update room capacity
    editRoomMutation.mutate(capacityValue);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Show loading spinner while mutation is in progress */}
      {editRoomMutation.isLoading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Edit Room Capacity
          </h2>

          {/* Input field */}
          <div className="mb-4">
            <label
              htmlFor="capacity"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              New Capacity:
            </label>
            <input
              type="number"
              id="capacity"
              placeholder="Enter new capacity"
              name="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Capacity
            </button>
          </div>

          {/* Show error message if mutation fails */}
          {editRoomMutation.isError && (
            <div className="mt-4 text-red-500 text-sm">
              There was an error updating the room capacity. Please try again.
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default EditRoom;
