import React from 'react';
/*
export default ({ task, onDelete }) => (
	<div>
		<span> {task} </span>
		<button onClick={onDelete}>x</button>
	</div>
);
*/
export default ({ children, ...props }) => (
	<div {...props}>
		{children}
	</div>
);
// Es lo mismo
// export default (props) => <div>{props.task}</div>