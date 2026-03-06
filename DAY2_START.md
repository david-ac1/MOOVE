# ✅ Day 2 - March 4, 2026
## Morning Kickoff - DigitalOcean Connection

Great! You have a DigitalOcean account. Let's connect it to your project.

---

## 🔑 Get Your API Token (5 minutes)

### Step 1: Generate API Token

1. **Go to:** https://cloud.digitalocean.com/account/api/tokens
2. **Click:** "Generate New Token" button
3. **Name it:** "Moove-Hackathon-2026"
4. **Scopes:** 
   - ✅ Check "Read"
   - ✅ Check "Write"
5. **Expiration:** 90 days (or No expiry)
6. **Click:** "Generate Token"

### Step 2: Copy Your Token

The token will look like:
```
dop_v1_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd
```

⚠️ **IMPORTANT:** Copy it immediately! You can't see it again after closing.

---

## 📝 Add Token to Your Project

### Open backend/.env file

```powershell
# From project root
code backend\.env
# or
notepad backend\.env
```

### Update this line:

**BEFORE:**
```env
DIGITALOCEAN_GRADIENT_API_KEY=your_gradient_api_key_here
```

**AFTER:**
```env
DIGITALOCEAN_GRADIENT_API_KEY=dop_v1_your_actual_token_paste_it_here
```

### Save the file

---

## 🧪 Test Your Connection

Let's verify your DigitalOcean credentials work:

```powershell
# Navigate to backend
cd backend

# Test the API token
$env:DIGITALOCEAN_TOKEN = "dop_v1_your_token_here"
Invoke-WebRequest -Uri "https://api.digitalocean.com/v2/account" -Headers @{Authorization="Bearer $env:DIGITALOCEAN_TOKEN"} -UseBasicParsing
```

Expected: Status 200 with your account info

---

## 🔍 Explore Gradient™ AI

### Check what's available:

1. **Dashboard:** https://cloud.digitalocean.com/
2. **AI Section:** Look for "AI & ML" or "Gradient AI" in sidebar
3. **Documentation:** https://docs.digitalocean.com/products/ai/

### Key Questions:
- Which AI models are available?
- What's the API endpoint format?
- Are there any getting started examples?

---

## ✅ Checklist

- [ ] API token generated
- [ ] Token copied safely
- [ ] Token added to `backend/.env`
- [ ] File saved
- [ ] Connection tested
- [ ] Gradient AI dashboard explored

---

Once this is done, reply "Token added" and we'll move to Day 2 tasks!
