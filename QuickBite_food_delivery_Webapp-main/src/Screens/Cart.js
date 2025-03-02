import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../Components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className='container text-center mt-5'>
        <h3 className='text-danger'>Your Cart is Empty!</h3>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("User email not found. Please log in again.");
      return;
    }

    try {
      let response = await fetch("http://localhost:5000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      let responseData = await response.json();
      console.log("Order placed successfully:", responseData);

      if (response.status === 200) {
        dispatch({ type: "DROP" });
        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className='container mt-5'>
      <div className='table-responsive'>
        <table className='table table-dark table-hover text-white'>
          <thead className='text-success fs-4'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Option</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className='fw-bold'>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>₹{food.price}</td>
                <td>
                  <button className="btn btn-danger p-1" onClick={() => dispatch({ type: "REMOVE", index: index })}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='d-flex justify-content-between align-items-center mt-4'>
        <h2 className='fw-bold text-white'>Total Price: ₹{totalPrice}/-</h2>
        <button className='btn btn-success btn-lg' onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  );
}
