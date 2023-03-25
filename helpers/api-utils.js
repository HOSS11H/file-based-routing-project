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

export async function getEventById(id) {
    const events = await getAllEvents();
    return events.find( event => event.id === id );
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const events = await getAllEvents();
    let filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}