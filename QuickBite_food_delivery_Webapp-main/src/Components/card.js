import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);

  let finalPrice = qty * parseInt(options[size]);
  const handleAddToCart = async () => {
    let food = data.find((item) => item.id === props.foodItem._id && item.size === size);

    if (food) {
        await dispatch({
            type: "UPDATE",
            payload: {
                id: props.foodItem._id,
                size: size,
                qty: qty,
                price: finalPrice
            }
        });
    } else {
        await dispatch({
            type: "ADD",
            payload: {
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size
            }
        });
    }
};


  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <div
        className="card mt-3"
        style={{ width: "18rem", maxHeight: "360px", margin: "20px auto", padding: "10px" }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt={props.foodItem.name}
          style={{ height: "120px", objectFit: "fill", marginBottom: "10px" }}
        />
        <div className="card-body" style={{ padding: "10px" }}>
          <h5 className="card-title" style={{ marginBottom: "10px" }}>{props.foodItem.name}</h5>
          <div className="container w-100" style={{ marginBottom: "10px" }}>
            <select
              className="m-2 h-100 bg-success text-white rounded"
              onChange={(e) => setQty(parseInt(e.target.value))}
              style={{ marginRight: "10px" }}
            >
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              className="m-2 h-100 bg-success text-white rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
              style={{ marginRight: "10px" }}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>

            <div className="d-inline h-100 fs-5" style={{ marginLeft: "10px" }}>₹{finalPrice}/-</div>
          </div>

          <hr style={{ margin: "10px 0" }} />

          <button
            className="btn btn-success justify-content-center ms-2"
            onClick={handleAddToCart}
            style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
