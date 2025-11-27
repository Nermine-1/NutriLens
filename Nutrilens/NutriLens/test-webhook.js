/**
 * Simple script to test if the n8n production webhook is working
 * 
 * Usage: node test-webhook.js <path-to-image>
 * Example: node test-webhook.js ./test-image.jpg
 */

const fs = require('fs');
const path = require('path');

const WEBHOOK_URL = process.env.VITE_N8N_WEBHOOK_URL || 'https://nero1.app.n8n.cloud/webhook/meal-ai';

async function testWebhook(imagePath) {
  console.log('🧪 Testing n8n webhook...');
  console.log('📍 Webhook URL:', WEBHOOK_URL);
  console.log('🖼️  Image:', imagePath);
  console.log('');

  try {
    // Check if image exists
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found: ${imagePath}`);
    }

    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    const fileName = path.basename(imagePath);

    // Create FormData
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename: fileName,
      contentType: 'image/jpeg'
    });

    console.log('📤 Sending request...');
    const startTime = Date.now();

    // Make the request
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });

    const duration = Date.now() - startTime;

    console.log('');
    console.log('📊 Response Status:', response.status, response.statusText);
    console.log('⏱️  Duration:', duration + 'ms');
    console.log('');

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error Response:', errorText);
      throw new Error(`Webhook returned status ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Success! Response:');
    console.log(JSON.stringify(data, null, 2));
    console.log('');
    console.log('🎉 Webhook is working correctly!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Make sure your n8n workflow is ACTIVE');
    console.log('2. Restart your dev server: npm run dev');
    console.log('3. Try uploading an image in your web app');

  } catch (error) {
    console.error('');
    console.error('❌ Test Failed:', error.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Is your n8n workflow ACTIVE?');
    console.error('2. Did you configure CORS headers in the webhook node?');
    console.error('3. Is the webhook URL correct? (should use /webhook/ not /webhook-test/)');
    console.error('4. Check n8n execution logs for errors');
    console.error('');
    console.error('See WEBHOOK_SETUP.md for detailed instructions');
    process.exit(1);
  }
}

// Get image path from command line
const imagePath = process.argv[2];

if (!imagePath) {
  console.error('Usage: node test-webhook.js <path-to-image>');
  console.error('Example: node test-webhook.js ./test-image.jpg');
  process.exit(1);
}

testWebhook(imagePath);