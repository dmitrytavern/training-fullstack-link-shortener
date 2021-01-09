import React, {useState, useContext} from 'react'
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/auth.context";

export const AuthPage = () => {
	const auth = useContext(AuthContext)
	const { loading, error, request } = useHttp()
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const registerHandler = async () => {
		try {
			await request('/api/auth/register', 'POST', {...form})
		} catch (e) {

		}
	}

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', {...form})
			auth.login(data.token, data.userId)
		} catch (e) {

		}
	}

	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Short your link</h1>
				<div className="card darken-1">
					<div className="card-content while-text">
						<span className="card-title">Auth</span>
						<div>

							<div className="input-field">
								<input id="email" type="text" name="email" placeholder="Email" className="validate" onChange={changeHandler}/>
								<label htmlFor="email">Email</label>
							</div>

							<div className="input-field">
								<input id="password" type="password" name="password" placeholder="Password" className="validate" onChange={changeHandler}/>
								<label htmlFor="password">Password</label>
							</div>

						</div>
					</div>
					<div className="card-action">
						<button onClick={loginHandler} disabled={loading} className="btn yellow darken-4">Login</button>
						<button onClick={registerHandler} disabled={loading} className="btn">Register</button>
					</div>
				</div>
			</div>
		</div>
	)
}
