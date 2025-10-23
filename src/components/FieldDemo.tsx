"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePayments } from "@/contexts/PaymentsContext"
import type { Payment } from "@/data/payments/columns"

export function FieldDemo() {
  const { addPayment, isLoading } = usePayments()
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    amount: "",
    status: "pending" as Payment["status"],
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await addPayment({
        name: formData.name,
        email: formData.email,
        amount: parseFloat(formData.amount),
        status: formData.status,
      })

      // Reset form only on success
      setFormData({
        name: "",
        email: "",
        amount: "",
        status: "pending",
      })
    } catch (error) {
      console.error("Failed to add payment:", error)
      // Error is already handled in context
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      amount: "",
      status: "pending",
    })
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>New Payment</FieldLegend>
            <FieldDescription>
              Add a new payment record to the system
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="payment-name">
                  Customer Name
                </FieldLabel>
                <Input
                  id="payment-name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <FieldDescription>
                  Full name of the customer
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="payment-email">
                  Email Address
                </FieldLabel>
                <Input
                  id="payment-email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <FieldDescription>
                  Customer's email address
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="payment-amount">
                  Amount
                </FieldLabel>
                <Input
                  id="payment-amount"
                  type="number"
                  placeholder="100.00"
                  step="50"
                  min="0"
                  required
                  className="overflow-hidden"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
                <FieldDescription>
                  Payment amount in USD
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="payment-status">
                  Status
                </FieldLabel>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      status: value as Payment["status"],
                    })
                  }
                >
                  <SelectTrigger id="payment-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription>
                  Current payment status
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit" disabled={isSubmitting || isLoading}>
              {isSubmitting ? "Adding..." : "Add Payment"}
            </Button>
            <Button variant="outline" type="button" onClick={handleClear} disabled={isSubmitting || isLoading}>
              Clear
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
