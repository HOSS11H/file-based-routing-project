import { useRouter } from 'next/router';
import { Fragment } from 'react';
import EventContent from '../../../components/EventDetail/event-content';
import EventLogistics from '../../../components/EventDetail/event-logistics';
import EventSummary from '../../../components/EventDetail/event-summary';
import ErrorAlert from '../../../components/UI/ErrorAlert/ErrorAlert';
import { getEventById } from '../../../dummy-data';

const SingleEvent = () => {

    const router = useRouter()

    const query = router.query;
    const { eventId } = query;

    const event = getEventById(eventId);

    if (!event) {
        return <ErrorAlert><p>No Data Found</p></ErrorAlert>
    }

    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}
export default SingleEvent;