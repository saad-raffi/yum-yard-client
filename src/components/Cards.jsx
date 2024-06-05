import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const Cards = ({ item }) => {
  const { name, image, price, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddtoCart = (item) => {
    if (user && user?.email) {
      const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };
      fetch("http://localhost:3001/carts", {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Thanks!",
            text: "Item Added Successfully!",
            icon: "success"
          });
        }
      });
    } else {
      Swal.fire({
        title: "Please Login?",
        text: "Without an account can't able to add products",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign Up Now!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup', { state: { from: location } });
        }
      });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5 bg-white rounded-lg overflow-hidden">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-2 bg-green-600 rounded-full ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img src={item.image} alt={item.name} className="hover:scale-105 transition-all duration-300 md:h-72 w-full object-cover" />
        </figure>
      </Link>
      <div className="card-body p-4">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title text-xl font-semibold text-gray-800">{item.name}</h2>
        </Link>
        <p className="text-gray-600 mt-2">Description of the item</p>
        <div className="card-actions justify-between items-center mt-4">
          <h5 className="font-semibold text-lg text-green-600">
            <span className="text-sm text-red-500">$ </span> {item.price}
          </h5>
          <button className="btn bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300" onClick={() => handleAddtoCart(item)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
