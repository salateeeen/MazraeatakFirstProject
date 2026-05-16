# Mazraeatak (مزرعتك) 🏕️

**Mazraeatak** (Your Farm) is a premium chalet and leisure farm booking platform designed to connect people with beautiful vacation spots. Unlike agricultural platforms, Mazraeatak focuses on leisure, providing a seamless experience for finding and booking chalets, private farms, and getaway spots.

## 🌟 Core Functionality

- **Chalet & Farm Discovery**: Explore a wide variety of leisure farms and chalets with high-quality images and detailed descriptions.
- **Smart Booking System**: Real-time availability checking and secure booking management for vacation stays.
- **Amenities & Facilities**: Filter properties by specific facilities such as swimming pools, BBQ areas, children's playgrounds, and more.
- **Location-Based Search**: Easily find the perfect getaway in your preferred city or region.
- **Review & Rating System**: Honest feedback from the community to help you choose the best stay.
- **Owner Management**: Dedicated tools for farm owners to list their properties, manage bookings, and track performance.
- **Notification System**: Instant updates for booking confirmations, status changes, and reminders.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Styling**: CSS Modules (`*.module.css`) for scoped, maintainable styles.
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/) for property location visualization.
- **Forms**: [React Hook Form](https://react-hook-form.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens) with secure cookie/header handling.
- **File Storage**: [Cloudinary](https://cloudinary.com/) integration for property images.
- **Mailing**: [Nodemailer](https://nodemailer.com/) for automated notifications and auth emails.

## 📂 Project Structure

```
MazraeatakFirstProject/
├── BackEnd/                # Express.js API
│   ├── controllers/        # Business logic for each route
│   ├── models/             # Mongoose schemas (User, Farm, Booking, etc.)
│   ├── routers/            # API endpoint definitions
│   ├── services/           # Reusable services (Email, Cloudinary, etc.)
│   ├── jobs/               # Background tasks (e.g., booking automation)
│   └── data/               # Seed data and JSON backups
└── FrontEnd/               # React Application
    ├── src/
    │   ├── features/       # Domain-specific logic (Auth, Bookings, Farms)
    │   ├── pages/          # Full page components
    │   ├── components/     # Shared UI components
    │   ├── store/          # Redux slices and store configuration
    │   ├── services/       # API client services
    │   ├── hooks/          # Custom React hooks
    │   ├── layout/         # Common layout wrappers
    │   └── ui/             # Reusable atomic UI elements
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/MazraeatakFirstProject.git
cd MazraeatakFirstProject
```

### 2. Backend Setup
1. Navigate to the `BackEnd` directory: `cd BackEnd`
2. Install dependencies: `npm install`
3. Create a `config.env` file based on `config.env.example` and add your credentials.
4. Run the development server: `npm run dev`

### 3. Frontend Setup
1. Navigate to the `FrontEnd` directory: `cd FrontEnd`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
