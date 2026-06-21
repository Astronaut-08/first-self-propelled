import {List, Datagrid, TextField, DateField} from 'react-admin'

const ApplicationList = () => {
    return (
        <List 
        sort={{field: 'id', order: 'DESC'}}
        hasCreate={false}
        >
            <Datagrid 
            rowClick='show'
            bulkActionButtons={false}
            >
                <TextField source='id' label='ID' />
                <DateField source='created_at' label='Дата' showTime />
                <TextField source='name' label="Ім'я" />
                <TextField source='phone' label='Номер телефону' />
                <TextField source='vacancy_id' label='ID вакансії' />
            </Datagrid>
        </List>
    )
}

export default ApplicationList
