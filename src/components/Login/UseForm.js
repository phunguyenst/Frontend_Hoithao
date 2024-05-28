import {useState, useEffect} from 'react'
import AuthService from '../../services/auth.service';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

const UseForm = (callback, validate) => {

    let history = useHistory();
    const [values, setValues] =useState({
        TenTaiKhoan:'',
        email:'',
        password:'',
        password2:''
    })

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
        if(values.TenTaiKhoan !=="" && values.email!=="" && values.password!=="" && values.password2!==""){
            AuthService.signup({
                TenTaiKhoan: values.TenTaiKhoan,
                email: values.email,
                password: values.password
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.error('Error during signup:', error);
                alert('Server error occurred during signup.');
                
            });
        }
    }
    
    // const handleSubmit = e => {
    //     e.preventDefault();
    //     setErrors(validate(values));
    //     setIsSubmitting(true);
    //     if(values.TenTaiKhoan !=="" && values.email!=="" && values.password!=="" && values.password2!==""){
    //         AuthService.signup({
    //             TenTaiKhoan: values.TenTaiKhoan,
    //             email: values.email,
    //             password: values.password
    //         }).then(response => {
    //             alert('Đăng ký thành công!');
    //             console.log(response.data);
    //             if (response.data.signup === true) {
    //                 // Handle successful signup here
    //                 history.push('/');
    //             }
    //         }).catch(error => {   
    //             console.error('Lỗi trong khi đăng ký:', error);
    //             alert('Có lỗi xảy ra. Vui lòng thử lại.');
    //         });
    //     }
    // }

    useEffect(
        () => {
          if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
          }
        },
        [errors]
      );
    return {
        handleChange, values, handleSubmit, errors
    };
}
export default UseForm
