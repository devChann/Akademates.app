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


interface UserTypes {
  username: string;
  password: string;

}

  	
export const Sign: React.FC<{}> = () => {
  const  growl = React.useContext(GrowlContext)
  const defaultSettings: UserTypes = { username: '', password:'' };

  const  login = (values:UserTypes)=>{

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
            We are happy to  have you onboard, create account and
           access special membership benefits. 
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
            <h2 className='login-header-title'>Register</h2>
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
                <button className='login-button' type="submit">Register</button>
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