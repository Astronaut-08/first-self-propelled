import style from './JoinUs.module.css'
import InfoForJoin from '../InfoForJoin/InfoForJoin'
import JoinForm from '../JoinForm/JoinForm'
import { submitApplication } from '../../api/app-api'

const JoinUs = () => {
    return (
        <div className={style['join-section']}>
            <InfoForJoin />
            <JoinForm />
        </div>
    )
}

export default JoinUs