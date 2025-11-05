/**
 * Simple Test Runner for P-Core
 * Runs basic tests to verify the refactored application works correctly
 */

const fs = require('fs');
const path = require('path');

// Test results
let testsPassed = 0;
let testsFailed = 0;
const results = [];

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`[${timestamp}] ${prefix} ${message}`);
}

function assert(condition, message) {
  if (condition) {
    testsPassed++;
    log(message, 'success');
    results.push({ test: message, passed: true });
  } else {
    testsFailed++;
    log(message, 'error');
    results.push({ test: message, passed: false });
  }
}

// Test 1: Check if mock data files exist
function testMockDataFiles() {
  log('Testing mock data files...');

  const userMockFile = path.join(__dirname, '..', 'data', 'user-management', 'mock-users.ts');
  const dashboardMockFile = path.join(__dirname, '..', 'data', 'dashboard', 'mock-dashboard.ts');

  assert(fs.existsSync(userMockFile), 'User mock data file exists');
  assert(fs.existsSync(dashboardMockFile), 'Dashboard mock data file exists');
}

// Test 2: Check if API files are updated
function testApiFiles() {
  log('Testing API files...');

  const userApiFile = path.join(__dirname, '..', 'features', 'user-management', 'api.ts');
  const dashboardApiFile = path.join(__dirname, '..', 'features', 'dashboard', 'api', 'use-dashboard-stats.ts');

  assert(fs.existsSync(userApiFile), 'User management API file exists');
  assert(fs.existsSync(dashboardApiFile), 'Dashboard API file exists');

  // Check if files contain mock data references
  const userApiContent = fs.readFileSync(userApiFile, 'utf8');
  const dashboardApiContent = fs.readFileSync(dashboardApiFile, 'utf8');

  assert(userApiContent.includes('mockCurrentUser'), 'User API uses mock data');
  assert(dashboardApiContent.includes('mockDashboardStats'), 'Dashboard API uses mock data');
}

// Test 3: Check if components are updated
function testComponentFiles() {
  log('Testing component files...');

  const layoutFile = path.join(__dirname, '..', 'app', 'layout.tsx');
  const dashboardFile = path.join(__dirname, '..', 'app', '(protected)', 'dashboard', 'page.tsx');
  const profileFile = path.join(__dirname, '..', 'app', '(protected)', 'profile', 'page.tsx');

  assert(fs.existsSync(layoutFile), 'Layout file exists');
  assert(fs.existsSync(dashboardFile), 'Dashboard page exists');
  assert(fs.existsSync(profileFile), 'Profile page exists');

  // Check if authentication is removed
  const layoutContent = fs.readFileSync(layoutFile, 'utf8');
  const dashboardContent = fs.readFileSync(dashboardFile, 'utf8');

  assert(!layoutContent.includes('SessionProvider'), 'Authentication removed from layout');
  assert(!layoutContent.includes('auth()'), 'Auth function removed from layout');
  assert(dashboardContent.includes('mock user'), 'Dashboard uses mock user fallback');
}

// Test 4: Check if test files are created
function testTestFiles() {
  log('Testing test files...');

  const testFiles = [
    '__tests__/components/dashboard.test.tsx',
    '__tests__/api/user-management-api.test.ts',
    '__tests__/data/mock-users.test.ts',
    'test/setup.ts'
  ];

  testFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    assert(fs.existsSync(filePath), `Test file ${file} exists`);
  });
}

// Test 5: Check package.json scripts
function testPackageJson() {
  log('Testing package.json configuration...');

  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  assert(fs.existsSync(packageJsonPath), 'package.json exists');

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  assert(packageJson.scripts.test, 'Test script exists in package.json');
  assert(packageJson.scripts.test.includes('vitest'), 'Test script uses vitest');
}

// Test 6: Check middleware configuration
function testMiddleware() {
  log('Testing middleware configuration...');

  const middlewareFile = path.join(__dirname, '..', 'middleware.ts');
  assert(fs.existsSync(middlewareFile), 'Middleware file exists');

  const middlewareContent = fs.readFileSync(middlewareFile, 'utf8');
  assert(middlewareContent.includes('frontend-only'), 'Middleware configured for frontend-only');
  assert(middlewareContent.includes('No authentication required'), 'Authentication removed from middleware');
}

// Test 7: Check environment setup
function testEnvironmentSetup() {
  log('Testing environment setup...');

  const envLocalFile = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envLocalFile)) {
    const envContent = fs.readFileSync(envLocalFile, 'utf8');
    assert(envContent.includes('USE_MOCK_DB') || envContent.includes('mock'), 'Mock database environment configured');
  } else {
    log('No .env.local file found - using defaults');
  }
}

// Run all tests
function runTests() {
  log('🚀 Starting P-Core Refactoring Tests');
  log('=====================================');

  testMockDataFiles();
  testApiFiles();
  testComponentFiles();
  testTestFiles();
  testPackageJson();
  testMiddleware();
  testEnvironmentSetup();

  log('=====================================');
  log(`Test Results: ${testsPassed} passed, ${testsFailed} failed`);

  if (testsFailed === 0) {
    log('🎉 All tests passed! The refactoring is successful.', 'success');
  } else {
    log('❌ Some tests failed. Please check the issues above.', 'error');
  }

  // Detailed results
  log('Detailed Results:');
  results.forEach(result => {
    const status = result.passed ? '✅' : '❌';
    console.log(`${status} ${result.test}`);
  });

  return testsFailed === 0;
}

// Export for use in other scripts
module.exports = { runTests };

// Run if called directly
if (require.main === module) {
  const success = runTests();
  process.exit(success ? 0 : 1);
}
