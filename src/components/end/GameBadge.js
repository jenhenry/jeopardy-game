import React from 'react';

class GameBadge extends React.PureComponent {
	render() {
		const { avatar, name, score, place } = this.props;
		return (
			<div className="col">
				<div className="card shadow-sm rounded-lg">
					<div className="card-body">
						<h5 className="card-title text-center">
							<div>{name}</div>
						</h5>
						<div className="text-center">
							<i className={`fas fa-award place-${place}`} />
						</div>
					</div>
					<img src={`./images/${avatar}.png`} className="card-img-top" alt="..." />
					<div className="card-footer text-center points">{score}</div>
				</div>
			</div>
		);
	}
}

export default GameBadge;
