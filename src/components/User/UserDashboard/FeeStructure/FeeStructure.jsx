import React from 'react';
import './FeeStructure.css';

const FeeStructure = () => {
  const feeData = [
    {
      category: 'Single Sharing',
      ac: {
        monthly: '₹15,000'
      },
      nonAc: {
        monthly: '₹12,000'
      }
    },
    {
      category: 'Double Sharing',
      ac: {
        monthly: '₹10,000'
      },
      nonAc: {
        monthly: '₹8,000'
      }
    },
    {
      category: 'Triple Sharing',
      ac: {
        monthly: '₹8,000'
      },
      nonAc: {
        monthly: '₹6,000'
      }
    }
  ];

  return (
    <div className="fee-structure">
      <div className="fee-structure-header">
        <h2>Room Fee Structure</h2>
        <p>Choose the accommodation that suits your needs</p>
      </div>

      <div className="fee-structure-table">
        <table>
          <thead>
            <tr>
              <th>Room Category</th>
              <th>AC Rooms</th>
              <th>Non-AC Rooms</th>
            </tr>
          </thead>
          <tbody>
            {feeData.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.ac.monthly}</td>
                <td>{item.nonAc.monthly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fee-structure-notes">
        <h3>Additional Information</h3>
        <ul>
          <li>All prices are inclusive of GST</li>
          <li>Security deposit of ₹10,000 (refundable)</li>
          <li>Maintenance charges of ₹1,000 per month</li>
          <li>Electricity charges as per meter reading</li>
        </ul>
      </div>
    </div>
  );
};

export default FeeStructure; 