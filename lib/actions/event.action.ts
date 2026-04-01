'use server'

import dbConnect from "@/lib/mongodb";
import { Event } from "@/database/index"

export async function getSimilarEvents(slug: string) {
    try {
        await dbConnect();
        const event = await Event.findOne({ slug });
        if (!event)  return [];

        return Event.find({ _id : { $ne: event._id}, tags: { $in: event.tags} } ).lean();

    } catch (e){
        return []
    }
}