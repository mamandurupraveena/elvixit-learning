# TravelGo - Travel Booking Website

TravelGo is a full-stack travel booking website where users can explore destinations and make travel bookings.

## Features

- 🌍 View travel destinations
- 📝 Create bookings
- 📋 View all bookings
- ✏️ Edit bookings
- 🗑️ Delete bookings
- 🔄 Refresh bookings
- 👨‍💼 Admin dashboard
- 💾 SQLite database
- 🐳 Dockerized frontend and backend

## Technologies

- HTML
- CSS
- JavaScript
- Python Flask
- Flask-CORS
- SQLite
- Docker
- Docker Compose
- Nginx

## Project Structure

```text
docker-travel-website/
├── backend/
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── admin.html
│   ├── style.css
│   ├── script.js
│   └── Dockerfile
├── docker-compose.yml
└── README.md

Run Project
docker compose up --build
Website
http://localhost:5500
Admin Dashboard
http://localhost:5500/admin.html
Backend API
http://localhost:5000
Status
✅ Project completed and fully working.TravelGo Docker deployment project
