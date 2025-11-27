# 🚀 Quick Reference Card

## 📌 The Fix in One Sentence
Changed from test webhook (`/webhook-test/`) to production webhook (`/webhook/`) so it works automatically.

---

## ⚡ 3-Step Activation

1. **Activate workflow** in n8n (toggle switch)
2. **Add CORS headers** in webhook node
3. **Restart dev server** (`npm run dev`)

---

## 🔗 Important URLs

| Purpose | URL |
|---------|-----|
| n8n Dashboard | https://nero1.app.n8n.cloud |
| Production Webhook | https://nero1.app.n8n.cloud/webhook/meal-ai |
| ~~Test Webhook~~ | ~~https://nero1.app.n8n.cloud/webhook-test/meal-ai~~ |

---

## 🛠️ CORS Headers (Copy-Paste)

Add these in your n8n Webhook node → Options → Response Headers:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## 📝 Environment Variables

File: `.env`
```env
VITE_N8N_WEBHOOK_URL=https://nero1.app.n8n.cloud/webhook/meal-ai
VITE_API_URL=http://localhost:3001
```

---

## 🧪 Quick Test Commands

```bash
# Install test dependency
npm install form-data

# Test webhook
node test-webhook.js path/to/image.jpg

# Start dev server
npm run dev
```

---

## 🎯 Success Checklist

- [ ] Workflow is ACTIVE in n8n
- [ ] CORS headers configured
- [ ] Using `/webhook/` not `/webhook-test/`
- [ ] Dev server restarted
- [ ] Test upload works

---

## ❌ Common Errors & Fixes

| Error | Fix |
|-------|-----|
| CORS error | Add CORS headers in n8n |
| 404 Not Found | Activate workflow in n8n |
| Needs manual click | Using test URL - check .env |
| No response | Check n8n execution logs |

---

## 📚 Documentation Files

- `ACTIVATION_CHECKLIST.md` - Step-by-step activation
- `README_WEBHOOK_FIX.md` - Quick start guide
- `WEBHOOK_SETUP.md` - Detailed setup
- `WEBHOOK_FLOW.md` - Visual diagrams
- `CHANGES_SUMMARY.md` - What changed

---

## 🆘 Emergency Troubleshooting

1. **Check n8n**: Is workflow ACTIVE?
2. **Check CORS**: Are headers set?
3. **Check URL**: Using `/webhook/` not `/webhook-test/`?
4. **Check logs**: Any errors in n8n executions?
5. **Check console**: Any errors in browser (F12)?

---

## 💡 Remember

**The workflow MUST be ACTIVE in n8n!**

This is the #1 reason production webhooks don't work.

---

## 🎉 When It's Working

- ✅ Upload image → Automatic analysis
- ✅ Results in 5-15 seconds
- ✅ No manual intervention
- ✅ No errors in console
- ✅ Saved to history automatically

---

**Need more help?** Read `ACTIVATION_CHECKLIST.md`