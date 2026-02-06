import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI") 
DB_NAME = "tap_to_smile" 

client = AsyncIOMotorClient(MONGODB_URI)
db = client[DB_NAME]

async def test_mongodb_connection():
    try:
        await client.admin.command('ping')
        print("-----------You successfully connected to MongoDB!---------------")
        return True
    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        return False