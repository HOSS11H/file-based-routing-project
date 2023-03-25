import EventsList from "../components/Events/EventsList/EventsList";
import { getFeaturedEvents } from "../helpers/api-utils";

const Home = ( props ) => {

    return (
        <EventsList items={props.featuredEvents} />
    )
}
export default Home;

export async function getStaticProps() {

    const featuredEvents = await getFeaturedEvents()

    return {
        props: {
            featuredEvents,
        },
        // it revalidates the page every 30 seconds on The Server even after the page is built
        revalidate: 30,
    }
}