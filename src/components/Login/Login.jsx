import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";

import "./login.scss"
import Logo from '../icons/Logo';
import { login } from '../../store/slices/authSlice';

function Login(props) {
    const dispatch = useDispatch()
    const errorMsg = useSelector(state => state.auth.error)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login(formData))
    }

    useEffect(() => {
        console.log("hdbf", errorMsg)
    }, [errorMsg])
    return (
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <Logo color={'#aedf33'} />

                <div className='form-input'>
                    <small className='error-msg'>{props.error}</small>
                    <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
                    <OutlinedInput
                        value={formData.username}
                        style={{ width: "50%" }}
                        id="outlined-adornment-password"
                        type={'text'}
                        onChange={(e) => setFormData(prev => ({ ...prev, "username": e.target.value }))}
                    // label="Username"
                    />

                </div>
                <div className='form-input'>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, "password": e.target.value }))}
                        style={{ width: "50%" }}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
                <p style={{ color: "tomato", marginTop: "16px" }}>{errorMsg}</p>
                <Button type='submit' variant="contained">Login</Button>

            </div>
            footer
        </form>
    )
}

export default Login