Live Link -> 
# Resignation Management System

## Overview

The Resignation Management System is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows employees to submit resignation requests and exit interview responses, and enables HR to review, approve, or reject these requests. The application features user authentication (with roles for employee and HR), date validations (ensuring last working days are not on weekends or holidays), and a responsive UI built with Tailwind CSS.

## Features

- **User Authentication:**  
  Secure registration and login using JWT.  
  - Employees can register and log in.
  - There is one default HR (admin) account with credentials:  
    **Username:** `admin`  
    **Password:** `admin`
  
- **Resignation Submission:**  
  Employees can submit their resignation by specifying the intended last working day (LWD) and the reason for resignation. The system validates that the selected date is not a weekend or a holiday (using the Calendarific API).

- **Exit Interviews:**  
  After resignation, employees can submit exit interview responses via a questionnaire.

- **Admin Dashboard:**  
  HR can view all resignation requests and exit interview responses, and approve or reject resignations.

- **Responsive UI:**  
  The frontend is built with React and Tailwind CSS for a clean and responsive design.

## Tech Stack

- **Frontend:**  
  React, React Router, Tailwind CSS

- **Backend:**  
  Node.js, Express, MongoDB (Mongoose)

- **Authentication:**  
  JSON Web Tokens (JWT)

- **APIs:**  
  Calendarific (for holiday validation)

- **Email Notifications:**  
  (integrated with Nodemailer)

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v12+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)
- Git

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/resignation-management.git
   cd resignation-management/server

2. **Install dependencies:**

    bash
    Copy
    npm install
    Configure Environment Variables:

3. **Create a .env file in the server directory with contents similar to:**

    env
    
    PORT=8080
    MONGO_URI=mongodb://localhost:27017/resignationApp
    JWT_SECRET=SUPER_SECRET_JWT_KEY
    CALENDARIFIC_API_KEY=your_calendarific_api_key
   
4. **Run the Server:**

    npm start
    (Or use nodemon if available: nodemon server.js)

The server should now be running on http://localhost:8080.

### Sample Screenshots
**SignIn/SignUp
<img width="1427" alt="Screenshot 2025-03-10 at 9 01 15 AM" src="https://github.com/user-attachments/assets/f7ea3d41-10a4-4626-928b-2c3b70119051" />
<img width="1438" alt="Screenshot 2025-03-10 at 9 01 54 AM" src="https://github.com/user-attachments/assets/8776a7c3-892f-4fb9-a1e6-791937ef2c0d" />


**Admin**
<img width="1016" alt="Screenshot 2025-03-10 at 8 39 13 AM" src="https://github.com/user-attachments/assets/f20f3597-d39a-488f-b6bb-e8d6de643215" />
<img width="994" alt="Screenshot 2025-03-10 at 8 39 28 AM" src="https://github.com/user-attachments/assets/95f62196-4dc6-42e6-aa92-74d9f19ff075" />

**Employee**
<img width="1432" alt="Screenshot 2025-03-10 at 8 41 24 AM" src="https://github.com/user-attachments/assets/e5b30622-f296-4a5f-90ee-a18d1f713a88" />
<img width="1427" alt="Screenshot 2025-03-10 at 8 41 34 AM" src="https://github.com/user-attachments/assets/fa72ac45-6650-45f0-979f-9a5010c7bca5" />


