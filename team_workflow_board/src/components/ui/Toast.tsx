import { useEffect } from 'react';

interface ToastProps {
	message: string;
	variant?: 'success' | 'error' | 'warning' | 'info';
	isVisible: boolean;
	onClose: () => void;
}

export default function Toast({
	message,
	variant = 'info',
	isVisible,
	onClose
}: ToastProps) {

	useEffect(() => {
		if (!isVisible) {
			return;
		}

		const timer = window.setTimeout(() => {
			onClose();
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [isVisible, onClose]);

	if (!isVisible) {
		return null;
	}

	return (
		<div className={`toast toast-${variant}`}>
			<span>{message}</span>

			<button
				type="button"
				onClick={onClose}
			>
				×
			</button>
		</div>
	);
}