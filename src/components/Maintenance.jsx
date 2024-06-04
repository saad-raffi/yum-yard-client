import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthProvider';

const Maintenance = () => {
  const [menus, setMenus] = useState([]);
  const { user } = useContext(AuthContext);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/menus')
      .then(res => res.json())
      .then(data => setMenus(data));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/menus/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(() => {
            setMenus(menus.filter(menu => menu._id !== id));
            Swal.fire('Deleted!', 'The item has been deleted.', 'success');
          });
      }
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleSave = () => {
    fetch(`http://localhost:3001/menus/${editingItem._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingItem),
    })
      .then(res => res.json())
      .then(() => {
        setMenus(menus.map(menu => (menu._id === editingItem._id ? editingItem : menu)));
        setEditingItem(null);
        Swal.fire('Saved!', 'The item has been updated.', 'success');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Menu Maintenance</h1>
      {user && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-green-600 text-black">
              <tr>
                <th className="px-6 py-3 text-left text-md font-bold text-indigo-600 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-md font-bold text-indigo-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-md font-bold text-indigo-600 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-md font-bold text-indigo-600 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-md font-bold text-indigo-600 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-md font-bold text-indigo-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menus.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingItem && editingItem._id === item._id ? (
                      <input
                        type="text"
                        name="name"
                        value={editingItem.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingItem && editingItem._id === item._id ? (
                      <input
                        type="number"
                        name="quantity"
                        value={editingItem.quantity}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingItem && editingItem._id === item._id ? (
                      <input
                        type="number"
                        name="price"
                        value={editingItem.price}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      item.price
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingItem && editingItem._id === item._id ? (
                      <input
                        type="text"
                        name="image"
                        value={editingItem.image}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingItem && editingItem._id === item._id ? (
                      <button onClick={handleSave} className="btn btn-green">
                        Save
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(item)} className="btn btn-blue">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="btn btn-red">
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
