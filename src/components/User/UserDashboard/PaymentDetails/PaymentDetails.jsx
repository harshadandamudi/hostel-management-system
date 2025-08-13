import React, { useState } from 'react';
import { FaMoneyBillWave, FaCreditCard, FaHistory, FaDownload } from 'react-icons/fa';
import './PaymentDetails.css';

const PaymentDetails = () => {
  const [paymentHistory] = useState([
    {
      id: 1,
      date: '2024-03-15',
      amount: 15000,
      status: 'paid',
      type: 'Monthly Fee',
      paymentMethod: 'Online Transfer'
    },
    {
      id: 2,
      date: '2024-02-15',
      amount: 15000,
      status: 'paid',
      type: 'Monthly Fee',
      paymentMethod: 'Credit Card'
    },
    {
      id: 3,
      date: '2024-01-15',
      amount: 15000,
      status: 'paid',
      type: 'Monthly Fee',
      paymentMethod: 'UPI'
    }
  ]);

  const [upcomingPayment] = useState({
    dueDate: '2024-04-15',
    amount: 15000,
    type: 'Monthly Fee'
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
    <div className="payment-details-container">
      <div className="payment-header">
        <h2>Payment Details</h2>
      </div>

      <div className="payment-grid">
        {/* Upcoming Payment Card */}
        <div className="payment-card upcoming-payment">
          <div className="card-header">
            <FaMoneyBillWave className="card-icon" />
            <h3>Upcoming Payment</h3>
          </div>
          <div className="payment-info">
            <div className="info-row">
              <span className="label">Amount Due:</span>
              <span className="value">₹{upcomingPayment.amount}</span>
            </div>
            <div className="info-row">
              <span className="label">Due Date:</span>
              <span className="value">
                {new Date(upcomingPayment.dueDate).toLocaleDateString()}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Type:</span>
              <span className="value">{upcomingPayment.type}</span>
            </div>
          </div>
          <button className="pay-now-btn">
            Pay Now
          </button>
        </div>

        {/* Payment Methods Card */}
        <div className="payment-card payment-methods">
          <div className="card-header">
            <FaCreditCard className="card-icon" />
            <h3>Payment Methods</h3>
          </div>
          <div className="methods-list">
            <div className="method-item">
              <input type="radio" name="payment-method" id="credit-card" defaultChecked />
              <label htmlFor="credit-card">Credit Card</label>
            </div>
            <div className="method-item">
              <input type="radio" name="payment-method" id="debit-card" />
              <label htmlFor="debit-card">Debit Card</label>
            </div>
            <div className="method-item">
              <input type="radio" name="payment-method" id="upi" />
              <label htmlFor="upi">UPI</label>
            </div>
            <div className="method-item">
              <input type="radio" name="payment-method" id="net-banking" />
              <label htmlFor="net-banking">Net Banking</label>
            </div>
          </div>
        </div>

        {/* Payment History Card */}
        <div className="payment-card payment-history">
          <div className="card-header">
            <FaHistory className="card-icon" />
            <h3>Payment History</h3>
          </div>
          <div className="history-list">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="history-item">
                <div className="history-info">
                  <div className="history-header">
                    <span className="payment-type">{payment.type}</span>
                    {getStatusBadge(payment.status)}
                  </div>
                  <div className="history-details">
                    <span className="payment-date">
                      {new Date(payment.date).toLocaleDateString()}
                    </span>
                    <span className="payment-method">{payment.paymentMethod}</span>
                  </div>
                </div>
                <div className="payment-amount">₹{payment.amount}</div>
              </div>
            ))}
          </div>
          <button className="download-invoice-btn">
            <FaDownload /> Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails; 