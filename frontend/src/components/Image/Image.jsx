import style from './Image.module.css'

const Image = ({url, className}) => {
    return (
        <div className={className}>
            <div className={style['content-image-wrapper']}>
                <img className={style['content-img']} src={url}></img>
            </div>
        </div>
    )
}

export default Image
