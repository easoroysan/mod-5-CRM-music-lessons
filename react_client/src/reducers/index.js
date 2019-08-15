import { combineReducers } from 'redux';
import students from './students.js';
import instructors from './instructors';
import currentUser from './current_user';
import lessons from './lessons';
import families from './families';

export default combineReducers({
  students,
  instructors,
  currentUser,
  lessons,
  families
});
