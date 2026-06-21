import {List, Datagrid, TextField, BooleanField} from 'react-admin'

const VacancyList = () => {
    return (
        <List>
            <Datagrid rowClick='edit' bulkActionButtons={false} >
                <TextField source='id' label='ID' />
                <TextField source='title' label='Назва' />
                <TextField source='description' label='Опис' />
                <BooleanField source='is_active' label='Статус' />
            </Datagrid>
        </List>
    )
}

export default VacancyList
