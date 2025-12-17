#!/usr/bin/env node

/**
 * HealthTrack API Endpoint Testing Script
 * Run this script to test all API endpoints
 * 
 * Usage: node test-endpoints.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
let adminToken = '';
let userToken = '';
let testUserId = '';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName) {
  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log(`Testing: ${testName}`, 'blue');
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logError(message) {
  log(`✗ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

async function testEndpoint(name, testFn) {
  try {
    await testFn();
    logSuccess(`${name} - PASSED`);
    return true;
  } catch (error) {
    logError(`${name} - FAILED`);
    if (error.response) {
      console.log(`  Status: ${error.response.status}`);
      console.log(`  Message: ${error.response.data.message || error.response.data.error}`);
    } else {
      console.log(`  Error: ${error.message}`);
    }
    return false;
  }
}

// Test 1: User Registration
async function testRegistration() {
  logTest('User Registration');
  
  const testEmail = `test_${Date.now()}@example.com`;
  const response = await axios.post(`${BASE_URL}/api/auth/register`, {
    email: testEmail,
    password: 'test123456',
    name: 'Test User'
  });
  
  if (response.data.success && response.data.token) {
    userToken = response.data.token;
    testUserId = response.data.user.id;
    logSuccess('Registration successful');
    console.log(`  Email: ${testEmail}`);
    console.log(`  User ID: ${testUserId}`);
    console.log(`  Token received: ${userToken.substring(0, 20)}...`);
    return true;
  }
  throw new Error('Registration failed');
}

// Test 2: Admin Login
async function testAdminLogin() {
  logTest('Admin Login');
  
  const response = await axios.post(`${BASE_URL}/api/auth/login`, {
    email: 'admin',
    password: 'admin'
  });
  
  if (response.data.success && response.data.token && response.data.user.role === 'admin') {
    adminToken = response.data.token;
    logSuccess('Admin login successful');
    console.log(`  Email: ${response.data.user.email}`);
    console.log(`  Role: ${response.data.user.role}`);
    console.log(`  Token received: ${adminToken.substring(0, 20)}...`);
    return true;
  }
  throw new Error('Admin login failed');
}

// Test 3: User Login
async function testUserLogin() {
  logTest('User Login');
  
  const response = await axios.post(`${BASE_URL}/api/auth/login`, {
    email: 'admin',
    password: 'admin'
  });
  
  if (response.data.success && response.data.token) {
    logSuccess('User login successful');
    console.log(`  Email: ${response.data.user.email}`);
    return true;
  }
  throw new Error('User login failed');
}

// Test 4: Get Current User
async function testGetCurrentUser() {
  logTest('Get Current User');
  
  const response = await axios.get(`${BASE_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${userToken}` }
  });
  
  if (response.data.success && response.data.user) {
    logSuccess('Get current user successful');
    console.log(`  User ID: ${response.data.user.id}`);
    console.log(`  Email: ${response.data.user.email}`);
    return true;
  }
  throw new Error('Get current user failed');
}

// Test 5: Admin Statistics
async function testAdminStatistics() {
  logTest('Admin Statistics Endpoint');
  
  const response = await axios.get(`${BASE_URL}/api/admin/statistics`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  
  if (response.data.success && response.data.statistics) {
    logSuccess('Admin statistics retrieved');
    console.log(`  Total Users: ${response.data.statistics.total_users}`);
    console.log(`  Total Admins: ${response.data.statistics.total_admins}`);
    console.log(`  Total Activities: ${response.data.statistics.total_activities}`);
    return true;
  }
  throw new Error('Admin statistics failed');
}

// Test 6: Get All Users (Admin)
async function testGetAllUsers() {
  logTest('Get All Users (Admin)');
  
  const response = await axios.get(`${BASE_URL}/api/admin/users`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  
  if (response.data.success && Array.isArray(response.data.users)) {
    logSuccess('Get all users successful');
    console.log(`  Total users: ${response.data.users.length}`);
    return true;
  }
  throw new Error('Get all users failed');
}

// Test 7: Create Activity
async function testCreateActivity() {
  logTest('Create Activity');
  
  const response = await axios.post(`${BASE_URL}/api/activities`, {
    type: 'Running',
    duration: 30,
    date: new Date().toISOString().split('T')[0],
    calories: 300,
    notes: 'Test activity'
  }, {
    headers: { Authorization: `Bearer ${userToken}` }
  });
  
  if (response.data && response.data.id) {
    logSuccess('Activity created successfully');
    console.log(`  Activity ID: ${response.data.id}`);
    console.log(`  Type: ${response.data.type}`);
    return response.data.id;
  }
  throw new Error('Create activity failed');
}

// Test 8: Get Activities
async function testGetActivities() {
  logTest('Get Activities');
  
  const response = await axios.get(`${BASE_URL}/api/activities`, {
    headers: { Authorization: `Bearer ${userToken}` }
  });
  
  if (Array.isArray(response.data)) {
    logSuccess('Get activities successful');
    console.log(`  Total activities: ${response.data.length}`);
    return true;
  }
  throw new Error('Get activities failed');
}

// Test 9: Unauthorized Access (should fail)
async function testUnauthorizedAccess() {
  logTest('Unauthorized Access (Should Fail)');
  
  try {
    await axios.get(`${BASE_URL}/api/admin/statistics`);
    logError('Unauthorized access was allowed (SECURITY ISSUE!)');
    return false;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      logSuccess('Unauthorized access properly blocked');
      return true;
    }
    throw error;
  }
}

// Test 10: Non-Admin Access to Admin Endpoint (should fail)
async function testNonAdminAccess() {
  logTest('Non-Admin Access to Admin Endpoint (Should Fail)');
  
  try {
    await axios.get(`${BASE_URL}/api/admin/statistics`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    logError('Non-admin access was allowed (SECURITY ISSUE!)');
    return false;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      logSuccess('Non-admin access properly blocked');
      return true;
    }
    throw error;
  }
}

// Main test runner
async function runAllTests() {
  console.log('\n');
  log('╔════════════════════════════════════════════════════════╗', 'cyan');
  log('║     HealthTrack API Endpoint Testing Suite            ║', 'cyan');
  log('╚════════════════════════════════════════════════════════╝', 'cyan');
  console.log('\n');
  
  logWarning('Make sure the backend server is running on http://localhost:5000');
  logWarning('Make sure the database is set up with the admin user');
  console.log('\n');
  
  const results = {
    passed: 0,
    failed: 0,
    total: 0
  };
  
  const tests = [
    { name: 'User Registration', fn: testRegistration },
    { name: 'Admin Login', fn: testAdminLogin },
    { name: 'User Login', fn: testUserLogin },
    { name: 'Get Current User', fn: testGetCurrentUser },
    { name: 'Admin Statistics', fn: testAdminStatistics },
    { name: 'Get All Users', fn: testGetAllUsers },
    { name: 'Create Activity', fn: testCreateActivity },
    { name: 'Get Activities', fn: testGetActivities },
    { name: 'Unauthorized Access', fn: testUnauthorizedAccess },
    { name: 'Non-Admin Access', fn: testNonAdminAccess }
  ];
  
  for (const test of tests) {
    results.total++;
    const passed = await testEndpoint(test.name, test.fn);
    if (passed) {
      results.passed++;
    } else {
      results.failed++;
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between tests
  }
  
  // Print summary
  console.log('\n');
  log('╔════════════════════════════════════════════════════════╗', 'cyan');
  log('║                    TEST SUMMARY                        ║', 'cyan');
  log('╚════════════════════════════════════════════════════════╝', 'cyan');
  console.log('\n');
  
  log(`Total Tests: ${results.total}`, 'blue');
  log(`Passed: ${results.passed}`, 'green');
  log(`Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'green');
  
  const percentage = ((results.passed / results.total) * 100).toFixed(1);
  console.log('\n');
  
  if (results.failed === 0) {
    log('🎉 All tests passed! Your API is working correctly!', 'green');
  } else {
    log(`⚠️  ${results.failed} test(s) failed. Please review the errors above.`, 'yellow');
  }
  
  log(`Success Rate: ${percentage}%`, percentage === '100.0' ? 'green' : 'yellow');
  console.log('\n');
}

// Run tests
runAllTests().catch(error => {
  console.error('\n');
  logError('Fatal error running tests:');
  console.error(error);
  process.exit(1);
});
