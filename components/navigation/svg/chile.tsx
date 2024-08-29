import React, { SVGProps } from 'react';

export const ChileSVG = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="32"
		height="32"
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g clipPath="url(#clip0_1_5518)">
			<path
				d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
				fill="#F0F0F0"
			/>
			<path
				d="M32 16C32 24.8365 24.8365 32 16 32C7.1635 32 0 24.8365 0 16C0 7.1635 16 16 16 16C16 16 28.1101 16 32 16Z"
				fill="#D80027"
			/>
			<path
				d="M0 16C0 7.1635 7.1635 0 16 0V16C16 16 5.56519 16 0 16Z"
				fill="#0052B4"
			/>
			<path
				d="M9.52352 5.56519L10.5596 8.75381H13.9123L11.1999 10.7244L12.2359 13.9131L9.52352 11.9424L6.81114 13.9131L7.84714 10.7244L5.13477 8.75381H8.48745L9.52352 5.56519Z"
				fill="#F0F0F0"
			/>
		</g>
		<defs>
			<clipPath id="clip0_1_5518">
				<rect width="32" height="32" fill="white" />
			</clipPath>
		</defs>
	</svg>
);
