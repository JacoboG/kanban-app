import React from 'react';
import classnames from 'classnames';

export default ({ editing, value, onEdit, className, ...props }) => {
	if (editing) {
		return <Edit value={value} onEdit={onEdit} className={className} {...props} />
	}
	return <span className={classnames('value', className)} {...props}>{value}</span>
}

class Edit extends React.Component {
	render() {
		const { className, value, onEdit, ...props } = this.props;
		return <input
			type="text"
			className={classnames('edit', className)}
			autoFocus={true}
			defaultValue={value}
			onKeyPress={this.checkEnter}
			onBlur={this.finishEdit}
			{...props}
		/>;
	}
	checkEnter = (e) => {
		if (e.key === 'Enter') {
			this.finishEdit(e);
		}
	}
	finishEdit = (e) => {
		const value = e.target.value;
		if (this.props.onEdit) {
			this.props.onEdit(value);
		}
	}
}