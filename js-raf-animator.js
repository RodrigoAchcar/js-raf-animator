function startAnimating(element, seconds, fps, styleI, styleO, startV, endV) {		
	let fpsD = Math.floor(1000 / fps);
	let totalFrames = (seconds * 1000) / fpsD; //miliseconds duration
	let previousT = 0;
	let currentT = 0;
	let fpsCounter = 0;		

	let deltaV = endV - startV;
	console.log(performance.now());
	render(element, seconds, fps, fpsD, styleI, styleO, startV, endV, deltaV, currentT, previousT, totalFrames, fpsCounter);
}
function render(element, seconds, fps, fpsD, styleI, styleO, startV, endV, deltaV, currentT, previousT, totalFrames, fpsCounter) {	
	currentT = currentT + fps;		
	let fpsCount = currentT - previousT;
	if (fpsCount >= fpsD) {			
		if(fpsCounter <= totalFrames) {						
			let ease = easeInOutQuad( fpsCounter, startV, deltaV, totalFrames);
			// animate element code here					
			element.style.transform = 'translateX(' + ease + 'px)';	
			fpsCounter++;		
			previousT = currentT;
		} else {		
			element.style.transform = 'translateX(' + endV + 'px)';	
			cancelAnimationFrame(render);
			console.log('fpsCounter: ', fpsCounter);
			console.log(performance.now());
			return;
		}				
	}
	requestAnimationFrame(function(){
		render(element, seconds, fps, fpsD, styleI, styleO, startV, endV, deltaV, currentT, previousT, totalFrames, fpsCounter);
	});	
}	
function easeInOutQuad(t, b, c, d) {
	if ((t /= d / 2) < 1) return c / 2 * t * t + b;
	return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

function runCarousel(){
	let element = document.getElementById('carouselChain');
	let vector = 1;
	let imgsArray = document.getElementsByClassName('carousel_image');		
	let startV = element.offsetLeft;
	let endV = -imgsArray[0].getBoundingClientRect().width; 		
	let fps = 60;
	let seconds = 2;
	let styleI = 'translateX(';
	let styleO = 'px)';

	let goBanner = startAnimating(element, seconds, fps, styleI, styleO, startV, endV);		
}	
runCarousel();

