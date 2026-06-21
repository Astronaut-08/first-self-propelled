import {Create, SimpleForm, TextInput, BooleanInput} from 'react-admin'

const VacancyCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source='title' label='Назва' fullWidth required />
                <TextInput source='desctiption' label='Опис' fullWidth multiline rows={4} />
                <BooleanInput source='is_active' label='Статус' defaultValue={true} />
            </SimpleForm>
        </Create>
    )
}

export default VacancyCreate
