import { logout } from "@/actions/auth/logout";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const result = await logout();

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: result.success },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
