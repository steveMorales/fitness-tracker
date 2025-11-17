import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Workout from "@/models/Workout";
import { getServerSession } from "next-auth";

export async function GET() {
  await connectDB();
  const session = await getServerSession();

  if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const workouts = await Workout.find({ userId: session.user.id });
  return NextResponse.json(workouts);
}

export async function POST(req: Request) {
  await connectDB();
  const session = await getServerSession();

  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  data.userId = session.user.id;

  const workout = await Workout.create(data);
  return NextResponse.json(workout);
}