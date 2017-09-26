import axios from 'axios';
import { GOOGLE_AUTOCOMPLETE_URL } from '../constants';

export function autoCompleteReq(data) {
  const { input } = data;
  const components = `country:au`;
  const types = `address`;

  const GOOGLE_API_KEY = `AIzaSyDYvyB5vxTahUfY5yhf4UofoVtZV8lHBhQ`;
  const url = `${GOOGLE_AUTOCOMPLETE_URL}?components=country:au&types=address&input=${input}&key=${GOOGLE_API_KEY}`;
  const xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = () => {
      console.log('READY STATE', xhr.readyState);
      console.log('STATUS', xhr.status);
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const text = xhr.responseText();
        console.log('RESPONSE', text);
      }
  }
  xhr.open('GET', url);
  xhr.send()

  /*
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json'
    }
    
  })
    .then(response => response.json());
  */
}

function transformPrediction(prediction) {
  const {
    description: label,
    place_id: placeId,
    matched_substrings: matchedSubstrings,
  } = prediction;
  const [first] = matchedSubstrings;
  return {
    label,
    placeId,
    matchedSubstring: first,
  };
}

export function handleAutocompleteResults(predictions) {
  return predictions.map(transformPrediction);
}