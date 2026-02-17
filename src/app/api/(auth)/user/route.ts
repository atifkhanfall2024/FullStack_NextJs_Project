import { NextRequest, NextResponse } from "next/server";
import { AuthUser } from "@/src/helpers/authuser";

export async function GET(req: NextRequest) {
  const user = await AuthUser(req); // your helper reads token cookie + verifies
  return NextResponse.json({ user });
}
