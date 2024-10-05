import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishListItem } from '../store/wishListReducer'
import { addCartItem } from '../store/cartReducer'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Wishlist = () => {

    const wishlistItems = useSelector((state) => state.wishList)
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
        {wishlistItems.length > 0 ? (
        <div className="flex flex-wrap gap-8 justify-center py-7 px-2">
            {wishlistItems.map((product) => (
                <div
                    key={product.id}
                    className="bg-gray-300 shadow-lg rounded-lg p-4 w-full sm:w-[320px] md:w-[300px] lg:w-[280px] transition-transform transform hover:scale-105"
                >
                    {/* Product Image */}
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            navigate("/item", { state: product });
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-48 w-full object-contain rounded-md"
                        />
                    </div>

                    {/* Product Title */}
                    <div className="mt-4 text-lg font-semibold text-gray-800 truncate">
                        {product.title}
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            onClick={() => dispatch(addCartItem(product.id))}
                        >
                            Add to Cart
                        </button>
                        <button onClick={() => dispatch(removeWishListItem(product.id))} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                            Remove from Wishlist
                        </button>
                    </div>
                </div>
            ))}
        </div>) : (
        <div className="text-center text-xl font-bold text-gray-500 mt-10">
          Your wishlist is empty!
        </div>
      )}
        
    </>
    )
}

export default Wishlist
