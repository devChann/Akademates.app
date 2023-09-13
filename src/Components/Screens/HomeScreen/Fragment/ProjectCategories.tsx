import React from 'react'
import styled from 'styled-components';
const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-21xl);
  font-size: var(--heading-04-size);
  color: var(--on-surface);
  margin-bottom:25px;
`;
const Titles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left:5rem;
  padding-right:5rem;
  padding-top:2rem;
`;
const Subtitles = styled.div`
  height: 88px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
const SmallToMedium = styled.b`
  position: relative;
  line-height: 44px;
`;
const InnerSubTitles = styled.div`
  position: relative;
  font-size: var(--body-02-size);
  line-height: 28px;
  color: var(--secondary);
  display: inline-block;
  width: 708px;
`;
const Button = styled.div`
  border-radius: var(--br-9xs);
  display: flex;
  flex-direction: row;
  padding: var(--padding-xs) var(--padding-9xl);
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-9xs);
  text-align: center;
  font-size: var(--label-large-label-size);
`;
const AllCategories = styled.b`
  position: relative;
  line-height: 26px;
  text-transform: capitalize;
`;
const ArrowRightIcon = styled.img`
  position: relative;
  width: 20px;
  height: 20px;
  overflow: hidden;
  flex-shrink: 0;
`;
const ParentCategories = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    /* align-items: flex-start; */
    -webkit-box-pack: start;
    justify-content: center;
    gap: var(--gap-xl);
    font-size: var(--body-01-size);
    flex-wrap: wrap;
    padding-left: 5rem;
    padding-right: 5rem;
`;
const ProjectDivisions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-xl);
`;
const ProjectDivisionsInner = styled.div`
  border-radius: var(--br-5xs);
  background-color: var(--surface);
  box-shadow: var(--drop-small);
  width: 365px;
  display: flex;
  flex-direction: column;
  padding: var(--padding-9xl);
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-5xs);
  color: var(--on-surface1);
`;
const Job = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const ResearchPartnerships = styled.b`
  position: relative;
  line-height: 28px;
  text-transform: capitalize;
`;
const Subtitle2 = styled.div`
  position: relative;
  font-size: var(--caption-01-size);
  line-height: 22px;
  color: var(--secondary);
`;
const Explore = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-9xs);
  font-size: var(--caption-01-size);
  color: var(--color-steelblue);
`;
const Subtitle3 = styled.div`
  position: relative;
  line-height: 22px;
  text-transform: capitalize;
  font-weight: 600;
`;
const ChevronDownIcon = styled.img`
  position: relative;
  width: 12px;
  height: 13px;
  overflow: hidden;
  flex-shrink: 0;
`;
const NetworkingOpportunities = styled.div`
  border-radius: var(--br-5xs);
  background-color: var(--color-steelblue);
  box-shadow: var(--drop-small);
  width: 298px;
  display: flex;
  flex-direction: column;
  padding: var(--padding-9xl);
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-5xs);
  color: var(--default-white);
`;
const Subtitle4 = styled.div`
  position: relative;
  font-size: var(--caption-01-size);
  line-height: 22px;
`;
const TitleIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-9xs);
  font-size: var(--caption-01-size);
`;
const FundingOpportunities = styled.div`
  border-radius: var(--br-5xs);
  background-color: var(--surface);
  box-shadow: var(--drop-small);
  width: 266px;
  display: flex;
  flex-direction: column;
  padding: var(--padding-9xl);
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-5xs);
`;
const Jobs2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
`;
const Div13 = styled.div`
  border-radius: var(--br-5xs);
  background-color: var(--surface);
  box-shadow: var(--drop-small);
  width: 314px;
  display: flex;
  flex-direction: column;
  padding: var(--padding-9xl);
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-5xs);
`;
const Div11 = styled.div`
  border-radius: var(--br-5xs);
  background-color: var(--surface);
  box-shadow: var(--drop-small);
  display: flex;
  flex-direction: column;
  padding: var(--padding-9xl);
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-5xs);
`;
const ProjectCategories = () => {
  return (
    <Category>
         <Titles>
          <Subtitles>
            <SmallToMedium>Browse by category</SmallToMedium>
            <InnerSubTitles>{`Recruitment Made Easy in 100 seconds `}</InnerSubTitles>
          </Subtitles>
          <Button>
            <AllCategories>all categories</AllCategories>
            <ArrowRightIcon alt="" src="/assets/arrowright.svg" />
          </Button>
        </Titles>
        <ParentCategories>
          <ProjectDivisions>
            <ProjectDivisionsInner>
              <Job>
                <ResearchPartnerships>
                  Research Partnership Facilitation
                </ResearchPartnerships>
                <Subtitle2>20 Available</Subtitle2>
              </Job>
              <Explore>
                <Subtitle3>{`Explore `}</Subtitle3>
                <ChevronDownIcon alt="" src="/chevrondown.svg" />
              </Explore>
            </ProjectDivisionsInner>
            <NetworkingOpportunities>
              <Job>
                <ResearchPartnerships>
                  Networking Opportunities
                </ResearchPartnerships>
                <Subtitle4>10 Available</Subtitle4>
              </Job>
              <TitleIcons>
                <Subtitle3>{`Explore `}</Subtitle3>
                <ChevronDownIcon alt="" src="/chevrondown1.svg" />
              </TitleIcons>
            </NetworkingOpportunities>
            <FundingOpportunities>
              <Job>
                <ResearchPartnerships>
                  Funding Opportunities
                </ResearchPartnerships>
                <Subtitle2>20 Available</Subtitle2>
              </Job>
              <Explore>
                <Subtitle3>Explore Jobs</Subtitle3>
                <ChevronDownIcon alt="" src="/chevrondown.svg" />
              </Explore>
            </FundingOpportunities>
            <FundingOpportunities>
              <Job>
                <ResearchPartnerships>
                  Innovation Workshops
                </ResearchPartnerships>
                <Subtitle2>20 Available</Subtitle2>
              </Job>
              <Explore>
                <Subtitle3>Explore Jobs</Subtitle3>
                <ChevronDownIcon alt="" src="/chevrondown.svg" />
              </Explore>
            </FundingOpportunities>
          </ProjectDivisions>
        </ParentCategories>
    </Category>
  )
}

export default ProjectCategories