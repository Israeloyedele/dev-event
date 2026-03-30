import { notFound } from "next/navigation";

export default async function EventDetails({ params } : { params:Promise< { slug: string }> }) {

    const { slug } = await params;
    const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`);
    const { event } = await request.json();
    if (!event) { notFound()}


    return (
        <section>

        </section>
    )
}