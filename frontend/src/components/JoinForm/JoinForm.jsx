import style from './JoinForm.module.css'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useState, useEffect, use } from 'react'
import {nanoid} from 'nanoid'
import * as Yup from 'yup'
import { getVacancies, submitApplication } from '../../api/app-api'
import toast from 'react-hot-toast'

const Validator = Yup.object().shape({
    name: Yup.string()
        .min(2, "Ім'я має містити щонайменше 2 символи")
        .max(50, "Ім'я занадто довге")
        .required("Введіть ваше ім'я"),
    number: Yup.string()
        .matches(/^\+?\d{10,15}$/, 'Введіть дійсний номер телефону')
        .required('Введіть номер телефону'),
    email: Yup.string()
        .email('Невійрний формат електронної адреси')
        .required('Введіть ваш email'),
    time: Yup.string().nullable(),
    is_accept: Yup.boolean()
        .oneOf([true], 'Ви повинні погодитись з умовами')
        .required("Ця умова обо'язкова")
})

const JoinForm = () => {
    const [vacations, setVacations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchVacancies = async() => {
            try {
                const data = await getVacancies();
                setVacations(data);
            }catch (e){
                setError(e);
            }finally{
                setLoading(false);
            }
            
        }
        fetchVacancies()
    }, [])
    
    const handleSubmit = async (value, action) => {
        const submissionPromise = submitApplication({
            name: value.name,
            phone: value.number,
            email: value.email,
            prefer_time: value.time,
            vacancy_id: value.position ? Number(value.position) : null
        })

        toast.promise(submissionPromise, {
            loading: 'Відбувається відправка даних, зачекайте будь ласка...',
            success: 'Дані успішно відправлено! Очікуйте дзвінка!',
            error: 'Щось пішло не так.. Спробуйте ще раз'
        })


        try {
            await submissionPromise
        } catch (e) {
            console.error(e)
        } 
    }

    return (
        <div className={style['form-wrapper']}>
            <Formik
            initialValues={{
                name: '',
                number: '',
                email: '',
                time: '',
                position: '',
                is_accept: false
            }}
            validationSchema={Validator}
            onSubmit={(values, action) => {
                handleSubmit({id: nanoid(), ...values});
                action.resetForm();
            }}>
                {({errors, touched, values}) => {
                    const selectedPosition = vacations.find(
                        (pos) => String(pos.id) === String(values.position)
                    );

                    return (
                <Form className={style['form']}>
                    <div className={style['field-group']}>
                        <label htmlFor='name' className={style['label']}>Ім’я</label>
                        <Field type='text' name='name' id='name' placeholder='Володимир' 
                        className={`${style['input']} ${errors.name && touched.name ? style['input-error'] : ''}`}/>
                        <ErrorMessage name='name' component='span' className={style['error']}/>
                    </div>

                    <div className={style['field-group']}>
                        <label htmlFor='number' className={style['label']}>Номер телефону</label>
                        <Field type='text' name='number' id='number' placeholder='+380 00 000 00 00' 
                        className={`${style['input']} ${errors.number && touched.number ? style['input-error'] : ''}`}/>
                        <ErrorMessage name='number' component='span' className={style['error']}/>
                    </div>

                    <div className={style['field-group']}>
                        <label htmlFor='email' className={style['label']}>E-mail</label>
                        <Field type='email' name='email' id='email' placeholder='example@gmail.com' 
                        className={`${style['input']} ${errors.email && touched.email ? style['input-error'] : ''}`}/>
                        <ErrorMessage name='email' component='span' className={style['error']}/>
                    </div>

                    <div className={style['field-group']}>
                        <label htmlFor='time' className={style['label']}>Коли зателефонувати?</label>
                        <Field type='datetime-local' name='time' id='time' placeholder='01/01/2026 17:00' 
                        className={`${style['input']} ${errors.time && touched.time ? style['input-error'] : ''}`}/>
                        <ErrorMessage name='time' component='span' className={style['error']}/>
                    </div>

                    <div className={style['select-wrapper']}>
                        <Field as='select' name='position' className={style['select']}>
                            <option value='' disabled hidden> -- Обери посаду --</option>
                            {vacations.map((pos) => (<option key={pos.id} value={pos.id}>{pos.title}</option>))}
                        </Field>
                    </div>

                    {selectedPosition && selectedPosition.description && (
                        <div className={style['description-wraper']}>
                            <p className={style['description-position']}>{selectedPosition.description}</p>
                        </div>
                    )}

                    <label className={style['checkbox-label']}>
                        <Field type='checkbox' name='is_accept' className={style['checkbox']}/>
                        Чи даєте ви згоду на отримання повідомлень та обробку ваших персональних даних?
                    </label>
                    <ErrorMessage name='is_accept' component='span' className={style['error']} />
                    
                    <button type='submit' className={style['submit-btn']}>Надіслати</button>
                </Form>
                )}}
            </Formik>
        </div>
    )
}

export default JoinForm