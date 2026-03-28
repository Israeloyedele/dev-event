import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Interface representing the Event document in Mongoose.
 */
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema<IEvent> = new Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: [true, "Description is required"] },
    overview: { type: String, required: [true, "Overview is required"] },
    image: { type: String, required: [true, "Image is required"] },
    venue: { type: String, required: [true, "Venue is required"] },
    location: { type: String, required: [true, "Location is required"] },
    date: { type: String, required: [true, "Date is required"] },
    time: { type: String, required: [true, "Time is required"] },
    mode: { type: String, required: [true, "Mode is required"] },
    audience: { type: String, required: [true, "Audience is required"] },
    agenda: { type: [String], required: [true, "Agenda is required"] },
    organizer: { type: String, required: [true, "Organizer is required"] },
    tags: { type: [String], required: [true, "Tags are required"] },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

/**
 * Pre-save hook for slug generation, date normalization, and time formatting.
 */
EventSchema.pre<IEvent>("save", function () {
  // Generate a URL-friendly slug from the title if it's new or modified
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove non-word characters (except space and hyphen)
      .replace(/[\s_-]+/g, "-")  // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, "");  // Remove leading and trailing hyphens
  }

  // Validate and normalize date to ISO format
  if (this.isModified("date")) {
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format. Please provide a valid date string.");
    }
    this.date = parsedDate.toISOString().split("T")[0]; // Store as YYYY-MM-DD
  }

  // Ensure time is stored in a consistent HH:mm format (basic normalization)
  if (this.isModified("time")) {
    const timeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    const match = this.time.match(timeRegex);
    if (match) {
      this.time = `${match[1]}:${match[2]}`;
    }
  }
});

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
