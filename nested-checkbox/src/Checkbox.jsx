export default function Checkbox ({label, checked, onCheckboxClicked}) {

    const onCheckboxUpdate =(e) => {
        const updatedStatus = e.target.checked;
        onCheckboxClicked(updatedStatus)
    }

    return (
        <div>
            <input type="checkbox" checked={checked} label={label} onChange={onCheckboxUpdate} />
            <label>{label}</label>
        </div>
    )
}