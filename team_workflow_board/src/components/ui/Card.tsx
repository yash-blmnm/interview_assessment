import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    onClick?: () => void;
}

export default function Card({
    children,
    onClick
}: CardProps) {
    return (
        <div
            className="card"
            onClick={onClick}
        >
            {children}
        </div>
    );
}