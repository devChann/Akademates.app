import React from 'react'
import styled from 'styled-components';

const HowItWorks1 = styled.b`
  line-height: 44px;
`;
const HowItWorks = styled.p`
  margin: 0;
`;
const ATransformativeOnline = styled.p`
  margin: 0;
  font-size: var(--body-01-size);
  line-height: 35.5px;
  font-weight: 500;
`;
const HowItWorksAContainer = styled.div`
  position: relative;
  display: inline-block;
  /* width: 544px; */
`;
const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--heading-04-size);
`;
const Icon2 = styled.img`
  position: relative;
  border-radius: var(--br-80xl);
  width: 100px;
  height: 100px;
  overflow: hidden;
  flex-shrink: 0;
`;
const ConnectWithAcademic = styled.b`
  position: relative;
  line-height: 30px;
  text-transform: capitalize;
  display: inline-block;
  width: 256px;
  font-size: 15px;
  color: white;
  font-weight: 200;
`;
const Heading1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-13xl);
`;
const List = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    -webkit-box-pack: start;
    justify-content: center;
    gap: var(--gap-51xl);
    flex-flow: wrap;
  
`;
const HowItWork = styled.div`
  background-color: var(--color-steelblue);
  width: 100%;
  height: 100%px;
  display: flex;
  flex-direction: column;
  padding: 22px 0px 0px;
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-start;
  gap: 66px;
  text-align: center;
  font-size: var(--heading-06-size);
  /* margin-top:rem; */
`;
const HowItsWorks = () => {
  return (
    <HowItWork>
        <Heading>
        <HowItWorksAContainer>
            <HowItWorks>
                <HowItWorks1>How It Works</HowItWorks1>
            </HowItWorks>
            <ATransformativeOnline>
                A transformative online hub that catalyzes new connection between
                academia and industry
            </ATransformativeOnline>
        </HowItWorksAContainer>
        </Heading>
    <List>
      <Div>
        <Icon2 alt="" src="/assets/icon.svg" />
        <Title>
          <Heading1>
            <ConnectWithAcademic>
              Connect with academic and professional experts in your field.
            </ConnectWithAcademic>
          </Heading1>
        </Title>
      </Div>
      <Div>
        <Icon2 alt="" src="/assets/icon1.svg" />
        <Title>
          <Heading1>
            <ConnectWithAcademic>
              <HowItWorks>{`Discover‘Who does What Where &`}</HowItWorks>
              <HowItWorks>Wherein your field.</HowItWorks>
            </ConnectWithAcademic>
          </Heading1>
        </Title>
      </Div>
      <Div>
        <Icon2 alt="" src="/assets/icon2.svg" />
        <Title>
          <Heading1>
            <ConnectWithAcademic>
              Stay informed about events, jobs, grants, and consulting gigs.
            </ConnectWithAcademic>
          </Heading1>
        </Title>
      </Div>
      <Div>
        <Icon2 alt="" src="/assets/icon3.svg" />
        <Title>
          <Heading1>
            <ConnectWithAcademic>
              Find collaborators and specialists for idea development,
              grants,or ventures.
            </ConnectWithAcademic>
          </Heading1>
        </Title>
      </Div>
      <Div>
        <Icon2 alt="" src="/assets/icon3.svg" />
        <Title>
          <Heading1>
            <ConnectWithAcademic>
              <HowItWorks>{`Discover leading specialists `}</HowItWorks>
              <HowItWorks>for consulting or project needs.</HowItWorks>
            </ConnectWithAcademic>
          </Heading1>
        </Title>
      </Div>
      <Div>
        <Icon2 alt="" src="/assets/icon4.svg" />
        <Title>
          <Heading1>
            <ConnectWithAcademic>
              Work with a with a partnership manager to advance your
              partnership.
            </ConnectWithAcademic>
          </Heading1>
        </Title>
      </Div>
      <Div>
        <Icon2 alt="" src="/assets/icon5.svg" />
        <Title>
          <Heading1>
            <ConnectWithAcademic>
              Collaborate securely in working groups and exchange documents.
            </ConnectWithAcademic>
          </Heading1>
        </Title>
      </Div>
    </List>

  </HowItWork>
  )
}

export default HowItsWorks
