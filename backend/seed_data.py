"""
Seed script to populate the database with initial data
Run this after starting the backend server
"""

import asyncio
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

async def seed_database():
    """Seed the database with initial data"""
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(MONGODB_URI)
    db = client.get_database("tap2smile")
    
    print("🌱 Starting database seeding...")
    
    # 1. Seed Impact Stats
    print("\n📊 Seeding Impact Stats...")
    impact_stats = [
        {
            "title": "Lives Impacted",
            "value": "200,000+",
            "icon": "Users",
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Meals Served",
            "value": "500,000+",
            "icon": "Heart",
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Children Educated",
            "value": "10,000+",
            "icon": "GraduationCap",
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Volunteers",
            "value": "1,200+",
            "icon": "HandHelping",
            "updated_at": datetime.now(timezone.utc)
        }
    ]
    
    # Clear existing impact stats
    await db.impact_stats.delete_many({})
    result = await db.impact_stats.insert_many(impact_stats)
    print(f"✅ Inserted {len(result.inserted_ids)} impact stats")
    
    # 2. Seed Programs
    print("\n📚 Seeding Programs...")
    programs = [
        {
            "title": "Program Kāala",
            "description": "Conducting Art classes for the underprivileged crowd especially children who have talent but no resources. Helping them with the opportunities, resources and exposure which helps them to grow as an Artist.",
            "icon": "Palette",
            "cover_image": "/assets/artisticexpression.jpg",
            "is_active": True,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Program Ātman",
            "description": "Attempt to improve the physical health via Yoga, Meditation and other physical activities. A platform for mental health discussions that includes various mental health sessions.",
            "icon": "Activity",
            "cover_image": "/assets/7dae08d9-696a-4a7b-badd-88611cea6d80.jpg",
            "is_active": True,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Program Seva",
            "description": "Conducting Food/Clothes/Blood donation drives throughout the year. Providing food kits, Grocery Kits and other basic essentials to the needy.",
            "icon": "Heart",
            "cover_image": "/assets/seva.jpg",
            "is_active": True,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Program Vidya",
            "description": "Supporting Children with School Admission Fees, School Kits, personal development, career guidance and other educational classes.",
            "icon": "GraduationCap",
            "cover_image": "/assets/academicknowledge.jpg",
            "is_active": True,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Awareness Programs",
            "description": "As the first step towards change is Awareness, we organize various awareness programs (Flash mobs, Road Shows, Marathons, Art Shows, Campaigns) and also create an impact by helping, uplifting, motivating or even just supporting someone.",
            "icon": "Megaphone",
            "cover_image": "/assets/86b0333e-99d5-4d90-8b01-e07595cc170d.jpg",
            "is_active": True,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
    ]
    
    # Clear existing programs
    await db.programs.delete_many({})
    result = await db.programs.insert_many(programs)
    print(f"✅ Inserted {len(result.inserted_ids)} programs")
    
    # 3. Seed Sample Events
    print("\n📅 Seeding Sample Events...")
    events = [
        {
            "title": "Community Health Camp",
            "description": "Free health checkup and awareness session for underprivileged communities. Medical professionals will provide consultations and basic medicines.",
            "event_date": datetime(2026, 3, 15),
            "location": "Mumbai, Maharashtra",
            "cover_image": "/assets/d1d88dba-3854-474a-8957-1becf8065703.jpg",
            "is_active": True,
            "is_upcoming": True,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Art Exhibition by Children",
            "description": "Showcasing the artistic talents of children from Program Kāala. Come witness the creativity and passion of young artists.",
            "event_date": datetime(2026, 4, 20),
            "location": "Pune, Maharashtra",
            "cover_image": "/assets/artisticexpression.jpg",
            "is_active": True,
            "is_upcoming": True,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        },
        {
            "title": "Food Distribution Drive",
            "description": "Monthly food distribution drive as part of Program Seva. Providing nutritious meals to families in need.",
            "event_date": datetime(2026, 2, 1),
            "location": "Mumbai, Maharashtra",
            "cover_image": "/assets/seva.jpg",
            "is_active": True,
            "is_upcoming": False,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
    ]
    
    # Clear existing events
    await db.events.delete_many({})
    result = await db.events.insert_many(events)
    print(f"✅ Inserted {len(result.inserted_ids)} events")
    
    print("\n✨ Database seeding completed successfully!")
    print("\n📝 Summary:")
    print(f"   - Impact Stats: {len(impact_stats)}")
    print(f"   - Programs: {len(programs)}")
    print(f"   - Events: {len(events)}")
    print("\n🚀 You can now test the API endpoints!")
    
    # Close connection
    client.close()

if __name__ == "__main__":
    try:
        asyncio.run(seed_database())
    except Exception as e:
        print(f"\n❌ Error seeding database: {e}")
        sys.exit(1)
