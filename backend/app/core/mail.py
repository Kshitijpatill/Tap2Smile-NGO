import os
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr
from typing import List
from app.core.database import db 
from dotenv import load_dotenv

load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME", "your-email@gmail.com"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD", "your-app-password"),
    MAIL_FROM=os.getenv("MAIL_FROM", "your-email@gmail.com"),
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

async def send_admin_notification(subject: str, body: str):
    """
    Sends a PERSONALIZED email to each Superadmin found in the database.
    """
    cursor = db.users.find({"role": "superadmin"})
    superadmins = await cursor.to_list(length=100)
    
    if not superadmins:
        print("⚠️ Alert: No Superadmins found in database. Email not sent.")
        return

    fm = FastMail(conf)

    for admin in superadmins:
        admin_email = admin.get("email")
        admin_name = admin.get("name", "Superadmin") 

        if not admin_email:
            continue

        html = f"""
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #D4AF37;">TapToSmile Alert</h2>
            <h3>{subject}</h3>
            
            <p>Hello <strong>{admin_name}</strong>,</p>
            
            <p>A new submission has been received on the website:</p>
            <hr style="border: 0; border-top: 1px solid #eee;">
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                {body}
            </div>
            <hr style="border: 0; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #888;">
                You are receiving this because you are listed as a 'superadmin'.
                <br>Please login to the Admin Panel to take action.
            </p>
        </div>
        """

        message = MessageSchema(
            subject=f"🔔 {subject}",
            recipients=[admin_email],
            body=html,
            subtype=MessageType.html
        )

        try:
            await fm.send_message(message)
            print(f"✅ Notification sent to Admin: {admin_name}")
        except Exception as e:
            print(f"❌ Failed to send to Admin {admin_name}: {e}")

async def send_user_confirmation(user_email: str, user_name: str, subject: str, body: str):
    """
    Sends a 'Thank You' confirmation email to the User (Donor/Volunteer/Contact).
    """
    if not user_email:
        return

    html = f"""
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #D4AF37;">TapToSmile</h2>
        
        <p>Hello <strong>{user_name}</strong>,</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; font-size: 16px;">
            {body}
        </div>
        <br>
        <p>Best Regards,<br><strong>The TapToSmile Team</strong></p>
        <hr style="border: 0; border-top: 1px solid #eee;">
        <p style="font-size: 11px; color: #888;">
            Thank you for supporting our mission. If you have questions, reply to this email.
        </p>
    </div>
    """

    message = MessageSchema(
        subject=subject,
        recipients=[user_email],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    try:
        await fm.send_message(message)
        print(f"✅ Confirmation sent to User: {user_name}")
    except Exception as e:
        print(f"❌ Failed to send to User {user_name}: {e}")