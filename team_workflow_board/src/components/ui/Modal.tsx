import type { ReactNode } from 'react';

interface ModalProps {
	isOpen: boolean;
	title: string;
	children: ReactNode;
	onClose: () => void;
}

export default function Modal({
	isOpen,
	title,
	children,
	onClose
}: ModalProps) {

	if (!isOpen) {
		return null;
	}

	const handleBackdropClick = () => {
		onClose();
	};

	const handleContentClick = (
		event: React.MouseEvent<HTMLDivElement>
	) => {
		event.stopPropagation();
	};

	return (
		<div
			className="modal-backdrop"
			onClick={handleBackdropClick}
		>
			<div
				className="modal-content"
				onClick={handleContentClick}
			>
				<div className="modal-header">
					<h2>{title}</h2>

					<button
						type="button"
						onClick={onClose}
					>
						×
					</button>
				</div>

				<div className="modal-body">
					{children}
				</div>
			</div>
		</div>
	);
}