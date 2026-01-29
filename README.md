
# Tap To Smile

**Tap To Smile** is a full-stack web application designed to help NGOs manage programs, projects, events, volunteers, and donations efficiently. It features a modern public-facing website and a secure administrative dashboard for internal management.

##  Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS (Styling)  
- Framer Motion (Animations)
- Axios (API Integration)

**Backend:**
- Python (FastAPI Framework)
- MongoDB (Motor - Async Driver)
- JWT (Authentication)
- FastAPI-Mail (Email Notifications)

##  Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/) (v3.10 or higher)
- [Git](https://git-scm.com/)

##  Installation & Setup

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Kshitijpatill/Tap2Smile-NGO.git
cd Tap2Smile-NGO
```

### 2. Backend Setup
*The backend runs on port 8000.*

Navigate to the backend folder:
```bash
cd backend
```

**Create and Activate Virtual Environment:**

**Windows:**
```bash
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Install Dependencies:**
```bash
pip install -r requirements.txt
```

**Configure Environment Variables:** Create a `.env` file inside the `backend/` folder and add your credentials (see the Environment Variables section below).

**Run the Server:**
```bash
uvicorn app.main:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000).  
**API Documentation (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Frontend Setup
*The frontend runs on port 5173.*

Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
```

**Install Dependencies:**
```bash
npm install
```

**Run the Development Server:**
```bash
npm run dev
```

The website will be available at [http://localhost:5173](http://localhost:5173).

##  Environment Variables

You must create a `.env` file in the `backend/` directory for the app to function correctly.

```env
# Database Configuration
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/tap_to_smile

# Email Service (Gmail SMTP)
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your_16_digit_app_password
MAIL_FROM=your-email@gmail.com
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
```

##  How to Setup Email Service (Gmail)

To enable email notifications for Admin alerts, you need a **Google App Password**.

### Step 1: Enable 2-Step Verification
1. Go to your [Google Account Security Page](https://myaccount.google.com/security)
2. Scroll to the "How you sign in to Google" section
3. Click on **2-Step Verification**
4. If it is OFF, follow the steps to turn it ON

### Step 2: Generate App Password
1. Once 2-Step Verification is ON, search for **"App passwords"** in the top search bar of the Security page
2. **App name:** Type `Tap2Smile`
3. Click **Create**
4. Google will display a **16-character code** (e.g., `abcd efgh ijkl mnop`)
5. **Copy this code.** This is your `MAIL_PASSWORD` for the `.env` file

<!-- ##  Features

- **Admin Dashboard:** Secure login to manage content
- **Program Management:** Create, update, and delete NGO programs
- **Volunteer System:** Accept applications and receive email alerts
- **Donations:** Ledger system to track incoming donations
- **Event Management:** Showcase upcoming and past events
- **Impact Stats:** Dynamic counters for homepage statistics -->



