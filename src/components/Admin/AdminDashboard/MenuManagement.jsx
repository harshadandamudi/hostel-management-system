import React, { useState, useEffect } from 'react';
import { FaUtensils, FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaTimes, FaSearch, FaCoffee, FaHamburger, FaPizzaSlice, FaIceCream, FaAppleAlt, FaCarrot, FaDrumstickBite, FaFish, FaBreadSlice, FaEgg, FaCheese, FaLeaf } from 'react-icons/fa';
import ConfirmationDialog from '../../common/ConfirmationDialog';
import './MenuManagement.css';

const MenuManagement = () => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editingMeal, setEditingMeal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currentMeal, setCurrentMeal] = useState('');
  const [itemInput, setItemInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmData, setConfirmData] = useState(null);

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const meals = ['breakfast', 'lunch', 'dinner'];

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu`);
      if (!response.ok) {
        throw new Error('Failed to fetch menu data');
      }
      const data = await response.json();
      setMenuData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      if (!itemInput.trim()) return;

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: selectedDay,
          meal: currentMeal,
          item: itemInput.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      await fetchMenuData();
      setShowModal(false);
      setItemInput('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditItem = async () => {
    try {
      if (!itemInput.trim()) return;

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu/item`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: selectedDay,
          meal: currentMeal,
          oldItem: editingItem,
          newItem: itemInput.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to edit item');
      }

      await fetchMenuData();
      setShowModal(false);
      setItemInput('');
      setEditingItem(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteItem = async (day, meal, item) => {
    setConfirmAction('deleteItem');
    setConfirmData({ day, meal, item });
    setShowConfirmDialog(true);
  };

  const handleEditMeal = async () => {
    try {
      if (!timeInput.trim()) return;

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu/meal`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: selectedDay,
          meal: currentMeal,
          time: timeInput.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to edit meal time');
      }

      await fetchMenuData();
      setShowModal(false);
      setTimeInput('');
      setEditingMeal(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMeal = async (day, meal) => {
    setConfirmAction('deleteMeal');
    setConfirmData({ day, meal });
    setShowConfirmDialog(true);
  };

  const executeDeleteAction = async () => {
    try {
      if (confirmAction === 'deleteItem') {
        const { day, meal, item } = confirmData;
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu/item`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            day,
            meal,
            item,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
      } else if (confirmAction === 'deleteMeal') {
        const { day, meal } = confirmData;
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/menu/meal`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            day,
            meal,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete meal');
        }
      }

      await fetchMenuData();
    } catch (err) {
      setError(err.message);
    } finally {
      setShowConfirmDialog(false);
      setConfirmAction(null);
      setConfirmData(null);
    }
  };

  const getConfirmDialogContent = () => {
    if (confirmAction === 'deleteItem') {
      return {
        title: 'Delete Menu Item',
        message: `Are you sure you want to delete "${confirmData.item}" from ${confirmData.meal}?`,
      };
    } else if (confirmAction === 'deleteMeal') {
      return {
        title: 'Delete Meal',
        message: `Are you sure you want to delete the entire ${confirmData.meal} meal?`,
      };
    }
    return {
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed?',
    };
  };

  const openAddItemModal = (meal) => {
    setModalType('add');
    setCurrentMeal(meal);
    setItemInput('');
    setShowModal(true);
  };

  const openEditItemModal = (meal, item) => {
    setModalType('edit');
    setCurrentMeal(meal);
    setEditingItem(item);
    setItemInput(item);
    setShowModal(true);
  };

  const openEditTimeModal = (meal, time) => {
    setModalType('time');
    setCurrentMeal(meal);
    setEditingMeal(meal);
    setTimeInput(time);
    setShowModal(true);
  };

  const filterMenuItems = (items) => {
    if (!searchQuery.trim()) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getItemIcon = (itemName) => {
    const name = itemName.toLowerCase();
    
    // Breakfast items
    if (name.includes('coffee') || name.includes('tea')) return <FaCoffee />;
    if (name.includes('bread') || name.includes('toast')) return <FaBreadSlice />;
    if (name.includes('egg')) return <FaEgg />;
    if (name.includes('cheese')) return <FaCheese />;
    if (name.includes('apple') || name.includes('fruit')) return <FaAppleAlt />;
    
    // Main course items
    if (name.includes('burger') || name.includes('sandwich')) return <FaHamburger />;
    if (name.includes('pizza')) return <FaPizzaSlice />;
    if (name.includes('chicken') || name.includes('meat')) return <FaDrumstickBite />;
    if (name.includes('fish') || name.includes('seafood')) return <FaFish />;
    if (name.includes('salad') || name.includes('vegetable')) return <FaLeaf />;
    if (name.includes('carrot') || name.includes('vegetables')) return <FaCarrot />;
    
    // Desserts
    if (name.includes('ice cream') || name.includes('dessert')) return <FaIceCream />;
    
    // Default icon
    return <FaUtensils />;
  };

  const renderMealSection = (meal, data) => {
    const filteredItems = filterMenuItems(data.items);
    if (searchQuery && filteredItems.length === 0) return null;

    return (
      <div key={meal} className="mm-meal-section">
        <div className="mm-meal-header">
          <h3>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
        </div>
        <div className="mm-meal-time">
          <div className="mm-meal-time-left">
          <FaCalendarAlt />
          <span>{data.time}</span>
          </div>
          <button className="mm-edit-time-btn" onClick={() => openEditTimeModal(meal, data.time)} title="Edit Time">
            <FaEdit />
          </button>
        </div>
        <div className="mm-meal-items">
          {filteredItems.map((item, index) => (
            <div key={`${meal}-${item._id || index}`} className="mm-meal-item">
              <div className="mm-item-icon">
                {getItemIcon(item.name)}
              </div>
              <span>{item.name}</span>
              <div className="mm-item-actions">
                <button className="mm-edit-item-btn" onClick={() => openEditItemModal(meal, item.name)}>
                  <FaEdit />
                </button>
                <button className="mm-delete-item-btn" onClick={() => handleDeleteItem(selectedDay, meal, item.name)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          <button className="mm-add-item-btn" onClick={() => openAddItemModal(meal)}>
            <FaPlus /> Add Item
          </button>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="mm-modal-overlay">
        <div className="mm-modal-content">
          <h3 className="mm-modal-title">
            {modalType === 'add' ? 'Add New Item' : 
             modalType === 'edit' ? 'Edit Item' : 
             'Edit Meal Time'}
          </h3>
          {modalType === 'time' ? (
            <div className="mm-form-group">
              <label className="mm-form-label">Meal Time</label>
              <input
                type="text"
                className="mm-form-input"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                placeholder="Enter meal time (e.g., 7:00 AM - 9:00 AM)"
              />
            </div>
          ) : (
            <div className="mm-form-group">
              <label className="mm-form-label">Menu Item</label>
              <input
                type="text"
                className="mm-form-input"
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
                placeholder="Enter menu item"
              />
            </div>
          )}
          <div className="mm-modal-actions">
            <button type="button" className="mm-modal-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="mm-modal-btn" 
              onClick={modalType === 'add' ? handleAddItem : modalType === 'edit' ? handleEditItem : handleEditMeal}
            >
              {modalType === 'add' ? 'Add Item' : modalType === 'edit' ? 'Save Changes' : 'Save Time'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="mm-loading">Loading menu data...</div>;
  }

  if (error) {
    return <div className="mm-error">Error: {error}</div>;
  }

  return (
    <div className="mm-container">
      {/* Header Section */}
      <div className="mm-header">
        <div className="mm-header-left">
        <h2>Menu Management</h2>
          <div className="mm-search-bar">
            <FaSearch className="mm-search-icon" />
          <input
            type="text"
              className="mm-search-input"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="mm-day-selector">
        {days.map((day) => (
          <button
            key={day}
            className={`mm-day-btn ${selectedDay === day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </button>
        ))}
      </div>

      {/* Menu Content - Horizontal Layout */}
      <div className="mm-menu-content">
        {meals.map((meal) => 
          menuData[selectedDay]?.[meal] && renderMealSection(meal, menuData[selectedDay][meal])
        )}
      </div>
      
      {renderModal()}
      
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
          setConfirmAction(null);
          setConfirmData(null);
        }}
        onConfirm={executeDeleteAction}
        {...getConfirmDialogContent()}
      />
    </div>
  );
};

export default MenuManagement; 