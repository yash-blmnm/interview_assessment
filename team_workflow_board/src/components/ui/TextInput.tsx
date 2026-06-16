import type { ChangeEvent } from 'react';

interface TextInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	type?: 'text' | 'email' | 'password' | 'number';
}

export default function TextInput({
	value,
	onChange,
	placeholder = '',
	disabled = false,
	type = 'text'
}: TextInputProps) {

	const handleChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		onChange(event.target.value);
	};

	return (
		<input
			type={type}
			value={value}
			placeholder={placeholder}
			disabled={disabled}
			onChange={handleChange}
		/>
	);
}