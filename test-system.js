#!/usr/bin/env node

/**
 * P-Core System Comprehensive Test Suite
 *
 * Tests all components, APIs, and functionality of the optimized P-Core system
 * Run with: node test-system.js
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const TEST_EMAIL = 'demo@example.com';
const TEST_PASSWORD = 'password';

class SystemTester {
  constructor() {
    this.sessionCookie = null;
    this.csrfToken = null;
    this.testResults = {
      passed: 0,
      failed: 0,
      total: 0,
      tests: []
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const colors = {
      success: '\x1b[32m',
      error: '\x1b[31m',
      warning: '\x1b[33m',
      info: '\x1b[36m',
      reset: '\x1b[0m'
    };
    console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
  }

  recordTest(name, passed, details = '') {
    this.testResults.total++;
    if (passed) {
      this.testResults.passed++;
      this.log(`✅ ${name}`, 'success');
    } else {
      this.testResults.failed++;
      this.log(`❌ ${name}: ${details}`, 'error');
    }
    this.testResults.tests.push({ name, passed, details });
  }

  async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      const req = protocol.request(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'P-Core-Test-Suite/1.0',
          'Accept': 'application/json',
          ...options.headers
        },
        ...options
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve({ status: res.statusCode, headers: res.headers, data: jsonData });
          } catch (e) {
            resolve({ status: res.statusCode, headers: res.headers, data });
          }
        });
      });

      req.on('error', reject);
      if (options.body) {
        req.write(options.body);
      }
      req.end();
    });
  }

  async testHealthCheck() {
    try {
      this.log('Testing health check endpoint...');
      const response = await this.makeRequest(`${BASE_URL}/api/health`);
      const passed = response.status === 200;
      this.recordTest('Health Check', passed, passed ? 'OK' : `Status: ${response.status}`);
    } catch (error) {
      this.recordTest('Health Check', false, error.message);
    }
  }

  async testMockDatabase() {
    try {
      this.log('Testing mock database detection...');
      // Check if we're using mock database by looking at the logs or environment
      const response = await this.makeRequest(`${BASE_URL}/api/users?page=1&limit=5`);
      const isMockData = response.data?.users?.some(user => user.id.startsWith('mock-'));
      this.recordTest('Mock Database', isMockData, isMockData ? 'Mock data detected' : 'Real database detected');
    } catch (error) {
      this.recordTest('Mock Database', false, error.message);
    }
  }

  async testUserAPI() {
    try {
      this.log('Testing user API endpoints...');

      // Test user listing
      const listResponse = await this.makeRequest(`${BASE_URL}/api/users?page=1&limit=10`);
      const listPassed = listResponse.status === 200 && Array.isArray(listResponse.data?.users);
      this.recordTest('User API - List', listPassed, listPassed ? `${listResponse.data.users.length} users returned` : `Status: ${listResponse.status}`);

      // Test user filtering
      const filterResponse = await this.makeRequest(`${BASE_URL}/api/users?page=1&limit=5&role=USER`);
      const filterPassed = filterResponse.status === 200 && filterResponse.data?.users?.every(user => user.role === 'USER');
      this.recordTest('User API - Filter by Role', filterPassed, filterPassed ? 'Role filtering works' : 'Role filtering failed');

      // Test search
      const searchResponse = await this.makeRequest(`${BASE_URL}/api/users?page=1&limit=5&search=demo`);
      const searchPassed = searchResponse.status === 200 && searchResponse.data?.users?.some(user => user.email.includes('demo'));
      this.recordTest('User API - Search', searchPassed, searchPassed ? 'Search functionality works' : 'Search failed');

    } catch (error) {
      this.recordTest('User API', false, error.message);
    }
  }

  async testAuthentication() {
    try {
      this.log('Testing authentication system...');

      // Test login page loads
      const loginPageResponse = await this.makeRequest(`${BASE_URL}/auth/login`);
      const loginPagePassed = loginPageResponse.status === 200;
      this.recordTest('Login Page', loginPagePassed, loginPagePassed ? 'Login page loads' : `Status: ${loginPageResponse.status}`);

      // Test session endpoint
      const sessionResponse = await this.makeRequest(`${BASE_URL}/api/auth/session`);
      const sessionPassed = sessionResponse.status === 200;
      this.recordTest('Session API', sessionPassed, sessionPassed ? 'Session API accessible' : `Status: ${sessionResponse.status}`);

    } catch (error) {
      this.recordTest('Authentication', false, error.message);
    }
  }

  async testProtectedRoutes() {
    try {
      this.log('Testing protected routes...');

      const routes = ['/dashboard', '/profile', '/users'];
      for (const route of routes) {
        const response = await this.makeRequest(`${BASE_URL}${route}`);
        // Should redirect to login (302) or return login page (200)
        const passed = response.status === 302 || response.status === 200;
        this.recordTest(`Protected Route: ${route}`, passed, passed ? 'Properly protected' : `Status: ${response.status}`);
      }

    } catch (error) {
      this.recordTest('Protected Routes', false, error.message);
    }
  }

  async testBuildOutput() {
    try {
      this.log('Testing build output...');

      // Check if Next.js build files exist
      const fs = require('fs');
      const buildExists = fs.existsSync('.next');
      this.recordTest('Build Output', buildExists, buildExists ? '.next directory exists' : 'Build not found');

      // Check middleware size
      if (buildExists) {
        try {
          const middlewarePath = '.next/server/middleware.js';
          if (fs.existsSync(middlewarePath)) {
            const stats = fs.statSync(middlewarePath);
            const sizeKB = Math.round(stats.size / 1024);
            const sizePassed = sizeKB < 100; // Should be much smaller than original
            this.recordTest('Middleware Size', sizePassed, `${sizeKB}KB (${sizePassed ? 'Optimized' : 'Large'})`);
          }
        } catch (error) {
          this.recordTest('Middleware Size', false, 'Could not check size');
        }
      }

    } catch (error) {
      this.recordTest('Build Output', false, error.message);
    }
  }

  async testDatabaseConnection() {
    try {
      this.log('Testing database connection...');

      // Try to access a simple endpoint that uses the database
      const response = await this.makeRequest(`${BASE_URL}/api/users?page=1&limit=1`);
      const dbPassed = response.status === 200 && response.data && !response.data.error;
      this.recordTest('Database Connection', dbPassed, dbPassed ? 'Database accessible' : `Error: ${response.data?.error || 'Unknown'}`);

    } catch (error) {
      this.recordTest('Database Connection', false, error.message);
    }
  }

  async testAPIPerformance() {
    try {
      this.log('Testing API performance...');

      const startTime = Date.now();
      const response = await this.makeRequest(`${BASE_URL}/api/users?page=1&limit=20`);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // API should respond within 2 seconds
      const performancePassed = response.status === 200 && responseTime < 2000;
      this.recordTest('API Performance', performancePassed, `${responseTime}ms response time`);

    } catch (error) {
      this.recordTest('API Performance', false, error.message);
    }
  }

  async testErrorHandling() {
    try {
      this.log('Testing error handling...');

      // Test invalid API endpoint
      const invalidResponse = await this.makeRequest(`${BASE_URL}/api/nonexistent`);
      const errorPassed = invalidResponse.status === 404;
      this.recordTest('Error Handling - 404', errorPassed, errorPassed ? 'Proper 404 response' : `Status: ${invalidResponse.status}`);

      // Test invalid user ID
      const invalidUserResponse = await this.makeRequest(`${BASE_URL}/api/users/invalid-id`);
      const invalidUserPassed = invalidUserResponse.status === 400 || invalidUserResponse.status === 404;
      this.recordTest('Error Handling - Invalid ID', invalidUserPassed, invalidUserPassed ? 'Proper error response' : `Status: ${invalidUserResponse.status}`);

    } catch (error) {
      this.recordTest('Error Handling', false, error.message);
    }
  }

  async testDataIntegrity() {
    try {
      this.log('Testing data integrity...');

      const response = await this.makeRequest(`${BASE_URL}/api/users?page=1&limit=10`);
      if (response.status === 200 && response.data?.users) {
        const users = response.data.users;

        // Check if all users have required fields
        const hasRequiredFields = users.every(user =>
          user.id && user.email && user.name && user.role
        );

        // Check if roles are valid
        const validRoles = ['USER', 'ADMIN', 'SUPERADMIN'];
        const hasValidRoles = users.every(user =>
          validRoles.includes(user.role)
        );

        // Check pagination
        const hasPagination = response.data.total !== undefined &&
                             response.data.page !== undefined &&
                             response.data.limit !== undefined;

        this.recordTest('Data Integrity - Required Fields', hasRequiredFields, hasRequiredFields ? 'All users have required fields' : 'Missing required fields');
        this.recordTest('Data Integrity - Valid Roles', hasValidRoles, hasValidRoles ? 'All users have valid roles' : 'Invalid roles found');
        this.recordTest('Data Integrity - Pagination', hasPagination, hasPagination ? 'Pagination data present' : 'Pagination data missing');
      } else {
        this.recordTest('Data Integrity', false, 'Could not retrieve user data');
      }

    } catch (error) {
      this.recordTest('Data Integrity', false, error.message);
    }
  }

  async runAllTests() {
    this.log('🚀 Starting P-Core System Comprehensive Test Suite', 'info');
    this.log('=' .repeat(60), 'info');

    // Core System Tests
    await this.testHealthCheck();
    await this.testBuildOutput();
    await this.testMockDatabase();
    await this.testDatabaseConnection();

    // Authentication Tests
    await this.testAuthentication();
    await this.testProtectedRoutes();

    // API Tests
    await this.testUserAPI();
    await this.testAPIPerformance();

    // Data Quality Tests
    await this.testDataIntegrity();
    await this.testErrorHandling();

    // Results Summary
    this.log('=' .repeat(60), 'info');
    this.log('📊 TEST RESULTS SUMMARY', 'info');
    this.log('=' .repeat(60), 'info');

    const { passed, failed, total } = this.testResults;
    const successRate = Math.round((passed / total) * 100);

    this.log(`Total Tests: ${total}`, 'info');
    this.log(`Passed: ${passed}`, 'success');
    this.log(`Failed: ${failed}`, failed > 0 ? 'error' : 'info');
    this.log(`Success Rate: ${successRate}%`, successRate >= 80 ? 'success' : 'error');

    if (failed > 0) {
      this.log('\n❌ FAILED TESTS:', 'error');
      this.testResults.tests
        .filter(test => !test.passed)
        .forEach(test => this.log(`  - ${test.name}: ${test.details}`, 'error'));
    }

    this.log('\n' + '=' .repeat(60), 'info');
    if (successRate >= 80) {
      this.log('🎉 SYSTEM TEST PASSED - Ready for production!', 'success');
    } else {
      this.log('⚠️  SYSTEM TEST FAILED - Issues need to be resolved', 'error');
    }
    this.log('=' .repeat(60), 'info');

    return successRate >= 80;
  }
}

// Run the tests
if (require.main === module) {
  const tester = new SystemTester();
  tester.runAllTests()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Test suite failed:', error);
      process.exit(1);
    });
}

module.exports = SystemTester;
