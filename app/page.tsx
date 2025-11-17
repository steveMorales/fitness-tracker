import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to Fitness Tracker</h1>
      <p className="mt-4">Go to your <Link href="/dashboard">Dashboard</Link></p>
    </div>
  );
}