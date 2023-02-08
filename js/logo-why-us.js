window.onload = function() {
	const ladaLogo = document.getElementById('lada-container-logo-why-us');
	const width = ladaLogo.offsetWidth;
	const height = ladaLogo.offsetHeight;
	const centerw = width / 2;
	const centerh = height / 2;

	// Получаємо 360 градусів
	const directionLine = [];
	function createDirection() {
		for(let i = 0; i < 360; i += 1){
			let x = Math.cos(i * Math.PI /180);
			let y = Math.sin(i * Math.PI /180);
			directionLine.push({x: x, y: y});
		}
	}
	createDirection();
	
	function direction(r = 1, d = 1) {
		let radius = r;
		if (radius == 0) radius = 360;
		if (d == 0) return {x: centerw, y: centerh};
		return {
			x: (directionLine[radius-1].x * d) + centerw, 
			y: (directionLine[radius-1].y * d)  + centerh
		};
	}

	// class для створення колечок
	class particles {
		constructor(el = {}) {
		this.id = el.id == undefined ? 0 : el.id;
		this.radius = el.radius == undefined ? 0 : el.radius;
		this.direction = el.direction == undefined ? 0 : el.direction;
		this.radiusEl = el.radiusEl == undefined ? 25 : el.radiusEl;
		this.color = el.color == undefined ? 'var(--lada-grean)' : el.color;
		this.hover = el.hover == undefined ? true : el.hover;
		ladaLogo.insertAdjacentHTML('afterbegin', this.template());
		}
		
		template() {
			const diameter = this.radiusEl *2;
			const smallDiameter = diameter-20;
			const direct = direction(this.radius, this.direction)
			const x = direct.x - this.radiusEl;
			const y = direct.y - this.radiusEl;
			let id = '';
			if (this.id != 0) id = ' id="point-'+this.id+'"';
			let hover = '';
			if (this.hover) hover = ' logo-particles-hover';
			return `
			<div class="logo-particles`+hover+`"`+id+` style="top: `+y+`px; left: `+x+`px; height: `+diameter+`px; width: `+diameter+`px;">
	          <div class="center-particle" style="height: `+smallDiameter+`px; width: `+smallDiameter+`px; background: `+this.color+`"></div>
	        </div>`;
		};
	}

	// Відображаємо логотип
	const particlesPoint = [];
	let id = 1;

	new particles({
		id: 'center',
		color: '#eb5055',
		radiusEl: 50,
		hover: false
	});

	for(let i = 45; i <= 360; i += 90) {
		new particles({
			id: id,
			radiusEl: 40,
			radius: i,
			direction: 90
		});
		particlesPoint.push([i, 90, 40, id]);
		id++;
		if (i > 180) {
			new particles({
				id: id,
				radiusEl: 25,
				radius: i,
				direction: 160
			});
			particlesPoint.push([i, 160, 25, id]);
			id++;
		}
	}
	for(let i = 90; i <= 360; i += 90) {
		new particles({
			id: id,
			radiusEl: 30,
			radius: i,
			direction: 100
		});
		particlesPoint.push([i, 100, 30, id]);
		id++;
		new particles({
			id: id,
			radiusEl: 35,
			radius: i,
			direction: 200
		});
		particlesPoint.push([i, 200, 35, id]);
		id++;
	}

	for(let i = 22; i <= 360; i += 45) {
		if (i < 67 || i > 112) {
			new particles({
				id: id,
				radiusEl: 20,
				radius: i,
				direction: 150
			});
			particlesPoint.push([i, 150, 20, id]);
			id++;
		}
	}

	// class для створення тексту
	class textLogo {
		constructor (el = {}) {
			this.id = el.id == undefined ? 0 : el.id;
			this.radius = el.radius == undefined ? 0 : el.radius;
			this.direction = el.direction == undefined ? 0 : el.direction;
			this.text = el.text == undefined ? 'Текст' : el.text;
			this.alignment = el.alignment == undefined ? 'right' : el.alignment;
			const direct = direction(this.radius, this.direction);
			this.x = direct.x;
			this.y = direct.y;
			ladaLogo.insertAdjacentHTML('afterbegin', this.template());
			this.align();
		}
		template() {
			let id = '';
			if (this.id != 0) id = ' id="text-'+this.id+'"';
			return `<a href="" class="text-logo"`+id+` style="top: `+this.y+`px; left: `+this.x+`px;">`+this.text+`</a>`;
		}
		align() {
			let el = document.getElementById('text-'+this.id);
			if (el != null) {
				if (this.alignment == 'left') {
					el.style.left = this.x - el.clientWidth+'px';
				}else {
					el.style.width = '400px';
				}
				el.style.top = this.y - (el.clientHeight/2)+'px';
			}
		}
	}

	let textN = 0;
	let textСircle = [
		textLogoInfo[4][1],
		textLogoInfo[5][1],
		textLogoInfo[6][1],
		textLogoInfo[6][0],
		textLogoInfo[5][0],
		textLogoInfo[4][0],
		textLogoInfo[3][0],
		textLogoInfo[2][0],
		textLogoInfo[1][0],
		textLogoInfo[0][0],
		textLogoInfo[0][1],
		textLogoInfo[1][1],
		textLogoInfo[2][1],
		textLogoInfo[3][1],
	];
	for(let i = 0; i <= 360; i += 18) {
		if (i != 0) {
			if (i > 125 && i < 235) {
				// ліва сторона
				new textLogo ({
					id: i,
					alignment: 'left',
					text:  textСircle[textN],
					radius: i,
					direction: 260
				});
				textN++;
			}
			if (i < 55 || i > 305) {
				// права сторона
				new textLogo ({
					id: i,
					alignment: 'right',
					text: textСircle[textN],
					radius: i,
					direction: 260
				});
				textN++;
			}
		}
	}
	
	// Оновлюємо лого для анімації
	function updateLogo(point, add = 0) {
		const pointLogo = ladaLogo.getElementsByClassName('logo-particles');
		for(let i = 0; i < point.length; i++){
			let xy = direction(point[i][0], point[i][1] + add);
			document.getElementById('point-'+point[i][3]).style.top = xy.y-point[i][2]+'px';
			document.getElementById('point-'+point[i][3]).style.left = xy.x-point[i][2]+'px';
		}
		
	}

	const pointСenter = document.getElementById('point-center');
	pointСenter.getElementsByClassName('center-particle')[0].insertAdjacentHTML('afterbegin', '<img src="img/point-center.png">');
	pointСenter.addEventListener('mouseover', function() {
		this.style.scale = 4;
		this.querySelector('img').style.opacity = 1;
		updateLogo(particlesPoint, 200);
	});
	pointСenter.addEventListener('mouseout', function() {
		this.style.scale = 1;
		this.querySelector('img').style.opacity = 0;
		updateLogo(particlesPoint);
	});
	
	// Рендомна активація елементів при наведенні
	function getRandom(min, max)
	{
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	const logoActive = {
		pointActive: document.getElementsByClassName('logo-particles'),
		textActive: document.getElementsByClassName('text-logo'),
		point()
		{
			for(let i = 0; i < this.pointActive.length; i++){
				this.pointActive[i].addEventListener('mouseover', function() {
					if (this.classList[1] != undefined) {
						logoActive.textActive[getRandom(0, logoActive.textActive.length-1)].classList.add("text-logo-active");
					}
					
				});
				this.pointActive[i].addEventListener('mouseout', function() {
					if (this.classList[1] != undefined) {
						document.getElementsByClassName('text-logo-active')[0].classList.remove("text-logo-active");
					}
				});
			}
		},
		text()
		{
			for(let i = 0; i < this.textActive.length; i++){
				this.textActive[i].addEventListener('mouseover', function() {
					logoActive.pointActive[getRandom(0, logoActive.pointActive.length-1)].classList.add("logo-particles-active");
				});
				this.textActive[i].addEventListener('mouseout', function() {
					document.getElementsByClassName('logo-particles-active')[0].classList.remove("logo-particles-active");
				});
			}
		}
	}
	logoActive.point();
	logoActive.text();
};


