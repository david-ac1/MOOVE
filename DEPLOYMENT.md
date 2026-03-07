# 🚀 Deployment Guide: Vercel + Render

This guide will help you deploy **Moove** with:
- **Frontend (Next.js)** → Vercel
- **Backend (FastAPI + PostgreSQL)** → Render

Total time: ~15 minutes

---

## 📋 Prerequisites

1. GitHub account with your code pushed
2. Anthropic API key for Claude
3. Vercel account (free): https://vercel.com
4. Render account (free): https://render.com

---

## Part 1: Deploy Backend to Render (Do This First!)

### Step 1: Create Render Account
1. Go to https://render.com/register
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create New Web Service
1. Click **"New +"** → **"Blueprint"**
2. Connect your GitHub repository: `moove`
3. Render will detect `render.yaml` automatically
4. Click **"Apply"**

### Step 3: Set Environment Variables
Render will create two services automatically:
- `moove-backend` (Web Service)
- `moove-db` (PostgreSQL Database)

Click on **moove-backend** service:
1. Go to **"Environment"** tab
2. Add these variables:
   ```
   ANTHROPIC_API_KEY = your_claude_api_key_here
   CORS_ORIGINS = * (we'll update this after Vercel deployment)
   ```
3. Click **"Save Changes"**

### Step 4: Wait for Deployment
- First deployment takes 3-5 minutes
- Watch the logs for "✅ Database initialized"
- Once deployed, copy your backend URL: `https://moove-backend-xxxx.onrender.com`

### Step 5: Test Backend
Open: `https://your-backend-url.onrender.com/`

You should see:
```json
{
  "service": "Moove API",
  "status": "operational",
  "version": "1.0.0"
}
```

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com/signup
2. Sign up with GitHub
3. Authorize Vercel

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository: `moove`
3. Vercel auto-detects Next.js settings

### Step 3: Configure Environment Variables
**IMPORTANT:** Set this before deploying:

1. Click **"Environment Variables"**
2. Add:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://your-backend-url.onrender.com (from Step 4 of Part 1)
   ```
3. Apply to: **Production, Preview, Development**

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your app will be live at: `https://your-app.vercel.app`

### Step 5: Update CORS on Backend
1. Go back to Render dashboard
2. Open **moove-backend** service
3. Go to **"Environment"** tab
4. Update `CORS_ORIGINS`:
   ```
   CORS_ORIGINS = https://your-app.vercel.app,https://your-app-preview.vercel.app
   ```
5. Click **"Save Changes"** (backend will auto-redeploy)

---

## Part 3: Test Production Deployment

### Test Flow:
1. Open your Vercel URL: `https://your-app.vercel.app`
2. Go to `/intake`
3. Complete an interview
4. Click "See Pathways" → Should show AI-generated timeline
5. Go to `/compare` → Should show 3 country comparisons
6. Click "Simulate Pathway" on a country card
7. Verify it generates a new simulation for that country

### Check Backend Logs (if issues):
1. Go to Render dashboard
2. Click **moove-backend**
3. Click **"Logs"** tab
4. Look for errors

### Check Frontend Logs (if issues):
1. Go to Vercel dashboard
2. Click your project
3. Click **"Deployments"** → latest deployment
4. Click **"View Function Logs"**

---

## 🔧 Troubleshooting

### Frontend can't connect to backend:
- Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Check CORS_ORIGINS includes your Vercel URL in Render
- Look at browser console (F12) for CORS errors

### Backend database errors:
- Check Render logs for PostgreSQL connection errors
- Verify DATABASE_URL is automatically set by Render
- Database takes 30 seconds to start on free tier (first request may timeout)

### AI timeouts:
- Render free tier goes to sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading to paid tier ($7/month) for instant responses

### Build failures:
**Frontend:**
- Run `npm run build` locally first to catch TypeScript errors
- Check Vercel build logs

**Backend:**
- Check `requirements.txt` has all dependencies
- Verify Python version matches (3.12.4)

---

## 🎉 Success!

Your app is now live at:
- **Frontend:** https://your-app.vercel.app
- **Backend:** https://moove-backend-xxxx.onrender.com

### Custom Domain (Optional):
**Vercel:**
1. Go to project settings → "Domains"
2. Add your domain
3. Update DNS with provided records

**Render:**
1. Go to service settings → "Custom Domain"
2. Add your domain
3. Update DNS

---

## 💰 Cost Breakdown

### Free Tier (Perfect for Hackathon):
- **Vercel:** 100GB bandwidth, unlimited requests
- **Render:** 750 hours/month web service + PostgreSQL (enough for 1 app)
- **Total:** $0/month

### If You Need More (Post-Hackathon):
- **Vercel Pro:** $20/month (more bandwidth, priority support)
- **Render Starter:** $7/month (no sleep, faster responses)
- **Total:** $27/month

---

## 🔐 Security Notes

### Environment Variables:
✅ NEVER commit `.env` files to Git
✅ ANTHROPIC_API_KEY must be kept secret
✅ Use different API keys for dev/prod

### Database:
✅ Render PostgreSQL has SSL enabled by default
✅ Credentials are automatically rotated
✅ Backups run daily on paid tier

### CORS:
✅ Update CORS_ORIGINS to only include your domain in production
✅ Never use `*` in production

---

## 📊 Monitoring

### Render:
- Go to service → "Metrics" for CPU/memory usage
- Check "Logs" for runtime errors

### Vercel:
- Go to project → "Analytics" for traffic stats
- Check "Logs" for frontend errors

---

## 🚨 Common Issues

### "Session not found" errors:
- Database was reset (happens on Render free tier sometimes)
- Users need to complete intake again

### Slow AI responses:
- First request after sleep is slow (Render free tier)
- Consider keeping backend alive with cron job or upgrade to paid

### CORS errors in browser:
- Check CORS_ORIGINS includes your Vercel URL
- Make sure there's no trailing slash in URLs

---

## 📝 Next Steps After Deployment

1. **Add Analytics:** Install Vercel Analytics or PostHog
2. **Set up Monitoring:** Use Sentry for error tracking
3. **Custom Domain:** Point your domain to Vercel
4. **Email Notifications:** Add SendGrid for user notifications
5. **Caching:** Add Redis for faster responses (optional)

---

## 🆘 Need Help?

**Render Issues:**
- Docs: https://render.com/docs
- Community: https://community.render.com

**Vercel Issues:**
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord

**This Project:**
- Check GitHub issues
- Review backend logs on Render
- Check browser console (F12)

---

## ✅ Deployment Checklist

Before submitting to hackathon:

- [ ] Backend deployed on Render and responding
- [ ] Database connected (PostgreSQL)
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set correctly
- [ ] Full user flow tested (intake → simulator → compare)
- [ ] AI generating simulations successfully
- [ ] Cow animation working 🐮
- [ ] No CORS errors
- [ ] Custom domain added (optional)
- [ ] README updated with live URLs

---

**Your app is production-ready! 🎉**

Share your Vercel URL with judges and users. The backend will automatically scale with traffic on Render's free tier.
