import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';

  class LocationSearchInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = { address: '' };
    }
   
    handleChange = address => {
        console.log('hhh',address )
      this.setState({ address });
    };
   
    handleSelect = address => {
      geocodeByAddress(address)
        .then(results => {
            this.setState({address: results[0].formatted_address})
            console.log(results[0].address_components.filter(e=>e.types.includes("administrative_area_level_1")))
        })
        // .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
    };
   
    render() {
      return (
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>

              <input
                {...getInputProps({
                  placeholder: 'Search city in Vietnam',
                  className: 'location-search-input',
                })}
                name='city'
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      );
    }
  }

  export default LocationSearchInput;
