window.addEventListener('load', function() {
	const brush = document.querySelectorAll('.brush');
	// Лічильник збільшення до максимум
	function brushUp(brush) {
		// Дізнаємося ширину та починаємо рахунок з 0
		brush.style.width = brush.clientWidth+'px';
		brush.setAttribute('data-brushmax', brush.textContent);
		brush.textContent = 0;

		const time = (100000 / Number(brush.dataset.brushmax)/10);
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
		// Видаляємо подію скрол коли всі лічильники показують доступне максимальне число
		if (caunt == brush.length) {
			window.removeEventListener('scroll', scroll);
		}
	}
	window.addEventListener('scroll', scroll);
});