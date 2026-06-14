import style from './JoinForm.module.css'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useState } from 'react'
import {nanoid} from 'nanoid'
import * as Yup from 'yup'

const Validator = Yup.object().shape({
    name: Yup.string().required(),
    number: Yup.string().required(),
    email: Yup.string().required()
})

const JoinForm = ({onAddRecruit}) => {
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
                onAddRecruit({id: nanoid(), ...values});
                action.resetForm();
            }}>
                {({errors, touched}) => (
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
                        <Field type='text' name='time' id='times' placeholder='01/01/2026 17:00' 
                        className={`${style['input']} ${errors.time && touched.time ? style['input-error'] : ''}`}/>
                        <ErrorMessage name='time' component='span' className={style['error']}/>
                    </div>

                    <Field as='select' name='position' className={style['select']}>
                        <option value='' disabled hidden> -- Обери посаду --</option>
                    </Field>
                    <label className={style['checkbox-label']}>
                        <Field type='checkbox' name='is_accept' className={style['checkbox']}/>
                        Чи даєте ви згоду на отримання повідомлень та обробку ваших персональних даних?
                    </label>
                    
                    <button type='submit' className={style['submit-btn']}>Надіслати</button>
                </Form>
                )}

            </Formik>
        </div>
    )
}

export default JoinForm