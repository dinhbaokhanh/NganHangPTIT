import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "username") {
			setUsername(value);
		}
		if (name === "password") {
			setPassword(value);
		}
		if(name === "confirmPassword"){
			setConfirmPassword(value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newErrors = {};

		try {
			const res = await axios.post("http://localhost:8000/register", { username, password });
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
				if (nonNullErrors.confirmPassword !== undefined) {
					newErrors.confirmPassword = nonNullErrors.confirmPassword;
				}
			}
		}

		setErrors(newErrors);
	};

	return (
		<div className={`${styles.wrapper} ${styles.body}`}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.title}>Ngân Hàng Đề Thi PTIT</div>

				<div className={styles.page}>Đăng ký</div>

				<div className={styles.input_container}>
					<input
						className={styles.input}
						placeholder="Tên đăng nhập"
						name="username"
						onChange={handleChange}
					/>
					{errors.username && <div className={styles.errorMsg}>{errors.username}</div>}
					<input
						type="password"
						className={styles.input}
						placeholder="Mật khẩu"
						name="password"
						onChange={handleChange}
					/>
					{errors.password && <div className={styles.errorMsg}>{errors.password}</div>}
					<input
						type="password"
						className={styles.input}
						placeholder="Xác nhận mật khẩu"
						name="confirmPassword"
						onChange={handleChange}
					/>
					{errors.confirmPassword && <div className={styles.errorMsg}>{errors.confirmPassword}</div>}
				</div>

				<button className={styles.btn}>Đăng Ký</button>

				<Link to="/login" style={{ textDecoration: "none", color: "black" }}>
					Về trang đăng nhập
				</Link>
			</form>
		</div>
	);
};

export default Register;
