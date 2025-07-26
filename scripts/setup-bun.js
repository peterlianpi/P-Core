#!/usr/bin/env bun

/**
 * Bun Setup Script for P-Core
 * 
 * Migrates the project from npm to Bun for maximum performance
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Setting up Bun for P-Core...\n');

function checkBunInstallation() {
  try {
    const bunVersion = execSync('bun --version', { encoding: 'utf8' }).trim();
    console.log(`✅ Bun ${bunVersion} detected`);
    return true;
  } catch (error) {
    console.log('❌ Bun not found. Please install Bun first:');
    console.log('   curl -fsSL https://bun.sh/install | bash');
    console.log('   or visit: https://bun.sh/docs/installation');
    return false;
  }
}

function cleanupOldFiles() {
  console.log('🧹 Cleaning up old package manager files...');
  
  const filesToRemove = [
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml'
  ];
  
  filesToRemove.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`   Removed ${file}`);
    }
  });
  
  // Clean npm cache folders
  try {
    execSync('rm -rf node_modules/.cache', { stdio: 'inherit' });
    console.log('   Cleaned npm cache');
  } catch (error) {
    // Ignore if cache doesn't exist
  }
}

function installDependencies() {
  console.log('📦 Installing dependencies with Bun...');
  
  try {
    execSync('bun install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
}

function generatePrismaClient() {
  console.log('🔧 Generating Prisma client with Bun...');
  
  try {
    execSync('bunx prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma client generated');
  } catch (error) {
    console.error('❌ Failed to generate Prisma client:', error.message);
  }
}

function runPerformanceOptimization() {
  console.log('⚡ Running performance optimizations...');
  
  try {
    execSync('bun run perf:optimize', { stdio: 'inherit' });
    console.log('✅ Performance optimizations completed');
  } catch (error) {
    console.error('❌ Performance optimization failed:', error.message);
  }
}

function showCompletionMessage() {
  console.log(`
🎉 Bun setup completed successfully!

📊 Performance Improvements:
  • 2-4x faster startup times
  • Significantly faster package installation
  • Faster TypeScript transpilation
  • Optimized development server
  • Lightning-fast test execution

🚀 Quick Start Commands:
  bun run dev:fast     - Start development (fastest)
  bun run build:fast   - Build for production (fastest)
  bun run test         - Run tests with Bun
  bun run perf:tips    - View all performance tips

💡 Next Steps:
  1. Try 'bun run dev:fast' for the fastest development experience
  2. Run 'bun run perf:measure' to benchmark your build times
  3. Use 'bunx' instead of 'npx' for any CLI tools

Happy coding with Bun! 🔥
  `);
}

// Main execution
async function main() {
  if (!checkBunInstallation()) {
    process.exit(1);
  }
  
  cleanupOldFiles();
  installDependencies();
  generatePrismaClient();
  runPerformanceOptimization();
  showCompletionMessage();
}

main().catch(console.error);
