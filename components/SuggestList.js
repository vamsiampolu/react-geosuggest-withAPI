import React from 'react';
import PropTypes from 'prop-types';

import SuggestItem from './SuggestItem';
import SimpleSuggestList from './SimpleSuggestList';

const { bool, shape, string, func, array } = PropTypes;

export default class SuggestList extends React.Component {
  renderSuggestItems = () => {
    const {
      suggests,
      activeSuggest,
      userInput,
      highlightMatch,
      onSuggestMouseOut,
      onSuggestMouseDown,
      onSuggestSelect
    } = this.props;

    return suggests.map(suggest => {
      // Why is key embedded into the data structure?
      const { placeId, label, key } = suggest;
      let active = false;

      // based on isObject npm package here: https://github.com/jonschlinkert/isobject/blob/master/index.js
      if (activeSuggest != null && typeof activeSuggest === 'object' && Array.isArray(activeSuggest) === false) {
        const { placeId: activePlaceId } = activeSuggest
        if (placeId === activePlaceId) {
          active = true
        }
      }

      return (
        <SuggestItem
          key={placeId}
          active={active}
          suggest={suggest}
          userInput={userInput}
          highlightMatch={highlightMatch}
          onSelect={onSuggestSelect}
          onMouseOut={onSuggestMouseOut}
          onMouseDown={onSuggestMouseDown}
        />
      );
    });
  }

  render () {
    return (<SimpleSuggestList>{this.renderSuggestItems()}</SimpleSuggestList>);
  }
}

SuggestList.propTypes = {
  hidden: bool,
  suggests: array,
  userInput: string,
  isHighlightMatch: bool,
  isHidden: bool,
  activeSuggest: shape({
    placeId: string
  }),
  onSuggestMouseDown: func,
  onSuggestMouseOut: func,
  onSuggestSelect: func,
};

SuggestList.defaultProps = {
  userInput: '',
  hidden: true,
  suggests: [],
  activeSuggest: {},
}
