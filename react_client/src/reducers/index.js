import { combineReducers } from 'redux';
import students from './students.js';
import instructors from './instructors';

export default combineReducers({
  students,
  instructors
});
