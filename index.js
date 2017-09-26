import React from 'react';
import PropTypes from 'prop-types';
import { GeoSuggest } from './components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSuggestions } from './actions';

// BEWARE badly named function
import { getPropertyData } from './selectors';

const {number, string, func } = PropTypes;

/*
export class PropertyAddress extends React.Component {
  onChange = value => {
    const { threshold } = this.props;
    if (value.length >= threshold && value !== prevValue) {
        fetchSuggestions(value);
    }
  }

  render() {
    const { onChange } = this;
    return <GeoSuggest id='geo-suggest' onChange={onChange} />;
  }
}

PropertyAddress.propTypes = {
  threshold: number,
  prevValue: string,
  fetchSuggestions: func
};

PropertyAddress.defaultProps = {
  threshold: 3,
};

const mapStateToProps = state => {
  debugger
  console.log('STATE', state);
  return getPropertyData(state)
}

export default connect(
  mapStateToProps, 
  {
  fetchSuggestions
})(PropertyAddress);
*/

export class PropertyAddress extends React.Component {
  onChange = value => {
    const { props } = this;
    console.log('PROPS', props);
    const { fetchSuggestions, threshold } = props;
    if (value.length >= threshold) {
      fetchSuggestions(value)
    }
  }
  render() {
    const { onChange } = this;
    return (<GeoSuggest id='geo-suggest' onChange={onChange} />);
  }
}

PropertyAddress.defaultProps = {
  threshold: 3,
};

const mapStateToProps = state => {
  return state.get('funnel2').toJS();
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchSuggestions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyAddress);