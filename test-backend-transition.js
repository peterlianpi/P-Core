#!/usr/bin/env node

/**
 * Backend Transition Testing Script
 *
 * Tests switching between mock database and real database
 * Run with: node test-backend-transition.js
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

class BackendTransitionTester {
  constructor() {
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
          'User-Agent': 'Backend-Transition-Test/1.0',
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
      const passed = response.status === 200 && response.data?.status === 'healthy';
      this.recordTest('Health Check', passed, passed ? `Environment: ${response.data.environment}` : `Status: ${response.status}`);
    } catch (error) {
      this.recordTest('Health Check', false, error.message);
    }
  }

  async testDatabaseMode() {
    try {
      this.log('Testing database mode detection...');
      const response = await this.makeRequest(`${BASE_URL}/api/health`);
      const isMockMode = response.data?.mockDatabase === true;
      const mode = isMockMode ? 'MOCK DATABASE' : 'REAL DATABASE';
      this.recordTest('Database Mode', true, `Currently using: ${mode}`);
    } catch (error) {
      this.recordTest('Database Mode', false, error.message);
    }
  }

  async testUserAPI() {
    try {
      this.log('Testing user API with current database...');
      const response = await this.makeRequest(`${BASE_URL}/api/users?page=1&limit=5`);
      const passed = response.status === 200 && Array.isArray(response.data?.users);
      const userCount = response.data?.users?.length || 0;
      this.recordTest('User API', passed, passed ? `${userCount} users returned` : `Status: ${response.status}`);
    } catch (error) {
      this.recordTest('User API', false, error.message);
    }
  }

  async testUserFiltering() {
    try {
      this.log('Testing user filtering...');
      const response = await this.makeRequest(`${BASE_URL}/api/users?page=1&limit=5&role=USER`);
      const passed = response.status === 200 && response.data?.users?.every(user => user.role === 'USER');
      const userCount = response.data?.users?.length || 0;
      this.recordTest('User Filtering', passed, passed ? `${userCount} USER role users` : 'Filtering failed');
    } catch (error) {
      this.recordTest('User Filtering', false, error.message);
    }
  }

  async testSearchFunctionality() {
    try {
      this.log('Testing search functionality...');
      const response = await this.makeRequest(`${BASE_URL}/api/users?page=1&limit=5&search=demo`);
      const passed = response.status === 200;
      const userCount = response.data?.users?.length || 0;
      this.recordTest('Search Functionality', passed, passed ? `${userCount} users found` : 'Search failed');
    } catch (error) {
      this.recordTest('Search Functionality', false, error.message);
    }
  }

  async testAPIPerformance() {
    try {
      this.log('Testing API performance...');
      const startTime = Date.now();
      const response = await this.makeRequest(`${BASE_URL}/api/users?page=1&limit=10`);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      const passed = response.status === 200 && responseTime < 3000; // 3 seconds
      this.recordTest('API Performance', passed, `${responseTime}ms response time`);
    } catch (error) {
      this.recordTest('API Performance', false, error.message);
    }
  }

  async runTransitionTests() {
    this.log('🔄 P-Core Backend Transition Test Suite', 'info');
    this.log('=' .repeat(60), 'info');
    this.log('Testing current database configuration...', 'info');
    this.log('=' .repeat(60), 'info');

    // Run all tests
    await this.testHealthCheck();
    await this.testDatabaseMode();
    await this.testUserAPI();
    await this.testUserFiltering();
    await this.testSearchFunctionality();
    await this.testAPIPerformance();

    // Results summary
    this.log('=' .repeat(60), 'info');
    this.log('📊 TRANSITION TEST RESULTS', 'info');
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

    // Transition guidance
    const healthResponse = await this.makeRequest(`${BASE_URL}/api/health`).catch(() => null);
    const isMockMode = healthResponse?.data?.mockDatabase === true;

    if (isMockMode) {
      this.log('🔧 CURRENT MODE: MOCK DATABASE (Development)', 'warning');
      this.log('To switch to REAL DATABASE:', 'info');
      this.log('  1. Update DATABASE_URL in .env.local', 'info');
      this.log('  2. Remove "mock" from DATABASE_URL', 'info');
      this.log('  3. Run: npx prisma db push', 'info');
      this.log('  4. Restart: npm run dev', 'info');
    } else {
      this.log('🗄️  CURRENT MODE: REAL DATABASE (Production)', 'success');
      this.log('To switch to MOCK DATABASE:', 'info');
      this.log('  1. Update DATABASE_URL to include "mock"', 'info');
      this.log('  2. Restart: npm run dev', 'info');
    }

    this.log('=' .repeat(60), 'info');

    return successRate >= 80;
  }
}

// Instructions
console.log(`
🔄 P-CORE BACKEND TRANSITION TESTING
=====================================

This script tests your current database configuration and helps you
transition between mock database (development) and real database (production).

USAGE:
  # Test current setup
  node test-backend-transition.js

  # Test with custom URL
  BASE_URL=http://localhost:3000 node test-backend-transition.js

CURRENT ENVIRONMENT:
  BASE_URL: ${process.env.BASE_URL || 'http://localhost:3000'}

Make sure your development server is running: bun run dev

=====================================
`);

// Run the tests
if (require.main === module) {
  const tester = new BackendTransitionTester();
  tester.runTransitionTests()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Transition test failed:', error);
      process.exit(1);
    });
}

module.exports = BackendTransitionTester;
