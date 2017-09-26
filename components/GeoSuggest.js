import React from 'react';
import PropTypes from 'prop-types';

import GeoSuggestWrapper from './GeoSuggestWrapper';
import SuggestItem from './SuggestItem';
import SuggestList from './SuggestList';
import SuggestInput from './SuggestInput';

import { filterAllowedAtrributes } from '../utils';

const { string, number, func, bool } = PropTypes;

export default class GeoSuggest extends React.Component {
  state = {
    isSuggestsHidden: true,
    isLoading: false,
    userInput: '',
    // the 2 most important bits to move into redux
    activeSuggest: undefined,
    suggests: [
      {
        label: 'Hello, World',
        placeId: '123',
        matchedSubstrings: {
          offset: 2,  
          length: 3,
        },
      },
      {
        label: 'Hello, World 123',
        placeId: '345',
        matchedSubstrings: {
          offset: 3,
          length: 3,
        },
      },
      {
        label: 'Hello World 345',
        placeId: '567',
        matchedSubstrings: {
          offset: 2,
          length: 4,
        },
      }
    ],
  }

  componentWillUnmount() {
      clearTimeout(this.timer);
  }

  onAfterInputChange = () => {
    const { state, props } = this;
    const { onChange } = props
    const { isSuggestsHidden, userInput } = state

    if (!isSuggestsHidden) {
      this.showSuggests();
    }
    onChange(userInput);
  }

  onInputChange = userInput => {
    this.setState({ userInput }, this.onAfterInputChange);
  }

  onInputFocus = () => {
    const { onFocus } = this.props;
    onFocus();
    this.showSuggests();
  }

  onInputBlur = () => {
    const { state, hideSuggests } = this;
    const { ignoreBlur } = state;
    if (!ignoreBlur) {
      hideSuggests();
    }
  }

  onPrev = () => {
    this.activateSuggest('prev');
  }

  onNext = () => {
    this.activateSuggest('next');
  }

  onSuggestMouseDown = () => {
    this.setState({ ignoreBlur: true })
  }

  onSuggestMouseOut = () => {
    this.setState({ ignoreBlur: false })
  }

  onSuggestNoResults = () => {
    const { props, state } = this;
    const { onSuggestNoResults } = props;
    const { userInput } = state;

    onSuggestNoResults(userInput)
  }

  focus = () => {
    this.input.focus()
  }

  blur = () => {
    this.input.blur()
  }

  showSuggests = () => {
    this.search();
    this.setState({ isSuggestsHidden: false })
  }

  hideSuggests = () => {
    const { props, state } = this;
    const { userInput } = state;
    const { onBlur } = props;

    onBlur(userInput);

    // WHY IS SET TIMEOUT USED HERE(???)
    this.timer = setTimeout(() => {
      this.setState({
        isSuggestsHidden: true,
        activeSuggest: undefined,
      });
    }, 100);
  }

  // this should also live on redux if possible
  activateSuggest = direction => {
    const NEXT = 'next';
    const { showSuggests, props, state} = this;
    const { onActivateSuggest } = props
    const { isSuggestsHidden, suggests, activeSuggest } = state
    if (isSuggestsHidden) {
      showSuggests()
      return
    }

    const next = direction === NEXT
    let newActiveSuggest = null
    let newIndex = 0

    if (!activeSuggest) {
      newIndex = next ? 0 : suggests.length - 1
    } else {
      const index = suggests.findIndex(suggest => suggest === activeSuggest)
      newIndex = next ? index + 1 : index - 1
    }

    if (newIndex > 0 && newIndex < suggests.length) {
      newActiveSuggest = suggests[newIndex]
    }

    onActivateSuggest(newActiveSuggest)
    this.setState({ activeSuggest: newActiveSuggest })
  }

  selectSuggest = suggest => {
    const { onSuggestSelect } = this.props
    if (!suggest) {
      const { userInput } = this.state
      suggest = { label: userInput }
    }
    const { label, description, location } = suggest
    const userInput = typeof label === 'object' ? description : label
    this.setState({
      isSuggestsHidden: true,
      userInput
    })
    if (location) {
      this.setState({ ignoreBlur: false })
      onSuggestSelect(suggest)
    }
  }

  updateActiveSuggest = suggests => {
    const { activeSuggest } = this.state
    if (activeSuggest) {
      const newSuggest = suggests.find(item => {
        return (
          activeSuggest.placeId === item.placeId &&
          activeSuggest.isFixture === item.isFixture
        )
      })
      return newSuggest
    }
  }
  // these will just be action creators triggering API Calls in redux
  search = () => {}
  geocode = () => {}
  update = userInput => {
    const { onChange } = this.props
    this.setState({ userInput })
    onChange(userInput)
  }

  clear = () => {
    this.setState({ userInput: '' }, this.hideSuggests)
  }

  getInputRef = i => {
    this.input = i
  }

  render () {
    const {
      getInputRef,
      onNext,
      onPrev,
      onSelect,
      hideSuggests,
      onInputChange,
      onInputFocus,
      onInputBlur,
      onSuggestNoResults,
      onSuggestMouseDown,
      onSuggestMouseOut,
      onSuggestSelect
    } = this

    const {
      label,
      ignoreTab,
      isHighlightMatch,
      onKeyDown,
      onKeyPress,
      minLength
    } = this.props

    const { userInput, isSuggestsHidden, suggests, activeSuggest } = this.state
    const attributes = filterAllowedAtrributes(this.props)
     const { id } = attributes

    return (<GeoSuggestWrapper>
        <div className='geosuggest__input-wrapper'>
          {label && id ? (
            <label className='geosuggest__label' htmlFor={id}>
              {label}
            </label>
          ) : null}
          <SuggestInput
            ref={getInputRef}
            value={userInput}
            onChange={onInputChange}
            onBlur={onInputBlur}
            onFocus={onInputFocus}
            onKeyDown={onKeyDown}
            onKeyPress={onKeyPress}
            onSelect={onSelect}
            onNext={onNext}
            onPrev={onPrev}
            onEscape={hideSuggests}
            {...attributes}
          />
        </div>
        <div className='geosuggest__suggests-wrapper'>
          <SuggestList
            userInput={userInput}
            highlightMatch={isHighlightMatch}
            suggests={suggests}
            activeSuggest={activeSuggest}
            onSuggestNoResults={onSuggestNoResults}
            onSuggestMouseDown={onSuggestMouseDown}
            onSuggestMouseOut={onSuggestMouseOut}
            onSuggestSelect={onSuggestSelect}
            minLength={minLength}
          />
        </div>
    </GeoSuggestWrapper>);  
  }
}

GeoSuggest.propTypes = {
  label: string,
  placeholder: string,
  threshold: number,
  minLength: number,
  ignoreTab: bool,
  isHighlightMatch: bool,
  onFocus: func,
  onChange: func,
  onBlur: func,
  onKeyDown: func,
  onKeyPress: func, 
  onActivateSuggest: func,
  onSuggestSelect: func,
  onSuggestNoResults: func,
};

GeoSuggest.defaultProps = {
  label: '',
  placeholder: 'Search Places',
  isHighlightMatch: true,
  minLength: 1,
  onFocus: () => {}, 
  onChange: () => {},
  onBlur: () => {},
  onKeyDown: () => {},
  onKeyPress: () => {},
  onActivateSuggest: () => {},
  onSuggestSelect: () => {},
  onSuggestNoResults: () => {},
};