import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [streak, setStreak] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  useEffect(() => {
    if (isLoggedIn) {
      fetchAnalytics();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const fetchAnalytics = async () => {
    try {
      const [overviewRes, streakRes, categoryRes] = await Promise.all([
        axios.get('http://localhost:5000/api/analytics/overview', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/analytics/streak', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/analytics/by-category', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      setAnalytics(overviewRes.data);
      setStreak(streakRes.data);
      setCategoryData(categoryRes.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Exercise': 'bg-green-500',
      'Meal': 'bg-orange-500',
      'Sleep': 'bg-purple-500',
      'Meditation': 'bg-pink-500',
      'Water': 'bg-blue-500',
      'Work': 'bg-indigo-500',
      'Social': 'bg-yellow-500',
      'Other': 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Please login to view your analytics.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Analytics Dashboard</h1>

      {/* Category Breakdown */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Activities by Category</h3>
        
        {categoryData && categoryData.length > 0 ? (
          <div className="space-y-4">
            {categoryData.map((item, index) => {
              const total = categoryData.reduce((sum, cat) => sum + parseInt(cat.count), 0);
              const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
              
              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${getCategoryColor(item.category)}`}></div>
                      <span className="font-medium dark:text-white">{item.category || 'Uncategorized'}</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.count} activities ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${getCategoryColor(item.category)} transition-all duration-300`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            No category data available yet. Start logging activities to see your breakdown!
          </p>
        )}
      </div>

      {/* Nutrition Summary */}
      {analytics && analytics.totalCalories > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Nutrition Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {analytics.totalCalories || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
            </div>

            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-3xl mb-2">🥩</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {analytics.totalProtein || 0}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
            </div>

            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-3xl mb-2">🍞</div>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {analytics.totalCarbs || 0}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
            </div>

            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-3xl mb-2">🥑</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {analytics.totalFat || 0}g
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Fat</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3 dark:text-white">💡 Insights</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {streak && streak.currentStreak >= 7 && (
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Great job! You've maintained a {streak.currentStreak}-day streak!</span>
            </li>
          )}
          {analytics && analytics.thisWeek >= 5 && (
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>You're very active this week with {analytics.thisWeek} activities!</span>
            </li>
          )}
          {categoryData && categoryData.length >= 5 && (
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Excellent variety! You're tracking {categoryData.length} different categories.</span>
            </li>
          )}
          {(!analytics || analytics.totalActivities === 0) && (
            <li className="flex items-start gap-2">
              <span className="text-blue-500">ℹ</span>
              <span>Start logging activities to see your personalized insights here!</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Analytics;
