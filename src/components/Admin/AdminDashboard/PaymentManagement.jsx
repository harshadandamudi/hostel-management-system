import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaSearch, FaDownload, FaCheck, FaTimes } from 'react-icons/fa';
import './PaymentManagement.css';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payments`);
      if (!res.ok) throw new Error('Failed to fetch payments');
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (paymentId) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payments/${paymentId}/mark-paid`, { method: 'PUT' });
    fetchPayments();
  };

  const handleMarkFailed = async (paymentId) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payments/${paymentId}/mark-failed`, { method: 'PUT' });
    fetchPayments();
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch =
      payment.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      paid: 'status-paid',
      pending: 'status-pending',
      failed: 'status-failed'
    };

    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="payment-management-container">
      <div className="payment-management-header">
        <div className="header-left">
          <h2>Payment Management</h2>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by user name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="payments-table-container">
        {loading ? (
          <div className="loading">Loading payments...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <table className="payments-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>User ID</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Type</th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.userName}</td>
                  <td>{payment.userId}</td>
                  <td>₹{payment.amount}</td>
                  <td>{new Date(payment.dueDate).toLocaleDateString()}</td>
                  <td>{getStatusBadge(payment.status)}</td>
                  <td>{payment.type}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>
                    <div className="action-buttons">
                      {payment.status === 'pending' && (
                        <>
                          <button className="approve-btn" title="Mark as Paid" onClick={() => handleMarkPaid(payment._id)}>
                            <FaCheck />
                          </button>
                          <button className="reject-btn" title="Mark as Failed" onClick={() => handleMarkFailed(payment._id)}>
                            <FaTimes />
                          </button>
                        </>
                      )}
                      <button className="download-btn" title="Download Receipt">
                        <FaDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="payment-summary">
        <div className="summary-card">
          <h3>Total Payments</h3>
          <p className="amount">₹{payments.reduce((sum, payment) => sum + payment.amount, 0)}</p>
        </div>
        <div className="summary-card">
          <h3>Pending Payments</h3>
          <p className="amount pending">
            ₹{payments
              .filter(payment => payment.status === 'pending')
              .reduce((sum, payment) => sum + payment.amount, 0)}
          </p>
        </div>
        <div className="summary-card">
          <h3>Paid Payments</h3>
          <p className="amount paid">
            ₹{payments
              .filter(payment => payment.status === 'paid')
              .reduce((sum, payment) => sum + payment.amount, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement; 