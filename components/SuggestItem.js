import React from 'react';
import PropTypes from 'prop-types';

import SimpleSuggestItem from './SimpleSuggestItem';
import Bold from './Bold';

const { string, number, func, bool, array, shape } = PropTypes;

// scrollIfNeeded is used to scroll item to the center
export default class SuggestItem extends React.Component {
  componentWillReceiveProps (props, nextProps) {
    const { scrollIfNeeded } = this
    const { active } = props
    const { active: nextActive } = nextProps
    if (!active && nextActive) {
      scrollIfNeeded()
    }
  }

  onClick = e => {
    e.preventDefault()
    const { onSelect, suggest } = this.props
    onSelect(suggest)
  }

  scrollIfNeeded = () => {
    const { ref: el } = this
    const { parentElement: parent } = el
    const overTop = el.offsetTop - parent.offsetTop < parent.scrollTop
    const overBottom =
      el.offsetTop - parent.offsetTop + el.clientHeight >
      parent.scrollTop + parent.clientHeight

    if (overTop || overBottom) {
      parent.scrollTop =
        el.offsetTop -
        parent.offsetTop -
        parent.clientHeight / 2 +
        el.clientHeight / 2
    }
  }

  formatMatchedText = () => {
    const { userInput, suggest } = this.props
    const { matchedSubstrings, label } = suggest

    if (!userInput && !matchedSubstrings) {
      return label;
    }

    let pre = ''
    let post = ''
    const { offset: start, length } = matchedSubstrings
    const end = start + length
    const bold = <Bold key={label}>{label.substring(start, end)}</Bold>

    if (start > 0) {
      pre = label.slice(0, start)
    }

    if (end < label.length) {
      post = label.slice(end)
    }

    return (
      <span>
        {pre}
        {bold}
        {post}
      </span>
    )
  }

  getItemRef = el => {
    this.ref = el;
  }

  render () {
    const { formatMatchedText, onClick, getItemRef, props } = this;
    const { onMouseDown, onMouseOut, active } = props;
    const content = formatMatchedText()

    return (
      <SimpleSuggestItem
        innerRef={getItemRef}
        active={active}
        onMouseDown={onMouseDown}
        onMouseOut={onMouseOut}
        onClick={onClick}
      >
        {content}
      </SimpleSuggestItem>
    )
  }
}

SuggestItem.propTypes = {
  userInput: string,
  suggest: shape({
    label: string,
    offset: number,
    length: number
  }),
  active: bool,
  onMouseDown: func,
  onMouseOut: func,
  onSelect: func,
  highlightMatch: bool
};

SuggestItem.defaultProps = {
  onMouseOut: () => {},
  onMouseDown: () => {},
};

