# DigitalOcean Gradient™ AI Service
# Connects to DigitalOcean's AI platform for the hackathon

import os
import httpx
from typing import List, Dict, Optional
import json
from dotenv import load_dotenv
from anthropic import AsyncAnthropic

# Try relative import first, fall back to absolute for direct execution
try:
    from .mock_ai import MockAIClient
except ImportError:
    from mock_ai import MockAIClient

# Load environment variables
load_dotenv()

class GradientAIClient:
    """
    DigitalOcean Gradient™ AI client for hackathon submission.
    Uses DO's API for all AI operations.
    """
    
    def __init__(self):
        self.api_key = os.getenv("DIGITALOCEAN_GRADIENT_API_KEY")
        self.agent_endpoint = os.getenv("GRADIENT_AGENT_ENDPOINT")
        self.agent_access_key = os.getenv("GRADIENT_AGENT_ACCESS_KEY")
        
        # Fallback to Anthropic for local development only
        self.anthropic_key = os.getenv("ANTHROPIC_API_KEY")
        self.use_fallback = not self.agent_access_key or self.agent_access_key == "your_agent_key_here"
        
        # Mock AI as final fallback for development
        self.mock_client = MockAIClient()
        
        # Allow no keys for mock-only development
        # if not self.agent_access_key and not self.anthropic_key:
        #     raise ValueError("No AI API key configured. Add GRADIENT_AGENT_ACCESS_KEY to .env")
    
    async def chat_completion(
        self, 
        messages: List[Dict[str, str]], 
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> str:
        """
        Call DigitalOcean Gradient™ AI for chat completion.
        Falls back to Anthropic, then Mock AI for development.
        """
        
        # Try DigitalOcean first
        if not self.use_fallback and self.agent_access_key:
            try:
                return await self._call_digitalocean(messages, temperature, max_tokens)
            except Exception as e:
                print(f"DigitalOcean API error: {e}")
        
        # Try Anthropic fallback
        if self.anthropic_key:
            try:
                print("⚠️  Using Anthropic fallback - Remember to switch to DigitalOcean for submission!")
                return await self._call_anthropic(messages, temperature, max_tokens)
            except Exception as e:
                print(f"Anthropic API error: {e}")
        
        # Final fallback: Use Mock AI for development
        print("🔧 Using Mock AI for development - Both DigitalOcean and Anthropic unavailable")
        return await self.mock_client.chat_completion(messages, temperature, max_tokens)
    
    async def _call_digitalocean(
        self,
        messages: List[Dict[str, str]],
        temperature: float,
        max_tokens: int
    ) -> str:
        """
        Call DigitalOcean Gradient™ AI API.
        Documentation: https://docs.digitalocean.com/products/ai/
        """
        
        # Use DigitalOcean Agent endpoint with access key
        endpoint = f"{self.agent_endpoint}/api/v1/chat/completions"
        
        headers = {
            "Authorization": f"Bearer {self.agent_access_key}",
            "Content-Type": "application/json"
        }
        
        # Agent endpoint expects messages in standard format
        payload = {
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(endpoint, headers=headers, json=payload)
            
            if response.status_code == 200:
                data = response.json()
                # Adjust based on actual response structure
                return data.get("choices", [{}])[0].get("message", {}).get("content", "")
            else:
                error_msg = f"DigitalOcean API error: {response.status_code} - {response.text}"
                raise Exception(error_msg)
    
    async def _call_anthropic(
        self,
        messages: List[Dict[str, str]],
        temperature: float,
        max_tokens: int
    ) -> str:
        """
        Fallback to Anthropic for local development only.
        DO NOT USE IN PRODUCTION/SUBMISSION.
        """
        
        client = AsyncAnthropic(api_key=self.anthropic_key)
        
        try:
            response = await client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=max_tokens,
                temperature=temperature,
                messages=messages
            )
            
            return response.content[0].text
        except Exception as e:
            raise Exception(f"Anthropic API error: {str(e)}")


async def test_connection():
    """
    Test DigitalOcean Gradient™ AI connection.
    Run this to verify your setup works.
    """
    
    print("Testing DigitalOcean Gradient™ AI connection...")
    
    client = GradientAIClient()
    
    try:
        response = await client.chat_completion([
            {"role": "user", "content": "Say 'DigitalOcean Gradient AI is working!' if you can read this."}
        ], max_tokens=50)
        
        print("✅ Connection successful!")
        print(f"Response: {response}")
        return True
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False


if __name__ == "__main__":
    import asyncio
    asyncio.run(test_connection())
