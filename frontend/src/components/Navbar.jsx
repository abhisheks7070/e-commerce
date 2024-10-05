import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const cartItems = useSelector((state) => state.cartItems)
  const wishlistItems = useSelector((state) => state.wishList)
  console.log(wishlistItems)
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleClick = () => {
    localStorage.setItem("token", "")
    navigate("/")
    // setTimer(0)
  }

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-20">
    <div className="container mx-auto flex items-center justify-between">
      {/* Brand / Logo */}
      <div className="text-white text-2xl font-bold">
        <Link to="/home" className="hover:text-gray-300">
          MYSHOPEE
        </Link>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>

      {/* Links for Desktop */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Wishlist Icon */}
        <Link to="/wishlist" className="relative flex items-center text-white">
          {wishlistItems.length > 0 && (
            <div className="absolute -top-2 -right-3 bg-yellow-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {wishlistItems.length}
            </div>
          )}
          <img
            className="w-8 h-8"
            src="https://img.icons8.com/?size=100&id=86357&format=png&color=FF0000"
            alt="Wishlist"
          />
          <span className="ml-2">Wishlist</span>
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="relative flex items-center text-white">
          {cartItems.reduce((acc, e) => acc + e.quantity, 0) > 0 && (
            <div className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.reduce((acc, e) => acc + e.quantity, 0)}
            </div>
          )}
          <img
            className="w-8 h-8"
            src="https://img.icons8.com/?size=100&id=9720&format=png&color=ffffff"
            alt="Cart"
          />
          <span className="ml-2">Cart</span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleClick}
          className="text-white font-bold hover:text-gray-300 transition-all"
        >
          Logout
        </button>
      </div>
    </div>

    {/* Mobile Menu Dropdown */}
    {isMenuOpen && (
      <div className="md:hidden">
        <div className="bg-gray-700 p-4 space-y-4">
          {/* Wishlist Icon */}
          <Link to="/wishlist" className="relative flex items-center text-white">
            {wishlistItems.length > 0 && (
              <div className="absolute -top-2 -right-3 bg-yellow-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistItems.length}
              </div>
            )}
            <img
              className="w-8 h-8"
              src="https://img.icons8.com/?size=100&id=86357&format=png&color=FF0000"
              alt="Wishlist"
            />
            <span className="ml-2">Wishlist</span>
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative flex items-center text-white">
            {cartItems.reduce((acc, e) => acc + e.quantity, 0) > 0 && (
              <div className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.reduce((acc, e) => acc + e.quantity, 0)}
              </div>
            )}
            <img
              className="w-8 h-8"
              src="https://img.icons8.com/?size=100&id=9720&format=png&color=ffffff"
              alt="Cart"
            />
            <span className="ml-2">Cart</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleClick}
            className="text-white font-bold hover:text-gray-300 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    )}
  </nav>
  )
}

export default Navbar