
/* eslint-disable react/prop-types */
export const Container = ({ children }) => {
	return (
		<div
			style={{
				width: '100%',
				marginTop: '64px',
				overflow: 'hidden',
			}}
		>
			{children}
		</div>
	)
}
