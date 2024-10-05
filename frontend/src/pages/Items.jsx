import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../store/cartReducer'
import axios from 'axios'

const Items = () => {
    const location = useLocation()
    console.log(location.state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        
      const fetchdata = async () => {
          // localStorage.getItem("cart")
          try {
              const response = await axios.get('https://e-commerce-be-v4ed.onrender.com/signin',
                  { headers: { authorization: localStorage.getItem("token") } }
              );
              // console.log(response.data);
              // setList(response.data);
          } catch (error) {
              console.error('Error fetching contacts:', error);
              navigate('/signin')
              alert("session expired")
          }
      };

      fetchdata();

  }, );


  return (<>
    <Navbar />
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:max-w-2xl my-8">
    {/* Image Section */}
    <div className="md:flex-shrink-0">
      <img
        className="h-48 w-full object-contain md:w-48"
        src={location.state.image}
        alt={location.state.title}
        />
    </div>

    {/* Details Section */}
    <div className="p-6">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
        {location.state.title}
      </div>

      <p className="mt-2 text-gray-500 text-sm">
        {location.state.description}
      </p>

      {/* Price */}
      <div className="mt-4">
        <span className="text-xl font-bold text-gray-900">Price: ₹{location.state.price}</span>
      </div>

      {/* Rating Section */}
      <div className="mt-4 flex items-center">
        <span className="text-yellow-500 text-xl">⭐</span>
        <span className="ml-2 text-lg font-semibold text-gray-700">
          {location.state.rating.rate} / 5
        </span>
        <span className="ml-4 text-sm text-gray-600">
          ({location.state.rating.count} reviews)
        </span>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-6">
        <button onClick={() => dispatch(addCartItem(location.state.id))} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-indigo-700 transition duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
        </>
  )
}

export default Items
