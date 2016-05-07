
var level1 = function(game){
	
	
};

var starsArray;	var score = 0;	var scoreText; 	var fireballs;
var fireRate = 300;	var nextFire = 0;	var nextJump = 0;	var left=false;	var right=false;
var duck= false;	var fire=false;	var jump=false;	var live;	var scoreStarOne;	var scoreStarTwo;	var scoreStarThree;
var player;

var kokomyo ="ဒီအခန္းမွာေတာ႔ \n ကၾကီး(၅) လံုးကို  ရေအာင္ ကစားရမွာပါ။ \n ကံေကာင္းပါေစ။ :) " ;
		

level1.prototype = {
	
	managePause: function() {
    this.game.paused = true;
    var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this._fontStyle);
    this.input.onDown.add(function(){
        pausedText.destroy();
        this.game.paused = false;
    });
	},
	
	create: function() {
		
	// setting the Camera view bound 
	game.world.setBounds(0, 0, 1920, 1920);
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
	
	
	
    //  A simple background for our game
    var sky = game.add.sprite(0, 0, 'sky');
	sky.scale.setTo (10, 10); // Scaling it
	
	fireballs = game.add.group(); 	// Add a new group for fireballs
    fireballs.enableBody = true; 	// Enabling Physcics for whole "fireball" group
	fireballs.createMultiple(500, 'fireball', 0, false);  // create plenty of them hidden and out of the game world
	
	var diamond = fireballs.create();
	
	
    platforms = game.add.group();	// The another platforms group 
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height -46, 'ground');
	// If scaling needed
    //ground.scale.setTo(10, 10);
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	
	
	    // The player and its settings
    player = game.add.sprite(100, game.world.height -300, 'dude');
	game.camera.follow(player); //always center player
    player.health = 100;
	//  We need to enable physics on the player
    game.physics.arcade.enable(player);
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
	player.anchor.setTo(0.5, 0);
    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	

	baddies = game.add.group();
    // Enabling Arcade physics for this group
    baddies.enableBody = true;
	baddies.damageAmount = 5;
	
	healHelp = game.add.group();
    // Enabling Arcade physics for this group
    healHelp.enableBody = true;
	healHelp.damageAmount = -1;
	
	
	
	
 // create our virtual game controller buttons 
               	buttonjump = game.add.button(window.innerWidth - 50, window.innerHeight - 50, 'buttonjump', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
                buttonjump.anchor.setTo(0.5, 0.5);
                buttonjump.fixedToCamera = true;  //our buttons should stay on the same place  
                buttonjump.events.onInputOver.add(function(){jump=true;});
                buttonjump.events.onInputOut.add(function(){jump=false;});
                buttonjump.events.onInputDown.add(function(){jump=true;});
                buttonjump.events.onInputUp.add(function(){jump=false;});

                buttonfire = game.add.button(window.innerWidth - 50, window.innerHeight - 100, 'buttonfire', null, this, 0, 1, 0, 1);
                buttonfire.anchor.setTo(0.5, 0.5);
                buttonfire.fixedToCamera = true;
                buttonfire.events.onInputOver.add(function(){fire=true;});
                buttonfire.events.onInputOut.add(function(){fire=false;});
                buttonfire.events.onInputDown.add(function(){fire=true;});
                buttonfire.events.onInputUp.add(function(){fire=false;});        

                buttonleft = game.add.button(55, window.innerHeight - 50, 'level_arrows', null, this, 0, 0, 0, 0);
                buttonleft.anchor.setTo(0.5, 0.5);
                buttonleft.fixedToCamera = true;
                buttonleft.events.onInputOver.add(function(){left=true;buttonleft.alpha = 1;});
                buttonleft.events.onInputOut.add(function(){left=false;});
                buttonleft.events.onInputDown.add(function(){left=true;buttonleft.alpha = 1;});
                buttonleft.events.onInputUp.add(function(){left=false;});

                buttonright = game.add.button(125, window.innerHeight - 50, 'level_arrows', null, this, 1, 1, 1, 1);
                buttonright.anchor.setTo(0.5, 0.5);
                buttonright.fixedToCamera = true;
                buttonright.events.onInputOver.add(function(){right=true;buttonright.alpha = 1; });
                buttonright.events.onInputOut.add(function(){right=false;});
                buttonright.events.onInputDown.add(function(){right=true;buttonright.alpha = 1; });
                buttonright.events.onInputUp.add(function(){right=false;});
		
				
			// For info
	infoBg = game.add.sprite(window.innerWidth/2,window.innerHeight/2, 'infobg');
	infoBg.fixedToCamera = true;
	infoBg.anchor.setTo(0.5,0.5);
	//infoBg.scale.setTo(2,1);
	infoBg.visible = false;
	
	howToOne = game.add.text(window.innerWidth/2, window.innerHeight/2, kokomyo,{ font: '16px Arial', fill: '#fff', align: 'center' , stroke: "#535353", strokeThickness: 7  });
	howToOne.anchor.setTo(0.5,0.5);
	howToOne.fixedToCamera = true;
	howToOne.visible = false;
	howToOne.alpha = 0.1;
	
				// For Info text button
		infoText = game.add.text(window.innerWidth - 100, 5,'ကစားနည္း'  , { font: '15px Arial', fill: '#fff', stroke: "#535353", strokeThickness: 7 });
		infoText.fixedToCamera = true;
		infoText.inputEnabled = true; // !important
		infoText.alpha = 1;
		infoText.events.onInputDown.add(function()
		{
			
		if(infoBg.visible == false)
			{
				infoBg.visible = true;
				howToOne.visible = true;
				var infoTween =	game.add.tween(howToOne);
				infoTween.to( { alpha: 1 }, 1500, Phaser.Easing.Cubic.Out, true);
				infoTween.onComplete.add(tapHandler);
				infoTween.start();
			
			function tapHandler()
			{
				this.game.input.onUp.addOnce(tap);
			
			function tap()
				{
					infoBg.visible = false;
					howToOne.visible = false;
				};
			};
					
			}
		else
			{
				infoBg.visible = false;
				howToOne.visible = false;
				howToOne.alpha = 0.1;
			}
		});
		
		
		
					//  live stat
	    live = game.add.text(25, 5, 'အသက္: ' + player.health, { font: '15px Arial', fill: '#fff', stroke: "#535353", strokeThickness: 7 });
		live.fixedToCamera = true;
		live.render = function(){ live.text = 'အသက္: ' + Math.max(player.health, 0); };
	
		// Scoring stars goodies :)
		
		scoreStarOne = game.add.sprite(80, 40, 'star');
		scoreStarOne.fixedToCamera = true;
		scoreStarOne.anchor.setTo(0.5,0.5);
		scoreStarOne.scale.setTo(0.75,0.75);
		scoreStarOne.alpha = 0.1;
		
		scoreStarTwo = game.add.sprite(96, 40, 'star');
		scoreStarTwo.fixedToCamera = true;
		scoreStarTwo.anchor.setTo(0.5,0.5);
		scoreStarTwo.scale.setTo(0.75,0.75);
		scoreStarTwo.alpha = 0.1;
		
		scoreStarThree = game.add.sprite(112, 40, 'star');
		scoreStarThree.fixedToCamera = true;
		scoreStarThree.anchor.setTo(0.5,0.5);
		scoreStarThree.scale.setTo(0.75,0.75);
		scoreStarThree.alpha = 0.1;
		
		
		scoreStarText = game.add.text(48, 40, 'ၾကယ္ :', {font: '13px Arial', fill: '#fff', stroke: "#535353", strokeThickness: 7 });
		scoreStarText.fixedToCamera = true;
		scoreStarText.anchor.setTo(0.5,0.5);
		//scoreStarText.render = function(){ };
	
		
			//Add Score Text
		scoreText = game.add.text(window.innerWidth / 2, 20, 'ရမွတ္: 0', {font:'20px Arial', align:'center', fill: '#fff', stroke: "#535353", strokeThickness: 5});
		scoreText.fixedToCamera = true;
		scoreText.anchor.setTo(0.5, 0.5);
		scoreText.render = function(){scoreText.text = 'ရမွတ္ : ' + score; };
		
		
		   //  Game over text
   		gameOver = game.add.text(window.innerWidth/2,window.innerHeight/2, 'ျပန္ၾကိဳးစားလိုက္ပါဦး', {font: '34px Arial', fill: '#fff0', stroke: "#535353", strokeThickness: 5 });
	 	gameOver.fixedToCamera = true;
		gameOver.anchor.setTo(0.5, 0.5);
		gameOver.visible = false;
		
	this.sendThem = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.hereTheyCome, this);
    this.sendThem.timer.start();
	
	this.sendHeal = this.game.time.events.loop(Phaser.Timer.SECOND * 60, this.hereHealCome, this);
    this.sendHeal.timer.start();
	


	
},




	update: function() 
{
		//  Collide the player and the stars with the platforms
    		game.physics.arcade.collide(player, platforms);
			game.physics.arcade.collide(fireballs, platforms);
			game.physics.arcade.collide(baddies, platforms);
			game.physics.arcade.collide(baddies, healHelp);
			game.physics.arcade.collide(healHelp, platforms);
			game.physics.arcade.collide(baddies, baddies);
			game.physics.arcade.overlap(player, baddies, okLetsSee, null, this);
			game.physics.arcade.overlap(player, healHelp, this.healControl, null, this);
			game.physics.arcade.overlap(fireballs, baddies, this.fireKill, null, this);
		// Test
		
		
	if (left && !duck) 
		{
          	//  Move to the left
			player.scale.x = -1;
        	player.body.velocity.x = -200;
        	player.animations.play('left');
          	// player.animations.play('walk');
       	}
  	else if (right && !duck) 
		{
        	player.scale.x = 1;
        	player.body.velocity.x = 200;
        	player.animations.play('left');
        	//player.animations.play('walk');
			
       	} 
	else
		{
			player.animations.stop();
			player.body.velocity.x=0;
			player.frame = 0;
			buttonright.alpha = 0.3;
			buttonleft.alpha = 0.3;
		
		}
           
 	if (jump)
		{ 
		   player.body.velocity.y = - 200;
		   player.frame = 5;
		}
			
	if (fire)
		{
			
			fire_now();
			player.frame = 8;
		}
	
		
	
		
        function fire_now() 
	{
            if (game.time.now > nextFire)
		{
                nextFire = game.time.now + fireRate;
                var fireball = fireballs.getFirstExists(false); // get the first created fireball that no exists atm
                if (fireball)
			{
				
                    fireball.exists = true;  // come to existance !
                    fireball.lifespan=2000;  // remove the fireball after 2500 milliseconds - back to non-existance
                    if(player.scale.x == -1)
						{  // if player looks to the left - create the fireball on his left side
                        fireball.reset(player.x-20, player.y);
                       	
                        fireball.body.velocity.x = - 180;
						fireball.body.velocity.y = 0;
						fireball.body.gravity.y = 30;
                        fireball.body.bounce.y = 1 + Math.random() * 0.2;
                    	}
				else
						{
                        fireball.reset(player.x+20, player.y);
                        game.physics.arcade.enable(fireball);
                        fireball.body.velocity.x = 180;
                        fireball.body.velocity.y = 0;
						fireball.body.gravity.y = 30;
						fireball.body.bounce.y = 1 + Math.random() * 0.2;
                    	}
                    // fireball.body.setCircle(10);
           	}
       	}
		
   	}
	
		
	
		function okLetsSee (player, goBaddies) 
	{
					goBaddies.kill();
					goBaddies.destroy();
					player.damage(baddies.damageAmount);
					live.render();
					score += 10;
					scoreText.render();
			
					
			// Game Over goodies
	
		if (! player.alive && ! GameOver.visible == true)
			{
				gameOver.visible = true;
       			var fadeInGameOver = game.add.tween(gameOver);
				fadeInGameOver.to({alpha: 1}, 3000, Phaser.Easing.Cubic.Out);
				fadeInGameOver.onComplete.add(pyanPlayplay);
				fadeInGameOver.start();
					function pyanPlayplay()
				{
					score = 0;// Reset the score
					//  The "Tap to restart" handler
        			this.game.input.onUp.addOnce(pyanPlay);
         
        				function pyanPlay() 
					{
						if(AdMob) AdMob.showInterstitial();
						if(AdMob) AdMob.prepareInterstitial({
							adId: "ca-app-pub-5323026967670907/7819836478",
							autoShow: false,
							overlap:true, // overlap the game, so it won't steal space to canvas
							isTesting: true // show a demo ad
					});
           			game.state.start("LevelSelect");
       			}
			}
      
		} // Game Over goodies
		
		if(score ==  50)
			{
			game.global.starsArray[game.global.level-1] = 1;
			ko2 = game.global.starsArray;
			// if we completed a level and next level is locked - and exists - then unlock it
			game.global.starsArray[game.global.level] = 0;
			localStorage.setItem("versionFive",JSON.stringify(ko2));
			scoreText.render();
			scoreStarOne.alpha = 1;
			}
			
		if(goBaddies.x == player.x - 100)
		{
			goBaddies.kill();
			goBaddies.destroy();
		}
			
	};
	if(score ==  50)
			{
			game.global.starsArray[game.global.level-1] = 1;
			ko2 = game.global.starsArray;
			// if we completed a level and next level is locked - and exists - then unlock it
			game.global.starsArray[game.global.level] = 0;
			localStorage.setItem("versionFive",JSON.stringify(ko2));
			scoreText.text =' ရမွတ္:' + score ;
			scoreStarOne.visible = true;
			}
},

hereTheyCome: function() {  

	var forFrame = this.game.rnd.integerInRange(1, 2);
	var forFall = this.game.rnd.integerInRange(10, 100);
	var forY = this.game.rnd.integerInRange(-400, 20);
	var forBounce = this.game.rnd.integerInRange(0.1 , 2);
	var forVx = this.game.rnd.integerInRange(-150 , 1);
	var Ro = this.game.rnd.integerInRange(0 , 360);
	var goBaddies = baddies.create(player.x + window.innerWidth + 10, player.y + forY, 'level_arrows', forFrame);
	goBaddies.body.velocity.x = forVx;
	goBaddies.body.gravity.y = forFall;
	goBaddies.body.bounce.y = forBounce;
	goBaddies.angle = Ro;
},

hereHealCome: function()
{
	var forFall = this.game.rnd.integerInRange(-5, 50);
	var forY = this.game.rnd.integerInRange(-400, 20);
	var forX = this.game.rnd.integerInRange(-200, 200);
	var forVx = this.game.rnd.integerInRange(-50 , 50);
	var healer = healHelp.create(player.x + forX, player.y + forY, 'aid');
	healer.lifespan = 5000;
	healer.body.gravity.y = forFall;
	healer.body.velocity.x = forVx;
},

healControl: function()
{
	player.damage(healHelp.damageAmount);
	live.render();
},

fireKill: function(fireball,goBaddies)
{

		goBaddies.kill();
		fireball.kill();
		
	
}

};
	
	
		



	
	



