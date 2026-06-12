import style from './Question.module.css'
import QuestionBlock from '../QuestionBlock/QuestionBlock'
import faqs from '../../faqs.json'

const Question = () => {
    return (
        <>
        <section className={style['faq-page']} id='faq'>
            <div className={style['faq-header']}>
                <h2 className={style['faq-main-title']}>Запитання</h2>
                <p className={style['faq-subtitle']}>Знайди відповіді на питання про службу в дивізіоні.</p>
            </div>
            
            <div className={style['faq-list-wrapper']}>
                <QuestionBlock faq={faqs}/>
            </div>
            
            <div className={style['faq-cta']}>
                <h3 className={style['faq-cta-title']}>Ще є питання?</h3>
                <p className={style['faq-cta-subtitle']}>Зв'яжись з нами для детальної консультації.</p>
                <button className={style['faq-cta-button']}>Написати</button>
            </div>
        </section>
        </>
    )
}

export default Question