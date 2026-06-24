import style from './Footer.module.css'
import logo from '/45logoclean.svg'

const Footer = () => {
    return (
        <footer className={style['footer-section']}>
            <div className={style['main-wrapper']}>
                <div className={style['top-second-wrapper']}>
                    <a href='#main'><img src={logo} alt='logo' className={style['logo']}/></a>
                    <div className={style['contact-wrapper']}>
                        <h4 className={style['contact-title']}>Контакти</h4>
                        <a className={style['contanct-link']} href='tel: +380000000000'>
                            <svg className={style['contact-icon']} viewBox='0 0 32 32'><use href='/icons.svg#phone' /></svg>
                            +380 00 000 00 00
                        </a>
                        <a className={style['contanct-link']} href='mailto: example@gmail.com'>
                            <svg className={style['contact-icon']} viewBox='0 0 32 32'><use href='/icons.svg#mail' /></svg>
                            example@gmail.com
                        </a>
                    </div>

                    <div className={style['nav-wrapper']}>
                        <h4 className={style['nav-title']}>Навігація</h4>
                        <a href='#about' className={style['nav-link']}>Про нас</a>
                        <a href='#faq' className={style['nav-link']}>Запитання</a>
                        <a href='#help' className={style['nav-link']}>Допомогти підрозділу</a>
                        <a href='#form' className={style['nav-link']}>Долучитись</a>
                    </div>
                </div>

                <div className={style['bot-second-wrapper']}>
                    <span className={style['line']}></span>
                    <p className={style['down-text']}>©2026 1 самохідний артилерійський дивізіон. Всі права захищені.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer