import Card from './Card';
import Badge from './Badge';

interface TaskCardProps {
	id: string;
	title: string;
	description: string;
	status:
	| 'draft'
	| 'pending'
	| 'inReview'
	| 'approved'
	| 'rejected'
	| 'completed';
	assignee?: string;
	dueDate?: string;
	onClick?: (taskId: string) => void;
}

export default function TaskCard({
	id,
	title,
	description,
	status,
	assignee,
	dueDate,
	onClick
}: TaskCardProps) {

	const handleClick = () => {
		onClick?.(id);
	};

	return (
		<Card onClick={handleClick}>
			<div className="task-card">
				<div className="task-card-header">
					<h3>{title}</h3>

					<Badge status={status} />
				</div>

				<div className="task-card-body">
					<p>{description}</p>
				</div>

				<div className="task-card-footer">
					{assignee && (
						<span>
							Assignee: {assignee}
						</span>
					)}

					{dueDate && (
						<span>
							Due: {dueDate}
						</span>
					)}
				</div>
			</div>
		</Card>
	);
}