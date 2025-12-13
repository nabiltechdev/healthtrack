import React, { useState } from 'react';
import { FaTrash, FaEdit, FaFire, FaTint, FaStickyNote } from 'react-icons/fa';
import EditActivityModal from './EditActivityModal';

function ActivityList({ activities, deleteActivity, editActivity }) {
  const [editingActivity, setEditingActivity] = useState(null);

  const handleEdit = (activity) => {
    setEditingActivity(activity);
  };

  const handleSaveEdit = async (id, updatedData) => {
    await editActivity(id, updatedData);
    setEditingActivity(null);
  };

  const handleCloseModal = () => {
    setEditingActivity(null);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Exercise': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'Meal': 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
      'Sleep': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      'Meditation': 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
      'Water': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      'Work': 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
      'Social': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      'Other': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    };
    return colors[category] || colors['Other'];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Your Logged Activities</h3>
      {activities.length === 0 ? (
        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-lg">No activities logged yet.</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Add your first activity using the form above!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li 
              key={activity.id} 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  {/* Header with category badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(activity.category || 'Other')}`}>
                      {activity.category || activity.type}
                    </span>
                    {activity.mood && (
                      <span className="text-sm">
                        {activity.mood === 'Great' && '😄'}
                        {activity.mood === 'Good' && '🙂'}
                        {activity.mood === 'Okay' && '😐'}
                        {activity.mood === 'Tired' && '😴'}
                        {activity.mood === 'Stressed' && '😰'}
                      </span>
                    )}
                  </div>

                  {/* Activity details */}
                  <div className="mb-2">
                    <p className="text-gray-900 dark:text-white font-medium">
                      <strong>{activity.type}:</strong> {activity.details}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      📅 {formatDate(activity.date)} {activity.time && `at ${activity.time}`}
                    </p>
                  </div>

                  {/* Nutrition info */}
                  {(activity.calories || activity.water_ml) && (
                    <div className="flex flex-wrap gap-3 mt-2 text-sm">
                      {activity.calories && (
                        <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                          <FaFire /> {activity.calories} kcal
                        </span>
                      )}
                      {activity.protein && (
                        <span className="text-blue-600 dark:text-blue-400">
                          P: {activity.protein}g
                        </span>
                      )}
                      {activity.carbs && (
                        <span className="text-green-600 dark:text-green-400">
                          C: {activity.carbs}g
                        </span>
                      )}
                      {activity.fat && (
                        <span className="text-purple-600 dark:text-purple-400">
                          F: {activity.fat}g
                        </span>
                      )}
                      {activity.water_ml && (
                        <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400">
                          <FaTint /> {activity.water_ml}ml
                        </span>
                      )}
                    </div>
                  )}

                  {/* Notes */}
                  {activity.notes && (
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                      <span className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                        <FaStickyNote className="text-yellow-500" />
                        {activity.notes}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => handleEdit(activity)} 
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
                    title="Edit activity"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this activity?')) {
                        deleteActivity(activity.id);
                      }
                    }} 
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
                    title="Delete activity"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Modal */}
      {editingActivity && (
        <EditActivityModal
          activity={editingActivity}
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default ActivityList;
