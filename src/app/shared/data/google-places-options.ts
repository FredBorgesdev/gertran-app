import {Options} from 'ngx-google-places-autocomplete/objects/options/options';

export const googlePlacesOptions: Options = {
  fields: ['address_components', 'geometry.location', 'formatted_address'],
  origin: null,
  bounds: null,
  types: null,
  strictBounds: false,
  componentRestrictions: null,
};
