(function(){
	'use strict';

	const spriteNames = {
		caveman: 'caveman',
		rat: 'rat'
	};

	const app = new PIXI.Application({
		width: 512,
		height: 512,
		transparent: true
	});
	document.getElementById('display').appendChild(app.view);

	app.stage.interactive = true;

	const sprites = {};

	const setup = (loader, resources) => {

		const rat = new PIXI.Sprite(resources.rat.texture);
		rat.x = app.renderer.width * 0.5;
		rat.y = app.renderer.height * 0.5;
		rat.anchor.set(0.5, 0.5);
		rat.pivot.set(100, 10);
		rat.interactive = true;
		rat.buttonMode = true;
		rat.click = () => {
			TweenMax.to(rat.scale, 0.1, {
				x: 1.2,
				y: 1.2,
				onComplete: () => {
					TweenMax.to(rat.scale, 0.4, {
						x: 1,
						y: 1,
						ease: Elastic.easeOut
					});
				}
			});
		};
		sprites.rat = app.stage.addChild(rat);


		const cavemanImage = PIXI.BaseTexture.fromImage(resources.caveman.url);
		let cavemanSprites = [];
		let x = 0;
		let y = 0;
		let frame;
		for (let i = 1; i <= 16; i++) {
			console.log(x+'|'+y);
			frame = new PIXI.Rectangle(x,y, 32,32);
			cavemanSprites.push(new PIXI.Texture(cavemanImage, frame));
			if (i%4 === 0) {
				x = 0;
				y += 32;
			} else {
				x += 32;
			}
		}
		const caveman = new PIXI.extras.AnimatedSprite(cavemanSprites);
		caveman.x = app.renderer.width * 0.5;
		caveman.y = app.renderer.height * 0.5;
		caveman.anchor.set(0.5, 0.5);
		caveman.scale.set(2,2);

		caveman.name = spriteNames.caveman;
		sprites.caveman = app.stage.addChild(caveman);

		caveman.animationSpeed = 0.1;
		caveman.play();


		app.ticker.add(animationLoop);
		
	};

	PIXI.loader
		.add('rat', 'images/rat.png')
		.add('caveman', 'images/caveman.png')
		.load(setup);


	const animationLoop = () => {

		if (sprites.rat) {
			sprites.rat.rotation += 0.01;
		}

		if (sprites.caveman) {
			sprites.caveman.x -= 1;
			if (sprites.caveman.x < -sprites.caveman.width) {
				sprites.caveman.x = app.renderer.width + sprites.caveman.width;
			}
		}

		// renderer.render(stage);
	};
})();


