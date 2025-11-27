# n8n Webhook Setup Guide

## Problem
Your webhook was using the **test endpoint** (`/webhook-test/`) which only works when you manually click "Execute workflow" in n8n. This has been fixed to use the **production endpoint** (`/webhook/`).

## Solution Steps

### 1. Activate Your n8n Workflow
1. Open your n8n workflow at https://nero1.app.n8n.cloud
2. Make sure the workflow is **ACTIVE** (toggle the switch in the top-right corner)
3. The workflow must be active for the production webhook to work automatically

### 2. Verify Webhook URL
Your webhook URL should be:
```
https://nero1.app.n8n.cloud/webhook/meal-ai
```

**NOT** the test URL:
```
https://nero1.app.n8n.cloud/webhook-test/meal-ai
```

### 3. Configure CORS in n8n
To allow your web app to call the webhook, you need to enable CORS in your n8n webhook node:

1. Open your Webhook node in n8n
2. Go to the "Options" section
3. Enable "Response Headers"
4. Add these headers:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type
   ```

### 4. Test the Production Webhook
You can test if the production webhook is working using curl:

```bash
curl -X POST https://nero1.app.n8n.cloud/webhook/meal-ai \
  -F "image=@/path/to/test-image.jpg"
```

If it returns a JSON response with food analysis, it's working!

### 5. Environment Configuration
The app now uses environment variables. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` if you need to change the webhook URL:
```env
VITE_N8N_WEBHOOK_URL=https://nero1.app.n8n.cloud/webhook/meal-ai
```

### 6. Restart Your Development Server
After making these changes, restart your Vite dev server:

```bash
npm run dev
```

## Troubleshooting

### Issue: "CORS Error"
**Solution**: Make sure you've configured CORS headers in your n8n webhook node (see step 3 above)

### Issue: "Workflow not found" or 404 error
**Solution**: 
- Make sure your n8n workflow is ACTIVE
- Verify the webhook path is `/webhook/meal-ai` (not `/webhook-test/`)

### Issue: Still need to click "Execute workflow"
**Solution**: 
- You're still using the test endpoint. Make sure the URL uses `/webhook/` not `/webhook-test/`
- Ensure the workflow is ACTIVE in n8n

### Issue: Webhook returns empty response
**Solution**: 
- Check your n8n workflow execution logs
- Make sure the "Respond to Webhook" node is configured correctly
- Verify the workflow completes successfully

## How It Works Now

1. User uploads/takes a photo in the web app
2. The app sends a POST request to the **production webhook** at `https://nero1.app.n8n.cloud/webhook/meal-ai`
3. n8n automatically processes the request (no manual intervention needed!)
4. The AI analyzes the image
5. n8n returns the nutrition data
6. The app displays the results

## Key Differences: Test vs Production Webhooks

| Feature | Test Webhook (`/webhook-test/`) | Production Webhook (`/webhook/`) |
|---------|--------------------------------|----------------------------------|
| Requires manual trigger | ✅ Yes | ❌ No |
| Works automatically | ❌ No | ✅ Yes |
| Workflow must be active | ❌ No | ✅ Yes |
| Use case | Development/Testing | Production |

## Next Steps

1. ✅ Activate your n8n workflow
2. ✅ Configure CORS headers
3. ✅ Test the production webhook
4. ✅ Restart your dev server
5. ✅ Upload an image and verify it works automatically!

Your webhook should now work automatically without any manual intervention! 🎉