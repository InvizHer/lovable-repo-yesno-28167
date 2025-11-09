# TellUs - Anonymous Complaint Management System

![TellUs Logo](https://img.shields.io/badge/TellUs-Complaint%20Management-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)

A modern, secure, and user-friendly platform for anonymous feedback and complaint management designed for educational institutions and organizations.

## 📖 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Contributing](#contributing)

## 🎯 Overview

**TellUs** is a comprehensive complaint management system that enables users to submit anonymous complaints while providing administrators with powerful tools to manage, track, and respond to feedback efficiently. The platform prioritizes privacy, security, and user experience.

### Why TellUs?

- **Complete Anonymity**: No registration required for users to submit complaints
- **Secure by Design**: Built with Supabase Row-Level Security (RLS) and PostgreSQL
- **Real-time Tracking**: Unique token-based system for status monitoring
- **Modern UI**: Beautiful, responsive design with dark mode support
- **Analytics Dashboard**: Comprehensive insights and trending data
- **File Support**: Upload and manage attachments (images, PDFs, documents)

## ✨ Key Features

### For Users (Complainants)

- ✅ **Anonymous Submission** - No account or email required
- 📎 **File Attachments** - Support for images, PDFs, and documents up to 5MB
- 🔍 **Track Status** - Monitor complaints using unique tracking tokens
- 📊 **Real-time Updates** - Instant status changes and admin replies
- 🔒 **Password Protection** - Access password-protected complaint boxes
- ⭐ **Feedback System** - Rate complaint boxes (1-5 stars)
- 💬 **Your Complaints** - View all submitted complaints in one place
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop

### For Administrators

- 👤 **Secure Authentication** - Email/password authentication via Supabase
- 📦 **Multiple Complaint Boxes** - Create and manage unlimited boxes
- 📈 **Analytics Dashboard** - Visualize trends, ratings, and statistics
- 🔔 **Complaint Management** - Update status, reply to complaints, search & filter
- 📁 **File Management** - View image previews, download all file types
- 🔗 **Link Sharing** - Generate unique shareable links for each box
- 🎨 **Modern Dashboard** - Clean, professional interface with statistics
- 🌙 **Dark Mode** - Toggle between light and dark themes

## 🛠 Technology Stack

### Frontend

- **React 18.3.1** - UI library for building interactive interfaces
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **React Router DOM 6.30.1** - Client-side routing
- **Tanstack Query 5.83.0** - Data fetching and caching
- **Lucide React** - Beautiful icon library
- **Recharts** - Data visualization for analytics
- **Framer Motion** - Animation library
- **Sonner** - Toast notifications

### Design System

- **Fonts**: DM Sans (body), Lexend (headings), Space Grotesk (code)
- **Colors**: Blue (#3B82F6) and Purple (#A855F7) gradients
- **HSL Color System**: All colors defined in HSL for consistency
- **Design Tokens**: Reusable tokens for colors, shadows, gradients
- **Dark Mode**: Built-in dark mode support with theme switching
- **Glassmorphism**: Modern glass effects with backdrop blur

### Backend

- **Supabase** - Open-source Firebase alternative
  - PostgreSQL Database (with RLS)
  - Authentication System
  - Storage for file uploads
  - Edge Functions (Deno)
  - Real-time subscriptions

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking

## 📁 Project Structure

```
tellus/
├── public/
│   ├── _redirects              # Netlify redirects
│   ├── robots.txt              # SEO robots file
│   └── favicon.ico             # Site favicon
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── AdminHeader.tsx     # Admin navigation with scroll hide/show
│   │   ├── FrontendHeader.tsx  # Public header with scroll hide/show
│   │   ├── Footer.tsx          # Site footer
│   │   ├── SEOHead.tsx         # SEO meta tags component
│   │   └── ThemeToggle.tsx     # Dark/light theme switcher
│   ├── hooks/
│   │   ├── use-mobile.tsx      # Mobile detection hook
│   │   ├── use-toast.ts        # Toast notification hook
│   │   └── use-scroll-header.tsx # Header show/hide on scroll
│   ├── integrations/
│   │   └── supabase/           # Supabase client & types
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── pages/
│   │   ├── Landing.tsx         # Landing page with hero section
│   │   ├── Login.tsx           # Admin login
│   │   ├── Signup.tsx          # Admin registration
│   │   ├── Dashboard.tsx       # Admin dashboard
│   │   ├── CreateBox.tsx       # Create complaint box
│   │   ├── ManageBox.tsx       # Manage complaints in a box
│   │   ├── ComplaintBox.tsx    # Submit complaint (public)
│   │   ├── TrackComplaint.tsx  # Track complaint status
│   │   ├── Analytics.tsx       # Analytics dashboard
│   │   ├── Profile.tsx         # Admin profile management
│   │   └── NotFound.tsx        # 404 page
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles & design system
├── supabase/
│   ├── config.toml             # Supabase configuration
│   ├── setup.sql               # Complete database setup script
│   ├── migrations/             # Database migrations (auto-generated)
│   └── functions/
│       └── delete-account/     # Edge function for account deletion
├── .env                        # Environment variables
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── netlify.toml                # Netlify deployment config
├── render.yaml                 # Render deployment config
├── vercel.json                 # Vercel deployment config
└── wrangler.toml               # Cloudflare Workers config
```

## 🗄 Database Schema

### Quick Setup

The entire database can be set up with one SQL script:

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy the content from [`supabase/setup.sql`](supabase/setup.sql)
4. Paste and click **Run**
5. Enable email/password auth in **Authentication > Providers**

### Tables

#### `profiles`
User profile information linked to auth.users

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, references auth.users |
| username | TEXT | User's display name |
| email | TEXT | User's email address |
| created_at | TIMESTAMP | Account creation timestamp |

#### `complaint_boxes`
Complaint boxes created by admins

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| admin_id | UUID | Foreign key to profiles |
| title | TEXT | Box title |
| description | TEXT | Box description |
| token | TEXT | Unique access token |
| password | TEXT | Optional password protection |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

#### `complaints`
Individual complaints submitted by users

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| box_id | UUID | Foreign key to complaint_boxes |
| title | TEXT | Complaint title |
| message | TEXT | Complaint message |
| status | TEXT | Status (received/in_progress/resolved/rejected) |
| token | TEXT | Unique tracking token |
| admin_reply | TEXT | Admin's response |
| replied_at | TIMESTAMP | Reply timestamp |
| attachment_url | TEXT | File attachment URL |
| attachment_name | TEXT | Original filename |
| attachment_type | TEXT | MIME type |
| created_at | TIMESTAMP | Submission timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

#### `feedbacks`
Anonymous feedback for complaint boxes

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| box_id | UUID | Foreign key to complaint_boxes |
| rating | INTEGER | Rating (1-5) |
| message | TEXT | Optional feedback message |
| created_at | TIMESTAMP | Submission timestamp |

#### `analytics`
Daily analytics data for complaint boxes

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| box_id | UUID | Foreign key to complaint_boxes |
| date | DATE | Analytics date |
| total_complaints | INTEGER | Total complaint count |
| received_count | INTEGER | Complaints with "received" status |
| in_progress_count | INTEGER | Complaints with "in_progress" status |
| resolved_count | INTEGER | Complaints with "resolved" status |
| rejected_count | INTEGER | Complaints with "rejected" status |
| avg_rating | DECIMAL | Average rating from feedbacks |
| total_feedbacks | INTEGER | Total feedback count |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Storage Buckets

#### `complaint-attachments`
- **Public**: Yes (files directly accessible via URL)
- **File Size Limit**: 5MB
- **Allowed Types**: JPEG, PNG, WEBP, GIF, PDF, DOC, DOCX, XLS, XLSX, TXT

### Row-Level Security (RLS)

All tables have RLS enabled:

- **profiles**: Users can view/update only their own profile
- **complaint_boxes**: Admins can CRUD their boxes; Anyone can view by token
- **complaints**: Anyone can insert; Admins manage their box's complaints; Anyone can view by token
- **feedbacks**: Anyone can insert/view; Admins can delete feedbacks in their boxes
- **analytics**: Admins can view analytics for their boxes
- **storage.objects**: Anyone can upload; Admins can delete their box's attachments

### Database Functions

- `handle_new_user()` - Auto-creates profile on user signup
- `update_updated_at_column()` - Auto-updates updated_at timestamp
- `update_box_analytics()` - Updates analytics when complaints change
- `update_feedback_analytics()` - Updates analytics when feedbacks change

### Triggers

- `on_auth_user_created` - Creates profile when user signs up
- `update_*_updated_at` - Updates timestamps on table updates
- `update_analytics_on_*_change` - Updates analytics automatically

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **bun**: Latest version
- **Supabase Account**: For backend services (free tier available)

### Local Development

1. **Clone the repository**

```bash
git clone <your-repository-url>
cd tellus
```

2. **Install dependencies**

```bash
npm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

4. **Set up Supabase database**

- Create a Supabase project at [supabase.com](https://supabase.com)
- Go to SQL Editor
- Copy & run the content from `supabase/setup.sql`
- Enable email/password authentication in Authentication > Providers

5. **Start development server**

```bash
npm run dev
# or
bun dev
```

Access at `http://localhost:5173`

### Design Customization

Customize the design system in `src/index.css` and `tailwind.config.ts`:

- **Colors**: Edit CSS variables (`:root` for light, `.dark` for dark mode)
- **Fonts**: Update font imports in `index.html` and `tailwind.config.ts`
- **Gradients**: Modify `--gradient-*` variables
- **Shadows**: Adjust `--shadow-*` variables
- **Animations**: Add custom animations in `@keyframes`

## 🚢 Deployment

### Lovable Cloud (Recommended)

TellUs is optimized for deployment via Lovable Cloud:

1. Push your code to the Lovable platform
2. Lovable automatically provisions Supabase backend
3. No manual database setup required
4. Automatic deployments on code changes

### Manual Deployment Options

#### Netlify

```bash
npm run build
# Deploy the 'dist' folder to Netlify
```

- Uses `netlify.toml` for configuration
- Automatic redirects configured in `public/_redirects`

#### Vercel

```bash
npm run build
# Deploy using Vercel CLI or GitHub integration
```

- Uses `vercel.json` for configuration
- Serverless functions support available

#### Render

- Uses `render.yaml` for configuration
- Supports automatic deployments from Git

#### Self-Hosting

```bash
npm run build
# Serve the 'dist' folder with any static hosting service
```

### Environment Variables

Set these variables in your deployment platform:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `VITE_SUPABASE_PROJECT_ID` - Your Supabase project ID

## ⚙️ Configuration

### SEO Configuration

Each page has SEO optimization via the `SEOHead` component:

```tsx
<SEOHead 
  title="Page Title"
  description="Page description"
  keywords="relevant, keywords, here"
/>
```

### Theme Configuration

Toggle between light and dark modes using the `ThemeToggle` component. Theme preference is saved in localStorage.

### Font Configuration

Fonts are configured in:
- `index.html` - Google Fonts imports
- `tailwind.config.ts` - Font family definitions
- `src/index.css` - Font application

Current fonts:
- **Body**: DM Sans
- **Headings**: Lexend
- **Code/Special**: Space Grotesk

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use the existing design system (no inline colors)
- Add proper SEO meta tags to new pages
- Ensure responsive design for all screen sizes
- Test on both light and dark modes
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 📧 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Supabase**
