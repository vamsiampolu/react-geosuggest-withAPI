import styled from 'styled-components';

/*
 * classNames used by SuggestItem:
 *  + geosuggest__item
 *  {
 *     font-size: 18px;
       font-size: 1rem;
       padding: .5em .65em;
       cursor: pointer;
       :hover, :focus {
        background: #f5f5f5;
       }
 *  }
 *  + goesuggest__item--active
 *  {
      background: #267dc0;
      color: #fff;
      :hover, :focus {
        background: #ccc;
      }
 *  }

 *  + geosuggest__item__matched-text
 *  + custom className
 *  + custom activeClassName
 *  + isActive
*/
const SimpleSuggestItem = styled.li`
  font-size: 18px;
  padding: 0.5em 0.65em;
  cursor: pointer;
  background: ${props => (props.active ? '#f5f5f5' : '')};
  color: ${props => (props.active ? '#fff' : '')};
  &:hover {
    background: ${props => (props.active ? '#ccc' : ' #f5f5f5')};
  }

  &:focus {
    background: ${props => (props.active ? '#ccc' : ' #f5f5f5')};
  }
`;

export default SimpleSuggestItem;
