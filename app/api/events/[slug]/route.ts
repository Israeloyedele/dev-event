import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Event } from "@/database/index";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(req: NextRequest, context: RouteParams) {
  try {
    await dbConnect();

    const params = await context.params;
    let { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }
    slug = slug.trim().toLowerCase();
    const event = await Event.findOne({ slug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Event fetched successfully",
        event: event
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching event by slug:", error);

    return NextResponse.json(
      {
        message: "An unexpected error occurred while fetching the event",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
