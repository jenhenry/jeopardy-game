import React from 'react';

class Contestant extends React.PureComponent {
	render() {
		const { avatarImg, avatarName, score } = this.props;
		return (
			<div className='avatar-set align-items-center'>
				<div className={`avatar ${avatarImg} rounded-circle bg-light mr-3 shadow`} />
				<div className='text-white'>
					<span>{avatarName}:</span>
					<span className='ml-2'>{score}</span>
				</div>
			</div>
		);
	}
}

export default Contestant;
