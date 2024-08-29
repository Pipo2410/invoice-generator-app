import React, { SVGProps } from 'react';

export const TransferSVG = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M2.05934 6.27504C2.00184 6.21754 1.95612 6.14826 1.92445 6.07159C1.86112 5.91909 1.86112 5.7466 1.92445 5.5941C1.95612 5.51743 2.00184 5.44835 2.05934 5.39085L5.39267 2.05751C5.63684 1.81335 6.0327 1.81335 6.27687 2.05751C6.52104 2.30168 6.52104 2.69754 6.27687 2.94171L4.01023 5.20835H14.1677C14.5127 5.20835 14.7927 5.48835 14.7927 5.83335C14.7927 6.17835 14.5127 6.45835 14.1677 6.45835H4.01023L6.27687 8.725C6.52104 8.96916 6.52104 9.36503 6.27687 9.60919C6.1552 9.73086 5.99518 9.7925 5.83518 9.7925C5.67518 9.7925 5.51515 9.73169 5.39349 9.60919L2.05934 6.27504ZM18.0776 13.9274C18.0459 13.8508 18.0002 13.7817 17.9427 13.7242L14.6094 10.3908C14.3652 10.1467 13.9694 10.1467 13.7252 10.3908C13.481 10.635 13.481 11.0309 13.7252 11.275L15.9918 13.5417H5.83437C5.48937 13.5417 5.20937 13.8217 5.20937 14.1667C5.20937 14.5117 5.48937 14.7917 5.83437 14.7917H15.9918L13.7252 17.0583C13.481 17.3025 13.481 17.6984 13.7252 17.9425C13.8469 18.0642 14.0069 18.1258 14.1669 18.1258C14.3269 18.1258 14.4869 18.065 14.6086 17.9425L17.9419 14.6092C17.9994 14.5517 18.0451 14.4826 18.0768 14.4059C18.141 14.2526 18.1409 14.0808 18.0776 13.9274Z" />
	</svg>
);
