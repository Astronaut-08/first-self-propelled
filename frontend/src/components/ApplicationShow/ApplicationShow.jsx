import {Show, SimpleShowLayout, TextField, DateField} from 'react-admin'

const ApplicationShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source='id' label='ID' />
                <DateField source='created_at' label='Дата' showTime />
                <TextField source='name' label="Ім'я" />
                <TextField source='phone' label='Номер телефону' />
                <TextField source='vacancy_id' label='ID вакансії' />
            </SimpleShowLayout>
        </Show>
    )
}

export default ApplicationShow
