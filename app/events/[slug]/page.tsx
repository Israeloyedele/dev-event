import { notFound } from "next/navigation";
import { IEvent } from "@/database/event.model";
import Image from "next/image";
import { EventDetailItem } from "@/components/EventDetailItem";
import { EventAgenda } from "@/components/EventAgenda";
import { EventTags } from "@/components/EventTags";
import { BookEvent } from "@/components/BookEvent";
import { getSimilarEvents } from "@/lib/actions/event.action";
import { EventCard } from "@/components/EventCard";
import { cacheLife } from "next/cache";

export default async function EventDetails({ params } : { params:Promise< { slug: string }> }) {
    'use cache';
    cacheLife('hours')

    const { slug } = await params;
    const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`);
    const { event  } : { event: IEvent } = await request.json();
    if (!event) { notFound()}

    const booking = 10;
    const similarEvents: IEvent[] = await getSimilarEvents(event.slug);

    return (
        <section id="event">
            <div className='header'>
                <h1>Event Description</h1>
                <p className={`mt-2`}>{event.description}</p>
            </div>
            <div className="details">
                <div className="content">
                    <Image className="banner" src={event.image} alt="Event Banner" height={800} width={800} />
                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{event.overview}</p>
                    </section>
                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={event.date} />
                        <EventDetailItem icon="/icons/clock.svg" alt="clock" label={event.time} />
                        <EventDetailItem icon="/icons/pin.svg" alt="location" label={event.location} />
                        <EventDetailItem icon="/icons/mode.svg" alt="mode" label={event.mode} />
                        <EventDetailItem icon="/icons/audience.svg" alt="audience" label={event.audience} />
                    </section>
                    <EventAgenda agendaItems={event.agenda} />

                    <section>
                        <h2>About the Organizer</h2>
                        <p>{event.organizer}</p>
                    </section>
                    <EventTags tags={event.tags} />
                </div>

                <aside className='booking'>
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {
                            booking > 0 ? <p className="text-sm">Join {booking} people who have already booked their spot.</p>
                                : <p className="text-sm">Be the first to book a spot.</p>
                        }
                        <BookEvent eventId={event._id.toString()} slug={event.slug} />
                    </div>
                </aside>
            </div>

            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents?.map((similarEvent: IEvent) => <EventCard key={similarEvent.title} {...similarEvent} />)}
                </div>
            </div>
        </section>
    )
}