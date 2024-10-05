import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseCartItemQuantity, increaseCartItemQuantity, removeCartItem } from '../store/cartReducer'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {
  const products = useSelector((state) => state.products)
  const cartItems = useSelector((state) => state.cartItems)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {

    const fetchdata = async () => {
      try {
        const response = await axios.get('https://e-commerce-be-v4ed.onrender.com/signin',
          { headers: { authorization: localStorage.getItem("token") } }
        );
        console.log(response.data);
        // setList(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        alert("session expired")
        navigate('/signin')
      }
    };

    fetchdata();

  },);

  return (<>
    <Navbar />
    <div className="container mx-auto p-4 border-2 mt-2 ">
      {cartItems.length > 0 ? (
        <>
          {/* Table for Cart Items */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-slate-400 text-gray-700">
                  <th className="py-2 px-4">Item</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((e) => (
                  <tr key={e.id} className="text-center border-t">
                    {/* Item Image and Title */}
                    <td className="md:flex md:flex-col items-start py-4 text-left">
                      <div onClick={() => navigate("/item", { state: e })} className="md:flex md:space-x-2 cursor-pointer">
                        <img src={e.image} alt={e.title} className="w-20 h-20 object-contain" />
                        <h3 className="font-semibold text-gray-800 mt-2">{e.title}</h3>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 text-xl">₹{e.price}</td>

                    {/* Quantity Controls */}
                    <td className="py-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => dispatch(decreaseCartItemQuantity(e.id))}
                          className={`px-2 ${e.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'bg-red-500 text-white rounded-full hover:bg-red-600'}`}
                          disabled={e.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-3 text-lg font-bold">{e.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseCartItemQuantity(e.id))}
                          className="px-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Total Price */}
                    <td className="py-4 text-xl">₹{e.quantity * e.price}</td>

                    {/* Remove Item Button */}
                    <td className="py-4">
                      <button
                        onClick={() => dispatch(removeCartItem(e.id))}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <img src="https://img.icons8.com/?size=100&id=104338&format=png&color=ffffff" alt="Remove" className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Price Section */}
          <div className="flex flex-col items-end mt-6">
            <div className="text-xl font-bold">TOTAL: ₹{Math.round(cartItems.reduce((acc, e) => acc + e.price * e.quantity, 0))}</div>

            {/* Proceed to Payment Button */}
            <button
              onClick={() => navigate('/payment')}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-all"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-xl font-bold text-gray-500 mt-10">
          Your cart is empty!
        </div>
      )}
    </div>
  </>
  )
}

export default Cart
