import { useState } from "react";
import Checkbox from "./Checkbox";

export default function NestedCheckbox({ data }) {
  // console.log(data);
  const [ checkboxList, setCheckboxList ] = useState(data);

  const updateDependingStatus = (id, children, status) => {
    // const updatedChildren = [...checkboxList.find(c => c.id === id)?.children.map((item) => item?.checked = status)]
    // const listItem = checkboxList.find(c => c.id === id);
    const updatedChildren = children.map((i) => i.status = status);
    setCheckboxList([...checkboxList.map(item => {
        if(item.id === id) {
            return {...item, children: updatedChildren, status: status}
        } 
        return item
    })])

  }
  return (
    <div>
        {data.map((checkboxItem) => {
            const {id, label, status, children } = checkboxItem;
            return (
                <div key={id} style={{paddingLeft: '0.5rem'}}>
                    <Checkbox label={label} status={status} onChildedChecked={(status) => updateDependingStatus(id, children, status)}/>
                    {children ? <NestedCheckbox data={children} /> : ''}
                </div>
            )
        })}
    </div>
  );
}