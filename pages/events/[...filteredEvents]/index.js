import { useRouter } from 'next/router'
import { Fragment } from 'react'
import EventsList from '../../../components/Events/EventsList/EventsList'
import ResultsTitle from '../../../components/Events/ResultsTitle/ResultsTitle'
import Button from '../../../components/UI/Button/Button'
import ErrorAlert from '../../../components/UI/ErrorAlert/ErrorAlert'
import { getFilteredEvents } from '../../../helpers/api-utils'

const FilteredEvents = (props) => {
    const {hasError, events, numMonth, numYear} = props; 

    if (hasError) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p className='center'>Invalid URL</p>
                </ErrorAlert>
                <div className='center' >
                    <Button link='/events'>Show all events</Button>
                </div>
            </Fragment>
        )
    }

    /* if (!filteredEvents) {
        return <p className='center'>Loading ...</p>
    } */

    if (events.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p className='center'>No events found</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show all events</Button>
                </div>
            </Fragment>
        )
    }
    const date = new Date(numYear, numMonth - 1)

    return (
        <div>
            <ResultsTitle date={date} />
            <EventsList items={events} />
        </div>
    )
}
export default FilteredEvents;

export async function getServerSideProps(context) {
    const { params } = context

    const { filteredEvents } = params

    const selectedYear = filteredEvents[0]
    const selectedMonth = filteredEvents[1]

    const numYear = +selectedYear
    const numMonth = +selectedMonth


    if (isNaN(numYear) || isNaN(numMonth) || numYear < 2021 || numYear > 2022 || numMonth < 1 || numMonth > 12) {
        return {
            props: { hasError: true }
        }
    }

    const fetchedEvents = await getFilteredEvents({ year: numYear, month: numMonth })

    return {
        props: {
            events: fetchedEvents,
            numYear,
            numMonth
        }
    }
}