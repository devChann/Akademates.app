import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css'
import GrowlContext from '../../../configs/growlContext';
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import Footer from '../HomeScreen/Fragment/Footer';
import axios from 'axios';
import getFullUrl from '../../../configs/axios-custom';
import {Password} from  'primereact/password'
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
  line-height: 21.5px;
  font-weight: 500;
  color: var(--color-black);
`;
const Span = styled.span`
  color: #db4444;
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
  @media(max-width: 768px) {
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
      text-decoration:none !important;
      text-transform:none !important;
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
  width: 448px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: var(--gap-5xl);
  @media (max-width: 768px) {
    width:auto;
  }
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
  }
`;
const Frame = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 69px;
  margin-top:90px;
`;

export const Login: React.FC<{}> = () => {
 const [isloading, setisloading] = React.useState(false);
  const [username,setUseName] =  React.useState("");
  const [password,setPassword] =  React.useState("")
  const growl =  React.useContext(GrowlContext)
  const navigate =  useNavigate()
  const handleLogin = ()=>{
    if (password === "" || username ==="") {
      growl.current.show({
        severity:"error",
        summary:"Auth values cannot be empty"
     })
     return
    }
    axios.post(getFullUrl('/api/auth/login'), {
      Email: username,
      Password : password, 
    })
    .then(function (response) {
      console.log(response.data)
      growl.current.show({
        severity:"success",
        summary:"Account created successfully"
     })

       window.localStorage.setItem("refreshToken",JSON.stringify(response.data));
      navigate('/workspace/cockpit')  
    })
    .catch(function (error) {
      growl.current.show({
        severity:"error",
        summary:"Invalid credentials"
      })
    });
  }
  return (
    <>
     <Frame>
        <FormLogin>
          <Content>
            <Heading>Sign In</Heading>
            <HeadingInner>login to access this website</HeadingInner>
            <FormContainer>
              <Details>
                <FormWrapper>
                  <UserDetailsContainer>
                    <UsernameOrEmailContainer>
                      <span>Username or email address</span>
                      <Span>*</Span>
                    </UsernameOrEmailContainer>
                    <Component>
                      <InputText value={username} onChange={(e)=>setUseName(e.target.value)}/>
                    </Component>
                  </UserDetailsContainer>
                  <UserDetailsContainer>
                    <UsernameOrEmailContainer>
                      <span>Password</span>
                      <Span2>*</Span2>
                    </UsernameOrEmailContainer>
                    <Component>
                      <Password feedback={false}  style={{width:"100%"}} toggleMask type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </Component>
                  </UserDetailsContainer>
                </FormWrapper>
              
              </Details>
            </FormContainer>
          </Content>
          <Buttons>
            <Button1>
              <PostJob onClick={handleLogin}>Login</PostJob>
            </Button1>
          </Buttons>
        </FormLogin>
      </Frame>
    <Footer />
    </>
   
  );
};
{/* <div className='main'>
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
</div> */}




{/* <GoogleWrapper>
<Google>
  <HelpCircleIcon src='/assets/google.svg' alt="" />
  <ContinueWithGoogle>Continue with Google</ContinueWithGoogle>
</Google>
</GoogleWrapper> */}


{/* <OrLoginWithSocial>
              <OrLoginWithSocialChild />
                or sign in with
              <OrLoginWithSocialChild />
            </OrLoginWithSocial> */}


{/* <CreateForgot>
<Option1>
  <Select>
    <SelectChild />
  </Select>
  <Loginregister>Remember me</Loginregister>
</Option1>
<ForgotPassword>Forgot password?</ForgotPassword>
</CreateForgot> */}