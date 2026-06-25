import { useState, useEffect } from "react";
import Checkbox from "./Checkbox";

function applyStatusToTree(items, status) {
  return items.map((item) => ({
    ...item,
    status,
    children: item.children ? applyStatusToTree(item.children, status) : item.children,
  }));
}

export default function NestedCheckbox({ data, parentStatus }) {
  const [ checkboxList, setCheckboxList ] = useState(data);

  const updateDependingStatus = (id, status) => {
    // const checkedItem = checkboxList.find(item => item.id === id);
    
    setCheckboxList([...checkboxList.map(item => {
        if(item.id === id) {
            return {
                ...item, 
                children: item.children ? applyStatusToTree(item.children, status) : item.children,
                status
            }
        } 
        return item;
    })])
  }

  useEffect(() => {
    if(parentStatus !== undefined && [true, false].includes(parentStatus)) {
        setCheckboxList(data);
    }
  }, [parentStatus])

  console.log(checkboxList)

  return (
    <div>
        {checkboxList.map((checkboxItem) => {
            const {id, label, status, children } = checkboxItem;
            return (
                <div key={id} style={{paddingLeft: '0.5rem'}}>
                    <Checkbox label={label} checked={status} onCheckboxClicked={(s) => updateDependingStatus(id, s)}/>
                    {children ? <NestedCheckbox data={children} parentStatus={status} /> : ''}
                </div>
            )
        })}
    </div>
  );
}