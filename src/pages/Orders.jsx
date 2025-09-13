import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  ShoppingBag,
  Filter,
  Search
} from 'lucide-react';
import { useApp } from '../context/useApp';

const Orders = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!state.user) {
      navigate('/login');
    }
  }, [state.user, navigate]);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      if (!state.user) return;

      try {
        setLoading(true);
        let res;
        if (state.user.role === 'admin') {
          res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`);
        } else {
          res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/orders/${state.user.id}`
          );
        }
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [state.user]);

  if (!state.user) {
    return null;
  }

  // Filter orders by status & search
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <Truck className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusSteps = (currentStatus) => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: Clock },
      { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
      { key: 'processing', label: 'Processing', icon: Package },
      { key: 'delivered', label: 'Delivered', icon: Truck }
    ];

    const currentIndex = steps.findIndex((step) => step.key === currentStatus);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {state.user.role === 'admin' ? 'All Orders' : 'My Orders'}
          </h1>
          <p className="text-gray-600 mt-2">
            {state.user.role === 'admin'
              ? 'Manage and track all customer orders'
              : 'Track your order history and status'}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-600">Loading orders...</div>
        )}

        {/* Orders List */}
        {!loading && filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order._id}
                        </h3>
                        <p className="text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                      <span className="text-lg font-bold text-emerald-600">
                        KSh {order.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Items */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Order Items
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-4"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">
                                {item.product.name}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Qty: {item.quantity} × KSh{' '}
                                {item.product.price}
                              </p>
                            </div>
                            <p className="font-semibold">
                              KSh {item.quantity * item.product.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Customer & Payment Info */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Order Details
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-600">Customer:</span>
                          <span className="ml-2 font-medium">
                            {order.customerInfo.name}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <span className="ml-2">
                            {order.customerInfo.email}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Phone:</span>
                          <span className="ml-2">
                            {order.customerInfo.phone}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Address:</span>
                          <span className="ml-2">
                            {order.customerInfo.address}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Payment:</span>
                          <span className="ml-2 font-medium">
                            {order.paymentMethod.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Order Status
                    </h4>
                    <div className="flex items-center justify-between">
                      {getStatusSteps(order.status).map((step, index) => {
                        const Icon = step.icon;
                        return (
                          <div
                            key={step.key}
                            className="flex flex-col items-center flex-1"
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                step.completed
                                  ? step.active
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-emerald-100 text-emerald-600'
                                  : 'bg-gray-100 text-gray-400'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span
                              className={`text-xs mt-2 text-center ${
                                step.completed
                                  ? 'text-emerald-600 font-medium'
                                  : 'text-gray-400'
                              }`}
                            >
                              {step.label}
                            </span>
                            {index <
                              getStatusSteps(order.status).length - 1 && (
                              <div
                                className={`absolute h-0.5 w-full top-5 left-1/2 ${
                                  step.completed
                                    ? 'bg-emerald-600'
                                    : 'bg-gray-200'
                                }`}
                                style={{ zIndex: -1 }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-600 mb-6">
                {statusFilter === 'all'
                  ? "You haven't placed any orders yet."
                  : `No orders found with status: ${statusFilter}`}
              </p>
              {statusFilter === 'all' && (
                <button
                  onClick={() => navigate('/products')}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Start Shopping
                </button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Orders;
