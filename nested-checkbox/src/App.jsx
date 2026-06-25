// import Checkbox from "./Checkbox"
import NestedCheckbox from './NestedCheckbox';
import { CheckboxesData } from './data';
// import { createContext, useContext, useReducer } from 'react';

function App() {

  return (
    <NestedCheckbox data={CheckboxesData} /> 
    // <Checkbox label={"test"} /> 
  )
}

export default App
