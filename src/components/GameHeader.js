import React from 'react';

class GameHeader extends React.PureComponent {
	render() {
		return (
			// <div className="trial">
			// 	<div className="trial-title d-flex">
			// 		<div className="actualtitle d-flex">
			// 			<span className="tick">SORT OF</span>
			// 			<span>JEOPARDY!</span>
			// 		</div>

			// 	</div>
			// </div>
			<h1 className="GameHeader d-flex">
				<div className="title d-flex">
					<span className="tick">SORT OF</span>
					<span>JEOPARDY!</span>
				</div>
				<div className="bulbs d-flex mr-3 w-100 justify-content-between">
					<div className="bulb rounded-circle" />
					<div className="bulb rounded-circle" />
					<div className="bulb rounded-circle" />
					<div className="bulb rounded-circle" />
					<div className="bulb rounded-circle d-none d-lg-block" />
					<div className="bulb rounded-circle d-none d-lg-block" />
					<div className="bulb rounded-circle d-none d-lg-block" />
					<div className="bulb rounded-circle d-none d-xl-block" />
					<div className="bulb rounded-circle d-none d-xl-block" />
				</div>
			</h1>
		);
	}
}

export default GameHeader;
