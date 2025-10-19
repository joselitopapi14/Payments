"use client"

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

export function FieldDemo() {
  return (
    <div className="w-full max-w-md">
      <form>
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
                />
                <FieldDescription>
                  Payment amount in USD
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="payment-status">
                  Status
                </FieldLabel>
                <Select defaultValue="pending">
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
            <Button type="submit">Add Payment</Button>
            <Button variant="outline" type="button">
              Clear
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
