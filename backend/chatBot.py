import asyncio
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
gemini_client = genai.Client(api_key=GEMINI_API_KEY)

def prompt_maker(question: str, context: str = "", role: str = None):
    if not role:  # This catches both None and empty string cases
        role = "Please provide a helpful response."
        
    if context == "":
        return {
            "content": question, 
            "system_instruction": role
        }

    return {
        "content": f"CONTEXT: {context} \n QUESTION: {question}", 
        "system_instruction": role
    }


async def ask_gemini(prompt: dict):
    
    response = gemini_client.models.generate_content_stream(
        model="gemini-2.0-flash-lite",
        config= types.GenerateContentConfig(
        system_instruction=prompt["system_instruction"]),
        contents=[prompt["content"]]
    )

    for chunk in response:  # This is still synchronous
        yield {"response": chunk.text, "done": False}  # Yield immediately
        await asyncio.sleep(0)  # Let event loop process other tasks

    yield {"done": True}