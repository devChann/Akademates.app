import React from 'react'
import styled from 'styled-components';
import { HomeTotals } from '../../../../types';
const Counter = styled.div`
  background-color: var(--color-steelblue);
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--headline-2-size);
  font-family: var(--headline-2);
`;
const Couwnter = styled.div`
  border-radius: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 40px 0px;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  gap: 180px;
  @media (max-width: 768px) {
        flex-wrap:wrap;
        justify-content:center;
        padding:10px 0px;
        gap: 10px;
        flex-direction:column;
  }
`;
const Traders = styled.div`
  border-radius: var(--br-xs);
  box-shadow: var(--drop-section);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-9xs);
  width:100%;
`;
const K = styled.b`
  position: relative;
  letter-spacing: -0.02em;
  line-height: 56px;
  text-transform: capitalize;
`;
const VenturesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  font-size: var(--body-01-size);
  font-family: var(--title);
`;
const Ventures = styled.div`
  position: relative;
  line-height: 30px;
  opacity: 0.5;
`;
const Traders1 = styled.div`
  border-radius: var(--br-xs);
  box-shadow: var(--drop-section);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-9xs);
  text-align: center;
  width:100%;
`;
const B2 = styled.b`
  position: relative;
  letter-spacing: -0.02em;
  line-height: 56px;
  text-transform: capitalize;
  display: inline-block;
  width: 191px;
`;
const GrantsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--body-01-size);
  font-family: var(--title);
`;
const CollaborationsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: var(--body-01-size);
  font-family: var(--title);
`;
const ExpertsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  font-size: var(--body-01-size);
  font-family: var(--title);
`;

interface CounterProps {
  total : HomeTotals
}
const  CounterComponent:React.FunctionComponent<CounterProps> = ({total}) =>{
  return (
   <Counter>
        <Couwnter>
          <Traders>
            <K>{total?.totalVentures}</K>
            <VenturesWrapper>
              <Ventures>Ventures</Ventures>
            </VenturesWrapper>
          </Traders>
          <Traders1>
            <B2>{total?.totalGrants}</B2>
            <GrantsWrapper>
              <Ventures>Grants</Ventures>
            </GrantsWrapper>
          </Traders1>
          <Traders>
            <K>{total?.totalconnections}</K>
            <CollaborationsWrapper>
              <Ventures>{`Collaborations `}</Ventures>
            </CollaborationsWrapper>
          </Traders>
          <Traders>
            <K>{total?.totalExperts}</K>
            <ExpertsWrapper>
              <Ventures>Experts</Ventures>
            </ExpertsWrapper>
          </Traders>
        </Couwnter>
      </Counter>
  )
}

export default CounterComponent