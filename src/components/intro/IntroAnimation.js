import React from 'react';

function IntroAnimation() {
	// fadeOut
	return (
		<div id="intro" className="full-height d-flex justify-content-center align-items-center animated">
			<div className="intro-title d-flex flex-wrap justify-content-center">
				<span className="title animated zoomInDown delay-1s mx-3">SORT </span>
				<span className="title animated zoomInDown delay-2s mx-3"> OF </span>
				<span className="title animated zoomInDown delay-3s mx-3"> JEOPARDY!</span>
			</div>
			<div className="lights lights-lg-up">
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
