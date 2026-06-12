import style from './TextAbout.module.css'

const TextAbout = ({titleText, descriptionText, className}) => {
    return (
        <div className={className}>
            <h2 className={style['content-title']}>{titleText}</h2>
            <p className={style['content-description']}>{descriptionText}</p>
        </div>
    )
}

export default TextAbout
