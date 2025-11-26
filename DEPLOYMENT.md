# Deployment Guide 🚀

This guide will walk you through deploying your Ghana Marketplace to production.

## Option 1: Deploy to Vercel (Recommended) ⭐

Vercel is the easiest and best option for Next.js apps.

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `ghana-marketplace`
3. Description: `Full-stack Ghanaian marketplace platform`
4. Make it **Public**
5. **DO NOT** initialize with README
6. Click "Create repository"

### Step 2: Push Your Code to GitHub

Open your terminal in the `ghana-marketplace` folder and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ghana-marketplace.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Deploy to Vercel

#### Option A: Using Vercel Website (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and sign in with your GitHub account
3. Click "Add New Project"
4. Import your `ghana-marketplace` repository
5. Configure your project:
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd ghana-marketplace
vercel

# Answer the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? ghana-marketplace
# - In which directory is your code located? ./

# Deploy to production
vercel --prod
```

### Step 4: Set Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/ghana-marketplace
JWT_SECRET = your-super-secret-production-key-min-32-chars
NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
```

**Important:** Get MongoDB_URI from MongoDB Atlas (see below)

4. Click "Save"
5. Go to "Deployments" and click "Redeploy" with "Use existing Build Cache" unchecked

### Step 5: Set Up MongoDB Atlas (Free Database)

1. Go to [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (Free Shared Cluster - M0)
4. Choose your cloud provider and region (closest to Ghana: Europe/Frankfurt or US East)
5. Click "Create Cluster"
6. Create a database user:
   - Click "Database Access" → "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Atlas admin"
7. Whitelist your IP:
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (or add Vercel IPs)
   - Click "Confirm"
8. Get your connection string:
   - Click "Databases" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `ghana-marketplace`

Example:
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/ghana-marketplace
```

9. Add this to your Vercel Environment Variables as `MONGODB_URI`

### Step 6: Test Your Deployment

1. Visit your Vercel URL (e.g., `https://ghana-marketplace.vercel.app`)
2. Test the signup/login functionality
3. Create a test listing
4. Browse the marketplace
5. Check that all pages work

### Your Live URLs:
- **Production**: `https://ghana-marketplace.vercel.app`
- **GitHub Repo**: `https://github.com/YOUR_USERNAME/ghana-marketplace`

---

## Option 2: Deploy to Netlify

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub → Select `ghana-marketplace`
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Step 3: Add Environment Variables

1. Go to Site settings → Environment variables
2. Add the same variables as Vercel

---

## Option 3: Deploy to Railway

Railway is great for apps needing a backend.

### Step 1: Create Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Deploy

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `ghana-marketplace`
4. Railway will auto-detect Next.js
5. Add environment variables in the Variables tab
6. Deploy

---

## Post-Deployment Checklist

After deploying, make sure to:

- [ ] Test all pages work
- [ ] Sign up for a test account
- [ ] Create a test listing
- [ ] Test the search and filters
- [ ] Check mobile responsiveness
- [ ] Verify images load correctly
- [ ] Test authentication (login/logout)
- [ ] Check that environment variables are working

## Troubleshooting

### Build Fails

**Error: Missing environment variables**
- Make sure all required env vars are set in your hosting platform
- Required: `MONGODB_URI`, `JWT_SECRET`, `NEXT_PUBLIC_APP_URL`

**Error: Module not found**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues

**Error: MongooseServerSelectionError**
- Check your MongoDB Atlas connection string
- Verify your IP is whitelisted in MongoDB Atlas
- Make sure your database user has correct permissions

### Authentication Not Working

- Verify `JWT_SECRET` is set in environment variables
- Check that cookies are enabled in your browser
- Make sure `NEXT_PUBLIC_APP_URL` matches your domain

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Configure DNS records with your domain provider

## Monitoring & Analytics

### Add Vercel Analytics
1. Go to your project on Vercel
2. Click "Analytics" tab
3. Enable Web Analytics

### Add Google Analytics
1. Get your GA4 Measurement ID
2. Add to `app/layout.tsx`

## Security Recommendations

Before going live:
- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Review MongoDB security rules
- [ ] Add rate limiting for API routes
- [ ] Enable CORS properly
- [ ] Add CSP headers

## Need Help?

- Check the [README.md](./README.md)
- Create an issue on GitHub
- Contact: emmanuelkusi23@example.com

---

🎉 **Congratulations! Your Ghana Marketplace is now live!**

🤖 *Generated with [Claude Code](https://claude.com/claude-code)*
