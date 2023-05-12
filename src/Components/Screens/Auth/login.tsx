import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import { Button } from 'primereact/button';
import './auth.css'
import { Link } from 'react-router-dom';
import { NavHeader } from '../../Navigation/Header';
import getFullUrl from '../../../configs/axios-custom';
import axios from 'axios';
import GrowlContext from '../../../configs/growlContext';
import { ProgressBar } from 'primereact/progressbar';
import { GoogleLogin } from '@react-oauth/google';
interface UserTypes {
  username: string;
  password: string;
}
export const Login: React.FC<{}> = () => {
 let navigate = useNavigate();
 const [isloading, setisloading] = React.useState(false);
 const growl = React.useContext(GrowlContext);
  const defaultSettings: UserTypes = { username: '', password:'' };
  
  const signin = (value:UserTypes	)=>{
    setisloading(true)
    axios.post(getFullUrl('/api/auth/login'), {
      Email: value.username,
      Password : value.password, 
    })
    .then(function (response) {  
        console.log(response)
       window.localStorage.setItem("refreshToken",JSON.stringify(response.data))
       setisloading(false)
       navigate('/dashboard') 
    })
    .catch(function (error) {
      growl.current.show({
        severity:"error",
        summary:"Wrong credentials"
     }) 
     setisloading(false)
    });
  }

  const handleSuccess = (res:any) => {}
  const handleFailure = ()=>{}
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
            Welcome,
          </p>
          <p className="login-info-content">
           Create account or login to access this  website
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
            <h2 className='login-header-title'>Sign in</h2>
            <Formik
          initialValues={defaultSettings}
          onSubmit={(values, actions) => {
           signin(values)            
          }}
          >
            <Form>
            <div className='form-container'>
            <label htmlFor="firstName" className='login-field-labels'>
                <i className="pi pi-user icons">
                  <span className='icons-text'>Email</span>
                </i>
              </label>
              <Field  id="username" name="username" placeholder="username" />
            </div>

              <div className="form-container">
              <label htmlFor="Password" className='login-field-labels'>
                <i className="pi pi-lock icons">
                  <span className='icons-text'>Password</span>  
                </i></label>
                <Field type="password" id="password" name="password" placeholder="password" />
              </div>
              <div className='inner-footer'>
                <button className='login-button' type="submit">Submit</button>
                <GoogleLogin
                    onSuccess={(res:any)=>handleSuccess(res)}
                    onError={()=>handleFailure}
                  />
                <p><a href=''>Forgot Password</a></p>
              </div>
              {isloading &&(<ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>)}
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