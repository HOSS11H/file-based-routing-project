import Link from 'next/link';
import classes from './Header.module.css';
import LocalesWidget from '../LocalesWidget/LocalesWidget';

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href='/' >Next Events</Link>
            </div>
            <nav className={classes.navigation}>
                <ul>
                    <li><Link href='/events'>Browse All Events</Link></li>
                </ul>
                <LocalesWidget />
            </nav>
        </header>
    )
}
export default Header;