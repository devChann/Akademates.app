import React from 'react'
import styled from 'styled-components';
const FooterContainer = styled.div`
  background-color: var(--surface-color);
  width: 100vw;
  height: 646px;
  display: flex;
  flex-direction: column;
  padding: 0px 252px;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-21xl);
  color: var(--secondary);
  margin-top:5rem;
  @media(max-width: 768px) {
        padding:15px;
        text-align:center;
        display:flex;
        flex-direction:column;
        gap:15px;
        
  }
`;
const Logo = styled.div`
  border-bottom: 1px solid var(--line);
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  padding: var(--padding-41xl) 0px var(--padding-xl);
  align-items: flex-start;
  justify-content: space-between;
  color: var(--color-steelblue);
  .logo-inner{
    width: 149px;
    height: 34px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    
    @media (max-width: 768px) {
        width:100%;
        text-align:center;
        padding:0px;
    }
  }

`;
const SocialIconParent= styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-base);
  font-size: var(--caption-01-size);
  color: var(--on-surface);
  @media (max-width: 768px) {
        display:block;
        gap:5px;
        margin:auto;
  }
`;
const Akademates = styled.b`
  position: relative;
  line-height: 42px;
  text-transform: capitalize;
  @media (max-width: 768px) {
        margin:auto;
  }
`;
const SocialIconInner = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-xs);
`
const FacebookIcon = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
`;
const FollowUs = styled.div`
  position: relative;
  line-height: 24px;
  font-weight: 600;
  @media(max-width: 768px) {
        margin-bottom:10px;
        margin-top:25px;
  }
`;
const Menu = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 12px;
`;
const About = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xl);
`;
const Info = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xl);
`;
const Phone = styled.div`
  width: 213px;
  height: 48px;
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  padding: 0px 0px 2px;
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-start;
  gap: 17px;
  @media (max-width: 768px) {
    margin:auto;
  }
`;
const PhoneIcon = styled.img`
  position: relative;
  width: 36px;
  height: 36px;
`;
const HelpContainer = styled.div`
  position: relative;
  .inner{
    position: relative;
  }
    b{
        line-height: 26px;
        text-transform: capitalize;
    }
  p{
    margin: 0;
    font-size: var(--label-large-label-size);
    color: #1d1d1d;
  }
`;
const ShareProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xs);
  font-size: var(--caption-01-size);
  font-family: var(--headline-2);
  .share-project-info-inner{
    position: relative;
    line-height: 22px;
    display: inline-block;
    width: 340px;
  }
`;
const MapPinParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-5xs);
  color: var(--on-surface);
  .location-info{
    position: relative;
    line-height: 22px;
  }
  @media (max-width: 768px) {
    margin:auto;
  }
`;
const MapPinIcon = styled.img`
  position: relative;
  width: 16px;
  height: 16px;
  overflow: hidden;
  flex-shrink: 0;

`;
const Newsletter = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  padding: 0px var(--padding-xl) 0px 0px;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: center;
  font-size: var(--caption-01-size);
  color: var(--placehover);
`;
const Form = styled.div`
  border-radius: var(--br-5xs);
  background-color: var(--default-white);
  width: 340px;
  display: flex;
  flex-direction: row;
  padding: 0px 0px 0px var(--padding-base);
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  .email{
    position: relative;
    line-height: 22px;
  }
`;
const Wrapper = styled.div`
  border-radius: 0px var(--br-5xs) var(--br-5xs) 0px;
  background-color: var(--color-steelblue);
  display: flex;
  flex-direction: column;
  padding: 15px var(--padding-base);
  align-items: flex-start;
  justify-content: flex-start;
  img{
    position: relative;
    width: 16px;
    height: 16.01px;
  }
`;
const CopyRight = styled.div`
  border-top: 1px solid var(--line);
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  padding: var(--padding-5xs) 0px;
  align-items: center;
  justify-content: space-between;
  font-size: var(--caption-01-size);
   @media (max-width: 768px) {
    flex-direction:column;
    margin-top:15px;
  }
`;
const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-21xl);
  @media(max-width: 768px) {
        display:block;
        text-align:center;
  }
`;
const Titles = styled.div`
  position: relative;
  line-height: 22px;
`;
const Currency = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  color: var(--on-surface);
   @media (max-width: 768px) {
    margin: 20px;
    padding: 5px;
    display: flex;
    justify-content: center;
  }
`;
const FlagIcon = styled.img`
  position: relative;
  width: 20px;
  height: 15px;
`;
const English = styled.div`
  position: relative;
  line-height: 22px;
  display: inline-block;
  width: 48px;
  flex-shrink: 0;
`;
const ArrowDown20px = styled.img`
  position: relative;
  width: 12px;
  height: 12px;
`;
const Icon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Span = styled.span`
  color: var(--line);
`;
function Footer() {
  return (
    <FooterContainer>
    <Logo>
      <div className='logo-inner'>
        <Akademates>Akademates</Akademates>
      </div>
      <SocialIconParent>
        <FollowUs>Follow Us:</FollowUs>
        <SocialIconInner>
          <FacebookIcon alt="" src="/assets/facebook.svg" />
          <FacebookIcon alt="" src="/assets/linkedin.svg" />
          <FacebookIcon alt="" src="/assets/twitter.svg" />
          <FacebookIcon alt="" src="/assets/pinterest.svg" />
          <FacebookIcon alt="" src="/assets/pinterest1.svg" />
          <FacebookIcon alt="" src="/assets/pinterest2.svg" />
        </SocialIconInner>
      </SocialIconParent>
    </Logo>
    <Menu>
      <About>
        <Info>
          <Phone>
            <PhoneIcon
              alt=""
              src="/assets/vuesaxbulkcallcalling.svg"
            />
            <HelpContainer>
              <div className='inner'>{`Need help? 24/7 `}</div>
              <p>
                <b>000-000-000</b>
              </p>
            </HelpContainer>
          </Phone>
          <ShareProjectInfo>
            <div className='share-project-info-inner'>
              Share your project or venture to draw in exceptional talent,
              collaborators, and supporters
            </div>
            <MapPinParent>
              <MapPinIcon alt="" src="/assets/mappin.svg" />
              <div className='location-info'>Nairobi, Kenya</div>
            </MapPinParent>
          </ShareProjectInfo>
        </Info>
        <Newsletter>
          <Form>
            <div className='email'>akademates@info.au</div>
            <Wrapper>
              <img alt="" src="/assets/1.svg" />
            </Wrapper>
          </Form>
        </Newsletter>
      </About>
    </Menu>
    <CopyRight >
      <Left className='left'>
        <Titles>©2023 Akademates. All Rights Reserved.</Titles>
        <Currency>
          <FlagIcon alt="" src="/assets/flag.svg" />
          <English>English</English>
          <ArrowDown20px alt="" src="/assets/arrow-down-20px.svg" />
        </Currency>
      </Left>
      <Icon className='iconx'>
        <Titles>
          <span>{`Terms Of Services   `}</span>
          <Span>{`| `}</Span>
          <span>{`  Privacy Policy  `}</span>
          <Span> |</Span>
          <span> Cookie Policy</span>
        </Titles>
      </Icon>
    </CopyRight>
  </FooterContainer>
  )
}

export default Footer
