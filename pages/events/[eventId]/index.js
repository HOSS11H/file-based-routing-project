import { Fragment } from 'react';
import EventContent from '../../../components/EventDetail/event-content';
import EventLogistics from '../../../components/EventDetail/event-logistics';
import EventSummary from '../../../components/EventDetail/event-summary';
import ErrorAlert from '../../../components/UI/ErrorAlert/ErrorAlert';
import { getEventById, getFeaturedEvents } from '../../../helpers/api-utils';
import { useRouter } from 'next/router';
import Head from 'next/head';

const SingleEvent = (props) => {
    const router = useRouter();

    if (router.isFallback) {
        return <ErrorAlert><p>Loading....</p></ErrorAlert>
    }
    if (!props.event) {
        // You can handle that in the getStaticProps function to redirect to 404 page
        return <ErrorAlert><p>No Data Found</p></ErrorAlert>
    }

    return (
        <Fragment>
            <Head>
                <title>{props.event.title}</title>
                <meta name='description' content={props.event.description} />
            </Head>
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

    if (!event) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            event
        },
        // it revalidates the page every 30 seconds to not show outdated information (also can be revalidated on the client side)
        revalidate: 30,
    }
}