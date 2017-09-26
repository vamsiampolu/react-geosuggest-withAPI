import styled from 'styled-components';
/*
 * + geosuggest__input
 * */
const SimpleSuggestInput = styled.input`
  width: 100%;
  height: 4.6rem;

  border: .1rem solid #c5c5c5;
  padding: 1rem;
  border-radius: 0.3rem;

  box-shadow: 0 0 1px #3d464d;
  -webkit-transition: border 0.2s, box-shadow 0.2s;
  transition: border 0.2s, box-shadow 0.2s;
  background-color: white;

  &:focus {
    border-color:#28d3a7;
    box-shadow:0 0 0 transparent;
    outline:none;
  }
`;

export default SimpleSuggestInput;
