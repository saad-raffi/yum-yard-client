import React, { useContext, useEffect, useState } from 'react';
import logo from '/logo.png';
import { FaRegUser } from 'react-icons/fa';
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Navbar = () => {
    const [isSticky, setSticky] = useState(false);

    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 0) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navItems = (
        <>
            <li>
                <a className="text-lg text-yellow-600">Home</a>
            </li>
            <li tabIndex={0}>
                <details>
                    <summary className="text-lg">Menu</summary>
                    <ul className="p-2">
                        <li>
                            <a className="text-base">All</a>
                        </li>
                        <li>
                            <a className="text-base">Salad</a>
                        </li>
                        <li>
                            <a className="text-base">Pizza</a>
                        </li>
                    </ul>
                </details>
            </li>
            <li tabIndex={0}>
                <details>
                    <summary className="text-lg">Services</summary>
                    <ul className="p-2">
                        <li>
                            <a className="text-base">Online Order</a>
                        </li>
                        <li>
                            <a className="text-base">Table Booking</a>
                        </li>
                        <li>
                            <a className="text-base">Order Tracking</a>
                        </li>
                    </ul>
                </details>
            </li>
            <li>
                <a className="text-lg">Offers</a>
            </li>
            {user && (
                <li>
                    <Link to="/maintenance" className="text-lg">Settings</Link>
                </li>
            )}
        </>
    );

    return (
        <header className={`max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${isSticky ? "bg-white shadow-md" : "bg-gradient-to-r from-yellow-200 to-yellow-100"}`}>
            <div className={`navbar xl:px-24 ${isSticky ? "transition-all duration-300 ease-in-out" : ""}`}>
                <div className="navbar-start">
                    <div className="dropdown justify-between">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 space-y-3"
                        >
                            {navItems}
                        </ul>
                    </div>
                    <a href="/">
                    <a href="/" className="flex items-center">
    <img src={logo} alt="Logo" className="h-10 md:h-12 mr-2" /> {/* Adjust logo size here */}
    <span className="text-2xl font-semibold text-gray-800">YumYard</span>
</a>

                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{navItems}</ul>
                </div>
                <div className="navbar-end flex items-center">
                    <button className="btn btn-ghost btn-circle hidden lg:flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>

                    <Link to="cart-page">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="badge badge-sm indicator-item bg-yellow-600 text-white">{cart.length || 0}</span>
                        </div>
                    </Link>
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle hidden lg:flex items-center justify-center mr-3"
                    >
                    </label>

                    {/* login btn */}
                    {user ? (
                        <Profile user={user} />
                    ) : (
                        <button
                            onClick={() => document.getElementById("my_modal_5").showModal()}
                            className="btn flex items-center gap-2 rounded-full px-6 bg-yellow-600 text-white hover:bg-yellow-700 transition duration-300"
                        >
                            <FaRegUser /> Login
                        </button>
                    )}
                    
                    <Modal />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
