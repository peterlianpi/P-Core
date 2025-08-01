// Test the uploadImageSettings function
const { uploadImageSettings } = require('../data/upload-image-cloudinary');

async function testUploadImageSettings() {
  console.log('Testing uploadImageSettings function...');
  
  // Test 1: Invalid input
  console.log('\n1. Testing with invalid input:');
  const result1 = await uploadImageSettings('');
  console.log('Empty string result:', result1);
  
  const result2 = await uploadImageSettings('not-a-base64-image');
  console.log('Invalid format result:', result2);
  
  // Test 2: Valid base64 image (minimal 1x1 PNG)
  console.log('\n2. Testing with valid base64 image:');
  const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77zgAAAABJRU5ErkJggg==';
  
  try {
    const result3 = await uploadImageSettings(base64Image);
    if (typeof result3 === 'string') {
      console.log('✅ Upload successful! URL:', result3);
    } else {
      console.log('❌ Upload failed:', result3);
    }
  } catch (error) {
    console.error('Upload error:', error.message);
  }
  
  console.log('\nTest completed!');
}

if (require.main === module) {
  testUploadImageSettings()
    .catch(error => {
      console.error('Test failed:', error);
      process.exit(1);
    });
}

module.exports = { testUploadImageSettings };
