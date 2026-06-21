import {Edit, SimpleForm, TextInput, BooleanInput} from 'react-admin'

const VacancyEdit = () => {
    return(
        <Edit>
            <SimpleForm>
                <TextInput source='title' label='Назва' fullWidth required />
                <TextInput source='description' label='Опис' fullWidth multiline rows={4} />
                <BooleanInput source='is_active' label='Статус' />
            </SimpleForm>
        </Edit>
    )
}

export default VacancyEdit
