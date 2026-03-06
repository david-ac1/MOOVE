# Mock AI Service for Development
# Simulates AI responses while we debug API access

from typing import List, Dict

class MockAIClient:
    """
    Mock AI client that returns realistic responses.
    Use this temporarily while debugging DigitalOcean/Anthropic access.
    """
    
    def __init__(self):
        self.conversation_state = {}
        
    async def chat_completion(
        self, 
        messages: List[Dict[str, str]], 
        temperature: float = 0.7,
        max_tokens: int = 1000
    ) -> str:
        """
        Mock chat completion with realistic migration interview responses.
        """
        
        last_message = messages[-1]["content"].lower() if messages else ""
        
        # Detect what field we're asking about
        if any(word in last_message for word in ["passport", "nationality", "citizen"]):
            return "I'd like to understand your citizenship first. Which passport(s) do you hold? For example: United States, India, United Kingdom, etc."
        
        elif any(word in last_message for word in ["age", "old", "born"]):
            return "Thank you! Now, which age bracket do you fall into? Please choose from: 18-24, 25-34, 35-44, 45-54, or 55+"
        
        elif any(word in last_message for word in ["education", "degree", "study", "school"]):
            return "Got it! What's your highest level of education? Options: High School, Bachelor's Degree, Master's Degree, or PhD"
        
        elif any(word in last_message for word in ["profession", "job", "work", "career"]):
            return "Perfect! What's your profession category? Choose from: Technology, Healthcare, Skilled Trades, Business/Finance, Creative Arts, or Other"
        
        elif any(word in last_message for word in ["goal", "want", "looking", "plan"]):
            return "Understood! What's your primary migration goal? Options: Study, Work, Permanent Residence, or Citizenship"
        
        elif any(word in last_message for word in ["country", "where", "destination"]):
            return "Great! Which country are you interested in? Popular options include: Canada, Germany, Australia, United Kingdom, New Zealand, or another country?"
        
        elif any(word in last_message for word in ["years", "time", "long", "horizon"]):
            return "Almost done! What's your planning time horizon? Choose: 5 years, 10 years, or 15 years"
        
        elif any(word in last_message for word in ["hello", "hi", "start", "begin"]):
            return "Hello! I'm your migration pathway advisor. I'll help you explore your migration journey over the next 5-15 years. Let's start with some key information. First, which passport(s) do you currently hold?"
        
        elif any(word in last_message for word in ["canada", "germany", "australia", "uk", "zealand"]):
            return f"Excellent choice! I have all the information I need. I'll now generate a detailed migration timeline showing your potential pathway to {last_message.title()}. This will include visa stages, requirements, and key milestones over your selected time horizon."
        
        # Default responses based on simple patterns
        elif "thank" in last_message:
            return "You're welcome! Let me know if you have any questions about your migration pathway."
        
        elif "?" in last_message:
            return "That's a great question! For your specific situation, I'd recommend consulting with a licensed immigration advisor for personalized guidance."
        
        else:
            # Generic progression response
            return "Thank you for that information. Let's continue building your migration profile. What else would you like to tell me about your situation?"


# Test function
async def test_mock():
    """Test the mock AI client"""
    print("Testing Mock AI Client...")
    
    client = MockAIClient()
    
    test_messages = [
        {"role": "user", "content": "Hello"}
    ]
    
    response = await client.chat_completion(test_messages)
    print(f"✅ Mock AI works!\nResponse: {response}")


if __name__ == "__main__":
    import asyncio
    asyncio.run(test_mock())
