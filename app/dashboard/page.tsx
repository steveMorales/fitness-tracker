"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session || !session.user) return <p>You must be logged in to view your dashboard.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome, {session.user.email}</h1>
      <p className="mt-4 text-gray-600">Your daily summary will appear here.</p>
    </div>
  );
}
