import { useRouter } from 'next/router';
import EventsList from "../../components/Events/EventsList/EventsList";
import EventsSearch from "../../components/Events/EventsSearch/EventsSearch";
import { getAllEvents } from "../../dummy-data";

const Events = ( ) => {

    const router = useRouter()
    const { push } = router

    const events = getAllEvents()

    const findEventsHandler = ( year, month ) => {
        push({
            pathname: '/events/[...filteredEvents]',
            query: {
                filteredEvents: [year, month]
            }
        })
    }

    return (
        <div>
            <EventsSearch onSearch={findEventsHandler} />
            <EventsList items={events} />
        </div>
    )
}
export default Events;