import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Payment = ({ totalAmount }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const navigate = useNavigate();


  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Simple validation (you can add more detailed validation later)
    if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
      alert('Please fill in all the payment details.');
      return;
    }

    // Simulate payment process (here you could integrate a payment gateway API)
    alert('Payment Successful!');
    
    // Redirect to a success or confirmation page
    navigate('/payment-success');
  };

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

  return (
    <>
    <Navbar /> 
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Complete Your Payment</h2>

        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name on Card</label>
            <input
              type="text"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1234 5678 9012 3456"
              maxLength="16"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM/YY"
              maxLength="5"
            />
          </div>

          {/* CVV */}
          <div>
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123"
              maxLength="3"
            />
          </div>

          {/* Total Amount */}
          <div className="text-lg font-bold text-center my-4">
            Total Amount: Rs {totalAmount}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-all"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Payment;
