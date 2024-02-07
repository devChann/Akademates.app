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
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import Footer from '../HomeScreen/Fragment/Footer';
import { Password } from 'primereact/password';

const HelpCircleIcon = styled.img`
  position: relative;
  width: 24px;
  height: 24px;
  overflow: hidden;
  flex-shrink: 0;
`;
const Loginregister = styled.div`
  position: relative;
  line-height: 22px;
`;
const Heading = styled.b`
  align-self: stretch;
  position: relative;
  line-height: 44px;
`;
const HeadingInner = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 17px;
  line-height:32px;
  font-weight: 400;
  color: var(--color-black);
`;
const Span = styled.span`
  color: #606060;
`;
const UsernameOrEmailContainer = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 26px;
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: #121212;
  @media (max-width: 768px) {
      text-align:center;
  }
`;


const Component = styled.div`
  width:100%;
  input{
      align-self: stretch;
      border-radius: var(--br-9xs);
      background-color: var(--white);
      border: 1px solid var(--color-steelblue);
      display: flex;
      flex-direction: row;
      padding: var(--padding-xs) var(--padding-base);
      align-items: center;
      justify-content: flex-start;
      width:448px;
  }
  @media (max-width: 768px) {
      input{
        width:350px;
      }
  }
`;
const UserDetailsContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xs);
  margin-top:1rem;
`;
const Span2 = styled.span`
  color: #eb4d4d;
`;
const FormWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xl);
`;
const SelectChild = styled.div`
  position: relative;
  border-radius: 2px;
  border: 1px solid var(--secondary);
  box-sizing: border-box;
  width: 15px;
  height: 15px;
`;
const Select = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Option1 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-9xs);
`;
const ForgotPassword = styled.div`
  position: relative;
  line-height: 22px;
  color: var(--color-steelblue);
`;
const CreateForgot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: var(--caption-01-size);
  color: var(--secondary);
  margin-top:35px;
  margin-bottom:35px;
`;
const Details = styled.div`
  /* width: 448px; */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: var(--gap-5xl);
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  font-size: var(--body-03-default-size);
  color: var(--on-surface);
`;
const Content = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-13xl);
  font-size: var(--heading-04-size);
`;
const PostJob = styled.b`
  position: relative;
  line-height: 26px;
  text-transform: capitalize;
  cursor: pointer;
`;
const Button1 = styled.div`
  border-radius: var(--br-9xs);
  background-color: var(--color-steelblue);
  width: 448px;
  display: flex;
  flex-direction: row;
  padding: var(--padding-xs) var(--padding-13xl);
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  color:white;
  @media (max-width: 768px) {
      width:auto;
  }
`;
const OrLoginWithSocialChild = styled.div`
  flex: 1;
  position: relative;
  border-top: 1px solid var(--line);
  box-sizing: border-box;
  height: 1px;
`;
const OrLoginWithSocial = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-xl);
  text-align: left;
  color: var(--secondary);
  margin-bottom:15px;
  margin-top:15px;
`;
const Buttons = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xl);
  color: var(--white);
  margin-top:25px;
`;
const ContinueWithGoogle = styled.b`
  position: relative;
  line-height: 24px;
`;
const Google = styled.div`
  align-self: stretch;
  border-radius: var(--br-80xl);
  background-color: var(--surface-color);
  border: 1px solid var(--line);
  display: flex;
  flex-direction: row;
  padding: var(--padding-xs) var(--padding-xl);
  align-items: center;
  justify-content: center;
  gap: var(--gap-xs);
`;
const GoogleWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  color: var(--on-surface);
  font-family: var(--font-nunito);
`;
const FormLogin = styled.div`
  width: 448px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xl);
  text-align: center;
  color: var(--color-steelblue);
  @media (max-width: 768px) {
      width:auto;
      padding:1rem;
  }
`;
const Frame = styled.div`
  margin-top:90px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 69px;
`;

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

  const [username,setUsername] =  React.useState<string>()
  const [password,setPassword] =  React.useState<string>()
  const [confirmpassword,setconfirmpassword] =  React.useState<string>()


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


  const  login = ()=>{
    if (!password || !username || password !== confirmpassword) {
      growl.current.show({
        severity:"error",
        summary:"check the input values"
      })
     return
    }
    axios.post(getFullUrl('/api/auth/register'), {
      Email: username,
      Password : password, 
    })
    .then(function (response) {
      navigate('/')
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
    <>
     <Frame>
        <FormLogin>
          <Content>
            <Heading>Welcome</Heading>
            <HeadingInner>We are thrilled to have you with us, sign  up now to  have to unlock exclusive membership benefits and gain access to our platform</HeadingInner>
            <FormContainer>
              <Details>
                <FormWrapper>
                  <UserDetailsContainer>
                    <UsernameOrEmailContainer>
                      <span>Username or email address</span>
                      <Span>*</Span>
                    </UsernameOrEmailContainer>
                    <Component>
                      <InputText value={username}  onChange={(e)=> setUsername(e.target.value)}/>
                    </Component>
                  </UserDetailsContainer>
                  <UserDetailsContainer>
                    <UsernameOrEmailContainer>
                      <span>Password</span>
                      <Span2>*</Span2>
                    </UsernameOrEmailContainer>
                    <Component>
                      <Password toggleMask value={password}  onChange={(e)=> setPassword(e.target.value)}/>
                    </Component>
                  </UserDetailsContainer>
                  <UserDetailsContainer>
                    <UsernameOrEmailContainer>
                      <span>Confirm Password</span>
                      <Span2>*</Span2>
                    </UsernameOrEmailContainer>
                    <Component>
                      <Password toggleMask value={confirmpassword}  onChange={(e)=> setconfirmpassword(e.target.value)} />
                    </Component>
                  </UserDetailsContainer>
                </FormWrapper>
               
              </Details>
            </FormContainer>
          </Content>
          <Buttons  onClick={login}>
            <Button1>
              <PostJob onClick={login}>Register</PostJob>
            </Button1>
          </Buttons>
         
        </FormLogin>
      </Frame>
     <Footer />
    </>
   
  );
};

// <div className='main'>
// <div className="grid">
//   <NavHeader />
// </div>
// <div>
//   <div className="grid">
//     <div className="col login-panels">
//       <div className="left-panel">
//       <p className="login-info-text">
//         Hi there,
//       </p>
//       <p className="login-info-content">
//         "Welcome! We're thrilled to have you with us, Sign up now to unlock exclusive
//         membership benefits and gain access to our platform"
//       </p>
//       <Button className="login-info-button">
//         <i className="pi pi-info-circle" style={{'fontSize': '1em'}}>
//          <a className='inline-text'>Need Help?</a> 
//           </i>
//       </Button>
//       </div>
//     </div>
//     <div className="col">
//       <div className='login-container-right'>
//       <div>
//         <p className='login-header-title'>Sign In</p>
//         <Formik
//            initialValues={defaultSettings}
//           onSubmit={(values, actions) => {
//             login(values)
//             actions.setSubmitting(false);
//            }}
//         >
//         <Form>
//         <div className='form-container'>
//         <label htmlFor="firstName" className='login-field-labels'>
//             <i className="pi pi-user icons">
//               <span className='icons-text'>Email</span>
//             </i>
//           </label>
//           <Field id="username" name="username" placeholder="username" />
//         </div>

//           <div className="form-container">
//           <label htmlFor="Password" className='login-field-labels'>
//             <i className="pi pi-lock icons">
//               <span className='icons-text'>Password</span>  
//             </i></label>
//             <Field type="password" id="password"  name="password" placeholder="password" />
//           </div>
//           <div className='inner-footer'>
//             <button className='login-button' type="submit">Sign in</button>
//             <GoogleLogin
//                 onSuccess={(res:any)=>handleSuccess(res)}
//                 onError={()=>handleFailure}
//               />
//             <p><a href=''></a></p>
//           </div>
//         </Form>
//         </Formik>
//       </div>
//       </div>
//     </div>
//   </div>
 
// </div>
// </div>

/* <CreateForgot>
                  <Option1>
                    <Select>
                      <SelectChild />
                    </Select>
                    <Loginregister>Agree to terms and conditions</Loginregister>
                  </Option1>
                  <ForgotPassword>Terms &  conditions</ForgotPassword>
                </CreateForgot> */


                /* <GoogleWrapper>
            <Google>
              <HelpCircleIcon src='/assets/google.svg' alt="" />
              <ContinueWithGoogle>Continue with Google</ContinueWithGoogle>
            </Google>
          </GoogleWrapper> */

          /* <OrLoginWithSocial>
              <OrLoginWithSocialChild />
                or sign up with
              <OrLoginWithSocialChild />
            </OrLoginWithSocial> */