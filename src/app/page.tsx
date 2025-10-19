"use client";

import { FieldDemo } from "@/components/FieldDemo";
import { DataTable } from "@/components/data-table";
import { columns } from "@/data/payments/columns";
import { PaymentsProvider, usePayments } from "@/contexts/PaymentsContext";

function HomeContent() {
  const { payments } = usePayments();

  return (
    <div className="p-8 w-full h-full flex gap-8">
      <FieldDemo />
      <div className="flex-1 min-h-0">
        <DataTable columns={columns} data={payments} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <PaymentsProvider>
      <HomeContent />
    </PaymentsProvider>
  );
}
