import style from './AboutUs.module.css'
import TextAbout from '../TextAbout/TextAbout'
import Image from '../Image/Image'
import faceImg from '../../assets/45R50318.webp'
import gunImg from '../../assets/45R59865-2.webp'

const AboutUs = () => {
    return (
        <div className={style['content-section']}>
            <div className={style['content-row']}>
                <TextAbout 
                className={style['content-text-container']}
                titleText={'СВОБОДА ВИБУДОВУЄТЬСЯ КОЖЕН ДЕНЬ'} 
                descriptionText={'Підрозділ складається на 90% з цивільних людей. Ми вибрали цей шлях не тому, що він легкий, а тому, що він правильний. Кожен з нас розуміє, що справжня свобода потребує мужності, відповідальності та готовності стояти на передовій.'} />
                <Image className={style['content-image-container']} url={faceImg}/>
            </div>

            <div className={style['content-row']}>
                <Image className={style['content-image-container']} url={gunImg}/>
                <TextAbout 
                className={style['content-text-container']}
                titleText={'ШЛЯХ'}
                descriptionText={'Наш бойовий шлях розпочинається з оборони Кривого року 2022 року. Ми приймали активну участь у звізьненні Херсонщини під час контрнаступу. Стали на захист Лиману та Куп’янська взимку 2022-2023 років. Проходили відновлення на Чернігівщині та допомагали місцевим підрозділам в запобіганні скупчення ворога на північному кордоні. Після відновлення влітку 2024 повернутись на схід та стали на захист Торецька, забезпечили колосальні втрати ворога при штурмі міста. Сьогодні ми продовжуємо свою боротьбу на сході будучи частиною оборони не тільки Донецької області, а й частиною оборони гідного майбутнього Українського народу!'}/>
            </div>
        </div>
    )
}

export default AboutUs
