import React, {useState} from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		const { name, value } = event.target;
        if (name === "username") {
			setUsername(value);
		}
		if (name === "password") {
			setPassword(value);
		}
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async(e) => {
		e.preventDefault();

		const newErrors = {};

		if (!formData.username) {
			newErrors.username = "Vui lòng nhập tên người dùng";
		}
		if (!formData.password) {
			newErrors.password = "Vui lòng nhập mật khẩu";
        }


        try {
			const res = await axios.post("http://localhost:8000/login", { username, password });
			const data = res.data;
			console.log(data);
			if(data.user){
				navigate('/');
			}

		} catch (error) {
			const data = error?.response?.data;
			const errors = data?.errors;
			if (errors) {
				const nonNullErrors = Object.keys(errors).reduce((acc, key) => {
					if (errors[key]) {
						acc[key] = errors[key];
					}
					return acc;
				}, {});
				if (nonNullErrors.username !== undefined) {
					newErrors.username = nonNullErrors.username;
				}
				if (nonNullErrors.password !== undefined) {
					newErrors.password = nonNullErrors.password;
				}
			}
		}

		setErrors(newErrors);
	};
    
    
    return (

        <div className={`${styles.wrapper} ${styles.body}`}>

            <form className={styles.form} onSubmit={handleSubmit}>

                <div className={styles.title}>
                    Ngân Hàng Đề Thi PTIT
                </div>

                <div className={styles.page}>
                    Đăng nhập
                </div>

                <div className={styles.input_container}>
                    <input className={styles.input} placeholder='Tên đăng nhập' name="username" value={formData.username} onChange={handleChange}/>
                    {errors.username && <div className={styles.errorMsg}>{errors.username}</div>}
                    <input type='password' className={styles.input} placeholder='Mật khẩu' name="password" value={formData.password} onChange={handleChange}/>
                    {errors.password && <div className={styles.errorMsg}>{errors.password}</div>}
                </div>

                <div className={styles.account}>

                    <Link to="/register" style={{ textDecoration: 'none', color: 'black' }} className={styles.sign_up}>
                        Đăng ký
                    </Link>

                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }} className={styles.retrieval}>
                        Quên mật khẩu
                    </Link>

                </div>                

                <button className={styles.btn}>Đăng nhập</button>

            </form>
            
        </div>
    )
}

export default Login