import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';

function EditActivityModal({ activity, onClose, onSave }) {
  const [formData, setFormData] = useState({
    type: '',
    details: '',
    date: '',
    time: '',
    category: '',
    subcategory: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    water_ml: '',
    notes: '',
    mood: ''
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        type: activity.type || '',
        details: activity.details || '',
        date: activity.date || '',
        time: activity.time || '',
        category: activity.category || 'General',
        subcategory: activity.subcategory || '',
        calories: activity.calories || '',
        protein: activity.protein || '',
        carbs: activity.carbs || '',
        fat: activity.fat || '',
        water_ml: activity.water_ml || '',
        notes: activity.notes || '',
        mood: activity.mood || ''
      });
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert empty strings to null for numeric fields
    const dataToSave = {
      ...formData,
      calories: formData.calories ? parseInt(formData.calories) : null,
      protein: formData.protein ? parseFloat(formData.protein) : null,
      carbs: formData.carbs ? parseFloat(formData.carbs) : null,
      fat: formData.fat ? parseFloat(formData.fat) : null,
      water_ml: formData.water_ml ? parseInt(formData.water_ml) : null,
      time: formData.time || null,
      subcategory: formData.subcategory || null,
      notes: formData.notes || null,
      mood: formData.mood || null
    };
    
    onSave(activity.id, dataToSave);
  };

  if (!activity) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Activity</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="Exercise">Exercise</option>
                <option value="Meal">Meal</option>
                <option value="Activity">Activity</option>
                <option value="Sleep">Sleep</option>
                <option value="Water">Water</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g., Exercise, Meal"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Details *
            </label>
            <input
              type="text"
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., Ran 5km"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Nutrition Information */}
          <div className="border-t dark:border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Nutrition (Optional)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Calories
                </label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="kcal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Protein (g)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="protein"
                  value={formData.protein}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="carbs"
                  value={formData.carbs}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fat (g)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="fat"
                  value={formData.fat}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Water (ml)
              </label>
              <input
                type="number"
                name="water_ml"
                value={formData.water_ml}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g., 500"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t dark:border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Additional Info
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mood
              </label>
              <select
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select mood...</option>
                <option value="Great">😄 Great</option>
                <option value="Good">🙂 Good</option>
                <option value="Okay">😐 Okay</option>
                <option value="Tired">😴 Tired</option>
                <option value="Stressed">😰 Stressed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Add any additional notes..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <FaSave /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditActivityModal;
