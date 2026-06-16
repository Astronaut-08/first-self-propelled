import style from './HelpSection.module.css'
import Image from '../Image/Image'
import actualHelp from '../../actualHelp.json'
import tumbleweed from '../../assets/Tumbleweed_rolling.webp'

const HelpSection = ({actualHelp}) => {
    return (
        <section id='help' className={style['helpSection']}>
            <div className={style['headerContainer']}>
                <h2 className={style['title']}>ДОПОМОГА</h2>
                <p className={style['subtitle']}>Не готовий вступати до лав чи хочеш бути причетним до перемоги, цей розділ для тебе!</p>
            </div>

            <div className={style['contentContainer']}>
                <div className={style['imageWrapper']}>
                    <Image url={actualHelp ? '' : tumbleweed} className={style['helpImage']} />
                </div>

                <div className={style['textContainer']}>
                    <h3 className={style['contentTitle']}>{actualHelp ? 'Назва необхідного': 'Наразі немає актуальних зборів!'}</h3>
                    {actualHelp && (
                        <>
                        <p className={style['description']}>Опис необхідного обладнання</p>
                        <a className={style['link']}>Допомогти<span className={style['arrow']}>&gt;</span></a>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default HelpSection
