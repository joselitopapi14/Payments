# API Integration Guide

## Overview
The frontend is now ready to integrate with a real backend API. All hardcoded data has been removed, and the UI will remain empty until real API endpoints are implemented.

## Required API Endpoints

### 1. GET /api/payments
**Purpose**: Fetch all payments from database

**Request**:
```http
GET /api/payments
```

**Expected Response**:
```json
[
  {
    "id": "uuid-or-string",
    "name": "John Doe",
    "email": "john@example.com",
    "amount": 100.50,
    "status": "pending" | "processing" | "success" | "failed"
  },
  // ... more payments
]
```

**Status Codes**:
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### 2. POST /api/payments
**Purpose**: Create a new payment

**Request**:
```http
POST /api/payments
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 100.50,
  "status": "pending"
}
```

**Expected Response**:
```json
{
  "id": "newly-generated-id",
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 100.50,
  "status": "pending"
}
```

**Status Codes**:
- `201 Created` - Payment created successfully
- `400 Bad Request` - Invalid data
- `500 Internal Server Error` - Server error

---

### 3. PATCH /api/payments/[id]
**Purpose**: Update an existing payment

**Request**:
```http
PATCH /api/payments/abc123
Content-Type: application/json

{
  "name": "Jane Doe",
  "amount": 200.00,
  "status": "success"
}
```

**Expected Response**:
```json
{
  "id": "abc123",
  "name": "Jane Doe",
  "email": "john@example.com",
  "amount": 200.00,
  "status": "success"
}
```

**Status Codes**:
- `200 OK` - Payment updated successfully
- `404 Not Found` - Payment not found
- `400 Bad Request` - Invalid data
- `500 Internal Server Error` - Server error

---

### 4. DELETE /api/payments
**Purpose**: Delete multiple payments

**Request**:
```http
DELETE /api/payments
Content-Type: application/json

{
  "ids": ["abc123", "def456", "ghi789"]
}
```

**Expected Response**:
```json
{
  "success": true,
  "deleted": 3
}
```

**Status Codes**:
- `200 OK` - Payments deleted successfully
- `400 Bad Request` - Invalid data
- `500 Internal Server Error` - Server error

---

## Frontend Behavior

### Initial Load
1. App mounts → `PaymentsContext` calls `GET /api/payments`
2. While loading: Shows "Loading payments..." in table
3. Success: Displays payments in table
4. Error: Shows error message, table remains empty
5. Empty response: Shows "No payments found. Add one using the form."

### Create Payment
1. User fills form and clicks "Add Payment"
2. Button shows "Adding..." and becomes disabled
3. Sends `POST /api/payments`
4. Success:
   - New payment appears in table
   - Form resets
   - Button returns to normal
5. Error:
   - Console logs error
   - Form data preserved
   - User can retry

### Update Payment
1. User clicks ⋮ → "Edit payment"
2. Dialog opens with current data
3. User modifies fields and clicks "Save changes"
4. Button shows "Saving..." and becomes disabled
5. Sends `PATCH /api/payments/[id]`
6. Success:
   - Dialog closes
   - Table updates immediately
7. Error:
   - Dialog stays open
   - User can retry

### Delete Payment(s)
1. User selects rows via checkboxes
2. "Delete (X)" button appears
3. User clicks delete button
4. Button shows "Deleting..." and becomes disabled
5. Sends `DELETE /api/payments` with array of IDs
6. Success:
   - Rows disappear from table
   - Selection clears
   - Button returns to normal
7. Error:
   - Console logs error
   - Selection preserved
   - User can retry

---

## Error Handling

All errors are:
1. Logged to console
2. Stored in context state (`error` field)
3. Non-blocking (user can retry)

You can access error state in any component:
```tsx
const { error } = usePayments();

{error && <div className="text-red-500">{error}</div>}
```

---

## Loading States

Loading states are available throughout the app:
```tsx
const { isLoading } = usePayments();
```

Current implementations:
- Form: Buttons disabled during submit
- Table: Shows "Loading payments..." when empty and loading
- Delete: Button shows "Deleting..." during deletion
- Edit Dialog: Buttons disabled during save

---

## Type Definitions

```typescript
type Payment = {
  id: string;
  name: string;
  email: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
}

type PaymentsContextType = {
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
  addPayment: (payment: Omit<Payment, "id">) => Promise<void>;
  updatePayment: (id: string, payment: Partial<Payment>) => Promise<void>;
  deletePayments: (ids: string[]) => Promise<void>;
  refreshPayments: () => Promise<void>;
}
```

---

## Testing Without Backend

Until the API is ready, the app will:
- ✅ Load with empty table
- ✅ Show "No payments found" message
- ✅ Allow form interactions (but API calls will fail)
- ✅ Show console errors for failed requests
- ✅ Maintain proper UI states

---

## Next Steps

1. **Create API Routes** in `src/app/api/payments/`
   - `route.ts` for GET, POST, DELETE
   - `[id]/route.ts` for PATCH

2. **Connect to Database**
   - Use Prisma, Drizzle, or your preferred ORM
   - Define Payment schema/model
   - Implement CRUD operations

3. **Add Validation**
   - Server-side validation
   - Return proper error messages
   - Validate email format, amount range, etc.

4. **Enhance Error Handling**
   - Toast notifications
   - Confirmation dialogs
   - Better error messages

5. **Optional Enhancements**
   - Optimistic updates
   - Debounced search
   - Real-time updates
   - Pagination on backend
