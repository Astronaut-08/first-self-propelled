import styles from './Hero.module.css'
import video from '../../assets/backgroundvideo.webm'

const Hero = () => {
    return (
        <div className={styles.hero}>
            <video autoPlay loop muted playsInline
            poster='../../assets/background.webp'
            className={styles.videoBackground}>
                <source src={video} type='video/webm'></source>
            </video>
            <h1 className={styles.title}>Зроби свій вибір сьогодні</h1>
            <a href='#form' className={styles.button}>Долучайся</a>
        </div>
    )
}

export default Hero