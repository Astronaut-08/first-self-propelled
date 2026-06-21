import {Admin, Resource, ListGuesser, EditGuesser} from 'react-admin'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import ukrainianMessages from 'ra-language-ukrainian'
import { getVacancies } from '../../api/app-api'

const customUkrainianMessage = {
    ...ukrainianMessages,
    resources: {
        positions: {
            name: 'Посади'
        },
        questions: {
            name: 'Запитання'
        },
        fundraisers: {
            name: 'Збори'
        }
    }
}

const i18nProvider = polyglotI18nProvider(() => customUkrainianMessage, 'ua')

const AdminPanel = () => {
    return (
        <Admin basename='/admin' i18nProvider={i18nProvider}>
            <Resource name='positions' list={ListGuesser} edit={EditGuesser} />
            <Resource name='questions' list={ListGuesser} edit={EditGuesser} />
            <Resource name='fundraisers' list={ListGuesser} edit={EditGuesser} />
        </Admin>
    )
}

export default AdminPanel