import styled from 'styled-components'

const Line = styled.p`
  display: inline-block;
  padding-top: 1rem;
  margin-top: 4rem;
  font-size: 70%;

  &:before {
    content: '';
    display: block;
    border: 1px solid;
    width: 180%;
    transform: translateY(-0.5rem);
  }
`
export default () => <Line>(date and signature of student)</Line>
