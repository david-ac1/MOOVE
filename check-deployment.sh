#!/bin/bash
# Quick deployment verification script

echo "🔍 Checking deployment configuration..."
echo ""

# Check if environment variables are set
if [ -f "backend/.env" ]; then
    echo "✅ Backend .env file exists"
else
    echo "⚠️  Backend .env file missing - copy from .env.example"
fi

if [ -f ".env.local" ]; then
    echo "✅ Frontend .env.local file exists"
else
    echo "⚠️  Frontend .env.local file missing"
fi

echo ""
echo "📦 Checking build..."
echo ""

# Test backend
cd backend
if python -c "import fastapi, uvicorn, sqlalchemy, anthropic" 2>/dev/null; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Backend dependencies missing - run: pip install -r requirements.txt"
fi
cd ..

# Test frontend build
if npm run build > /dev/null 2>&1; then
    echo "✅ Frontend builds successfully"
else
    echo "❌ Frontend build failed - check TypeScript errors"
fi

echo ""
echo "📋 Deployment files:"
echo ""

if [ -f "vercel.json" ]; then
    echo "✅ vercel.json configured"
else
    echo "❌ vercel.json missing"
fi

if [ -f "render.yaml" ]; then
    echo "✅ render.yaml configured"
else
    echo "❌ render.yaml missing"
fi

echo ""
echo "✨ Ready to deploy!"
echo ""
echo "Next steps:"
echo "1. Push code to GitHub: git push"
echo "2. Follow DEPLOYMENT.md guide"
echo "3. Deploy backend to Render first"
echo "4. Then deploy frontend to Vercel"
echo ""
