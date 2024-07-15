import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const FilterableTable = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(filter.toLowerCase())
        )
      )
    );
  }, [filter, data]);

  const updateUserStatus = async (id, action) => {
    setLoading(id); // Set loading state to the user ID
    try {
      const response = await fetch(`/api/userstatus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setFilteredData((prevData) =>
          prevData.map((user) =>
            user.id === id ? { ...user, status: updatedUser.status } : user
          )
        );
      } else {
        console.error('Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    } finally {
      setLoading(null); // Reset loading state
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow rounded-lg p-4 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Users</h2>
          <button 
            className="text-gray-600 hover:text-gray-900 focus:outline-none" 
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
        </div>
        {isSearchVisible && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phoneno}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.pamount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                    <div className="relative inline-block text-left">
                      <button
                        className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        onClick={() => setDropdownVisible(dropdownVisible === item.id ? null : item.id)} >
                        <ChevronDownIcon className="h-6 w-6" />
                      </button>
                      {dropdownVisible === item.id && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                          <div className="py-1">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => updateUserStatus(item.id, 'activate')}
                              disabled={loading === item.id}>
                              {loading === item.id ? 'Loading...' : 'Activate'}
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => updateUserStatus(item.id, 'deactivate')}
                              disabled={loading === item.id}
                            >
                              {loading === item.id ? 'Loading...' : 'Dactivate'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilterableTable;
