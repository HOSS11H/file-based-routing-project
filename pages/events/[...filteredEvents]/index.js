import { useRouter } from 'next/router'
import { Fragment } from 'react'
import EventsList from '../../../components/Events/EventsList/EventsList'
import ResultsTitle from '../../../components/Events/ResultsTitle/ResultsTitle'
import Button from '../../../components/UI/Button/Button'
import ErrorAlert from '../../../components/UI/ErrorAlert/ErrorAlert'
import { getFilteredEvents } from '../../../dummy-data'

const FilteredEvents = () => {

    const router = useRouter()

    const { filteredEvents } = router.query

    if (!filteredEvents) {
        return <p className='center'>Loading ...</p>
    }

    const selectedYear = filteredEvents[0]
    const selectedMonth = filteredEvents[1]

    const numYear = +selectedYear
    const numMonth = +selectedMonth

    if (isNaN(numYear) || isNaN(numMonth) || numYear < 2021 || numYear > 2022 || numMonth < 1 || numMonth > 12) {
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

    const fetchedEvents = getFilteredEvents({ year: numYear, month: numMonth })

    if (!filteredEvents || fetchedEvents.length === 0) {
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
            <EventsList items={fetchedEvents} />
        </div>
    )
}
export default FilteredEvents;