import _ from 'lodash';
import { emptyMessurements } from '../anthropometry';

export const emptySport = () => _.assignIn(
  {},
  {
    _id: '',
    name: '',
    position: '',
    gender: ''
  },
  emptyMessurements()
);
