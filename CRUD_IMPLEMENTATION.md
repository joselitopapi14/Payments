# CRUD Implementation for Payments

## Overview
Complete CRUD (Create, Read, Update, Delete) implementation for Payment management system.

## Architecture

### Context Provider (`src/contexts/PaymentsContext.tsx`)
Centralized state management for all payment operations:

- **State**: Manages array of Payment objects
- **Initial Data**: 5 mock payment records
- **Functions**:
  - `addPayment(payment)` - Creates new payment with auto-generated ID
  - `updatePayment(id, fields)` - Updates specific payment by ID
  - `deletePayments(ids[])` - Deletes multiple payments by ID array

### Type Definition
```typescript
type Payment = {
  id: string;
  name: string;
  email: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
}
```

## CRUD Operations

### ✅ CREATE - Add New Payment
**Component**: `src/components/FieldDemo.tsx`

- Form with controlled inputs (name, email, amount, status)
- Validation: required fields, email format, number type
- On submit: calls `addPayment()` and resets form
- Auto-generates unique ID for new payment

### ✅ READ - Display Payments
**Component**: `src/components/data-table.tsx`

- Displays all payments from context
- Features:
  - Sorting by columns
  - Filtering by email
  - Column visibility toggle
  - Pagination
  - Row selection

### ✅ UPDATE - Edit Payment
**Component**: `src/components/EditPaymentDialog.tsx`

- Opens via "Edit payment" menu item in table actions
- Pre-fills form with current payment data
- Editable fields: name, email, amount, status (excludes ID)
- On save: calls `updatePayment(id, fields)`
- Closes dialog automatically after save

### ✅ DELETE - Remove Payments
**Component**: `src/components/data-table.tsx`

- Conditional "Delete" button appears when rows are selected
- Shows count of selected rows
- On click: calls `deletePayments(ids[])` with selected IDs
- Automatically clears selection after deletion
- Supports bulk deletion

## Component Hierarchy

```
page.tsx
├── PaymentsProvider (Context)
    ├── FieldDemo (CREATE form)
    └── DataTable (READ/DELETE)
        └── columns.tsx
            └── EditPaymentDialog (UPDATE)
```

## State Flow

1. **PaymentsContext** holds single source of truth
2. All components consume context via `usePayments()` hook
3. CRUD operations modify context state
4. React automatically re-renders affected components
5. All data changes are reflected immediately in UI

## How to Use

### Add Payment
1. Fill out form on left side
2. Click "Add Payment" button
3. Payment appears in table immediately

### Edit Payment
1. Click three dots (⋮) on any row
2. Select "Edit payment"
3. Modify fields in dialog
4. Click "Save changes"

### Delete Payment(s)
1. Check boxes next to rows to delete
2. Click "Delete" button in toolbar
3. Confirm deletion

## Notes

- All operations are in-memory (no API calls yet)
- Data resets on page refresh
- Ready for API integration - just replace context functions with fetch calls
- IDs are generated client-side with `Math.random()`

## Future Enhancements

- [ ] Persist to database/API
- [ ] Add confirmation dialogs for delete
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add toast notifications for success/error
- [ ] Add search across all fields
- [ ] Add export functionality
