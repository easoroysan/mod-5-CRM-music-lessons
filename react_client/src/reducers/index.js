import { combineReducers } from 'redux';
import students from './students.js';
import instructors from './instructors';
import users from './users';

export default combineReducers({
  students,
  instructors,
  users
});
