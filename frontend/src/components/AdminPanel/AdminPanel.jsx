import { useState, useEffect } from 'react'
import { Admin, Resource } from 'react-admin'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import ukrainianMessages from 'ra-language-ukrainian'
import dataProvider from '../../api/dataProvider'
import authProvider from '../../api/authProvider'
import VacancyList from '../VacancyList/VacancyList'
import VacancyEdit from '../VacancyEdit/VacancyEdit'
import VacancyCreate from '../VacancyCreate/VacancyCreate'
import QuestionList from '../QuestionList/QuestionList'
import QuestionEdit from '../QuestionEdit/QuestionEdit'
import QuestionCreate from '../QuestionCreate/QuestionCreate'
import ApplicationList from '../ApplicationList/ApplicationList'
import ApplicationShow from '../ApplicationShow/ApplicationShow'

const customUkrainianMessage = {
    ...ukrainianMessages,
    resources: {
        vacancies: { name: 'Посади' },
        questions: { name: 'Запитання' },
        fundraisers: { name: 'Збори' },
        applications: { name: 'Заявки' }
    },
    ra: {
        ...ukrainianMessages.ra,
        auth: {
            sign_in: 'Увійти',
            username: 'Ім\'я користувача',
            password: 'Пароль',
            sign_in_error: 'Помилка при логіні'
        }
    }
}

const i18nProvider = polyglotI18nProvider(() => customUkrainianMessage, 'ua')


const AdminPanel = () => {
    return (
        <Admin
            basename='/admin'
            i18nProvider={i18nProvider}
            dataProvider={dataProvider}
            authProvider={authProvider}
            requireAuth
        >
            <Resource
                name='vacancies'
                list={VacancyList}
                edit={VacancyEdit}
                create={VacancyCreate}
                options={{ label: 'Вакансії' }}
            />

            <Resource
                name='questions'
                list={QuestionList}
                edit={QuestionEdit}
                create={QuestionCreate}
                options={{ label: 'Запитання' }}
            />

            <Resource
                name='applications'
                list={ApplicationList}
                show={ApplicationShow}
                options={{ label: 'Заявки' }}
            />
        </Admin>
    )
}

export default AdminPanel