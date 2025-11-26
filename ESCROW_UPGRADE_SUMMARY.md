# 🚀 Ghana Marketplace - Escrow & Delivery System Upgrade

## ✅ PHASE 1 COMPLETE: Foundation & Database Models

### What's Been Implemented

#### 1. ✅ TypeScript Types (Complete)
**File:** `types/index.ts`

**New Types Added:**
- ✅ `Courier` - Extended user type for couriers
- ✅ `OrderStatus` - 11 status states (pending → completed)
- ✅ `Order` - Enhanced with escrow, verification codes, courier assignment
- ✅ `StatusUpdate` - Order status history tracking
- ✅ `VerificationProof` - Pickup/delivery verification with photos & GPS
- ✅ `GPSCoordinates` - Location tracking
- ✅ `Dispute` - Complete dispute management system
- ✅ `DisputeResolution` - Admin resolution with penalties
- ✅ `Penalty` - Warning/strike/ban system
- ✅ `Transaction` - Financial transaction ledger
- ✅ `Payout` - Payment distribution tracking
- ✅ `Rating` - 4-way rating system (buyer/seller/courier interactions)

#### 2. ✅ Database Models (Complete)
All Mongoose models created and ready:

**Updated Models:**
- ✅ **User** (`models/User.ts`)
  - Added `courier` role
  - Rating fields (rating, totalRatings)
  - Strike system (strikes, banned)
  - Courier-specific fields (vehicleType, licenseNumber, activeDeliveries, completedDeliveries, courierRating, availabilityStatus)

- ✅ **Order** (`models/Order.ts`)
  - Escrow fields (escrowStatus, escrowAmount)
  - Pricing breakdown (itemPrice, deliveryFee, platformCommission, totalAmount)
  - Courier assignment (courierId)
  - Verification codes (pickupCode, deliveryCode)
  - Address fields (pickupAddress, deliveryAddress)
  - Status history tracking
  - Auto-confirmation (deliveryConfirmationDeadline, autoConfirmed)
  - 11 status states

**New Models:**
- ✅ **Verification** (`models/Verification.ts`)
  - Pickup and delivery proof storage
  - Photo uploads (minimum 2 required)
  - GPS coordinates with accuracy
  - Timestamp logging
  - Code verification
  - Confirmation status

- ✅ **Dispute** (`models/Dispute.ts`)
  - Order reference
  - Dispute raiser tracking
  - Evidence photo uploads
  - Admin notes
  - Resolution tracking (refund/release/partial)
  - Penalty application
  - Status workflow (open → under-review → resolved)

- ✅ **Transaction** (`models/Transaction.ts`)
  - Transaction types (escrow-hold, platform-commission, courier-payment, seller-payout, refund)
  - Amount tracking
  - User associations (from/to)
  - Reference numbers
  - Status tracking
  - Completion timestamps

- ✅ **Rating** (`models/Rating.ts`)
  - 4-way rating types
  - 1-5 star rating
  - Optional review text
  - Order association

#### 3. ✅ Utility Functions (Complete)
**File:** `lib/utils/verification.ts`

**Functions Created:**
- ✅ `generateVerificationCode()` - Creates 6-digit codes
- ✅ `generateTransactionReference()` - Unique transaction IDs
- ✅ `isValidVerificationCode()` - Code format validation
- ✅ `calculateConfirmationDeadline()` - 4-hour auto-confirm window
- ✅ `shouldAutoConfirm()` - Check if deadline passed
- ✅ `calculateFees()` - Platform commission, payouts calculation
- ✅ `isValidGPSCoordinates()` - GPS validation
- ✅ `calculateDistance()` - Distance between GPS points

---

## 📋 PHASE 2: API Routes & Backend Logic

### What Needs to Be Implemented

#### API Routes to Create

**1. Escrow Management** (`app/api/escrow/`)
```
POST /api/escrow/hold           - Hold payment in escrow
POST /api/escrow/release        - Release payment to seller
POST /api/escrow/refund         - Refund to buyer
GET  /api/escrow/status/:id     - Check escrow status
```

**2. Courier Assignment** (`app/api/courier/`)
```
POST /api/courier/assign        - Assign courier to order
GET  /api/courier/available     - Get available couriers
PUT  /api/courier/status        - Update courier availability
GET  /api/courier/deliveries    - Get courier's active deliveries
```

**3. Pickup Verification** (`app/api/verification/pickup/`)
```
POST /api/verification/pickup   - Submit pickup verification
      - Requires: orderId, code, photos (2+), GPS, timestamp
      - Validates pickup code
      - Updates order status to 'picked-up'
      - Stores verification proof
GET  /api/verification/pickup/:orderId - Get pickup proof
```

**4. Delivery Verification** (`app/api/verification/delivery/`)
```
POST /api/verification/delivery - Submit delivery verification
      - Requires: orderId, code, photos (2+), GPS, timestamp
      - Validates delivery code
      - Updates order status to 'delivered'
      - Sets auto-confirm deadline (4 hours)
      - Stores verification proof
GET  /api/verification/delivery/:orderId - Get delivery proof
```

**5. Delivery Confirmation** (`app/api/order/confirm/`)
```
POST /api/order/confirm         - Buyer confirms delivery
      - Releases escrow
      - Creates transactions (commission, courier fee, seller payout)
      - Updates order status to 'completed'
```

**6. Dispute Management** (`app/api/dispute/`)
```
POST /api/dispute/create        - Raise dispute (buyer only)
      - Requires: orderId, reason, description, evidencePhotos
      - Locks escrow
      - Updates order status to 'disputed'
GET  /api/dispute/:id           - Get dispute details
PUT  /api/dispute/resolve       - Admin resolves dispute
      - Decision: refund-buyer / release-seller / partial-refund
      - Apply penalties if needed
      - Process transactions
```

**7. Transaction Ledger** (`app/api/transactions/`)
```
POST /api/transactions/create   - Create transaction record
GET  /api/transactions/order/:id - Get order transactions
GET  /api/transactions/user/:id  - Get user transactions
```

**8. Rating System** (`app/api/ratings/`)
```
POST /api/ratings/create        - Submit rating
GET  /api/ratings/user/:id      - Get user ratings
GET  /api/ratings/order/:id     - Get order ratings
```

**9. Auto-Confirmation Cron**
```
Create scheduled job (every 15 minutes):
- Find orders with status 'delivered'
- Check if deliveryConfirmationDeadline passed
- Auto-confirm and release escrow
- Set autoConfirmed = true
```

---

## 🎨 PHASE 3: UI Components

### Components to Create

#### 1. Order Status Timeline
**File:** `components/order/StatusTimeline.tsx`

Shows visual timeline:
```
Order Placed → Paid → Courier Assigned → Picked Up →
In Transit → Delivered → Completed
```

With:
- Icons for each status
- Timestamps
- Current step highlighted
- Progress indicator

#### 2. Courier Dashboard
**File:** `app/courier/dashboard/page.tsx`

Features:
- Active deliveries list
- Pickup verification form
  - Enter pickup code
  - Upload 2+ photos
  - Capture GPS
  - Submit verification
- Delivery verification form
  - Enter delivery code
  - Upload 2+ photos
  - Capture GPS
  - Submit verification
- Earnings summary
- Availability toggle

#### 3. Buyer Confirmation Page
**File:** `app/order/[id]/confirm/page.tsx`

Options:
- ✅ Confirm Delivery button → Release escrow
- ⚠️ Raise Dispute button → Opens dispute form
- Auto-confirm countdown timer
- Order details
- Delivery photos

#### 4. Dispute Form
**Component:** `components/dispute/DisputeForm.tsx`

Fields:
- Reason dropdown
- Description textarea
- Evidence photo upload (multiple)
- Submit button

#### 5. Admin Dispute Panel
**File:** `app/admin/disputes/page.tsx`

Shows for each dispute:
- Order details
- Listing photos
- Pickup verification photos
- Delivery verification photos
- GPS logs (pickup & delivery)
- Timestamps
- Chat logs
- Evidence photos from buyer

Actions:
- Refund buyer (full/partial)
- Release to seller
- Apply penalty (warning/strike/ban)
- Add admin notes
- Resolve dispute

#### 6. Courier Profile Card
**Component:** `components/courier/CourierProfile.tsx`

Displays:
- Courier photo
- Name
- Rating (stars)
- Completed deliveries
- Vehicle type
- Phone number
- Current availability

#### 7. Rating Modal
**Component:** `components/rating/RatingModal.tsx`

After order completion:
- Rate seller (if buyer)
- Rate buyer (if seller)
- Rate courier (both)
- 1-5 stars
- Optional review text

---

## ⚙️ PHASE 4: Order Flow Updates

### Modified Order Creation Flow

**File:** `app/sell/page.tsx` → Order Creation

1. ❌ **Remove** all "meet in person" options
2. ✅ **Enforce** courier-only delivery
3. ✅ **Calculate fees** on checkout:
   ```typescript
   const fees = calculateFees(itemPrice);
   // Show breakdown:
   // - Item price: GHS 100
   // - Delivery fee: GHS 20
   // - Total: GHS 120
   ```

**File:** New checkout page with escrow

1. User pays total amount (item + delivery)
2. Create Order with:
   - Generate `pickupCode` = generateVerificationCode()
   - Generate `deliveryCode` = generateVerificationCode()
   - Set `escrowStatus` = 'held'
   - Set `escrowAmount` = totalAmount
   - Set `status` = 'paid'
   - Set `pickupAddress` = seller.location
   - Set `deliveryAddress` = buyer input
3. Assign available courier
4. Create escrow transaction record
5. Notify seller, courier, buyer

---

## 📊 PHASE 5: Admin Features

### Admin Dashboard Updates

**File:** `app/admin/dashboard/page.tsx`

Add sections:
- Escrow balance (total held)
- Pending disputes
- Flagged orders
- Strike/ban management

**File:** `app/admin/users/page.tsx`

User management:
- View strike count
- Ban/unban users
- View rating history

**File:** `app/admin/couriers/page.tsx`

Courier management:
- Approve courier applications
- View delivery history
- Performance metrics
- Suspend/activate couriers

**File:** `app/admin/transactions/page.tsx`

Financial ledger:
- All transactions
- Filter by type
- Export to CSV
- Revenue analytics

---

## 🔄 PHASE 6: Automated Systems

### Cron Jobs to Implement

#### 1. Auto-Confirmation Job
**Run every:** 15 minutes

**Logic:**
```typescript
// Find delivered orders past deadline
const overdueOrders = await Order.find({
  status: 'delivered',
  deliveryConfirmationDeadline: { $lt: new Date() },
  autoConfirmed: false,
});

for (const order of overdueOrders) {
  // Auto-confirm
  order.status = 'completed';
  order.autoConfirmed = true;
  await order.save();

  // Release escrow
  await releaseEscrow(order);

  // Create payout transactions
  await createPayoutTransactions(order);
}
```

#### 2. Courier Assignment Job
**Run every:** 5 minutes

**Logic:**
```typescript
// Find paid orders without courier
const unassignedOrders = await Order.find({
  status: 'paid',
  courierId: null,
});

for (const order of unassignedOrders) {
  // Find nearest available courier
  const courier = await findNearestCourier(order.pickupAddress);

  if (courier) {
    order.courierId = courier._id;
    order.status = 'courier-assigned';
    await order.save();

    // Notify courier
    await notifyCourier(courier, order);
  }
}
```

---

## 🧪 PHASE 7: Testing Checklist

### Complete Flow Testing

- [ ] Create order with courier delivery
- [ ] Payment goes to escrow
- [ ] Courier assigned
- [ ] Courier picks up (code + photos + GPS)
- [ ] Status updates to 'picked-up'
- [ ] Courier delivers (code + photos + GPS)
- [ ] Status updates to 'delivered'
- [ ] Auto-confirm deadline set
- [ ] Buyer confirms delivery
- [ ] Escrow released
- [ ] Payouts distributed
- [ ] Ratings submitted

### Dispute Flow Testing

- [ ] Buyer raises dispute
- [ ] Escrow locks
- [ ] Admin reviews evidence
- [ ] Admin resolves (refund/release/partial)
- [ ] Penalty applied if fraud
- [ ] Transactions processed

### Edge Cases

- [ ] Auto-confirmation after 4 hours
- [ ] Invalid pickup code rejection
- [ ] Insufficient photos rejection
- [ ] GPS validation
- [ ] Concurrent dispute resolution
- [ ] Banned user restrictions

---

## 📦 DEPLOYMENT STEPS

### 1. Database Migration
```bash
# Backup current database
mongodump --uri="your-mongodb-uri"

# Deploy new models
# New collections will be created automatically:
# - verifications
# - disputes
# - transactions
# - ratings

# Migrate existing orders (if any)
# Add default values for new fields
```

### 2. Environment Variables
```env
# Add to .env.local and Vercel

# Escrow settings
PLATFORM_COMMISSION_RATE=0.05  # 5%
DEFAULT_DELIVERY_FEE=20        # GHS 20
AUTO_CONFIRM_HOURS=4           # 4 hours

# Cron job settings
CRON_AUTO_CONFIRM_INTERVAL=*/15 * * * *  # Every 15 min
CRON_COURIER_ASSIGN_INTERVAL=*/5 * * * *  # Every 5 min
```

### 3. Vercel Deployment
```bash
cd ghana-marketplace

# Test build locally
npm run build

# Deploy to production
vercel --prod

# Set environment variables in Vercel dashboard
```

### 4. Set Up Cron Jobs
Use Vercel Cron or external service (e.g., cron-job.org):
```
GET https://your-app.vercel.app/api/cron/auto-confirm
GET https://your-app.vercel.app/api/cron/assign-couriers
```

---

## 💰 PRICING CONFIGURATION

**Current Fee Structure:**
- Platform commission: 5% of item price
- Delivery fee: GHS 20 flat rate
- Courier gets: 100% of delivery fee
- Seller gets: 95% of item price

**Example:**
```
Item price: GHS 100
Delivery fee: GHS 20
Total paid by buyer: GHS 120

Distribution on completion:
- Platform: GHS 5 (commission)
- Courier: GHS 20 (delivery fee)
- Seller: GHS 95 (item price - commission)
```

---

## 🎯 PRIORITY IMPLEMENTATION ORDER

### Week 1: Core Escrow & Verification
1. ✅ Database models (DONE)
2. ✅ Utility functions (DONE)
3. Escrow API routes
4. Pickup verification API
5. Delivery verification API
6. Update order creation flow

### Week 2: Courier & Confirmations
7. Courier assignment logic
8. Courier dashboard
9. Confirmation API
10. Auto-confirmation cron job
11. Status timeline component

### Week 3: Disputes & Admin
12. Dispute creation API
13. Dispute form component
14. Admin dispute panel
15. Resolution logic
16. Penalty system

### Week 4: Ratings & Polish
17. Rating system APIs
18. Rating modals
19. Courier profiles
20. Transaction ledger view
21. Testing & bug fixes

---

## 📚 ADDITIONAL RESOURCES

### Sample API Request/Response

**Pickup Verification:**
```json
POST /api/verification/pickup

Request:
{
  "orderId": "order123",
  "pickupCode": "123456",
  "photos": ["url1.jpg", "url2.jpg", "url3.jpg"],
  "gpsCoordinates": {
    "latitude": 5.6037,
    "longitude": -0.1870,
    "accuracy": 10
  }
}

Response:
{
  "success": true,
  "message": "Pickup verified successfully",
  "verification": {
    "id": "ver123",
    "orderId": "order123",
    "type": "pickup",
    "confirmed": true,
    "timestamp": "2024-11-26T20:00:00Z"
  },
  "order": {
    "id": "order123",
    "status": "picked-up"
  }
}
```

**Dispute Resolution:**
```json
PUT /api/dispute/resolve

Request:
{
  "disputeId": "disp123",
  "decision": "refund-buyer",
  "refundAmount": 120,
  "penaltyApplied": {
    "userId": "seller123",
    "type": "strike",
    "reason": "Item not as described"
  },
  "notes": "Item significantly different from photos"
}

Response:
{
  "success": true,
  "dispute": {
    "id": "disp123",
    "status": "resolved-refund",
    "resolvedAt": "2024-11-26T20:00:00Z"
  },
  "transactions": [
    {
      "id": "txn1",
      "type": "refund",
      "amount": 120,
      "toUserId": "buyer123",
      "status": "completed"
    }
  ]
}
```

---

## ✅ SUMMARY

### What's Complete:
- ✅ All TypeScript types defined
- ✅ All database models created
- ✅ Utility functions for verification & calculations
- ✅ Foundation ready for implementation

### What's Next:
- Implement API routes (15-20 routes)
- Build UI components (8-10 components)
- Update order flow
- Create admin panels
- Set up cron jobs
- Test complete flow
- Deploy to production

### Estimated Time to Complete:
- **Core Features:** 2-3 weeks
- **Full System:** 3-4 weeks
- **With Testing:** 4-5 weeks

---

## 🆘 NEED HELP?

For implementation questions:
1. Check this document for specifications
2. Review the database models in `models/`
3. See utility functions in `lib/utils/verification.ts`
4. Follow the API examples above

---

**🇬🇭 Building Trust in Ghana's Marketplace!**

🤖 *Upgrade designed with Claude Code*
