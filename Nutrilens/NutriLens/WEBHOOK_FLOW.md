# Webhook Flow Diagram

## ❌ Before (Not Working - Required Manual Intervention)

```
┌─────────────┐
│   User      │
│  Uploads    │
│   Image     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Web App (NutriLens)                │
│  Sends to: /webhook-test/meal-ai    │ ◄── TEST ENDPOINT
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  n8n Webhook (Test Mode)            │
│  Status: Waiting for manual trigger │ ◄── REQUIRES MANUAL CLICK
└──────┬──────────────────────────────┘
       │
       │  ❌ STOPS HERE - Needs manual intervention
       │
       ▼
┌─────────────────────────────────────┐
│  You click "Execute workflow"       │ ◄── MANUAL STEP
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  AI Model Analyzes Image            │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Results Returned                   │
└─────────────────────────────────────┘
```

---

## ✅ After (Working - Fully Automatic)

```
┌─────────────┐
│   User      │
│  Uploads    │
│   Image     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Web App (NutriLens)                │
│  Sends to: /webhook/meal-ai         │ ◄── PRODUCTION ENDPOINT
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  n8n Webhook (Production Mode)      │
│  Status: ACTIVE & Listening         │ ◄── AUTOMATICALLY TRIGGERS
└──────┬──────────────────────────────┘
       │
       │  ✅ CONTINUES AUTOMATICALLY
       │
       ▼
┌─────────────────────────────────────┐
│  AI Model Analyzes Image            │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Results Returned to Web App        │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  User Sees Results                  │
│  🎉 No manual intervention needed!  │
└─────────────────────────────────────┘
```

---

## Key Differences

| Aspect | Before (Test) | After (Production) |
|--------|---------------|-------------------|
| **Endpoint** | `/webhook-test/meal-ai` | `/webhook/meal-ai` |
| **Workflow Status** | Can be inactive | Must be ACTIVE |
| **Trigger** | Manual click required | Automatic |
| **User Experience** | Broken - waits forever | Seamless - works instantly |
| **Use Case** | Development/Testing | Production |

---

## Configuration Requirements

### For Production Webhook to Work:

1. **Workflow Must Be ACTIVE** ⚡
   ```
   n8n Dashboard → Your Workflow → Toggle to ACTIVE
   ```

2. **CORS Headers Must Be Set** 🌐
   ```
   Webhook Node → Options → Response Headers:
   - Access-Control-Allow-Origin: *
   - Access-Control-Allow-Methods: POST, OPTIONS
   - Access-Control-Allow-Headers: Content-Type
   ```

3. **Correct URL in App** 🔗
   ```
   .env file:
   VITE_N8N_WEBHOOK_URL=https://nero1.app.n8n.cloud/webhook/meal-ai
   ```

---

## Data Flow

### Request (Upload)
```
Image File
    ↓
FormData (multipart/form-data)
    ↓
POST https://nero1.app.n8n.cloud/webhook/meal-ai
    ↓
n8n Webhook Node
    ↓
AI Model (Google Gemini)
```

### Response (Results)
```
AI Model Analysis
    ↓
Structured Output Parser
    ↓
JSON Response:
{
  "status": "success",
  "food": [
    {
      "name": "Pizza",
      "quantity": "2 slices",
      "calories": 500,
      "protein": 20,
      "carbs": 60,
      "fat": 15
    }
  ],
  "total": {
    "calories": 500,
    "protein": 20,
    "carbs": 60,
    "fat": 15
  }
}
    ↓
Web App Displays Results
```

---

## Troubleshooting Flow

```
Upload Image
    ↓
Does it analyze automatically?
    │
    ├─ YES → ✅ Working! You're done!
    │
    └─ NO → Check:
            │
            ├─ Is workflow ACTIVE in n8n?
            │   ├─ NO → Activate it
            │   └─ YES → Continue
            │
            ├─ Are CORS headers set?
            │   ├─ NO → Add them
            │   └─ YES → Continue
            │
            ├─ Is URL using /webhook/ (not /webhook-test/)?
            │   ├─ NO → Update .env file
            │   └─ YES → Continue
            │
            └─ Check n8n execution logs for errors
```

---

## Testing

### Test 1: Direct Webhook Test
```bash
node test-webhook.js image.jpg
```
**Expected**: JSON response with food analysis
**If fails**: Problem with n8n workflow or CORS

### Test 2: Browser Test
```
1. Upload image in web app
2. Check browser console (F12)
3. Look for network request to webhook
```
**Expected**: 200 OK response with JSON
**If fails**: Check CORS or workflow status

---

## Success Indicators

✅ **You know it's working when:**
- Image uploads smoothly
- Analysis happens within 5-15 seconds
- Results appear automatically
- No errors in browser console
- No need to touch n8n at all

❌ **You know it's broken when:**
- Image uploads but nothing happens
- CORS errors in console
- 404 or "workflow not found" errors
- Need to click "Execute workflow" in n8n

---

**Remember**: The single most important thing is that your n8n workflow must be **ACTIVE**!