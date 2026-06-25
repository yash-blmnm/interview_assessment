import { useState } from "react";
import Checkbox from "./Checkbox";

function applyStatusToTree(items, status) {
  return items.map((item) => ({
    ...item,
    status,
    children: item.children ? applyStatusToTree(item.children, status) : item.children,
  }));
}

function updateTreeStatus(items, targetId, status) {
  return items.map((item) => {
    if (item.id === targetId) {
      return {
        ...item,
        status,
        children: item.children ? applyStatusToTree(item.children, status) : item.children,
      };
    }
    if (item.children) {
      return { ...item, children: updateTreeStatus(item.children, targetId, status) };
    }
    return item;
  });
}

export default function NestedCheckbox({ data }) {
  const [checkboxList, setCheckboxList] = useState(data);

  const updateDependingStatus = (id, status) => {
    setCheckboxList((prev) => updateTreeStatus(prev, id, status));
  };

  return (
    <NestedCheckboxComponent data={checkboxList} updateDependingStatus={updateDependingStatus} />
  );
}

function NestedCheckboxComponent({ data, updateDependingStatus }) {
  return (
    <div>
      {data.map((checkboxItem) => {
        const { id, label, status, children } = checkboxItem;
        return (
          <div key={id} style={{ paddingLeft: "0.5rem" }}>
            <Checkbox label={label} checked={status} onCheckboxClicked={(s) => updateDependingStatus(id, s)}
            />
            {children ? (
              <NestedCheckboxComponent data={children} updateDependingStatus={updateDependingStatus} />
            ) : ''}
          </div>
        );
      })}
    </div>
  );
}