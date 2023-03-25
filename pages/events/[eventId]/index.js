import { Fragment } from 'react';
import EventContent from '../../../components/EventDetail/event-content';
import EventLogistics from '../../../components/EventDetail/event-logistics';
import EventSummary from '../../../components/EventDetail/event-summary';
import ErrorAlert from '../../../components/UI/ErrorAlert/ErrorAlert';
import { getEventById, getFeaturedEvents } from '../../../helpers/api-utils';

const SingleEvent = (props) => {

    if (!props.event) {
        return <ErrorAlert><p>No Data Found</p></ErrorAlert>
    }

    return (
        <Fragment>
            <EventSummary title={props.event.title} />
            <EventLogistics date={props.event.date} address={props.event.location} image={props.event.image} imageAlt={props.event.title} />
            <EventContent>
                <p>{props.event.description}</p>
            </EventContent>
        </Fragment>
    )
}
export default SingleEvent;

export async function getStaticPaths() {
    const featuredEvents = await getFeaturedEvents();
    return {
        paths: featuredEvents.map(event => ({ params: { eventId: event.id } })),
        fallback: true,
    }
}


export async function getStaticProps(context) {
    const { params } = context;
    const { eventId } = params;
    const event = await getEventById(eventId);

    return {
        props: {
            event
        }
    }
}