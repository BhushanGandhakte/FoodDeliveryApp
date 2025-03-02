import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-center my-3">
      <strong>Current Time: {currentTime.toLocaleString()}</strong>
    </div>
  );
};

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    try {
      const response = await fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      const data = await response.json();
      setOrderData(data?.orderData?.order_data || []);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <CurrentTime />

      <div className="container">
        <h2 className="mt-4 mb-4 text-center">My Orders</h2>

        <div className="row">
          {orderData.length > 0 ? (
            orderData
              .slice(0)
              .reverse()
              .map((order, index) => (
                <div key={index} className="col-12">
                  {Array.isArray(order) &&
                    order.map((item, idx) => (
                      <div key={idx} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
                        {item.Order_date ? (
                          <div className="text-center mt-3">
                            <strong>Order Date: {new Date(item.Order_date).toLocaleDateString()}</strong>
                            <hr />
                          </div>
                        ) : (
                          <div className="card mt-3 shadow-lg" style={{ width: "18rem", maxHeight: "300px" }}>
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <div className="container w-100 p-0">
                                <span className="badge bg-primary m-1">Qty: {item.qty}</span>
                                <span className="badge bg-secondary m-1">Size: {item.size}</span>
                                <div className="mt-2 fw-bold text-danger">
                                  ₹{item.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ))
          ) : (
            <p className="text-center">No Orders Found</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}