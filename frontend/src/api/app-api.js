import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000'

export const getVacancies = async() => {
    const {data} = await axios.get('/api/v1/vacancies');
    return data;
}