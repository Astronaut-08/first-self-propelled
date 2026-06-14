import style from './JoinUs.module.css'
import InfoForJoin from '../InfoForJoin/InfoForJoin'
import JoinForm from '../JoinForm/JoinForm'

const JoinUs = () => {
    return (
        <div className={style['join-section']}>
            <InfoForJoin />
            <JoinForm onAddRecruit={{}}/>
        </div>
    )
}

export default JoinUs