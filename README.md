# Ghana Marketplace 🇬🇭

A modern, full-stack marketplace platform tailored for Ghana - similar to Vinted but designed specifically for the Ghanaian market. Buy, sell, and swap second-hand clothing, electronics, accessories, and more across Ghana.

## ✨ Features

### 🛍️ Core Marketplace Features
- **Browse & Search**: Advanced filtering by category, location, price, condition
- **Product Listings**: Beautiful product cards with image galleries
- **User Profiles**: Seller profiles with ratings and verification badges
- **Messaging Framework**: Infrastructure for real-time chat between buyers/sellers
- **Favorites**: Save items for later

### 🇬🇭 Ghana-Specific Features
- **Local Locations**: Accra, Kumasi, Takoradi, Tamale, Cape Coast, and more
- **GHS Currency**: All prices in Ghanaian Cedis
- **Mobile Money Ready**: Framework for MTN MoMo, Vodafone Cash, AirtelTigo Money
- **Cash on Delivery**: Traditional payment option
- **Local Delivery**: Framework for dispatch riders and courier services

### 🎨 Modern UI/UX
- **Ghana-Inspired Design**: Warm golds, deep greens, rich browns
- **Mobile-First**: Fully responsive across all devices
- **Smooth Animations**: Framer Motion for delightful interactions
- **Clean Interface**: Modern cards, soft shadows, consistent spacing

### 🔒 Authentication & Security
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for secure password storage
- **Role-Based Access**: Buyer, Seller, and Admin roles
- **Protected Routes**: Middleware for authenticated pages

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless functions
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for auth
- **bcryptjs** - Password hashing

## 🛠️ Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB instance (local or cloud)
- npm or yarn package manager

### Setup Steps

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/ghana-marketplace
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ghana-marketplace)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login and Deploy**
```bash
vercel login
cd ghana-marketplace
vercel
```

3. **Set Environment Variables in Vercel Dashboard**
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Your JWT secret key

4. **Deploy to Production**
```bash
vercel --prod
```

### GitHub Repository Setup

1. **Create a new repository on GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Name: `ghana-marketplace`
   - Description: "Full-stack Ghanaian marketplace platform"
   - Set to Public
   - Click "Create repository"

2. **Push your code**
```bash
git remote add origin https://github.com/YOUR_USERNAME/ghana-marketplace.git
git branch -M main
git push -u origin main
```

## 📁 Project Structure

```
ghana-marketplace/
├── app/                    # Next.js App Router pages
│   ├── api/auth/          # Authentication API routes
│   ├── dashboard/         # User dashboard
│   ├── listing/[id]/      # Product detail pages
│   ├── marketplace/       # Marketplace feed
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   └── sell/              # Create listing page
├── components/ui/          # Reusable UI components
├── lib/                    # Utilities and configurations
│   ├── auth/              # JWT & password utilities
│   ├── db/                # MongoDB connection
│   ├── store/             # Zustand state management
│   └── utils/             # Helper functions & constants
├── models/                 # Mongoose database models
└── types/                  # TypeScript type definitions
```

## 📝 Usage Guide

### For Buyers
1. Browse the marketplace
2. Use filters to find items
3. View product details
4. Contact sellers
5. Purchase via Mobile Money or Cash on Delivery

### For Sellers
1. Sign up for an account
2. Click "Sell an Item"
3. Add photos and details
4. Set your price
5. Manage listings in dashboard

## 🎨 Customization

### Categories
Edit `lib/utils/constants.ts`:
```typescript
export const CATEGORIES = [
  {
    id: 'clothing',
    name: 'Clothing',
    icon: 'Shirt',
    subcategories: ['Men\'s', 'Women\'s', 'Kids\''],
  },
  // Add more...
];
```

### Locations
Add cities in `lib/utils/constants.ts`:
```typescript
export const GHANA_LOCATIONS = [
  'Accra', 'Kumasi', 'Takoradi', 'Tamale',
  // Add more...
];
```

## 🔐 Security Checklist for Production

- [x] JWT authentication implemented
- [x] Password hashing with bcrypt
- [x] Environment variables for secrets
- [ ] Change JWT_SECRET in production
- [ ] Use MongoDB Atlas (not local DB)
- [ ] Enable HTTPS
- [ ] Set up rate limiting
- [ ] Add input sanitization
- [ ] Implement CSP headers

## 🚧 Roadmap

- [ ] Real-time messaging with Socket.io
- [ ] Mobile Money payment integration (MTN MoMo, Vodafone Cash)
- [ ] Image upload to cloud storage (Cloudinary)
- [ ] Email notifications
- [ ] Admin dashboard with analytics
- [ ] Review and rating system
- [ ] Advanced search
- [ ] Mobile app

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Next.js team
- Tailwind CSS
- Ghana for the inspiration! 🇬🇭

## 📞 Support

For support, create an issue in the repository.

---

**Made with ❤️ for Ghana**

🤖 *Generated with [Claude Code](https://claude.com/claude-code)*
