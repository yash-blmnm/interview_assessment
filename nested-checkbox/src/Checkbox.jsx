import { useState } from "react";

export default function Checkbox ({label, checked = false, onChildedChecked}) {
    const [ status, setStatus ] = useState(checked);

    const onCheckboxUpdate =(e) => {
        const updatedStatus = e.target.checked;
        setStatus(updatedStatus);
        onChildedChecked(updatedStatus)
    }

    return (
        <div>
            <input type="checkbox" checked={status} label={label} onChange={onCheckboxUpdate} />
            <label>{label}</label>
        </div>
    )
}