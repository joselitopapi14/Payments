import { FieldDemo } from "@/components/FieldDemo";
import { DataTable } from "@/components/data-table";

import type { Payment } from "@/data/payments/columns";
import { columns } from "@/data/payments/columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      amount: 150.00,
      status: "success",
    },
    {
      id: "489e1d42",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      amount: 250.50,
      status: "processing",
    },
    {
      id: "3u1reuv4",
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      amount: 75.25,
      status: "pending",
    },
    {
      id: "derv1ws0",
      name: "Diana Prince",
      email: "diana.prince@example.com",
      amount: 500.00,
      status: "failed",
    },
    {
      id: "5kma53ae",
      name: "Edward Norton",
      email: "edward.norton@example.com",
      amount: 325.75,
      status: "success",
    },
  ];
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="p-8 w-full h-full flex gap-8">
      <FieldDemo />
      <div className="flex-1 min-h-0">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
