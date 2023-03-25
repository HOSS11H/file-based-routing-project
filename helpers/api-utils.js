import axios from "axios";

export async function getAllEvents() {
    const events = await axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/events.json`);
    const eventsArray = [];

    for (const key in events.data) {
        eventsArray.push({
            id: key,
            ...events.data[key]
        })
    }

    return eventsArray;
}

export async function getFeaturedEvents() {
    const events = await getAllEvents();

    return events.filter( event => event.isFeatured );
}