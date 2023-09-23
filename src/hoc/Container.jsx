
/* eslint-disable react/prop-types */
export const Wrapper = ({ children }) => {
	return (
		<div
			style={{
				width: '100%',
				minHeight: '800px',
				marginTop: '40px',
			}}
		>
			{children}
		</div>
	)
}
