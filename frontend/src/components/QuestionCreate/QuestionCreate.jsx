import {Create, SimpleForm, NumberInput, TextInput, BooleanInput} from 'react-admin'

const QuestionCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <NumberInput source='order' label='Порядок відображення' min={0} defaultValue={0} />
                <TextInput source='question' label='Запитання' fullWidth required />
                <TextInput source='answer' label='Відповідь' fullWidth multiline rows={6} required />
                <BooleanInput source='is_active' label='Статус' defaultValue={true} />
            </SimpleForm>
        </Create>
    )
}

export default QuestionCreate
