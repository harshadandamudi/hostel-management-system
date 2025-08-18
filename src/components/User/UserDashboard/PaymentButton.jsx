// src/components/PaymentButton.jsx
import { CloudCog } from 'lucide-react';
import React from 'react';


const PaymentButton = ({ amount, user }) => {
  const handlePayment = async () => {
    // 1. Create order on backend
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1, currency: 'INR', receipt: `rcptid_${Date.now()}` })
    });
    const order = await res.json();
    console.log(order);
    console.log('User for payment:', user);
    // 2. Open Razorpay checkout
    const options = {
      key: 'rzp_live_9S93dFAainqSEB',
      amount: order.amount,
      currency: order.currency,
      name: 'HostelEase',
      description: 'Hostel Payment',
      order_id: order.id,
      handler: async function (response) {
        // Send payment details to backend for verification
        try {
          const verifyRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: order.amount,
              currency: order.currency,
              userId: user?._id
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert('Payment verified and successful!');
          } else {
            alert('Payment verification failed!');
          }
        } catch (err) {
          alert('Error verifying payment!');
        }
      },
      prefill: {
        name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName || user?.lastName || '',
        email: user?.email,
        contact: user?.phone || user?.contact || '' // fallback if you add phone later
      },
      theme: { color: '#3399cc' },
      method: {
        netbanking: true,
        card: true,
        upi: true 
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handlePayment}>
      Pay Now
    </button>
  );
};

export default PaymentButton;