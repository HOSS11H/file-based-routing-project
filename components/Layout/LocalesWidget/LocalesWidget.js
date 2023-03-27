import Image from "next/image";
import { useRouter } from "next/router";
import classes from './LocalesWidget.module.css';
import Link from "next/link";


const LOCALES_MAP = {
    ar: {
        name: 'Arabic',
        img: {
            filename: 'flag-ar.png',
            alt: 'Egypt Flag',
        },
    },
    'en-US': {
        name: 'English',
        img: {
            filename: 'flag-en-us.jpg',
            alt: 'US Flag',
        },
    },
}

const LocalesWidget = (props) => {

    const { locale, asPath: currentPath, } = useRouter()

    const options = Object.keys(LOCALES_MAP).filter((localeKey) => localeKey !== locale)

    return (
        <div className={classes.LocalesWidget}>
            <div className={classes.LocalesWidget__language_selected}>
                <Image src={`/images/${LOCALES_MAP[locale].img.filename}`} alt={LOCALES_MAP[locale].img.alt} width={40} height={40} />
            </div>
            <div className={classes.LocalesWidget__language_options}>
                <ul className={classes.LocalesWidget__language_options_list}>
                    {options.map((localeKey) => {
                        console.log(currentPath, localeKey)
                        return (
                            <li key={localeKey} className={classes.LocalesWidget__language_option}>
                                <Link href={currentPath} locale={localeKey} >
                                    <Image src={`/images/${LOCALES_MAP[localeKey].img.filename}`} alt={LOCALES_MAP[localeKey].img.alt} width={40} height={40} />
                                    <span>{LOCALES_MAP[localeKey].name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default LocalesWidget;