import styles from './Header.module.css'
import logo from '../../assets/45logoclean.svg'
import { useState } from 'react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    return (
<>
      {/* ОСНОВНИЙ ХЕДЕР (який видно на сторінці) */}
      <header className={styles.header}>
        <a href='#main'><img src={logo} alt='logo' className={styles.logo}/></a>
        <h1 className={styles.title}>
          1 САМОХІДНИЙ АРТИЛЕРІЙСЬКИЙ ДИВІЗІОН 45 ОКРЕМОЇ АРТИЛЕРІЙСЬКОЇ БРИГАДИ ІМЕНІ ГЕНЕРАЛА МИРОНА ТАРНАВСЬКОГО
        </h1>

        {/* Кнопка-бургер (показується лише на мобільних) */}
        <button className={styles.burgerMenu} onClick={() => setIsMenuOpen(true)}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Десктопна навігація (на мобільних ховається) */}
        <nav className={styles.desktopNav}>
          <a href='#about' className={styles.button}>Про нас</a>
          <a href='#faq' className={styles.button}>Запитання</a>
          <button className={styles.button}>Допомогти підрозділу</button>
          <button className={styles['add-button']}>Долучайся</button>
        </nav>
      </header>

      {/* МОБІЛЬНЕ МОДАЛЬНЕ МЕНЮ (Оверлей, що розгортається) */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.menuOpen : ''}`}>
        
        {/* Верхня панель модалки з лого, текстом і хрестиком */}
        <div className={styles.modalHeader}>
          <img src={logo} alt='logo' className={styles.modalLogo} />
          <h2 className={styles.modalTitle}>
            1 САМОХІДНИЙ АРТИЛЕРІЙСЬКИЙ ДИВІЗІОН 45 ОКРЕМОЇ АРТИЛЕРІЙСЬКОЇ БРИГАДИ ІМЕНІ ГЕНЕРАЛА МИРОНА ТАРНАВСЬКОГО
          </h2>
          <button className={styles.closeMenu} onClick={() => setIsMenuOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Список вертикальних посилань */}
        <div className={styles.modalContent}>
          <a href='#about' className={styles.modalLink} onClick={() => setIsMenuOpen(false)}>Про нас</a>
          <a href='#faq' className={styles.modalLink} onClick={() => setIsMenuOpen(false)}>Запитання</a>
          <button className={styles.modalLink} onClick={() => setIsMenuOpen(false)}>Допомогти підрозділу</button>
          <button className={styles.modalAddButton} onClick={() => setIsMenuOpen(false)}>Долучайся</button>
        </div>
      </div>
    </>
    )
}

export default Header