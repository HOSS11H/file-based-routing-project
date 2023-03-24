import axios from "axios";
import EventsList from "../components/Events/EventsList/EventsList";
import { getFeaturedEvents } from "../dummy-data";

const Home = ( props ) => {

    return (
        <EventsList items={props.featuredEvents} />
    )
}
export default Home;

export async function getStaticProps() {

    const events = await axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/events.json`);
    const eventsArray = [];

    for (const key in events.data) {
        eventsArray.push({
            id: key,
            ...events.data[key]
        })
    }

    const filteredEvents = eventsArray.filter( event => event.isFeatured );

    return {
        props: {
            featuredEvents: filteredEvents,
        },
        // it revalidates the page every 30 seconds on The Server even after the page is built
        revalidate: 30,
    }
}