import {Edit, SimpleForm, NumberInput, TextInput, BooleanInput} from 'react-admin'

const QuestionEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source='order' label='Порядок відображення' min={0} />
                <TextInput source='question' label='Запитання' fullWidth required />
                <TextInput source='answer' label='Відповідь' fullWidth multiline rows={6} required />
                <BooleanInput source='is_active' label='Статус' />
            </SimpleForm>
        </Edit>
    )
}

export default QuestionEdit