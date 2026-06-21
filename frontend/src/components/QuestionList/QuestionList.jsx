import {List, Datagrid, TextField, NumberField, BooleanField} from 'react-admin'

const QuestionList = () => {
    return (
        <List>
            <Datagrid rowClick='edit' bulkActionButtons={false}>
                <TextField source='id' label='ID' />
                <NumberField source='order' label='Порядок' />
                <TextField source='question' label='Запитання' />
                <BooleanField source='is_active' label='Статус' />
            </Datagrid>
        </List>
    )
}

export default QuestionList
