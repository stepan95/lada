window.addEventListener('load', function() {
	const brush = document.querySelectorAll('.brush');
	// Лічильник збільшення до максимум
	function brushUp(brush) {
		const time = (900 / Number(brush.dataset.brushmax));
		const id = setInterval(function() {
			if (Number(brush.dataset.brushmax) > brush.textContent) brush.textContent++;
			if (brush.dataset.brushmax == brush.textContent) clearInterval(id);
		}, time);
	}

	function scroll() {
		let caunt = 0;
		for(let i = 0; i < brush.length; i++){
			if (brush[i].offsetTop < window.innerHeight + window.pageYOffset) {
				brushUp(brush[i]);
				caunt ++;
			}
		}
		// Видаляємо скрол подію скрол коли всі лічильники показують доступне максимальне число
		if (caunt == brush.length) {
			window.removeEventListener('scroll', scroll);
		}
	}
	window.addEventListener('scroll', scroll);
});