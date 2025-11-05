# 🛂 Passport Management System

A comprehensive web-based Passport Database Management System built with Node.js, Express, React, and MySQL. This system allows citizens to apply for passports, track applications, and enables administrators to manage, approve, and process applications efficiently.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Features in Detail](#features-in-detail)
- [Admin Credentials](#admin-credentials)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

### Citizen Features
- **User Registration & Authentication** - Secure sign-up with JWT tokens
- **Passport Application** - Submit new passport applications with document uploads
- **Track Status** - Real-time application status tracking
- **View Passports** - Access issued passports and details
- **Travel History** - Maintain travel records
- **Alerts** - Receive notifications on application updates

### Admin Features
- **Dashboard** - View comprehensive statistics and analytics
- **Application Management** - Approve, reject, or request modifications on applications
- **Payment Tracking** - Monitor payment transactions
- **Blacklist Management** - Manage blacklisted citizens
- **Reports** - View 5 complex reports:
  - Active Applications Summary
  - Payment Revenue Report
  - Passport Issuance Report
  - Overdue Applications
  - Citizen Eligibility Report
- **User Management** - Manage admin and embassy officer accounts

## 🛠 Tech Stack

**Backend:**
- Node.js v16+
- Express.js 4.18
- MySQL2/Promise 3.6
- JWT (jsonwebtoken)
- Bcrypt for password hashing
- Multer for file uploads
- Express-validator for validation

**Frontend:**
- React 18
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- Context API for state management

**Database:**
- MySQL 8.0+
- 13 Tables with proper relationships
- 6 Stored Procedures
- 4 Database Functions
- 7 Triggers
- 8 Views

## 📦 Prerequisites

Before installation, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MySQL Server** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (optional but recommended) - [Download](https://code.visualstudio.com/)

### Verify Installation

```bash
# Check Node.js
node --version
# Should show v16 or higher

# Check npm
npm --version

# Check MySQL
mysql --version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/yourusername/passport-management-system.git

# Navigate to project
cd passport-management-system
```

### 2. Database Setup

This is the most important step. Follow carefully!

#### Step 1: Start MySQL Server

**On Mac (using Homebrew):**
```bash
# Start MySQL service
brew services start mysql

# Verify it's running
brew services list
# You should see mysql started
```

**On Windows:**
- Open Services app
- Search for "MySQL"
- Right-click → Start

**On Linux:**
```bash
sudo service mysql start
```

#### Step 2: Login to MySQL

```bash
# Open MySQL terminal
mysql -u root -p

# Enter your password (if you set one during MySQL installation)
# If no password was set, just press Enter
```

#### Step 3: Create the Database

```sql
-- Inside MySQL terminal, run this command:
DROP DATABASE IF EXISTS PassportDB;

CREATE DATABASE PassportDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE PassportDB;

-- Verify database is selected
SELECT DATABASE();
-- Should show: PassportDB
```

#### Step 4: Load the Database Schema

**Option A: Load from SQL File (RECOMMENDED)**

1. Download the `passport_database_schema.sql` file from the project root
2. In MySQL terminal, run:

```sql
SOURCE /path/to/passport_database_schema.sql;

-- On Mac example:
SOURCE /Users/yourusername/passport-management-system/passport_database_schema.sql;

-- On Windows example:
SOURCE C:/Users/yourusername/passport-management-system/passport_database_schema.sql;

-- On Linux example:
SOURCE /home/yourusername/passport-management-system/passport_database_schema.sql;
```

**Option B: Load from Command Line**

```bash
# From terminal (not MySQL terminal)
mysql -u root -p PassportDB < passport_database_schema.sql

# You'll be prompted for your MySQL password
```

#### Step 5: Verify Database Creation

```sql
-- In MySQL terminal:

-- Show all tables
SHOW TABLES;
-- Should show 13 tables

-- Check if data is loaded
SELECT COUNT(*) FROM Citizen;
-- Should show: 3

-- View sample data
SELECT * FROM Citizen LIMIT 5;

-- Check stored procedures
SHOW PROCEDURE STATUS WHERE Db='PassportDB';
-- Should show 6 procedures
```

### 3. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
touch .env

# Edit .env file with your MySQL credentials
nano .env
```

**Add these to .env file:**
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=PassportDB
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

**Save the file:** `Ctrl+X`, then `Y`, then `Enter`

### 4. Frontend Setup

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
touch .env

# Add API URL to .env
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

## ▶️ Running the Application

You'll need 3 terminals running simultaneously:

### Terminal 1: MySQL Server

```bash
# Verify MySQL is running (on Mac)
brew services list

# You should see: mysql started ✓

# If not running, start it:
brew services start mysql
```

### Terminal 2: Backend Server

```bash
# Navigate to backend folder
cd passport-management-system/backend

# Start the server
npm run dev

# You should see:
# ✅ Database connected successfully!
# 🚀 Server running on port 5000
# 📍 API: http://localhost:5000/api
```

### Terminal 3: Frontend Application

```bash
# Navigate to frontend folder (from project root)
cd passport-management-system/frontend

# Start React app
npm start

# React app should open in browser at http://localhost:3000
```

## 🌐 Accessing the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Citizen registration
- `POST /api/auth/login` - Citizen login
- `POST /api/auth/admin-login` - Admin login
- `POST /api/auth/logout` - Logout

### Applications
- `GET /api/applications/citizen/:citizenID` - Get citizen's applications
- `POST /api/applications/submit` - Submit new application
- `GET /api/applications/all` - Get all applications (Admin)
- `PUT /api/applications/:appID/approve` - Approve application (Admin)
- `PUT /api/applications/:appID/reject` - Reject application (Admin)

### Payments
- `POST /api/payments/process` - Process payment
- `GET /api/payments/:appID` - Get payment details

### Passports
- `GET /api/passports/citizen/:citizenID` - Get citizen's passports
- `GET /api/passports/:passportID` - Get passport details

### Reports (Admin only)
- `GET /api/reports/active-applications` - Active applications report
- `GET /api/reports/payment-summary` - Payment summary
- `GET /api/reports/passport-issuance` - Passport issuance report
- `GET /api/reports/overdue-applications` - Overdue applications
- `GET /api/reports/citizen-eligibility` - Citizen eligibility report

### Citizens
- `GET /api/citizens/:citizenID` - Get citizen profile
- `POST /api/citizens/check-eligibility/:citizenID` - Check application eligibility
- `GET /api/citizens/:citizenID/alerts` - Get citizen alerts

### Embassies
- `GET /api/embassies` - Get all embassies
- `GET /api/embassies/:embassyID` - Get embassy details

### Dashboard
- `GET /api/dashboard/citizen/:citizenID` - Citizen dashboard stats
- `GET /api/dashboard/admin` - Admin dashboard stats

## 📁 Project Structure

```
passport-management-system/
│
├── backend/
│   ├── config/
│   │   └── database.js              # MySQL connection pool
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   ├── applicationController.js # Application management
│   │   ├── paymentController.js     # Payment processing
│   │   ├── passportController.js    # Passport operations
│   │   ├── reportsController.js     # Report generation
│   │   ├── citizenController.js     # Citizen operations
│   │   ├── dashboardController.js   # Dashboard stats
│   │   └── embassyController.js     # Embassy operations
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── passportRoutes.js
│   │   ├── reportRoutes.js
│   │   ├── citizenRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── embassyRoutes.js
│   ├── middleware/
│   │   └── auth.js                  # JWT verification
│   ├── .env                         # Environment variables
│   ├── package.json
│   ├── package-lock.json
│   ├── node_modules/
│   └── server.js                    # Main server file
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js
│   │   │   ├── Card.js
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   ├── Table.js
│   │   │   ├── StatusBadge.js
│   │   │   └── StatCard.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── citizen/
│   │   │   │   ├── Dashboard.js
│   │   │   │   ├── MyApplications.js
│   │   │   │   ├── ApplyPassport.js
│   │   │   │   └── TrackStatus.js
│   │   │   └── admin/
│   │   │       ├── Dashboard.js
│   │   │       ├── ManageApplications.js
│   │   │       └── ViewReports.js
│   │   ├── context/
│   │   │   └── AuthContext.js       # Global auth state
│   │   ├── services/
│   │   │   └── api.js               # API service layer
│   │   ├── App.js                   # Main app component
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Tailwind CSS imports
│   ├── .env
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
│
├── passport_database_schema.sql     # Complete SQL schema
├── .gitignore
├── README.md
└── LICENSE
```

## 🗄️ Database Schema

### Strong Entities (7)
- **Citizen** - Main user entity with personal details
- **Embassy** - Passport processing centers
- **Application** - Passport applications
- **Payment** - Payment transactions
- **Passport** - Issued passports
- **Visa** - Visa records
- **Blacklist** - Blacklisted citizens

### Weak Entities (3)
- **Family** - Depends on Citizen
- **Travel_History** - Depends on Passport
- **Alert** - Depends on Citizen

### Supporting Tables (3)
- **Documents** - Document management
- **Audit_Log** - Change tracking
- **Admin_Users** - System administrators

### Key Relationships
- 1 Citizen → Many Applications
- 1 Application → 1 Payment
- 1 Embassy → Many Applications
- 1 Citizen → Many Passports
- 1 Passport → Many Travel Records
- 1 Citizen → Many Alerts
- 1 Citizen → 0/1 Blacklist entry

### Stored Procedures
1. **sp_SubmitApplication** - Submit new passport application
2. **sp_ProcessPayment** - Process payment and update application
3. **sp_ApproveAndIssuePassport** - Approve application and issue passport
4. **sp_RejectApplication** - Reject application with reason
5. **sp_AddToBlacklist** - Add citizen to blacklist
6. **sp_GetApplicationReport** - Generate application report

### Database Functions
1. **fn_PassportValidityDays** - Calculate passport validity days remaining
2. **fn_CheckCitizenEligibility** - Check if citizen is eligible to apply
3. **fn_CalculateApplicationFee** - Calculate application fee
4. **fn_GetApplicationCount** - Get total applications for citizen

## 🎯 Features in Detail

### Application Workflow
1. **Registration** - Citizen creates account with Aadhar/PAN
2. **Application** - Submit passport application with details
3. **Payment** - Process payment for application
4. **Review** - Admin reviews application
5. **Approval/Rejection** - Application approved or rejected
6. **Issuance** - Passport issued to citizen
7. **Tracking** - Citizen can track status anytime

### Admin Functionalities
- View pending applications
- Approve applications (issues passport)
- Reject applications (with reason)
- Manage payments
- View comprehensive reports
- Track revenue
- Monitor application turnaround time
- Manage blacklisted citizens

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- Protected routes (Private Route component)
- SQL injection prevention (prepared statements)
- CORS protection
- Input validation and sanitization

## 👤 Admin Credentials

After database setup, use these credentials to login as admin:

| Username | Password | Role |
|----------|----------|------|
| admin | password | Super Admin |
| mumbai_officer | password | Embassy Officer |
| delhi_officer | password | Embassy Officer |
| data_entry_1 | password | Data Entry |
| viewer_1 | password | Viewer |

**Note:** Change passwords in production!

### Create Citizen Account for Testing

1. Click "Register" on home page
2. Fill in details:
   - Name: Test User
   - DOB: 1995-01-15
   - Email: testuser@example.com
   - Phone: 9876543210
   - Aadhar: 123456789012
   - PAN: ABCDE1234F
   - Password: password123

3. Login with the same credentials
4. Apply for a passport
5. Logout and login as admin to approve it

## 🐛 Troubleshooting

### Issue: "Database connection failed"
**Solution:**
```bash
# Check if MySQL is running
brew services list

# Start MySQL if not running
brew services start mysql

# Verify .env file has correct credentials
cat backend/.env
```

### Issue: "Cannot find module 'mysql2'"
**Solution:**
```bash
# Navigate to backend
cd backend

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Then start server again
npm run dev
```

### Issue: "Port 3000 already in use"
**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Then start React app again
npm start
```

### Issue: "Table doesn't exist"
**Solution:**
```bash
# Verify database was loaded correctly
mysql -u root -p PassportDB

# In MySQL terminal:
SHOW TABLES;

# If no tables, reload the schema:
SOURCE /path/to/passport_database_schema.sql;
```

### Issue: React app shows "Cannot GET /"
**Solution:**
- Make sure you're accessing http://localhost:3000 (not 5000)
- Clear browser cache and hard refresh (Cmd+Shift+R on Mac)
- Restart React development server

### Issue: "Unexpected token" error in backend
**Solution:**
```bash
# Check if there are syntax errors
node backend/server.js

# If yes, check recent changes
# Ensure all files are properly formatted
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000                          # Server port
DB_HOST=localhost                  # MySQL host
DB_USER=root                       # MySQL username
DB_PASSWORD=your_password          # MySQL password
DB_NAME=PassportDB                 # Database name
JWT_SECRET=super_secret_key        # JWT secret key (change in production)
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api   # Backend API URL
```

## 📊 Testing the APIs

You can test the APIs using:
- **Thunder Client** (VS Code extension)
- **Postman** (Desktop application)
- **cURL** (Command line)

### Example cURL Requests

```bash
# Register citizen
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Raj",
    "lastName": "Kumar",
    "dob": "1995-01-15",
    "gender": "Male",
    "email": "raj@example.com",
    "phone": "9876543210",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "raj@example.com",
    "password": "password123"
  }'

# Get health status
curl http://localhost:5000/api/health
```

## 🚀 Deployment

### Deploy Backend to Heroku

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Add environment variables
heroku config:set PORT=5000
heroku config:set DB_HOST=your-db-host
heroku config:set DB_USER=your-db-user
heroku config:set DB_PASSWORD=your-db-password
heroku config:set DB_NAME=PassportDB
heroku config:set JWT_SECRET=your-secret-key

# Deploy
git push heroku main
```

### Deploy Frontend to Vercel/Netlify

```bash
# Build React app
npm run build

# Deploy using Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 📖 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ✉️ Contact

For questions or support, please contact: support@passport-system.com

---

**Built with by Aryan Tripathi **

**Last Updated:** November 2025