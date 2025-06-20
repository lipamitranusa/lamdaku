# LAMDAKU - Website Profil Perusahaan Akreditasi

Website profil perusahaan untuk lembaga akreditasi yang bergerak di bidang sertifikasi klinik, laboratorium, dan puskesmas. Frontend React yang terintegrasi dengan Laravel CMS backend.

## 🏗️ Architecture

- **Frontend**: React.js (Single Page Application)
- **Backend**: Laravel CMS (Separate project)
- **API Integration**: RESTful communication
- **Content Management**: Admin panel di Laravel backend

## 📁 Project Structure

```
accreditation-company-profile/
├── public/
│   ├── index.html        # Main HTML document
│   └── favicon.ico       # Browser tab icon
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.jsx    # Navigation bar with company logo
│   │   ├── Footer.jsx    # Footer with company info
│   │   ├── Hero.jsx      # Landing page hero section
│   │   ├── Services.jsx  # Services showcase
│   │   ├── About.jsx     # Company information
│   │   ├── Contact.jsx   # Contact form (connected to API)
│   │   ├── CompanyHistory.jsx  # Timeline with animations
│   │   ├── VisionMission.jsx   # Company vision & mission
│   │   ├── TestAPI.jsx   # API connectivity testing
│   │   └── AdminDashboard.jsx  # Admin features
│   ├── pages/            # Page components
│   │   ├── Home.jsx      # Landing page
│   │   ├── Services.jsx  # Services page
│   │   ├── Contact.jsx   # Contact page
│   │   ├── Profile.jsx   # Company profile
│   │   └── Admin.jsx     # Admin panel access
│   ├── services/         # API integration
│   │   └── api.js        # Laravel backend API calls
│   ├── styles/           # CSS stylesheets
│   │   ├── App.css       # Main application styles
│   │   └── index.css     # Global styles
│   ├── App.jsx           # Root component
│   └── index.js          # Application entry point
├── package.json          # Dependencies and scripts
└── Documentation/        # Project documentation
```
└── README.md             # Project documentation
```

## 🔌 Backend Integration

Website ini terintegrasi dengan **Laravel CMS Backend** yang terpisah:

- **Backend Location**: `D:\laragon\www\LAMDAKU\lamdaku-cms-backend`
- **Admin Panel**: `http://localhost:8000/admin/company`
- **API Base URL**: `http://localhost:8000/api/v1/`

### API Endpoints Used:
- `GET /company-info/contact` - Informasi kontak perusahaan
- `GET /company-info` - Informasi lengkap perusahaan  
- `GET /company-info/logo` - Logo perusahaan

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.0.0
- Laravel Backend running on `http://localhost:8000`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/accreditation-company-profile.git
   cd accreditation-company-profile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment (optional):**
   ```bash
   # Create .env file if needed
   REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
   ```

4. **Start Laravel Backend:**
   ```bash
   # Navigate to Laravel backend directory
   cd D:\laragon\www\LAMDAKU\lamdaku-cms-backend
   php artisan serve
   ```

5. **Run the React application:**
   ```bash
   # Back to frontend directory
   cd D:\laragon\www\LAMDAKU\accreditation-company-profile
   npm start
   ```

6. **Open your browser:**
   - Frontend: `http://localhost:3000`
   - Backend Admin: `http://localhost:8000/admin/company`

## Features

- **Responsive Design:** The application is designed to be responsive and accessible on various devices.
- **Service Listings:** Detailed information about the services offered by the accreditation agency.
- **Contact Form:** A contact form for users to submit inquiries directly through the website.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.