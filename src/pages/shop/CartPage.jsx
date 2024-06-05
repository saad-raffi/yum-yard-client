import React, { useContext, useEffect, useState } from 'react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch(`http://localhost:3001/carts?email=${user.email}`);
            const data = await response.json();
            setCart(data);
        };
        fetchCart();
    }, [user]);

    const handleQuantityChange = (item, change) => {
        const updatedCart = cart.map(cartItem => {
            if (cartItem._id === item._id) {
                cartItem.quantity += change;
                if (cartItem.quantity < 1) cartItem.quantity = 1;
            }
            return cartItem;
        });
        setCart(updatedCart);
    };

    const handleDelete = async (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`http://localhost:3001/carts/${item._id}`, {
                    method: "DELETE"
                });
                const data = await response.json();
                if (data.deletedCount > 0) {
                    setCart(cart.filter(cartItem => cartItem._id !== item._id));
                    Swal.fire("Deleted!", "Your item has been deleted.", "success");
                }
            }
        });
    };

    const handleProceed = () => {
        Swal.fire({
            title: "Success!",
            text: "Your dishes are on the way!! Have a nice day!!!",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Generate Voucher"
        }).then(() => {
            generateVoucher();
        });
    };

    const generateVoucher = () => {
        const doc = new jsPDF();
        doc.text('Voucher', 20, 10);
        doc.autoTable({
            head: [['#', 'Item', 'Quantity', 'Price']],
            body: cart.map((item, index) => [index + 1, item.name, item.quantity, `$${(item.price * item.quantity).toFixed(2)}`])
        });
        doc.text(`Total Price: $${totalPrice.toFixed(2)}`, 20, doc.autoTable.previous.finalY + 10);
        doc.text(`Name: ${user.displayName}`, 20, doc.autoTable.previous.finalY + 20);
        doc.text(`Email: ${user.email}`, 20, doc.autoTable.previous.finalY + 30);
        doc.text(`User ID: ${user.uid}`, 20, doc.autoTable.previous.finalY + 40);
        doc.text('Thanks for your time!', 20, doc.autoTable.previous.finalY + 50);
        doc.save('voucher.pdf');
    };

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="section-container py-20 bg-gradient-to-r from-gray-100 via-white to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-lg">
                <div className="py-8 flex flex-col items-center justify-center gap-6">
                    <div className="text-center space-y-5">
                        <h2 className="text-4xl md:text-5xl font-bold leading-snug">
                            <span className="text-green-600">Food</span> Cart
                        </h2>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 table-auto">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-md font-bold uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-md font-bold uppercase tracking-wider">Food</th>
                                <th className="px-6 py-3 text-left text-md font-bold uppercase tracking-wider">Item Name</th>
                                <th className="px-6 py-3 text-left text-md font-bold uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-md font-bold uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-md font-bold uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cart.map((item, index) => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12">
                                                <img className="h-12 w-12 rounded-full" src={item.image} alt={item.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center space-x-2">
                                            <button onClick={() => handleQuantityChange(item, -1)} className="text-indigo-600 hover:text-indigo-900"><FaMinus /></button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(item, 1)} className="text-indigo-600 hover:text-indigo-900"><FaPlus /></button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleDelete(item)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="my-12 flex flex-col md:flex-row justify-between items-start p-4 bg-gray-100 rounded-lg">
                    <div className="md:w-1/2 space-y-3">
                        <h3 className="font-medium text-xl">Customer Details</h3>
                        <p>Name: {user.displayName}</p>
                        <p>Email: {user.email}</p>
                        <p>User ID: {user.uid}</p>
                    </div>
                    <div className="md:w-1/2 space-y-3">
                        <h3 className="font-medium text-xl">Shopping Details</h3>
                        <p>Total Items: {cart.length}</p>
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                        <button className="btn bg-indigo-600 text-white mt-4 mb-4 px-4" onClick={handleProceed}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
