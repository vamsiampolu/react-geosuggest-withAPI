import React from 'react';
import PropTypes from 'prop-types';

import SimpleSuggestInput from './SimpleSuggestInput';

import { filterAllowedAtrributes } from '../utils';
import { KEY_MAP as keyMap } from '../constants';

const { string, func, bool } = PropTypes;

export default class SuggestInput extends React.Component {
  focus = () => {
    this.input.focus();
  }

  blur = () => {
    this.input.blur();
  }

  onFocus = () => {
    this.props.onFocus();
  }

  onBlur = () => {
    this.props.onBlur();
  }

  onKeyPress = e => {
    this.props.onKeyPress(e);
  }

  onChange = e => {
    this.props.onChange(e.target.value);
  }

  onKeyDown = e => {
    const {
      onPrev,
      onNext,
      onSelect,
      onEscape,
      ignoreEnter,
      ignoreTab,
    } = this.props;

    const { which: w, shiftKey } = e;
    const key = keyMap[`${w}`];

    switch (key) {
      case 'DOWN': {
        if (!shiftKey) {
          e.preventDefault();
          onNext();
        }
        break;
      }
      case 'UP': {
        if (!shiftKey) {
          e.preventDefault();
          onPrev();
        }
        break
      }
      case 'ENTER': {
        if (ignoreEnter) {
          e.preventDefault();
        }
        onSelect();
        break;
      }
      case 'TAB': {
        if (ignoreTab) {
          onSelect();
        }
        break;
      }
      case 'ESC': {
        onEscape();
        break;
      }
      default:
        break;
    }
  }

  render() {
    const { onChange, onKeyDown, onKeyPress, onFocus, onBlur } = this;
    const { value, getInputRef, ...rest } = this.props;
    const attributes = filterAllowedAtrributes(rest);

    return (
      <SimpleSuggestInput 
        innerRef={getInputRef}
        value={value}
        onChange={onChange} 
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
        {...attributes}
      />
    );
  }
}

SuggestInput.propTypes = {
  value: string,
  onChange: func,
  onFocus: func,
  onBlur: func,
  onSelect: func,
  onEscape: func,
  onKeyPress: func,
  onKeyDown: func,
  ignoreEnter: bool,
  ignoreTab: bool,
};

SuggestInput.defaultProps = {
  value: '',
  onPrev: () => {},
  onNext: () => {},
  onFocus: () => {},
  onChange: () => {},
  onBlur: () => {},
  onKeyPress: () => {},
  onKeyDown: () => {},
  onSelect: () => {},
  onEscape: () => {}
};