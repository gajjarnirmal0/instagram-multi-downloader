import Validator from 'validator';
import MessageBag from '../utils/MessageBag';

export default (data) => {
  let errors = new MessageBag();

  if (typeof (data.searchTerm) === "undefined" || !(data.searchTerm) || Validator.isEmpty(data.searchTerm)) {
    errors.add({ source: 'searchTerm', message: 'Search field is required' });
  }

  return errors.get();
}