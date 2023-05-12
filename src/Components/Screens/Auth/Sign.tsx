import * as React from 'react';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import { Button } from 'primereact/button';
import './auth.css'
import { NavHeader } from '../../Navigation/Header';
import axios from 'axios';
import GrowlContext from '../../../configs/growlContext';
import getFullUrl from '../../../configs/axios-custom';
import { CLIENT_ID } from '../../../configs/constants';
import { GoogleLogin } from '@react-oauth/google';
import { Generator } from '../../../Hooks/Generator';
import { useNavigate } from 'react-router-dom';
interface UserTypes {
  username: string;
  password: string;

}

interface GoogleAuthProps {
  credential:string;
  clientId :string;
  select_by :string
}
interface GoogleUserProfile {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}  	
export const Sign: React.FC<{}> = () => {
  const  growl = React.useContext(GrowlContext)
  const defaultSettings: UserTypes = { username: '', password:'' };
  const [User, setUser] = React.useState<GoogleAuthProps>();
  const [userProfile, setUserProfile] = React.useState<GoogleUserProfile | null >(null);
  const navigate = useNavigate()
  const handleSuccess = (response: GoogleAuthProps) => {
      console.log(response)
      if (response) {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.credential}`, {
                headers: {
                    Authorization: `Bearer ${response.credential}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
              console.log(res)
              // setUserProfile(res.data);
            })
        .catch((err) => console.log(err));
      }
  };

  const handleFailure = (error: any) => {
    console.error(error);
  };


  const  login = (values:UserTypes)=>{
    if (values.password === "" || values.username ==="") {
      growl.current.show({
        severity:"error",
        summary:"Auth values cannot be empty"
     })
     return
    }
    axios.post(getFullUrl('/api/auth/register'), {
      Email: values.username,
      Password : values.password, 
    })
    .then(function (response) {
       growl.current.show({
          severity:"success",
          summary:"Account created successfully, check your email to activate your account"
       })   
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const createUserProfile = (username:string)=>{
    const password = Generator()
    axios.post(getFullUrl('/api/auth/register'), {
      Email: username,
      Password : password, 
    })
    .then(function (response) {
       growl.current.show({
          severity:"success",
          summary:"Account created successfully"
       })
       const data = {
        Id:response.data, token:""
       }
       window.localStorage.setItem("refreshToken",JSON.stringify(data));
      navigate('/dashboard')    
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div className='main'>
    <div className="grid">
      <NavHeader />
    </div>
    <div>
      <div className="grid">
        <div className="col login-panels">
          <div className="left-panel">
          <p className="login-info-text">
            Hi there,
          </p>
          <p className="login-info-content">
            "Welcome! We're thrilled to have you with us, Sign up now to unlock exclusive
            membership benefits and gain access to our platform"
          </p>
          <Button className="login-info-button">
            <i className="pi pi-info-circle" style={{'fontSize': '1em'}}>
             <a className='inline-text'>Need Help?</a> 
              </i>
          </Button>
          </div>
        </div>
        <div className="col">
          <div className='login-container-right'>
          <div>
            <p className='login-header-title'>Sign In</p>
            <Formik
               initialValues={defaultSettings}
              onSubmit={(values, actions) => {
                login(values)
                actions.setSubmitting(false);
               }}
            >
            <Form>
            <div className='form-container'>
            <label htmlFor="firstName" className='login-field-labels'>
                <i className="pi pi-user icons">
                  <span className='icons-text'>Email</span>
                </i>
              </label>
              <Field id="username" name="username" placeholder="username" />
            </div>

              <div className="form-container">
              <label htmlFor="Password" className='login-field-labels'>
                <i className="pi pi-lock icons">
                  <span className='icons-text'>Password</span>  
                </i></label>
                <Field type="password" id="password"  name="password" placeholder="password" />
              </div>
              <div className='inner-footer'>
                <button className='login-button' type="submit">Sign in</button>
                <GoogleLogin
                    onSuccess={(res:any)=>handleSuccess(res)}
                    onError={()=>handleFailure}
                  />
                <p><a href=''></a></p>
              </div>
            </Form>
            </Formik>
          </div>
          </div>
        </div>
      </div>
     
    </div>
    </div>
  );
};