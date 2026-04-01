'use client'
import { FormEvent, useState } from "react";
import { bookingAction } from "@/lib/actions/booking.action";
import posthog from "posthog-js";

export function BookEvent({ eventId, slug } : { eventId: string, slug: string }){

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        const { success } = await bookingAction({ eventId, email, slug })
        if(success){
            setSubmitted(true);
            posthog.capture('event_booked', { eventId, email, slug})
        }
        else {
            console.error('Booking failed');
            posthog.captureException("Error: Booking failed.");
        }
    }

    return (
        <div id="book-event">
            { submitted ? <p className="text-sm">Thank you for signing up.</p>
            :
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email"
                               value={email}
                               id="email"
                               required
                               placeholder="Enter your email adress..."
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="button-submit">Submit</button>
                </form>
            }
        </div>
    )
}