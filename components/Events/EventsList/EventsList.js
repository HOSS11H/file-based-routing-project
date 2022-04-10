import EventItem from "../EventItem/EventItem";
import classes from './EventsList.module.css';

const EventsList = ( props ) => {
    const { items } = props;
    return (
        <ul className={classes.list}>
            {items.map( ( event, index ) => {
                return (
                    <EventItem key={event.id} item={event}></EventItem>
                )
            })}
        </ul>
    )
}
export default EventsList;