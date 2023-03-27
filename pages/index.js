import EventsList from "../components/Events/EventsList/EventsList";
import { getFeaturedEvents } from "../helpers/api-utils";
import Head from 'next/head';

const Home = (props) => {

    return (
        <>
            <Head>
                <title>NextJS Events</title>
                <meta name='description' content='Find a lot of great events that allow you to evolve ...' />
            </Head>
            <EventsList items={props.featuredEvents} />
        </>
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