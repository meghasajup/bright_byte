import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Package, DollarSign, BarChart2 } from 'lucide-react';
import Navbar from '../../components/Admin/Navbar.jsx';

const AdminDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample data 
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Headphones', description: 'Noise cancelling wireless headphones', price: 199.99, image1: '/api/placeholder/300/200', image2: '/api/placeholder/300/200', stock: 45 },
    { id: 2, name: 'Smart Watch', description: 'Fitness tracker with heart rate monitor', price: 149.99, image1: '/api/placeholder/300/200', image2: '/api/placeholder/300/200', stock: 32 },
    { id: 3, name: 'Wireless Earbuds', description: 'True wireless earbuds with charging case', price: 89.99, image1: '/api/placeholder/300/200', image2: '/api/placeholder/300/200', stock: 78 },
    { id: 4, name: 'Bluetooth Speaker', description: 'Waterproof portable speaker', price: 79.99, image1: '/api/placeholder/300/200', image2: '/api/placeholder/300/200', stock: 23 },
  ]);

  // Sample sales data for charts
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
    { name: 'Jul', sales: 3490 },
    { name: 'Aug', sales: 4200 },
    { name: 'Sep', sales: 5100 },
    { name: 'Oct', sales: 4300 },
    { name: 'Nov', sales: 6500 },
    { name: 'Dec', sales: 7800 },
  ];

  // Function to determine bar color based on sales value
  const getBarColor = (value) => {
    if (value < 2000) {
      return "#ef4444";
    } else if (value >= 2000 && value < 4000) {
      return "#f97316";
    } else {
      return "#22c55e";
    }
  };

  // Total number of products
  const totalProducts = products.length;

  // Total sales this month (sample data)
  const currentMonthSales = salesData[new Date().getMonth()].sales;

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Navbar />

      <div className={`${isMobile ? 'ml-0 pt-16' : 'md:ml-0 lg:ml-6'} flex-1 p-0 transition-all duration-300`}>
        <div className="h-4 md:h-6"></div>
        <div className="pr-4 md:pr-6">

          <header className="bg-white rounded-lg shadow p-3 md:p-4 mb-4 md:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mx-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Dashboard</h1>
          </header>

          {/* Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6 mx-4">
            <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center transform hover:scale-105 transition-transform">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Package size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-gray-500 text-xs md:text-sm">Total Products</h2>
                <p className="text-2xl md:text-3xl font-bold">{totalProducts}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center transform hover:scale-105 transition-transform">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <DollarSign size={24} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-gray-500 text-xs md:text-sm">Monthly Sales</h2>
                <p className="text-2xl md:text-3xl font-bold">₹{currentMonthSales.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 md:p-6 flex items-center transform hover:scale-105 transition-transform">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <BarChart2 size={24} className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-gray-500 text-xs md:text-sm">Avg. Product Price</h2>
                <p className="text-2xl md:text-3xl font-bold">
                  ₹{products.length > 0
                    ? (products.reduce((sum, product) => sum + product.price, 0) / products.length).toFixed(2)
                    : '0.00'}
                </p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6 mx-4">
            <div className="bg-white rounded-lg shadow p-3 md:p-4">
              <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Sales Overview</h2>
              <div className="h-48 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}
                    margin={{
                      top: 5,
                      right: isMobile ? 10 : 30,
                      left: isMobile ? 0 : 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                      tickFormatter={isMobile ? (tick, index) => index % 2 === 0 ? tick : '' : undefined}
                    />
                    <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-3 md:p-4">
              <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Monthly Sales Comparison</h2>
              <div className="h-48 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{
                      top: 5,
                      right: isMobile ? 10 : 30,
                      left: isMobile ? 0 : 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                      tickFormatter={isMobile ? (tick, index) => index % 2 === 0 ? tick : '' : undefined}
                    />
                    <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
                    <Bar dataKey="sales" animationDuration={1500} animationBegin={300}>
                      {salesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry.sales)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Link to Products Page */}
          <div className="bg-white rounded-lg shadow p-3 md:p-4 mb-4 md:mb-6 mx-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-base md:text-lg font-semibold">Products Management</h2>
              <a href="/admin/products-list" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">View all products <span className="ml-1">→</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;