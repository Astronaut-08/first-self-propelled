import style from './Question.module.css'
import QuestionBlock from '../QuestionBlock/QuestionBlock'
import { useState, useEffect } from 'react'
import { getQuestions } from '../../api/app-api'

const Question = () => {
    const [faqs, setFaqs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getQuestions()
                setFaqs(data)
            } catch (e) {
                console.error('Не вдалося завантажити запитання', e)
            } finally {
                setLoading(false)
            }
        }
        fetchQuestions()
    }, [])


    return (
        <section className={style['faq-page']} id='faq'>
            <div className={style['faq-header']}>
                <h2 className={style['faq-main-title']}>Запитання</h2>
                <p className={style['faq-subtitle']}>Знайди відповіді на питання про службу в дивізіоні.</p>
            </div>
            
            <div className={style['faq-list-wrapper']}>
                {loading ? <p className={style['loading']}>Завантаження...</p> : <QuestionBlock faq={faqs}/>}
            </div>
            
            <div className={style['faq-cta']}>
                <h3 className={style['faq-cta-title']}>Ще є питання?</h3>
                <p className={style['faq-cta-subtitle']}>Зв'яжись з нами для детальної консультації.</p>
                <a href='#form' className={style['faq-cta-button']}>Написати</a>
            </div>
        </section>
    )
}

export default Question