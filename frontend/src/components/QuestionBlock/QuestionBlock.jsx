import style from './QuestionBlock.module.css'
import { useState } from 'react'

const QuestionBlock = ({faq}) => {
    const [isOpen, setIsOpen] = useState(null);

    const toggleItem = (index) => {
        setIsOpen(isOpen === index ? null : index)
    };
    
    return (
        <>
        <div className={style['faq-container']}>
        {faq.map((faq, index) => {
            const isCurrentOpen = isOpen === index;

            return (
                <div key={index} className={`${style['faq-item']} ${isCurrentOpen ? style['active'] : ''}`}>
                <button className={style['faq-trigger']}
                    onClick={() => toggleItem(index)}>
                    <p className={style['faq-question']}>{faq.question}</p>
                    <span className={style['faq-icon']}>+</span>
                </button>
                <div className={style['faq-collapse']}>
                    <div className={style['faq-content']}>
                        <p className={style['faq-answer']}>{faq.answer}</p>
                    </div>
                </div>
            </div>
            )
        })}
        </div>
        </>
    );
}

export default QuestionBlock