import axios from 'axios'

// при пуші розкоментувати
axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}/api/v1`

// При розробці розкоментувати 
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1'

export const getVacancies = async() => {
    const {data} = await axios.get('/vacancies');
    return data;
}

export const getQuestions = async () => {
    const {data} = await axios.get('/questions')
    return data
}

export const submitApplication = async (applicationData) => {
    const {data} = await axios.post('/applications', applicationData)
    return data
} 

export const getFundraisers = async () => {
    const {data} = await axios.get('/fundraiser')
    return data
}

const apiUrl = () => {
    return axios.defaults.baseURL
}

export default apiUrl
