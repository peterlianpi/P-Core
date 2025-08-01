// Simple Cloudinary connection test
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary (using same config as the app)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testCloudinaryConnection() {
  try {
    console.log('Testing Cloudinary connection...');
    
    // Test 1: Check API connectivity
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary API ping successful:', result);
    
    // Test 2: List existing folders (to verify API access)
    try {
      const folders = await cloudinary.api.root_folders();
      console.log('✅ Cloudinary folders access successful:', folders.folders?.length || 0, 'folders found');
    } catch (folderError) {
      console.log('⚠️  Folder access limited (this is normal for some Cloudinary plans)');
    }
    
    // Test 3: Try creating a test folder
    try {
      const testFolder = 'p-core-test';
      await cloudinary.api.create_folder(testFolder);
      console.log('✅ Folder creation successful');
      
      // Clean up test folder
      await cloudinary.api.delete_folder(testFolder);
      console.log('✅ Folder deletion successful');
    } catch (folderError) {
      console.log('⚠️  Folder operations:', folderError.message);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Cloudinary connection failed:', error.message);
    console.error('Please check your environment variables:');
    console.error('- CLOUDINARY_NAME');
    console.error('- CLOUDINARY_API_KEY'); 
    console.error('- CLOUDINARY_API_SECRET');
    return false;
  }
}

if (require.main === module) {
  testCloudinaryConnection()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Test failed:', error);
      process.exit(1);
    });
}

module.exports = { testCloudinaryConnection };
