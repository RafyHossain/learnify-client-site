# 🎓 Learnify — Online Learning Platform

🔗 **Live Website:**https://learnify-24h.web.app/  



## 📖 Project Overview

**Learnify** is a full-stack online learning platform where instructors can create and manage courses, and learners can explore, enroll, and track their learning journey.

The platform focuses on:
- Smooth user experience  
- Modern UI animations  
- Secure authentication  
- Efficient data handling  

---

## 🚀 Key Features

### 🔐 Authentication System
- Email & Password login  
- Google social login  
- Protected private routes  
- Persistent login on page reload  

---

### 📚 Course Management (CRUD)
- Instructors can add, update, and delete courses  
- Course fields include:
  - Title  
  - Image  
  - Price  
  - Duration  
  - Category  
  - Description  
  - Featured status   
- Course data stored in **MongoDB**

---

### 🧑‍🎓 Learning Experience
- Browse all courses with:
  - Search  
  - Category filter  
  - Sorting options  
- View detailed course information  
- Enroll in courses  
- Manage enrolled courses from dashboard  

---

### 🧭 Dashboard System
- My Enrolled Courses  
- Add Course  
- My Added Courses  
- Analytics section  
- Sidebar with animated active navigation  

---

### ✨ Modern UI & Animations
- Built with **Tailwind CSS**  
- Smooth animations using **Framer Motion**  
- Fully responsive design  

---

## 🏠 Pages & Layout Structure

### 🔹 Header
- Navigation links:
  - Home  
  - Courses  
  - Dashboard  
- Login / Logout button based on authentication state  
- User profile photo after login  

---

### 🔹 Footer
- Website logo  
- Social media links  
- Copyright information  

---

### 🔹 Home Page Sections
- Hero / Banner section  
- Popular Courses (Top 6 featured courses)  
- Top Instructors (Real data from backend / Firebase)  
- Why Choose Us (Static content with animations)  

---

## 🔑 Authentication Flow

### 🔐 Login
- Email & Password login  
- Google Sign-In  
- Redirects user to:
  - Previously requested private route **or**
  - Home page  
- Error & success handled using toast notifications  

---

### 📝 Registration
- Input fields:
  - Name  
  - Email  
  - Photo URL  
  - Password  

#### 🔒 Password Rules
- Minimum 6 characters  
- At least one uppercase letter  
- At least one lowercase letter  

- Google sign-up supported  
- Redirects to Home on successful registration  

---



## 📦 Course Features

### 📋 All Courses Page
- Grid layout  
- Search by course title  
- Filter by category  
- Sort by:
  - Popularity  
  - Price (Low → High)  
  - Price (High → Low)  

---

### 🔍 Course Details (Private Route)
- Full course information  
- Instructor details  
- Enroll button  
- Enrollment confirmation via toast notification  

---

### ➕ Add Course
- Instructor information auto-filled from Firebase  
- Course data stored in MongoDB  
- Featured courses supported  

---

### 🧑‍🏫 My Added Courses
- Shows courses created by logged-in instructor  
- Actions:
  - View  
  - Update  
  - Delete  
- Delete confirmation modal  

---

### 🎒 My Enrolled Courses
- Displays all enrolled courses  
- Options:
  - View details  
  - Unenroll from course  

---

## ⚙️ Technologies Used

### 🖥️ Frontend
- React  
- React Router DOM  
- Tailwind CSS  
- Framer Motion  
- Axios  
- Firebase Authentication  

---

### 🌐 Backend
- Node.js  
- Express.js  
- MongoDB    

---

## 📌 Author
**Learnify** — A modern full-stack online learning platform  
