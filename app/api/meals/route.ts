import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import Meal from "@/models/Meal";
import { getServerSession } from "next-auth";

export async function GET() {
  await connectDB();
  const session = await getServerSession();

  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const meals = await Meal.find({ userId: session.user.id });
  return NextResponse.json(meals);
}

export async function POST(req: Request) {
  await connectDB();
  const session = await getServerSession();

  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  data.userId = session.user.id;

  const meal = await Meal.create(data);
  return NextResponse.json(meal);
}