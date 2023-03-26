import { useRouter } from 'next/router';
import EventsList from "../../components/Events/EventsList/EventsList";
import EventsSearch from "../../components/Events/EventsSearch/EventsSearch";
import { getAllEvents } from '../../helpers/api-utils';
import Head from 'next/head'

const Events = (props) => {

    const router = useRouter()
    const { push } = router

    const findEventsHandler = (year, month) => {
        push({
            pathname: '/events/[...filteredEvents]',
            query: {
                filteredEvents: [year, month]
            }
        })
    }

    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta name='description' content='Find a lot of great events that allow you to evolve ...' />
            </Head>
            <EventsSearch onSearch={findEventsHandler} />
            <EventsList items={props.events} />
        </div>
    )
}
export default Events;

export async function getStaticProps() {

    const events = await getAllEvents()

    return {
        props: {
            events,
        },
        // it revalidates the page every 30 seconds on The Server even after the page is built
        revalidate: 30,
    }
}