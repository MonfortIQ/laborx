# LaboraX - Diagnostic Laboratory & Health Checkup HTML Template

**LaboraX** is a premium, production-quality, multipurpose HTML template designed specifically for Diagnostic Laboratories, Pathology Centers, Blood Testing Centers, and Health Checkup companies. It bridges the gap between traditional laboratory templates and modern HealthTech SaaS applications, offering a sleek, user-friendly, and digital-first patient experience.

## Features

- **2 Distinct Homepages:**
  - Home 1: Trusted Diagnostics Near You (Classic, reliable look)
  - Home 2: The Future of Diagnostics Is Digital (Modern, SaaS-style look)
- **Patient & Admin Dashboards:** Dedicated dashboard layouts for patients (reports, bookings) and administrators (management, charts).
- **Tailwind CSS Powered:** Built entirely with Tailwind CSS utilities. No Bootstrap included, ensuring zero conflicts and high performance.
- **Dark Mode Support:** Fully integrated dark mode with a system preference toggle.
- **RTL Support:** Right-to-Left (RTL) mode included for global compatibility.
- **Fully Responsive:** Looks perfect on all devices (mobile, tablet, desktop).
- **Modern UI/UX:** Clean, premium aesthetic with subtle animations and glassmorphism elements.

## File Structure

```
laborax/
├── assets/
│   ├── css/
│   │   └── style.css       # Custom CSS (variables, animations, complex components)
│   ├── js/
│   │   ├── main.js         # Core interactivity (accordions, tabs)
│   │   ├── navigation.js   # Mobile menu & header logic
│   │   └── theme.js        # Dark mode and RTL toggles
├── pages/
│   ├── auth/               # Login, Register, Forgot Password
│   ├── dashboard/          
│   │   ├── admin/          # Admin Dashboard (Overview, Bookings, Patients)
│   │   └── patient/        # Patient Dashboard (Overview, Reports, Bookings, Prescriptions)
│   └── ...                 # Inner Pages (Tests, Packages, Doctors, Blog, About, Contact)
├── index.html              # Homepage 1
├── home-2.html             # Homepage 2
├── tailwind.config.js      # Tailwind Configuration
└── input.css               # Tailwind Input Directives
```

## Setup Instructions

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Open your terminal and navigate to the project directory.
2. Install the necessary dependencies (Tailwind CSS):
   ```bash
   npm install
   ```

### Building the CSS
To compile the Tailwind CSS file, run the following command. This will watch for changes in your HTML files and rebuild the CSS automatically:

```bash
npx tailwindcss -i ./input.css -o ./assets/css/style.css --watch
```
*Note: Make sure not to overwrite the custom CSS variables already present in `style.css` if you are running this in a new environment without appending. The provided template already contains the compiled styles.*

## Customization

### Changing the Color Scheme
The template uses CSS variables for theming, integrated directly with Tailwind. To change the primary colors, open `assets/css/style.css` and modify the variables in the `:root` pseudo-class:

```css
:root {
  --color-primary: 2, 132, 199; /* Example: sky-600 */
  --color-accent: 14, 165, 233; /* Example: sky-500 */
  --color-mint: 16, 185, 129;
}
```

### Dark Mode
Dark mode is handled automatically via Tailwind's `dark:` variant and CSS variables targeting `.dark`. The `theme.js` script manages the state and saves the user's preference in `localStorage`.

### RTL Mode
RTL mode is toggled via the footer switch, which updates the `dir` attribute on the `<html>` tag. No extra CSS configuration is required.

## Credits & Libraries
- **Framework:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Bootstrap Icons](https://icons.getbootstrap.com/)
- **Charts:** [Chart.js](https://www.chartjs.org/)
- **Fonts:** [Google Fonts (Inter)](https://fonts.google.com/)

---

© 2026 LaboraX. All Rights Reserved.
