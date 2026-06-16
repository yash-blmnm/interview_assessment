import type { MouseEvent } from 'react';

interface ButtonProps {
	size?: 'small' | 'medium' | 'large';
	variant?: 'primary' | 'secondary' | 'link';
	label: string;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
}

export default function Button({
	size = 'medium',
	variant = 'primary',
	label,
	...props
}: ButtonProps) {

	const classNameValue = (): string => {
		const sizeClasses = {
			small: 'btn-sm',
			medium: 'btn-md',
			large: 'btn-lg'
		};

		const variantClasses = {
			primary: 'btn-primary',
			secondary: 'btn-secondary',
			link: 'btn-link'
		};

		return `${sizeClasses[size]} ${variantClasses[variant]}`;
	};

	return (
		<button
			className={classNameValue()}
			{...props}
		>
			{label}
		</button>
	);
}