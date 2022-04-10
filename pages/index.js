import EventsList from "../components/Events/EventsList/EventsList";
import { getFeaturedEvents } from "../dummy-data";

const Home = ( ) => {

    const featuredEvents = getFeaturedEvents()

    return (
        <EventsList items={featuredEvents} />
    )
}
export default Home;