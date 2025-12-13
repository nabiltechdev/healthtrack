import React, { useState } from 'react';
import { FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function ActivityForm({ addActivity }) {
  const [type, setType] = useState('Exercise');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('Exercise');
  const [showNutrition, setShowNutrition] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Nutrition fields
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [water, setWater] = useState('');
  
  // Advanced fields
  const [notes, setNotes] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.trim()) {
      const activityData = {
        type,
        details,
        date,
        time: time || null,
        category,
        calories: calories ? parseInt(calories) : null,
        protein: protein ? parseFloat(protein) : null,
        carbs: carbs ? parseFloat(carbs) : null,
        fat: fat ? parseFloat(fat) : null,
        water_ml: water ? parseInt(water) : null,
        notes: notes || null,
        mood: mood || null
      };
      
      addActivity(activityData);
      
      // Reset form
      setDetails('');
      setTime('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFat('');
      setWater('');
      setNotes('');
      setMood('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
        <FaPlus className="mr-2" /> Log New Activity
      </h3>
      
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type
          </label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option>Exercise</option>
            <option>Meal</option>
            <option>Activity</option>
            <option>Sleep</option>
            <option>Water</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option>Exercise</option>
            <option>Meal</option>
            <option>Sleep</option>
            <option>Meditation</option>
            <option>Water</option>
            <option>Work</option>
            <option>Social</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Details
        </label>
        <input
          type="text"
          placeholder="e.g., Ran 5km, Healthy breakfast"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time (Optional)
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {/* Nutrition Section Toggle */}
      <button
        type="button"
        onClick={() => setShowNutrition(!showNutrition)}
        className="w-full mb-4 p-3 bg-blue-50 dark:bg-gray-700 rounded-lg flex items-center justify-between text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
      >
        <span className="font-medium">Nutrition Information (Optional)</span>
        {showNutrition ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {showNutrition && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Calories
              </label>
              <input
                type="number"
                placeholder="kcal"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="border p-2 w-full rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Protein (g)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="grams"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="border p-2 w-full rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Carbs (g)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="grams"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="border p-2 w-full rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fat (g)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="grams"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="border p-2 w-full rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Water (ml)
              </label>
              <input
                type="number"
                placeholder="milliliters"
                value={water}
                onChange={(e) => setWater(e.target.value)}
                className="border p-2 w-full rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Advanced Section Toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full mb-4 p-3 bg-purple-50 dark:bg-gray-700 rounded-lg flex items-center justify-between text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-gray-600 transition-colors"
      >
        <span className="font-medium">Additional Info (Optional)</span>
        {showAdvanced ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {showAdvanced && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="border p-2 w-full rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
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
              placeholder="Add any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="border p-2 w-full rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            />
          </div>
        </div>
      )}

      <button 
        type="submit" 
        className="bg-green-600 text-white p-3 w-full rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center justify-center gap-2"
      >
        <FaPlus /> Add Activity
      </button>
    </form>
  );
}

export default ActivityForm;
