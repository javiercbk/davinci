import _ from 'lodash';
import moment from 'moment-timezone';

export const INVALID_DATE = new Error('date is invalid');

export const toUserTZ = (date, user) => {
  let dateMoment;
  if (typeof date === 'string') {
    dateMoment = moment.utc(date, true);
  } else if (date instanceof Date) {
    dateMoment = moment.utc(date);
  } else if (moment.isMoment(date)) {
    dateMoment = date.clone();
  }
  if (_.isNil(dateMoment) || !dateMoment.isValid()) {
    throw INVALID_DATE;
  }
  if (!user) {
    return dateMoment.local();
  } else if (_.isNil(user.timezone) || user.timezone === 'automatic') {
    return dateMoment.local();
  }
  return dateMoment.tz(user.timezone).format(user.dateFormat);
};
