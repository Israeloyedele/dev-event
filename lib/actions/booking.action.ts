'use server'
import dbConnect from "@/lib/mongodb";
import { Booking } from "@/database";

export async function bookingAction({ eventId, slug, email } : { eventId: string, slug: string, email: string })  {
    try {
        await dbConnect();
        await Booking.create({ eventId, email});

        return { success: true };
    }
    catch (error) {
        console.error("Create Booking Failed", error);
        return { success: false };
    }
}