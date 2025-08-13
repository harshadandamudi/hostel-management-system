import React, { useState } from 'react';
import { FaUtensils, FaCalendarAlt, FaClock } from 'react-icons/fa';
import './MenuDetails.css';

const MenuDetails = () => {
  const [selectedDay, setSelectedDay] = useState('today');
  const [menuData] = useState({
    today: {
      breakfast: {
        time: '7:00 AM - 9:00 AM',
        items: ['Idli', 'Sambar', 'Chutney', 'Tea', 'Coffee']
      },
      lunch: {
        time: '12:00 PM - 2:00 PM',
        items: ['Rice', 'Dal', 'Sabzi', 'Roti', 'Salad', 'Curd']
      },
      dinner: {
        time: '7:00 PM - 9:00 PM',
        items: ['Chapati', 'Sabzi', 'Dal', 'Rice', 'Salad']
      }
    },
    tomorrow: {
      breakfast: {
        time: '7:00 AM - 9:00 AM',
        items: ['Poha', 'Upma', 'Tea', 'Coffee', 'Bread']
      },
      lunch: {
        time: '12:00 PM - 2:00 PM',
        items: ['Jeera Rice', 'Dal Makhani', 'Paneer Sabzi', 'Roti', 'Raita']
      },
      dinner: {
        time: '7:00 PM - 9:00 PM',
        items: ['Paratha', 'Sabzi', 'Dal', 'Rice', 'Salad']
      }
    }
  });

  const renderMealSection = (meal, data) => (
    <div className="meal-section">
      <div className="meal-header">
        <h3>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
        <div className="meal-time">
          <FaClock />
          <span>{data.time}</span>
        </div>
      </div>
      <div className="meal-items">
        {data.items.map((item, index) => (
          <div key={index} className="meal-item">
            <FaUtensils className="item-icon" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="menu-details-container">
      <div className="menu-header">
        <h2>Mess Menu</h2>
        <div className="day-selector">
          <button
            className={`day-btn ${selectedDay === 'today' ? 'active' : ''}`}
            onClick={() => setSelectedDay('today')}
          >
            Today
          </button>
          <button
            className={`day-btn ${selectedDay === 'tomorrow' ? 'active' : ''}`}
            onClick={() => setSelectedDay('tomorrow')}
          >
            Tomorrow
          </button>
        </div>
      </div>

      <div className="menu-content">
        <div className="date-display">
          <FaCalendarAlt />
          <span>
            {selectedDay === 'today'
              ? new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : new Date(Date.now() + 86400000).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
          </span>
        </div>

        <div className="meals-container">
          {renderMealSection('breakfast', menuData[selectedDay].breakfast)}
          {renderMealSection('lunch', menuData[selectedDay].lunch)}
          {renderMealSection('dinner', menuData[selectedDay].dinner)}
        </div>
      </div>
    </div>
  );
};

export default MenuDetails; 