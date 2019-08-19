import { combineReducers } from 'redux';
import students from './students.js';
import instructors from './instructors';
import currentUser from './current_user';
import lessons from './lessons';
import families from './families';
import contacts from './contacts';
import desiredInstructor from "./desiredInstructor";
import desiredStudent from "./desiredStudent";
import desiredFamily from "./desiredFamily"

export default combineReducers({
  students,
  instructors,
  currentUser,
  lessons,
  families,
  contacts,
  desiredInstructor,
  desiredStudent,
  desiredFamily
});
