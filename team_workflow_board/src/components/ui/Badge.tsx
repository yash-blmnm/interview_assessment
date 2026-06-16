interface BadgeProps {
	status:
	| 'draft'
	| 'pending'
	| 'inReview'
	| 'approved'
	| 'rejected'
	| 'completed';
}

export default function Badge({
	status
}: BadgeProps) {

	const statusConfig = {
		draft: {
			label: 'Draft',
			className: 'badge-draft'
		},
		pending: {
			label: 'Pending',
			className: 'badge-pending'
		},
		inReview: {
			label: 'In Review',
			className: 'badge-in-review'
		},
		approved: {
			label: 'Approved',
			className: 'badge-approved'
		},
		rejected: {
			label: 'Rejected',
			className: 'badge-rejected'
		},
		completed: {
			label: 'Completed',
			className: 'badge-completed'
		}
	};

	const { label, className } = statusConfig[status];

	return (
		<span className={`badge ${className}`}>
			{label}
		</span>
	);
}