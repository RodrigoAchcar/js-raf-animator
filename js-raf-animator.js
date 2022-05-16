function startAnimating(elementName, styleI, styleO, startV, endV , seconds, fps) {	
		let element = document.getElementById(elementName);
		let fpsD, currentT, previousT, increment, iterate, fpsCounter;	
		fpsD = Math.floor(1000 / fps);
		totalFrames = (seconds * 1000) / fpsD; //miliseconds duration
		previousT = 0;
		currentT = previousT;		
		deltaV = endV - startV;
		fpsCounter = 0; // 4 log
		render(element, styleI, styleO, fpsD, currentT, previousT, startV, endV, fpsCounter);
	}
	function render(element, styleI, styleO, fpsD, currentT, previousT, startV, endV, fpsCounter) {	
		currentT = currentT + (fpsD * 1000);		
		fpsCount = currentT - previousT;
		if (fpsCount >= fpsD) {			
			if(fpsCounter <= totalFrames) {						
				let ease = easeInOutQuad( fpsCounter, startV, deltaV, totalFrames);		
				element.style.transform = styleI + ease + styleO;	
				fpsCounter++;		
				previousT = currentT;
			} else {		
				element.style.transform = styleI + endV + styleO;	
				cancelAnimationFrame(render);
				return;
			}				
		}
		requestAnimationFrame(function() {
			render(element, styleI, styleO, fpsD, currentT, previousT, startV, endV, fpsCounter);
		});			
	}		
	function easeInOutQuad(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	}
  // Custom function to animate an element by id
	function runCarousel(seconds){
		let imgsArray = document.getElementsByClassName('carousel_image');		
		let startV = imgsArray[0].offsetLeft;
		let endV = -imgsArray[0].getBoundingClientRect().width; 
		let fps = 60;
		let styleI = 'translateX(';
		let styleO = 'px)';
		let goBanner = startAnimating('carouselChain', styleI, styleO, startV, endV, seconds, fps);
	}	
	runCarousel(1);
