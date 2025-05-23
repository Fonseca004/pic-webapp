# Smart Rack Web Application

This is a web application built with [Next.js](https://nextjs.org/) and deployed using [Firebase](https://firebase.google.com/).

---

## Overview

The Smart Rack WebApp interfaces directly with a Firebase Realtime Database. It enables communication between the user and the ESP32 microcontroller managing the Smart Rack system. The ESP32 continuously monitors the database for updates and responds accordingly, executing predefined actions based on the current system state.

In addition, the ESP32 logs all actions under the `/logs/` path in the database, providing a comprehensive activity history and ensuring traceability of all operations.

---

## Project Structure

> _To be completed — include details such as key directories and their purposes (e.g., `pages/`, `components/`, `lib/`, etc.)._

---

## Running the Project Locally

To run the Smart Rack WebApp on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/smart-rack-webapp.git
   cd smart-rack-webapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your Firebase project configuration values (API key, Auth Domain, etc.).
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Access the app:**
   - Open your browser and navigate to (http://localhost:3000)
