import React from 'react';

class GameHeader extends React.PureComponent {
	render() {
		return (
			<h1 className="GameHeader title d-flex">
				<span className="tick">SORT OF</span> JEOPARDY!
				<div className="align-content-center ml-auto mr-3">
					<span className="bulb rounded-circle mx-3 d-inline-block mb-2 ml-4" />
					<span className="bulb rounded-circle mx-3 d-inline-block mb-2" />
					<span className="bulb rounded-circle mx-3 d-inline-block mb-2" />
					<span className="bulb rounded-circle mx-3 d-inline-block mb-2" />
					<span className="bulb rounded-circle mx-3 d-inline-block mb-2" />
					<span className="bulb rounded-circle mx-3 d-inline-block mb-2" />
					<span className="bulb rounded-circle mx-3 d-inline-block mb-2" />
				</div>
			</h1>
		);
	}
}

export default GameHeader;
