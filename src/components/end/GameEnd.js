import React from 'react';
import GameHeader from '../GameHeader';
import GameBadge from './GameBadge';

class GameEnd extends React.Component {
	constructor(props) {
		super(props);
		this.assembleRanks = this.assembleRanks.bind(this);
	}
	assembleRanks() {
		const { avatar_sets, avatar, username, score } = this.props;
		// sort order of winners
		// first, add user to avatar sets
		let contestants = [ ...avatar_sets, { avatarImg: avatar, avatarName: username, score: score } ];
		// sort scores, descending
		let ranks = contestants.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

		return ranks.map((val, index) => {
			return (
				<GameBadge key={index} avatar={val.avatarImg} name={val.avatarName} score={val.score} place={index} />
			);
		});
	}
	render() {
		return (
			<div className="GameEnd full-height p-3 bg-info">
				<GameHeader />
				<div className="container">
					<div className="row mt-3 justify-content-around">
						{this.assembleRanks()}
						<div className="col d-flex align-items-center justify-content-center">
							<div className="text-center">
								<button
									onClick={this.props.restart}
									className="game-btn btn btn-secondary mt-3 mx-auto px-4 pt-2 shadow-sm"
								>
									Start Over
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default GameEnd;
