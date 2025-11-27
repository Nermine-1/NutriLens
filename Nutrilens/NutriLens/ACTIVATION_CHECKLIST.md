# ✅ Activation Checklist

Complete these steps in order to fix your webhook issue.

---

## 🔴 CRITICAL STEPS (Must Do)

### ☐ 1. Activate n8n Workflow
- [ ] Go to https://nero1.app.n8n.cloud
- [ ] Open your meal analysis workflow
- [ ] Find the toggle switch (usually top-right)
- [ ] Switch it to **ACTIVE** (should turn green/blue)
- [ ] Verify it says "Active" or shows active status

**Why**: Production webhooks only work when workflow is active!

---

### ☐ 2. Configure CORS Headers
- [ ] Click on your Webhook node in the workflow
- [ ] Open "Options" or "Settings" section
- [ ] Find "Response Headers" or "HTTP Response Headers"
- [ ] Add these three headers:
  ```
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
  ```
- [ ] Save the workflow
- [ ] Re-activate if it became inactive

**Why**: Without CORS, your web app can't communicate with the webhook!

---

### ☐ 3. Verify Webhook URL
- [ ] Check your Webhook node settings
- [ ] Webhook path should be: `meal-ai`
- [ ] Full URL should be: `https://nero1.app.n8n.cloud/webhook/meal-ai`
- [ ] NOT: `https://nero1.app.n8n.cloud/webhook-test/meal-ai`

**Why**: Test webhooks don't work automatically!

---

## 🟡 RECOMMENDED STEPS

### ☐ 4. Test the Webhook
```bash
# Install dependency
npm install form-data

# Test with an image (replace with your image path)
node test-webhook.js ./src/assets/hero-meal.jpg
```

**Expected**: Should return JSON with food analysis
**If fails**: Check steps 1-3 above

---

### ☐ 5. Restart Development Server
```bash
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

**Why**: To load the new environment variables

---

### ☐ 6. Test in Browser
- [ ] Open your web app (usually http://localhost:5173)
- [ ] Go to the Analyze page
- [ ] Upload or take a photo
- [ ] Wait for analysis (should take 5-15 seconds)
- [ ] Verify results appear automatically
- [ ] Check browser console for any errors (F12)

---

## 🟢 VERIFICATION

### ✅ Success Indicators
- [ ] Image uploads without errors
- [ ] Analysis happens automatically
- [ ] Results appear within 15 seconds
- [ ] No need to click anything in n8n
- [ ] No CORS errors in browser console
- [ ] No 404 or "workflow not found" errors

### ❌ If Still Not Working

**Check these in order:**

1. **Is workflow ACTIVE?**
   - Go to n8n and verify the toggle is ON
   - Look for "Active" status indicator

2. **Are CORS headers set?**
   - Open Webhook node
   - Verify all 3 headers are present
   - Save and re-activate workflow

3. **Is URL correct?**
   - Should use `/webhook/` not `/webhook-test/`
   - Check `.env` file in your project

4. **Check n8n Execution Logs**
   - Go to n8n
   - Click "Executions" or "History"
   - Look for recent executions
   - Check for error messages

5. **Check Browser Console**
   - Press F12 in browser
   - Go to Console tab
   - Look for red error messages
   - Common errors:
     - CORS error → Fix CORS headers (step 2)
     - 404 error → Workflow not active (step 1)
     - Network error → Check webhook URL (step 3)

---

## 📞 Getting Help

If you've completed all steps and it's still not working:

1. **Check n8n Logs**
   - Look at execution history
   - Check for error messages
   - Verify workflow completed successfully

2. **Check Browser Console**
   - Press F12
   - Look for errors in Console tab
   - Copy any error messages

3. **Test Webhook Directly**
   ```bash
   node test-webhook.js path/to/image.jpg
   ```
   - If this works but browser doesn't → CORS issue
   - If this fails → n8n workflow issue

4. **Read Detailed Guides**
   - `WEBHOOK_SETUP.md` - Complete setup guide
   - `CHANGES_SUMMARY.md` - What was changed
   - `README_WEBHOOK_FIX.md` - Quick reference

---

## 🎯 Final Checklist

Before considering this complete:

- [ ] Workflow shows "Active" status in n8n
- [ ] CORS headers are configured in Webhook node
- [ ] Webhook URL uses `/webhook/` not `/webhook-test/`
- [ ] Test script runs successfully
- [ ] Dev server is running
- [ ] Browser test works automatically
- [ ] No manual intervention needed

---

**🎉 Once all items are checked, your webhook will work automatically!**

**⏱️ Estimated time**: 5-10 minutes

**🔧 Difficulty**: Easy (just configuration, no coding needed)