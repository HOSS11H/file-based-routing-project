import Link from 'next/link';
import classes from './EventItem.module.css';
import DateIcon from '../../Icons/DateIcon';
import AddressIcon from '../../Icons/AddressIcon';
import ArrowRightIcon from '../../Icons/ArrowRightIcon';
import Button from '../../UI/Button/Button';
import Image from 'next/image';

const EventItem = (props) => {

    const { item, firstEvent } = props;

    const { id, image, title, location, date } = item;

    const readableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const formattedAddress = location.replace(', ', '\n')

    const exploreLink = `/events/${id}`

    return (
        <li className={classes.item} >
            <Image src={`/${image}`} alt={title} width={450} height={450} priority={firstEvent} />
            <div className={classes.content}>
                <div>
                    <h2>{title}</h2>
                    <div className={classes.date} >
                        <DateIcon />
                        <time>{readableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink} >
                        <span>Explore More</span>
                        <span className={classes.icon}><ArrowRightIcon /></span>
                    </Button>
                </div>
            </div>
        </li>
    )
}
export default EventItem;