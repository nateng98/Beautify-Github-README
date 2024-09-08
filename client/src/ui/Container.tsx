import React from 'react'
import { twMerge } from 'tailwind-merge';

// Props interface defines the expected properties that Container component will receive
interface Props {
	children: React.ReactNode; // specify that this prop can be any valid JSX/TSX element or array of elements; place holder for the component's content
	className?: string; // string that allow additional custom classes to be passed to the Container component
}

const Container = ({children, className} : Props) => {
	// twMerge: merge style without any conflicts
	const newClassName = twMerge('max-w-screen-xl mx-auto p-5 lg:px-0', className);
  return (
	<div className={newClassName}>{children}</div>
  )
}

export default Container