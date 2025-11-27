# 🔧 Webhook Fix - Quick Start Guide

## 🎯 The Problem
Your app only worked when you manually clicked "Execute workflow" in n8n because it was using the **test webhook**.

## ✅ The Solution
Changed to use the **production webhook** which works automatically.

---

## 🚀 Quick Setup (3 Steps)

### Step 1️⃣: Activate Your n8n Workflow
```
1. Go to: https://nero1.app.n8n.cloud
2. Open your meal analysis workflow
3. Click the toggle switch to make it ACTIVE ⚡
```

**⚠️ CRITICAL**: The workflow MUST be active!

---

### Step 2️⃣: Enable CORS in n8n
```
1. Open your Webhook node in n8n
2. Go to Options/Settings
3. Add Response Headers:
   - Access-Control-Allow-Origin: *
   - Access-Control-Allow-Methods: POST, OPTIONS
   - Access-Control-Allow-Headers: Content-Type
4. Save the workflow
```

**⚠️ CRITICAL**: Without CORS, your app can't call the webhook!

---

### Step 3️⃣: Restart Your App
```bash
npm run dev
```

---

## 🧪 Test It

### Option A: Test with Script
```bash
npm install form-data
node test-webhook.js path/to/image.jpg
```

### Option B: Test in Browser
1. Open your web app
2. Go to Analyze page
3. Upload an image
4. Should work automatically! 🎉

---

## 📋 What Changed?

| Before | After |
|--------|-------|
| `/webhook-test/meal-ai` | `/webhook/meal-ai` |
| Manual trigger needed | Automatic |
| Workflow can be inactive | Workflow must be active |

---

## ❓ Troubleshooting

### "CORS Error"
✅ **Fix**: Add CORS headers in n8n (Step 2 above)

### "404 Not Found" or "Workflow not found"
✅ **Fix**: Make sure workflow is ACTIVE in n8n

### Still need to click "Execute workflow"
✅ **Fix**: You're still using test URL. Check `.env` file

### No response from webhook
✅ **Fix**: Check n8n execution logs for errors

---

## 📁 New Files Created

- `.env` - Your webhook configuration
- `.env.example` - Template for others
- `WEBHOOK_SETUP.md` - Detailed guide
- `test-webhook.js` - Test script
- `CHANGES_SUMMARY.md` - What was changed

---

## 🎓 Learn More

**Test Webhook** (`/webhook-test/`)
- For manual testing only
- Requires clicking "Execute workflow"
- Workflow can be inactive

**Production Webhook** (`/webhook/`)
- For automatic operation ✅
- No manual intervention needed
- Workflow MUST be active

---

## ✨ Success Checklist

- [ ] Workflow is ACTIVE in n8n
- [ ] CORS headers configured
- [ ] Dev server restarted
- [ ] Test upload works automatically
- [ ] No manual intervention needed

---

## 🆘 Need Help?

1. Read `WEBHOOK_SETUP.md` for details
2. Check browser console for errors
3. Check n8n execution logs
4. Verify workflow is ACTIVE

---

**🎉 That's it! Your webhook should now work automatically without any manual intervention!**