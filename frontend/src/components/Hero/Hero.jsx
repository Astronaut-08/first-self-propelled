import styles from './Hero.module.css'
import video from '../../assets/backgroundvideo.webm'
import posterIng from '../../assets/background.webp'

const Hero = () => {
    return (
        <div className={styles.hero}>
            <video autoPlay loop muted playsInline
            poster={posterIng}
            className={styles.videoBackground}>
                <source src={video} type='video/webm'></source>
            </video>
            <h1 className={styles.title}>Зроби свій вибір сьогодні</h1>
            <a href='#form' className={styles.button}>Долучайся</a>
        </div>
    )
}

export default Hero