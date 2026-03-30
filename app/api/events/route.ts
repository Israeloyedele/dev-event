import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Event } from '@/database/index'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const formData = await req.formData();
        let event;

        try {
            event = Object.fromEntries(formData.entries()) ;
        } catch (e){
            return NextResponse.json({ message: "Invalid JSON format", error: e instanceof Error ? e.message : e }, { status: 400});
        }
        const file = formData.get('image') as File;
        if (!file) {
            return NextResponse.json({ message: "Image file required" }, {status: 400});
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: "image", folder: 'DevEvent'}, (error, result) => {
                if (error) { return reject(error); }
                resolve(result);
            }).end(buffer);
        })
        event.image = (uploadResult as { secure_url: string}).secure_url;


        console.log(event);
        const createdEvent = await Event.create(event);
        return NextResponse.json({ message: "Event Listed Successfully", event: createdEvent }, {status: 201});

    } catch(e){
        console.error(e);
        return NextResponse.json({ message: 'Event Creation Failed', error: e instanceof Error ? e.message : e }, { status: 500});
    }
}

export async function GET() {
    try {
        await dbConnect();
        const events = await Event.find().sort({ createdAt: 1 });
        return NextResponse.json({ message: "Events Fetched Successfully", events }, { status: 200});

    } catch (e){
        return NextResponse.json({ message: "Invalid JSON format", error: e }, { status: 400});
    }
}


/*
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  const opts = {
    bufferCommands: false,
    ssl: true,
  };

  const mongooseInstance = await mongoose.connect(MONGODB_URI, opts);
  console.log("Connected to MongoDB (New)");
  return mongooseInstance;
}

export default dbConnect;
* */