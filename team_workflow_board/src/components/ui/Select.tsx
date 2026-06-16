interface Option {
	label: string;
	value: string;
}

interface SelectProps {
	options: Option[];
	value?: string;
	placeholder?: string;
	onChange: (value: string) => void;
	disabled?: boolean;
}

export default function Select({
	options,
	value = '',
	placeholder = 'Select an option',
	onChange,
	disabled = false
}: SelectProps) {

	const handleChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		onChange(event.target.value);
	};

	return (
		<select
			value={value}
			onChange={handleChange}
			disabled={disabled}
		>
			<option value="" disabled>
				{placeholder}
			</option>

			{options.map(option => (
				<option
					key={option.value}
					value={option.value}
				>
					{option.label}
				</option>
			))}
		</select>
	);
}