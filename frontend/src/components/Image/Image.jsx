import style from './Image.module.css'

const Image = ({ url, className, alt }) => {
    return (
        <div className={className}>
            <div className={style['content-image-wrapper']}>
                <img className={style['content-img']}
                src={url}
                width='600'
                height='600'
                loading='lazy'
                alt={alt ? alt : ''}
                />
            </div>
        </div>
    )
}

export default Image
