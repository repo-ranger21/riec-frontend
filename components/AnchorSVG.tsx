type AnchorSVGProps = {
	className?: string;
};

export default function AnchorSVG({ className }: AnchorSVGProps) {
	return (
		<svg
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M12 3V21M12 10C8 10 5 8.5 5 6.5M12 10C16 10 19 8.5 19 6.5M12 21C8 21 6 18.5 6 16M12 21C16 21 18 18.5 18 16"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}
