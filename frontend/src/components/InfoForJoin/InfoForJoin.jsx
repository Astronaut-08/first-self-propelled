import style from './InfoForJoin.module.css'
import icon from '../../assets/icons.svg'

const InfoForJoin = () => {
    return (
        <div className={style['recruitment-container']}>
            <h2 className={style['recruitment-title']}>Приєднайся до дивізіону</h2>
            <p className={style['recruitment-description']}>Обери посаду та залиш заявку або телефонуй вже зараз!</p>
            <div className={style['contact-row']}>
                <svg className={style['contact-icon']} viewBox='0 0 32 32'><use href={`${icon}#phone`} /></svg>
                <a href='tel:+380000000000' className={style['contact-text']}>+380 00 000 00 00</a>
            </div>
            <div className={style['contact-row']}>
                <svg className={style['contact-icon']} viewBox='0 0 32 32'><use href={`${icon}#mail`}/></svg>
                <a href='mailto:example@gmailcom' className={style['contact-text']}>example@gmail.com</a>
            </div>
        </div>
    )
}

export default InfoForJoin