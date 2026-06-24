import style from './HelpSection.module.css'
import Image from '../Image/Image'
import tumbleweed from '../../assets/Tumbleweed_rolling.webp'
import { useState, useEffect } from 'react'
import { getFundraisers } from '../../api/app-api'


const HelpSection = ({actualHelp}) => {
    const [fundraisers, setFundraisers] = useState([])

    useEffect(() => {
        const fetchFundraiser = async () => {
            try {
                const data = await getFundraisers()
                setFundraisers(data)
            } catch (e) {
                console.log(e)
            }
        }
    }, [])

    return (
        <section id='help' className={style['helpSection']}>
            <div className={style['headerContainer']}>
                <h2 className={style['title']}>ДОПОМОГА</h2>
                <p className={style['subtitle']}>Не готовий вступати до лав чи хочеш бути причетним до перемоги, цей розділ для тебе!</p>
            </div>

            <div className={style['contentContainer']}>
                <div className={style['imageWrapper']}>
                    <Image url={fundraisers.length > 0 ? '' : tumbleweed} className={style['helpImage']} />
                </div>

                <div className={style['textContainer']}>
                    <h3 className={style['contentTitle']}>{fundraisers.length > 0 ? 'Назва необхідного': 'Наразі немає актуальних зборів!'}</h3>
                    {fundraisers.length > 0 && (
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
