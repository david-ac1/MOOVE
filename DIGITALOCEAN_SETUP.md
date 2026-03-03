# 🌊 DigitalOcean Gradient™ AI Setup Guide
## MANDATORY for Hackathon Submission

---

## ⚠️ Important: This is NOT Optional

Your project **MUST** use DigitalOcean Gradient™ AI to be eligible for judging and prizes. This is the core requirement of the hackathon.

---

## 📝 Step-by-Step Setup

### Step 1: Create DigitalOcean Account (5 minutes)

1. Go to https://cloud.digitalocean.com/registrations/new
2. Sign up with email or GitHub
3. Verify your email
4. Add payment method (required, but you won't be charged with credits)
5. **Claim $200 in free credits** (usually auto-applied)

**Pro Tip:** Use your student email if you have one for additional benefits.

---

### Step 2: Access Gradient™ AI (2 minutes)

Once logged in:

1. Navigate to **AI & ML** in the left sidebar
2. Click on **Gradient™ AI**
3. Or go directly to: https://cloud.digitalocean.com/ai

You should see:
- Model catalog
- Documentation
- API access options

---

### Step 3: Get API Credentials (5 minutes)

**Option A: API Tokens (Recommended)**

1. Go to https://cloud.digitalocean.com/account/api/tokens
2. Click **"Generate New Token"**
3. Name it: "Moove Hackathon"
4. Select scopes:
   - ✅ Read
   - ✅ Write
5. Click **"Generate Token"**
6. **COPY THE TOKEN IMMEDIATELY** (you can't see it again)

**Option B: Gradient™ AI Specific Keys**

1. In Gradient™ AI dashboard
2. Look for **"API Keys"** or **"Credentials"**
3. Generate new key
4. Copy the key

---

### Step 4: Configure Your Project (2 minutes)

Open `backend/.env` and add:

```env
# DigitalOcean Gradient™ AI (REQUIRED)
DIGITALOCEAN_GRADIENT_API_KEY=dop_v1_xxxxxxxxxxxxxxxxxxxx
GRADIENT_ENDPOINT=https://api.digitalocean.com/v2/ai

# Fallback for local testing only (OPTIONAL)
ANTHROPIC_API_KEY=sk-ant-xxxx
```

---

### Step 5: Test the Connection (3 minutes)

Update `backend/app/services/gradient_ai.py`:

```python
import os
import httpx

async def test_gradient_connection():
    """Test DigitalOcean Gradient™ AI connection"""
    
    api_key = os.getenv("DIGITALOCEAN_GRADIENT_API_KEY")
    endpoint = os.getenv("GRADIENT_ENDPOINT")
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # Test with a simple prompt
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{endpoint}/chat/completions",
            headers=headers,
            json={
                "model": "meta-llama-3-70b",  # Or another model
                "messages": [
                    {"role": "user", "content": "Hello, are you working?"}
                ],
                "max_tokens": 50
            }
        )
        
        if response.status_code == 200:
            print("✅ DigitalOcean Gradient™ AI connected successfully!")
            return True
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return False
```

---

## 📚 Available Models

DigitalOcean Gradient™ AI typically offers:

### Open Source LLMs
- **Meta Llama 3** (70B, 8B variants)
- **Mistral** models
- **CodeLlama** for code tasks

### API-Compatible Services
- OpenAI-compatible endpoints
- Anthropic Claude (if integrated)

**Check current catalog:** https://docs.digitalocean.com/products/ai/

---

## 🏗️ Infrastructure You'll Need

Beyond just Gradient™ AI, you'll also use:

### Required DigitalOcean Services

1. **App Platform** (for deployment)
   - Frontend hosting
   - Backend API hosting
   - Auto-scaling
   - CI/CD integration

2. **Managed Databases** (for PostgreSQL)
   - Store user sessions
   - Store simulation results
   - Store visa rules

3. **Spaces** (optional - for static assets)
   - Images, videos
   - User uploads
   - Backups

---

## 💰 Cost Estimate (With $200 Credits)

For hackathon period (15 days):

| Service | Estimated Cost | Notes |
|---------|---------------|-------|
| Gradient™ AI | $10-30 | Depends on token usage |
| App Platform | $5-15 | Basic tier |
| Managed PostgreSQL | $15 | Basic plan |
| Spaces | $5 | If used |
| **Total** | **$35-65** | Well within $200 credits |

You'll have plenty of credits left over! 🎉

---

## 🧪 Testing Your Setup

Once configured, test:

```powershell
# From backend directory
cd backend

# Test Gradient™ AI connection
.\venv\Scripts\python.exe -c "
import asyncio
from app.services.gradient_ai import test_gradient_connection
asyncio.run(test_gradient_connection())
"
```

Expected output:
```
✅ DigitalOcean Gradient™ AI connected successfully!
```

---

## 📖 Essential Documentation Links

**Must Read:**
- [Gradient™ AI Overview](https://docs.digitalocean.com/products/ai/)
- [Gradient™ AI Quickstart](https://docs.digitalocean.com/products/ai/getting-started/)
- [API Reference](https://docs.digitalocean.com/products/ai/reference/)
- [Model Catalog](https://docs.digitalocean.com/products/ai/models/)

**Nice to Have:**
- [App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [Managed Databases](https://docs.digitalocean.com/products/databases/)
- [Spaces Docs](https://docs.digitalocean.com/products/spaces/)

---

## 🚨 Common Issues & Fixes

### Issue: "Invalid API Key"
**Fix:** 
- Verify key is copied correctly (no extra spaces)
- Check token has proper scopes (Read + Write)
- Ensure token is active (not expired)

### Issue: "Model not found"
**Fix:**
- Check available models in dashboard
- Use exact model name from docs
- Some models might be region-specific

### Issue: "Rate limit exceeded"
**Fix:**
- Implement exponential backoff
- Cache responses when possible
- Use cheaper models for testing

---

## 🎯 What Judges Will Look For

In your submission, clearly show:

1. **API Integration**
   - Code snippets showing Gradient™ AI calls
   - Screenshots of DigitalOcean dashboard
   - Logs showing successful API calls

2. **Infrastructure Usage**
   - Deployed on App Platform
   - Using Managed Database
   - All services within DO ecosystem

3. **Documentation**
   - How you used Gradient™ AI
   - Which models you chose and why
   - Architecture diagram showing DO services

4. **Video Demo**
   - Show DigitalOcean dashboard
   - Highlight Gradient™ AI usage
   - Mention DO multiple times

---

## ✅ Checklist Before Moving On

Before starting Day 2, ensure:

- [ ] DigitalOcean account created
- [ ] $200 credits claimed
- [ ] API token generated
- [ ] Token added to `.env` file
- [ ] Test connection successful
- [ ] Documentation bookmarked
- [ ] Ready to integrate!

---

## 🆘 Need Help?

**DigitalOcean Community:**
- Community Forums: https://www.digitalocean.com/community
- Discord: Check hackathon page for invite
- Documentation: https://docs.digitalocean.com/

**Hackathon Support:**
- Check Devpost hackathon page
- Join hackathon Discord
- Contact MLH mentors

---

## 🎬 Next Steps

Once setup is complete:

1. ✅ Test Gradient™ AI connection
2. ✅ Update `gradient_ai.py` with real implementation
3. ✅ Replace Anthropic fallback with DO Gradient™ AI
4. ✅ Test agent conversations
5. ✅ Document your usage

**You're ready to build!** 🚀

---

Remember: **DigitalOcean integration is MANDATORY, not optional!**

Without it, you won't be eligible for any prizes. Make this your #1 priority! 🌊
