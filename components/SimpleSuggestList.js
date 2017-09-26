import styled from 'styled-components';

/*
 * + geosuggest__suggests
 * + geosuggest__suggests--hidden
 * + hiddenClassName (custom style)
* */
const SimpleSuggestList = styled.ul`
  background: #fff;
  width: 100%;
  max-height: ${props => (props.hidden ? 0 : '25em')};

  position: absolute;
  top: 4.6rem;
  left: 0;
  right: 0;
  padding: 0;
  margin-top: -1px;
  border:.1rem solid #28d3a7;
  border-width: ${props => (props.hidden ? 0 : '0.1rem')};
  border-top-width: 0;

  overflow-x: hidden;
  overflow-y: ${props => (props.hidden ? 'hidden' : 'auto')};

  list-style: none;
  z-index: 5;
  -webkit-transition: max-height 0.2s, border 0.2s;
  transition: max-height 0.2s, border 0.2s;
  font-size: 1.6rem;
`;

export default SimpleSuggestList;
