import React from 'react';

function IntroAnimation() {
	return (
		<div id="intro" className="full-height d-flex justify-content-center align-items-center animated fadeOut">
			<div className="d-flex">
				<span className="title animated zoomInDown delay-1s mx-3">SORT </span>
				<span className="title animated zoomInDown delay-2s mx-3"> OF </span>
				<span className="title animated zoomInDown delay-3s mx-3"> JEOPARDY!</span>
			</div>
			<div className="lights">
				<span className="bulb bulb1 rounded-circle mx-3 d-inline-block" />
				<span className="bulb bulb2 rounded-circle mx-3 d-inline-block" />
				<span className="bulb bulb3 rounded-circle mx-3 d-inline-block" />
				<span className="bulb bulb4 rounded-circle mx-3 d-inline-block" />
				<span className="bulb bulb5 rounded-circle mx-3 d-inline-block" />
				<span className="bulb bulb6 rounded-circle mx-3 d-inline-block" />
				<span className="bulb bulb7 rounded-circle mx-3 d-inline-block" />
			</div>
		</div>
	);
}

export default IntroAnimation;
