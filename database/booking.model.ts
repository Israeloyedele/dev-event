import mongoose, { Schema, Document, Model, Types } from "mongoose";

/**
 * Interface representing the Booking document in Mongoose.
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema<IBooking> = new Schema(
  {
    eventId: { 
      type: Schema.Types.ObjectId, 
      ref: "Event", 
      required: [true, "Event ID is required"], 
      index: true 
    },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      lowercase: true,
      trim: true,
      validate: {
        validator: (email: string) => /^\S+@\S+\.\S+$/.test(email),
        message: (props: { value: string }) => `${props.value} is not a valid email address!`
      }
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

/**
 * Pre-save hook to verify that the referenced event exists.
 */
BookingSchema.pre<IBooking>("save", async function () {
  const eventExists = await mongoose.model("Event").exists({ _id: this.eventId });
  if (!eventExists) {
    throw new Error(`Event with ID ${this.eventId} does not exist.`);
  }
});

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
