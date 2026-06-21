import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const getVacancies = async() => {
    const {data} = await axios.get('/api/v1/vacancies');
    return data;
}

export const getQuestions = async () => {
    const {data} = await axios.get('/api/v1/questions')
    return data
}

export const submitApplication = async (applicationData) => {
    const {data} = await axios.post('/api/v1/applications', applicationData)
    return data
} 
