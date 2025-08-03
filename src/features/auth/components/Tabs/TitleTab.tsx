import { memo } from 'react';

export const TitleTab = memo(
	({
		on,
		title,
		className,
	}: {
		on: boolean;
		title: string;
		className: string;
	}) => {
		if (!on) return null;
		return <span className={className}>{title}</span>;
	},
);
