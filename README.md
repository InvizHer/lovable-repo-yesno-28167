# TellUs - Anonymous Complaint Management System

![TellUs Logo](https://img.shields.io/badge/TellUs-Complaint%20Management-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)

A modern, secure, and user-friendly platform for anonymous feedback and complaint management designed specifically for educational institutions and organizations.

## 📖 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Purpose & Benefits](#purpose--benefits)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Introduction

**TellUs** is a comprehensive complaint management system that allows users to submit complaints anonymously while providing administrators with powerful tools to manage, track, and respond to feedback. Built with modern web technologies, TellUs ensures privacy, security, and ease of use for both administrators and end-users.

### Why TellUs?

- **Anonymous Submissions**: Users can submit complaints without revealing their identity
- **Secure Platform**: Built with security best practices and Row-Level Security (RLS)
- **Easy Tracking**: Unique token-based system for tracking complaint status
- **Admin Dashboard**: Comprehensive tools for managing complaints
- **File Attachments**: Support for images, PDFs, and documents
- **Real-time Updates**: Instant status updates and admin replies
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## ✨ Features

### For Users (Complainants)

- **Anonymous Submission**: Submit complaints without creating an account or email confirmation
- **File Attachments**: Attach images (JPG, PNG, WEBP), PDFs, or documents (DOC, DOCX) up to 5MB
- **File Preview**: View image previews before submitting complaints
- **Tracking System**: Track complaint status using unique tokens (e.g., CPL-XXXXXXXXXX)
- **Status Updates**: View real-time status changes (Received → Under Review → Resolved)
- **Admin Replies**: Receive responses from administrators
- **Password Protection**: Access password-protected complaint boxes
- **Browser Storage**: Automatically save complaint tokens for easy access
- **Feedback System**: Rate and provide feedback for complaint boxes anonymously (1-5 stars)
- **Your Complaints**: View all your submitted complaints in one place (stored in browser)
- **Modern Responsive Design**: Optimized for all screen sizes (desktop, tablet, mobile)

### For Administrators

- **User Management**: Secure authentication system with email/password (no email confirmation required)
- **Complaint Box Creation**: Create multiple complaint boxes with custom titles and descriptions
- **Modern Dashboard**: Overview of all complaint boxes and total complaints with professional UI
- **Complaint Management**: 
  - View all complaints in a box
  - Update complaint status
  - Reply to complaints
  - Delete complaints
  - Search and filter complaints
  - View file attachments with preview for images
  - Download attached files with single click
- **Analytics Dashboard**: 
  - View trends and statistics for each complaint box
  - Track complaint counts over time
  - Monitor average ratings from feedback
  - Analyze status distribution (Received, Under Review, Solved)
  - Filter analytics by time range (Week, Month, Quarter, Year)
  - Visual charts and graphs for data insights
- **File Management**: 
  - View image attachments in full resolution
  - Preview images directly in complaint view
  - Download all file types (images, PDFs, documents)
- **Link Sharing**: Generate and share unique complaint box links
- **Account Management**: Update profile and delete account with data cascade
- **Responsive Interface**: Fully optimized for mobile, tablet, and desktop views

## 🎁 Purpose & Benefits

### Purpose

TellUs serves as a bridge between organizations and their stakeholders, providing:

1. **Transparency**: Clear communication channels for feedback
2. **Accountability**: Tracked complaints with status updates
3. **Anonymity**: Safe space for honest feedback
4. **Efficiency**: Streamlined complaint management process

### Benefits

#### For Organizations

- **Improved Communication**: Better understanding of stakeholder concerns
- **Risk Mitigation**: Early identification of issues
- **Trust Building**: Demonstrate commitment to addressing concerns
- **Data-Driven Decisions**: Analytics on complaint trends
- **Compliance**: Meet regulatory requirements for feedback systems

#### For Users

- **Voice Without Fear**: Express concerns anonymously
- **Transparency**: Track complaint progress
- **Engagement**: Direct communication with administration
- **Accountability**: Ensure complaints are addressed

## 🛠 Technology Stack

### Frontend

- **React 18.3.1**: Modern UI library for building interactive interfaces
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework with modern design system
- **shadcn/ui**: High-quality React component library
- **React Router DOM**: Client-side routing
- **Tanstack Query**: Data fetching and caching
- **Lucide React**: Beautiful icon library
- **Sonner**: Toast notifications
- **Recharts**: Data visualization for analytics

### Design System

- **Modern Color Palette**: Professional blue (#3B82F6) and purple (#A855F7) gradients
- **HSL Color System**: All colors defined in HSL for consistency
- **Responsive Breakpoints**: Mobile-first approach with tablet and desktop optimizations
- **Semantic Tokens**: Reusable design tokens for colors, shadows, and gradients
- **Dark Mode Support**: Built-in dark mode with automatic theme switching

### Backend

- **Supabase**: Open-source Firebase alternative
  - PostgreSQL database
  - Authentication system
  - Storage for file uploads
  - Row-Level Security (RLS)
  - Edge Functions

### Development Tools

- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **TypeScript Compiler**: Type checking

## 📁 Project Structure

```
tellus/
├── public/                      # Static assets
│   ├── robots.txt              # SEO robots file
│   └── favicon.ico             # Site favicon
├── src/
│   ├── components/             # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── AdminHeader.tsx    # Admin navigation header
│   │   ├── FrontendHeader.tsx # Public navigation header
│   │   ├── Footer.tsx         # Site footer
│   │   └── NavLink.tsx        # Navigation link component
│   ├── hooks/                 # Custom React hooks
│   ├── integrations/          # Third-party integrations
│   │   └── supabase/         # Supabase client & types
│   ├── lib/                   # Utility functions
│   ├── pages/                 # Page components
│   │   ├── Landing.tsx        # Landing page
│   │   ├── Login.tsx          # Admin login
│   │   ├── Signup.tsx         # Admin registration
│   │   ├── Dashboard.tsx      # Admin dashboard
│   │   ├── CreateBox.tsx      # Create complaint box
│   │   ├── ManageBox.tsx      # Manage complaints
│   │   ├── ComplaintBox.tsx   # Submit complaint (public)
│   │   ├── TrackComplaint.tsx # Track complaint status
│   │   ├── Analytics.tsx      # Analytics dashboard
│   │   ├── Profile.tsx        # Admin profile
│   │   └── NotFound.tsx       # 404 page
│   ├── App.tsx                # Main app component
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles
├── supabase/
│   ├── config.toml           # Supabase configuration
│   ├── migrations/           # Database migrations
│   └── functions/            # Edge functions
│       └── delete-account/   # Account deletion function
├── .env                      # Environment variables
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

## 🗄 Database Schema

### Quick Setup (Recommended)

For new deployments, you can set up the entire database with one SQL script:

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy the entire content from [`supabase/setup.sql`](supabase/setup.sql)
4. Paste it into the SQL Editor and click **Run**
5. Enable email/password authentication in **Authentication > Providers**

This will create all tables, indexes, functions, triggers, RLS policies, and storage configurations automatically.

### Tables

#### `profiles`
Stores user profile information.

```sql
- id: UUID (Primary Key, references auth.users)
- username: TEXT (NOT NULL)
- email: TEXT (NOT NULL)
- created_at: TIMESTAMP WITH TIME ZONE (DEFAULT now())
```

#### `complaint_boxes`
Stores complaint box configurations.

```sql
- id: UUID (Primary Key, Default: gen_random_uuid())
- admin_id: UUID (NOT NULL, references profiles)
- title: TEXT (NOT NULL)
- description: TEXT
- password: TEXT (Optional protection)
- token: TEXT (NOT NULL, Unique)
- created_at: TIMESTAMP WITH TIME ZONE (DEFAULT now())
- updated_at: TIMESTAMP WITH TIME ZONE (DEFAULT now())
```

#### `complaints`
Stores individual complaints.

```sql
- id: UUID (Primary Key, Default: gen_random_uuid())
- box_id: UUID (NOT NULL, references complaint_boxes)
- title: TEXT (NOT NULL)
- message: TEXT (NOT NULL)
- status: TEXT (DEFAULT 'received')
- token: TEXT (NOT NULL, Unique)
- admin_reply: TEXT
- replied_at: TIMESTAMP WITH TIME ZONE
- attachment_url: TEXT
- attachment_name: TEXT
- attachment_type: TEXT
- created_at: TIMESTAMP WITH TIME ZONE (DEFAULT now())
- updated_at: TIMESTAMP WITH TIME ZONE (DEFAULT now())
```

#### `feedbacks`
Stores anonymous feedback for complaint boxes.

```sql
- id: UUID (Primary Key, Default: gen_random_uuid())
- box_id: UUID (NOT NULL, references complaint_boxes)
- rating: INTEGER (NOT NULL, 1-5)
- message: TEXT (Optional)
- created_at: TIMESTAMP WITH TIME ZONE (DEFAULT now())
```

#### `analytics`
Stores daily analytics data for complaint boxes.

```sql
- id: UUID (Primary Key, Default: gen_random_uuid())
- box_id: UUID (NOT NULL, references complaint_boxes)
- date: DATE (NOT NULL, DEFAULT CURRENT_DATE)
- total_complaints: INTEGER (DEFAULT 0)
- received_count: INTEGER (DEFAULT 0)
- in_progress_count: INTEGER (DEFAULT 0)
- resolved_count: INTEGER (DEFAULT 0)
- rejected_count: INTEGER (DEFAULT 0)
- avg_rating: DECIMAL(3,2)
- total_feedbacks: INTEGER (DEFAULT 0)
- created_at: TIMESTAMP WITH TIME ZONE (DEFAULT now())
- updated_at: TIMESTAMP WITH TIME ZONE (DEFAULT now())
- UNIQUE(box_id, date)
```

### Storage Buckets

#### `complaint-attachments`
- **Public**: false
- **File Size Limit**: 5MB
- **Allowed Types**: Images (JPEG, PNG, WEBP), PDF, DOC, DOCX

### Row-Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **profiles**: Users can only view/update their own profile
- **complaint_boxes**: Admins can CRUD their own boxes; Anyone can view by token
- **complaints**: Anyone can insert; Admins can manage their box's complaints; Anyone can view by token
- **feedbacks**: Anyone can insert and view; Admins can delete feedbacks in their boxes
- **analytics**: Admins can view analytics for their boxes; System automatically updates
- **storage.objects**: Anyone can upload/view; Admins can delete their box's attachments

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Supabase Account**: For backend services (or local Supabase instance)

### Local Development

1. **Clone the repository**

```bash
git clone <your-git-url>
cd tellus
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

4. **Set up Supabase**

See [Database Setup](#database-setup) section below.

5. **Start development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Design Customization

The application uses a modern design system defined in `src/index.css` and `tailwind.config.ts`. You can customize:

- **Colors**: Edit CSS variables in `src/index.css` (`:root` for light mode, `.dark` for dark mode)
- **Gradients**: Modify `--gradient-*` variables for different gradient styles
- **Shadows**: Adjust `--shadow-*` variables for elevation effects
- **Responsive Breakpoints**: Configure in `tailwind.config.ts`

All colors use HSL format for better consistency and theming support.

### Database Setup

#### Option 1: Using Lovable Cloud (Recommended)

If you're deploying via Lovable, the database is automatically configured. No manual setup required!

#### Option 2: Manual Supabase Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run the setup script**

Copy the entire content from [`supabase/setup.sql`](supabase/setup.sql) and paste it into your Supabase SQL Editor, then click **Run**.

<details>
<summary>Click to view the complete setup SQL (for reference only)</summary>

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.email
  );
  RETURN new;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create complaint_boxes table
CREATE TABLE public.complaint_boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  password TEXT,
  token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on complaint_boxes
ALTER TABLE public.complaint_boxes ENABLE ROW LEVEL SECURITY;

-- Create policies for complaint_boxes
CREATE POLICY "Admins can view their own complaint boxes"
  ON public.complaint_boxes FOR SELECT
  USING (auth.uid() = admin_id);

CREATE POLICY "Anyone can view complaint boxes by token"
  ON public.complaint_boxes FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert their own complaint boxes"
  ON public.complaint_boxes FOR INSERT
  WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Admins can update their own complaint boxes"
  ON public.complaint_boxes FOR UPDATE
  USING (auth.uid() = admin_id);

CREATE POLICY "Admins can delete their own complaint boxes"
  ON public.complaint_boxes FOR DELETE
  USING (auth.uid() = admin_id);

-- Create complaints table
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  box_id UUID NOT NULL REFERENCES public.complaint_boxes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'received' NOT NULL,
  token TEXT NOT NULL UNIQUE,
  admin_reply TEXT,
  replied_at TIMESTAMP WITH TIME ZONE,
  attachment_url TEXT,
  attachment_name TEXT,
  attachment_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on complaints
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Create policies for complaints
CREATE POLICY "Anyone can insert complaints"
  ON public.complaints FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view complaints by token"
  ON public.complaints FOR SELECT
  USING (true);

CREATE POLICY "Admins can view complaints in their boxes"
  ON public.complaints FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM complaint_boxes
      WHERE complaint_boxes.id = complaints.box_id
        AND complaint_boxes.admin_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update complaints in their boxes"
  ON public.complaints FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM complaint_boxes
      WHERE complaint_boxes.id = complaints.box_id
        AND complaint_boxes.admin_id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete complaints in their boxes"
  ON public.complaints FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM complaint_boxes
      WHERE complaint_boxes.id = complaints.box_id
        AND complaint_boxes.admin_id = auth.uid()
    )
  );

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updating timestamps
CREATE TRIGGER update_complaint_boxes_updated_at
  BEFORE UPDATE ON public.complaint_boxes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON public.complaints
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for attachments
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'complaint-attachments',
  'complaint-attachments',
  false,
  5242880, -- 5MB
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
);

-- Create storage policies
CREATE POLICY "Anyone can upload complaint attachments"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'complaint-attachments');

CREATE POLICY "Anyone can view complaint attachments"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'complaint-attachments');

CREATE POLICY "Admins can delete attachments from their complaint boxes"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'complaint-attachments' AND
    EXISTS (
      SELECT 1 FROM complaints c
      INNER JOIN complaint_boxes cb ON c.box_id = cb.id
      WHERE c.id::text = (storage.foldername(name))[1]
        AND cb.admin_id = auth.uid()
    )
  );
```

</details>

3. **Configure Authentication**

In your Supabase dashboard:
- Go to Authentication → Settings
- Enable Email provider
- For development: Enable "Confirm email" to OFF
- Set Site URL to your deployment URL

4. **Update environment variables**

Copy your project's URL and anon key from Supabase dashboard settings.

## 🌐 Deployment

TellUs can be deployed on various platforms. Below are detailed guides for each deployment method.

---

## Deployment Options

### Option 1: Deploy with Lovable Cloud (Recommended - Easiest)

If you're using Lovable, deployment is the simplest:

1. **Click the Publish button** in the Lovable editor (top right corner)
2. **Click "Update"** to deploy your latest changes
3. **Done!** Your app is live with automatic backend setup

**Note**: Backend changes (database, edge functions) deploy automatically, but frontend changes require clicking "Update" in the publish dialog.

---

### Option 2: Vercel Deployment

#### Automatic Deployment (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

3. **Click "New Project"**

4. **Import your repository**
   - Select your TellUs repository
   - Click "Import"

5. **Configure project settings**:
   - Framework Preset: **Vite**
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)

6. **Add environment variables**:
   Click "Environment Variables" and add:
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = Your Supabase anon key
   - `VITE_SUPABASE_PROJECT_ID` = Your Supabase project ID

7. **Click "Deploy"**

8. **Wait for deployment** (usually takes 1-2 minutes)

9. **Your app is live!** Vercel will provide a URL like `https://your-app.vercel.app`

#### Manual Deployment via CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to your project directory**
   ```bash
   cd tellus
   ```

4. **Deploy to preview**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Vercel will ask about project settings (accept defaults for Vite)

5. **Add environment variables**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_PUBLISHABLE_KEY
   vercel env add VITE_SUPABASE_PROJECT_ID
   ```
   - Paste your values when prompted
   - Select "Production", "Preview", and "Development" for each

6. **Deploy to production**
   ```bash
   vercel --prod
   ```

7. **Your app is live!**

#### Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch automatically deploys to production
- Pull requests create preview deployments
- No manual steps needed after initial setup

---

### Option 3: Netlify Deployment

#### Automatic Deployment (Recommended)

1. **Push your code to GitHub** (same as Vercel step 1)

2. **Go to [netlify.com](https://netlify.com)** and sign in

3. **Click "Add new site" → "Import an existing project"**

4. **Connect to Git provider**
   - Choose GitHub
   - Authorize Netlify
   - Select your TellUs repository

5. **Configure build settings**:
   - Base directory: (leave empty)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Show advanced" and add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`
     - `VITE_SUPABASE_PROJECT_ID`

6. **Click "Deploy site"**

7. **Wait for deployment** (usually takes 2-3 minutes)

8. **Your app is live!** Netlify provides a URL like `https://your-app.netlify.app`

9. **Optional: Set up custom domain**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Follow DNS configuration steps

#### Manual Deployment via CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Navigate to your project**
   ```bash
   cd tellus
   ```

4. **Initialize Netlify**
   ```bash
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Select your team
   - Enter site name (or leave blank for random name)

5. **Build your project**
   ```bash
   npm run build
   ```

6. **Set environment variables**
   ```bash
   netlify env:set VITE_SUPABASE_URL "your_supabase_url"
   netlify env:set VITE_SUPABASE_PUBLISHABLE_KEY "your_anon_key"
   netlify env:set VITE_SUPABASE_PROJECT_ID "your_project_id"
   ```

7. **Deploy to preview**
   ```bash
   netlify deploy
   ```
   - Publish directory: `dist`

8. **Deploy to production**
   ```bash
   netlify deploy --prod
   ```

9. **Your app is live!**

#### Netlify Configuration File (Optional)

Create `netlify.toml` in project root for automatic configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

### Option 4: Render Deployment

#### Automatic Deployment

1. **Push your code to GitHub** (same as previous steps)

2. **Go to [render.com](https://render.com)** and sign in

3. **Click "New +" → "Web Service"**

4. **Connect your repository**
   - Click "Connect account" for GitHub
   - Authorize Render
   - Select your TellUs repository

5. **Configure service**:
   - Name: `tellus` (or your preferred name)
   - Region: Choose closest to your users
   - Branch: `main`
   - Runtime: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: (leave empty, we'll use static site)
   - **WAIT!** Change to **Static Site** instead of Web Service

6. **For Static Site**:
   - Click "New +" → "Static Site"
   - Follow steps 4-5 but use:
     - Build Command: `npm install && npm run build`
     - Publish Directory: `dist`

7. **Add environment variables**:
   - Click "Environment" tab
   - Add each variable:
     - Key: `VITE_SUPABASE_URL`, Value: Your Supabase URL
     - Key: `VITE_SUPABASE_PUBLISHABLE_KEY`, Value: Your anon key
     - Key: `VITE_SUPABASE_PROJECT_ID`, Value: Your project ID

8. **Click "Create Static Site"**

9. **Wait for deployment** (takes 3-5 minutes)

10. **Your app is live!** at `https://your-app.onrender.com`

#### Manual Configuration

Create `render.yaml` in project root:

```yaml
services:
  - type: web
    name: tellus
    runtime: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    envVars:
      - key: NODE_VERSION
        value: 18
      - key: VITE_SUPABASE_URL
        sync: false
      - key: VITE_SUPABASE_PUBLISHABLE_KEY
        sync: false
      - key: VITE_SUPABASE_PROJECT_ID
        sync: false
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

---

### Option 5: Cloudflare Pages

#### Automatic Deployment

1. **Push your code to GitHub**

2. **Go to [dash.cloudflare.com](https://dash.cloudflare.com)**

3. **Navigate to Workers & Pages**

4. **Click "Create application" → "Pages" → "Connect to Git"**

5. **Select your repository**
   - Authorize Cloudflare
   - Choose your TellUs repository

6. **Configure build settings**:
   - Project name: `tellus`
   - Production branch: `main`
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`

7. **Add environment variables**:
   - Click "Add variable" for each:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`
     - `VITE_SUPABASE_PROJECT_ID`

8. **Click "Save and Deploy"**

9. **Wait for deployment** (takes 2-4 minutes)

10. **Your app is live!** at `https://tellus.pages.dev`

#### Manual Deployment via Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build your project**
   ```bash
   npm run build
   ```

4. **Deploy**
   ```bash
   wrangler pages deploy dist --project-name=tellus
   ```

5. **Set environment variables** (do this in Cloudflare dashboard):
   - Go to Workers & Pages → Your project → Settings → Environment Variables
   - Add all three Supabase variables

6. **Redeploy to apply environment variables**
   ```bash
   wrangler pages deploy dist --project-name=tellus
   ```

#### Create `wrangler.toml` (Optional)

```toml
name = "tellus"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"
```

---

### Option 6: Docker Deployment

Perfect for self-hosting or deploying to any cloud provider that supports Docker.

#### Step 1: Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### Step 2: Create nginx.conf

Create `nginx.conf` in project root:

```nginx
events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # SPA routing - serve index.html for all routes
    location / {
      try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
      expires 1y;
      add_header Cache-Control "public, immutable";
    }
  }
}
```

#### Step 3: Create .dockerignore

Create `.dockerignore` in project root:

```
node_modules
dist
.git
.env
*.log
.DS_Store
```

#### Step 4: Build Docker Image

```bash
docker build -t tellus:latest .
```

#### Step 5: Run Docker Container

```bash
docker run -d \
  -p 80:80 \
  --name tellus \
  -e VITE_SUPABASE_URL=your_supabase_url \
  -e VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key \
  -e VITE_SUPABASE_PROJECT_ID=your_project_id \
  tellus:latest
```

**Note**: Environment variables must be set at build time for Vite. For production, rebuild the image with proper values:

```bash
docker build \
  --build-arg VITE_SUPABASE_URL=your_url \
  --build-arg VITE_SUPABASE_PUBLISHABLE_KEY=your_key \
  --build-arg VITE_SUPABASE_PROJECT_ID=your_id \
  -t tellus:latest .
```

Update Dockerfile to accept build arguments:

```dockerfile
# In build stage, after COPY . .
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_PROJECT_ID

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID
```

#### Step 6: Access Your App

Open browser and navigate to `http://localhost`

#### Docker Compose (Recommended for Production)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  tellus:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        VITE_SUPABASE_URL: ${VITE_SUPABASE_URL}
        VITE_SUPABASE_PUBLISHABLE_KEY: ${VITE_SUPABASE_PUBLISHABLE_KEY}
        VITE_SUPABASE_PROJECT_ID: ${VITE_SUPABASE_PROJECT_ID}
    ports:
      - "80:80"
    restart: unless-stopped
    container_name: tellus
```

Create `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

Run with Docker Compose:

```bash
docker-compose up -d
```

---

### Option 7: Deploy to AWS (S3 + CloudFront)

#### Step 1: Build the Project

```bash
npm run build
```

#### Step 2: Create S3 Bucket

1. Go to AWS Console → S3
2. Click "Create bucket"
3. Name: `tellus-app` (must be globally unique)
4. Region: Choose your preferred region
5. Uncheck "Block all public access"
6. Click "Create bucket"

#### Step 3: Configure S3 for Static Hosting

1. Go to bucket → Properties
2. Scroll to "Static website hosting"
3. Click "Edit"
4. Enable static website hosting
5. Index document: `index.html`
6. Error document: `index.html` (for SPA routing)
7. Save changes

#### Step 4: Upload Files

```bash
aws s3 sync dist/ s3://tellus-app --delete
```

Or use AWS Console to upload the `dist` folder contents.

#### Step 5: Set Bucket Policy

Go to Permissions → Bucket policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tellus-app/*"
    }
  ]
}
```

#### Step 6: Create CloudFront Distribution (Optional but Recommended)

1. Go to CloudFront → Create distribution
2. Origin domain: Select your S3 bucket
3. Origin access: Public
4. Default root object: `index.html`
5. Create distribution

#### Step 7: Configure Error Pages

In CloudFront distribution:
- Error Pages → Create custom error response
- HTTP error code: 404
- Response page path: `/index.html`
- HTTP response code: 200

---

## Post-Deployment Checklist

After deploying to any platform:

### 1. Verify Environment Variables
- [ ] `VITE_SUPABASE_URL` is set correctly
- [ ] `VITE_SUPABASE_PUBLISHABLE_KEY` is set correctly
- [ ] `VITE_SUPABASE_PROJECT_ID` is set correctly

### 2. Test Core Functionality
- [ ] Landing page loads correctly
- [ ] Admin signup works
- [ ] Admin login works
- [ ] Create complaint box works
- [ ] Submit complaint works (with and without file)
- [ ] Track complaint works
- [ ] Admin can view/manage complaints
- [ ] File uploads work (images, PDFs)
- [ ] File downloads work

### 3. Configure Supabase
- [ ] Update Supabase Auth → Site URL to your deployment URL
- [ ] Add deployment URL to Redirect URLs
- [ ] Verify RLS policies are working
- [ ] Test storage bucket access

### 4. Security Checks
- [ ] HTTPS is enabled (automatic on most platforms)
- [ ] Environment variables are not exposed in client code
- [ ] CORS is properly configured
- [ ] Rate limiting is considered for production

### 5. Performance Optimization
- [ ] Enable CDN (CloudFront, Cloudflare, etc.)
- [ ] Configure caching headers
- [ ] Optimize images if needed
- [ ] Monitor initial load time

### 6. Monitoring & Analytics (Optional)
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Add analytics (e.g., Google Analytics)
- [ ] Configure uptime monitoring
- [ ] Set up log aggregation

---

## Troubleshooting Common Deployment Issues

### Issue: "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"
**Solution**: Ad blockers may block requests. Test in incognito mode.

### Issue: "Supabase client error"
**Solution**: Verify all environment variables are set correctly and match your Supabase project.

### Issue: "404 on page refresh or direct URL access"
**Problem**: Getting 404 errors when:
- Refreshing pages like `/dashboard` or `/complaint/token`
- Accessing direct URLs like `https://yourdomain.com/track`
- Navigating to any route and then refreshing
- Error shows: `404: NOT_FOUND` or `Code: NOT_FOUND` or `ID: bom1::xxxxx`

**Cause**: Single Page Applications (SPAs) use client-side routing. When you access a URL directly or refresh, the server tries to find that file and returns 404 because it doesn't exist on the server.

**✅ SOLUTION (Follow These Steps)**:

This project now includes proper configuration for all major platforms. Here's what to do:

1. **Make sure ALL configuration files are committed**:
   ```bash
   git status  # Check what files are uncommitted
   git add .
   git commit -m "Fix SPA routing for all platforms"
   git push
   ```

2. **Configuration files that MUST be present**:
   - ✅ `vercel.json` - For Vercel deployment
   - ✅ `netlify.toml` - For Netlify deployment
   - ✅ `render.yaml` - For Render deployment
   - ✅ `wrangler.toml` - For Cloudflare Pages
   - ✅ `public/_redirects` - Netlify fallback
   - ✅ `public/.htaccess` - For Apache servers
   - ✅ `vite.config.ts` - Updated with proper base path
   - ✅ `index.html` - Updated with base href tag

3. **After pushing, trigger a new deployment**:
   - **Vercel**: Automatically deploys on push to main
   - **Netlify**: Automatically deploys on push to main
   - **Render**: Automatically deploys on push to main
   - **Cloudflare**: May need manual trigger in dashboard

4. **If still getting 404 errors**:
   - Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
   - Wait 2-3 minutes for CDN cache to clear
   - Test in incognito/private window

5. **For Vercel specifically** - If errors persist:
   - Go to your project on vercel.com
   - Navigate to "Settings" → "General"
   - Verify Framework Preset is set to "Vite"
   - Verify Build Command: `npm run build`
   - Verify Output Directory: `dist`

6. **Test your deployment**:
   - Try accessing: `https://yourdomain.com/`
   - Try accessing: `https://yourdomain.com/login`
   - Try accessing: `https://yourdomain.com/dashboard`
   - Refresh each page to ensure no 404 errors

#### Platform-Specific Configuration Files Included:

- ✅ **Vercel**: `vercel.json` - Redirects all routes to `index.html`
- ✅ **Netlify**: `netlify.toml` + `public/_redirects` - Handle SPA routing
- ✅ **Render**: `render.yaml` - Configured with rewrite rules
- ✅ **Cloudflare Pages**: `wrangler.toml` - Set up for SPA routing
- ✅ **Apache**: `public/.htaccess` - Handles mod_rewrite

#### Manual Server Configuration (if using custom server):

**Nginx**: Add to your server block:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache**: Ensure `mod_rewrite` is enabled and `.htaccess` is in your web root.

**Troubleshooting Checklist**:
- [ ] Configuration files exist in correct locations
- [ ] Git repository includes config files (not in .gitignore)
- [ ] Deployment platform recognizes the config files
- [ ] Browser cache cleared
- [ ] Redeployed after adding config files
- [ ] Build succeeds without errors
- [ ] `dist/index.html` exists after build

### Issue: "File upload fails"
**Solution**: 
- Check Supabase storage bucket exists
- Verify RLS policies allow uploads
- Check file size limits (5MB max)

### Issue: "Build fails"
**Solution**:
- Ensure Node version is 18 or higher
- Run `npm install` to update dependencies
- Check for TypeScript errors: `npm run build` locally

### Issue: "Environment variables not working"
**Solution**:
- For Vite, variables MUST start with `VITE_`
- Rebuild after changing environment variables
- Some platforms require redeploy after env var changes

---

## Updating Your Deployed App

### For Git-based Deployments (Vercel, Netlify, etc.)
```bash
git add .
git commit -m "Update app"
git push origin main
```
Deployment happens automatically.

### For Manual Deployments
```bash
npm run build
# Then use platform-specific deployment command
vercel --prod
# or
netlify deploy --prod
# or
wrangler pages deploy dist
```

### For Docker
```bash
docker build -t tellus:latest .
docker stop tellus
docker rm tellus
docker run -d -p 80:80 --name tellus tellus:latest
```

---

### Docker Deployment

1. **Create `Dockerfile`**:

```dockerfile
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Create `nginx.conf`**:

```nginx
events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
      try_files $uri $uri/ /index.html;
    }
  }
}
```

3. **Build and run**:

```bash
docker build -t tellus .
docker run -p 80:80 tellus
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key | Yes |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID | Yes |

## 📚 Usage Guide

### For Administrators

#### 1. Register an Account

1. Navigate to the signup page
2. Enter username, email, and password
3. Click "Sign Up"

#### 2. Create a Complaint Box

1. Log in to your dashboard
2. Click "Create Complaint Box"
3. Enter title and optional description
4. Optionally set a password for restricted access
5. Click "Create Complaint Box"

#### 3. Share Complaint Box

1. Go to "Manage" for your complaint box
2. Click "Copy Share Link"
3. Share the link with your users

#### 4. Manage Complaints

1. View all complaints in the complaint box
2. Update status (Received → Under Review → Solved)
3. Reply to complaints
4. View and download attachments
5. Search and filter complaints

### For Users (Complainants)

#### 1. Submit a Complaint

1. Open the complaint box link shared by admin
2. Enter password if required
3. Fill in complaint title and message
4. Optionally attach a file (max 5MB)
5. Click "Submit Complaint"
6. Save your tracking token

#### 2. Track Complaint Status

1. Go to the track page or use the tracking section
2. Enter your complaint token
3. View status and admin replies

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Backend powered by [Supabase](https://supabase.com)
- Icons by [Lucide](https://lucide.dev)

## 📞 Support

For support, email support@tellus.dev or open an issue on GitHub.

---

**Made with ❤️ for better communication**

---

## 📝 Recent Updates

### Design System Overhaul (Latest)
- **Modern Professional Theme**: Implemented a fresh, modern design with blue (#3B82F6) and purple (#A855F7) color scheme
- **Enhanced Design Tokens**: Added comprehensive CSS variables for colors, gradients, shadows, and more
- **Improved Color System**: Migrated to HSL color format for better consistency and theming
- **Better Shadows**: Added subtle, medium, and strong shadow variants with glow effects
- **Gradient System**: New gradient variables for hero sections, cards, and accents

### File Upload Enhancements (Latest)
- **Image Preview**: Users can now preview images before submitting complaints
- **File Size Display**: Shows file size in KB when file is selected
- **Enhanced Admin View**: Admins can view full-resolution image previews in complaint details
- **Better Download UX**: Improved download button with clear icons and labels
- **Responsive Preview**: Image previews adapt to container size on all devices

### Mobile Responsiveness (Latest)
- **Mobile-First Design**: Completely optimized for mobile devices
- **Touch-Friendly UI**: Larger touch targets for better mobile experience
- **Responsive Typography**: Font sizes adjust based on screen size
- **Flexible Layouts**: Grid and flexbox layouts that adapt to all screen sizes
- **Tablet Optimization**: Special breakpoints for tablet devices

### Authentication Improvements (Latest)
- **No Email Confirmation**: Simplified signup process without email verification requirement
- **Instant Access**: Users can immediately access their account after signup

### User Experience
- **Feedback System**: Anonymous rating and feedback for complaint boxes
- **Your Complaints Section**: Track all submitted complaints in browser
- **Analytics Dashboard**: Comprehensive analytics with charts and trends
- **Modern UI Components**: Upgraded all components with better spacing and alignment
