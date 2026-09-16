# GiftLink

GiftLink is a full-stack web application that connects users who want to give away household items they no longer needed with users who preferred to recycle or find free items instead of purchasing new ones.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Item Listings**: Create, view, and manage items for giveaway
- **Search & Filter**: Search items by keyword and filter by category
- **Comments**: Add comments to item listings
- **User Profiles**: Edit profile information
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (NoSQL)
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Frontend**: React
- **NLP**: Natural (for text processing)
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose (optional)
- MongoDB (local or containerized)

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Set up environment variables in `.env`
4. Seed the database:
   ```bash
   npm run seed
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Docker Setup

```bash
docker-compose up -d
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/gifts | Get all gifts |
| GET | /api/gifts/:id | Get gift by ID |
| POST | /api/gifts | Create a gift (auth) |
| DELETE | /api/gifts/:id | Delete a gift (auth) |
| POST | /api/gifts/:id/comments | Add comment (auth) |
| GET | /api/search?q=&category= | Search gifts |
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| PUT | /api/auth/profile | Update profile (auth) |

## Project Structure

```
capstone/
├── backend/
│   ├── app.js
│   ├── index.js
│   ├── db.js
│   ├── authRoutes.js
│   ├── giftRoutes.js
│   ├── searchRoutes.js
│   ├── seed.js
│   ├── seed.json
│   ├── package.json
│   ├── Dockerfile
│   └── .env
├── frontend/
│   └── src/
│       └── components/
│           ├── RegisterPage.js
│           ├── LoginPage.js
│           └── ...
├── docker-compose.yml
├── user-story.md
└── README.md
```
