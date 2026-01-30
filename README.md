
# Tap To Smile

## Live Domain

The application is designed to be hosted at: [https://taptosmile.org](https://taptosmile.org)

## Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS (Styling)
- Axios (API Integration)

**Backend:**
- Python (FastAPI Framework)
- MongoDB (Motor - Async Driver)
- JWT (Authentication)
- FastAPI-Mail (Email Notifications)

## Prerequisites

Ensure the hosting server has the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher) - Required for building the frontend.
- [Python](https://www.python.org/) (v3.10 or higher) - Required for running the server.
- [Git](https://git-scm.com/) (Optional)

## Production Deployment Guide (For Hosting)

This application uses a "Single Server / Monorepo" architecture. The React Frontend is compiled into static files and served directly by the Python Backend. This means you only need to run one server.

### Step 1: Clone & Prepare

```bash
git clone https://github.com/Kshitijpatill/Tap2Smile-NGO.git
cd Tap2Smile-NGO
```

### Step 2: Build the Frontend

We need to turn the React code into static HTML/CSS/JS files.

Navigate to the frontend folder:
```bash
cd frontend
```

**Critical Check:** Open `src/services/api.js` and ensure the API URL is set to a relative path:
```javascript
const API_URL = "/api";
```

Install dependencies and build:
```bash
npm install
npm run build
```

This creates a `dist` folder.

### Step 3: Configure the Backend

Now set up the server that will run the app.

Navigate to the backend folder:
```bash
cd ../backend
```

Create a virtual environment ( if not created already ):
```bash
python -m venv venv
```

Activate it:
**Windows:**
```bash
.\venv\Scripts\Activate.ps1
```
**Mac/Linux:**
```bash
source venv/bin/activate
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

### Step 4: Environment Variables (.env)

Create a `.env` file inside the `backend/` folder. This is crucial for the database and emails to work.

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

(See "How to Setup Email" section below for generating the App Password)

### Step 5: Run the Server

Start the application. This command runs both the API and the Website.
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Access the Website: Open `http://<your-server-ip>:8000` (or https://taptosmile.org if domain is configured).  
Access API Docs: `https://taptosmile.org/api/docs`

## Local Development Setup (For Developers)

If you want to run the Frontend and Backend separately for development:

### 1. Backend (Port 8000)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\Activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Frontend (Port 5173)
```bash
cd frontend
npm install
npm run dev
```

**Note:** In `src/services/api.js`, change `API_URL` back to `"http://localhost:8000/api"` for local dev.

## How to Setup Email Service (Gmail)

To enable email notifications (for Volunteer alerts, Donation receipts, etc.), you need a Google App Password.

**Enable 2-Step Verification:** Go to [Google Account Security](https://myaccount.google.com/security) > "2-Step Verification" > Turn ON.

**Generate App Password:**
1. Search for "App passwords" in the Security page
2. App name: `Tap2Smile`
3. Click **Create**
4. Copy the **16-character code**
5. Paste it: Put this code into your `.env` file as `MAIL_PASSWORD`

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request
