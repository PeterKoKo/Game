MonsterBunny = function (game, x, y, rotateSpeed) {

    Phaser.Sprite.call(this, game, x, y, 'diamond');

    this.rotateSpeed = rotateSpeed;

};

MonsterBunny.prototype = Object.create(Phaser.Sprite.prototype);
MonsterBunny.prototype.constructor = MonsterBunny;

/**
 * Automatically called by World.update
 */
MonsterBunny.prototype.update = function() {

    this.angle += this.rotateSpeed;

};



var level1 = function(game){};

var starsArray;
var score = 0;
var scoreText; 
var fireballs;
var fireRate = 300;
var nextFire = 0;
var nextJump = 0;
var left=false;
var right=false;
var duck= false;
var fire=false;
var jump=false;
var live;

var candies = null;
var spawnCandyTimer = 0;
	


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
	ledge = platforms.create(150, 5, 'diamond');
	ledge.body.immovable = true;
	ledge.scale.setTo(3,3);
	
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
	
	

    /* //  Finally some stars to collect
    stars = game.add.group();
    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;
	stars.damageAmount = 15;
	
	
	var diamond = stars.create(100,-100, 'diamond');
	
	var diamond = stars.create(-200,0, 'diamond');
	diamond.body.gravity.y= 8;
	diamond.body.gravity.x= 0.01;
	
	for (var i = 0; i < 20; i++)
    {
        //  Create a star inside of the 'stars' group
		var diamond = stars.create(i*40 + Math.random() * 0.2, 0, 'diamond');

        //  Let gravity do its thing
		diamond.body.gravity.x = 0.11 + Math.random() * 0.5;
		diamond.body.gravity.y = 3  + Math.random() * 0.2;
		

        //  This just gives each star a slightly random bounce value
		diamond.body.bounce.y = 0.4 + Math.random() * 0.2;
    }
	
	
	var firstaid = stars.create(10,0, 'aid');
	firstaid.body.gravity.y = 9;
	
	for (var i = 0; i < 20; i++)
    {
        //  Create a star inside of the 'stars' group
		var firstaid = stars.create(i*40, 0, 'aid');

        //  Let gravity do its thing
		firstaid.body.gravity.x = -0.3;
		firstaid.body.gravity.y = 3  + Math.random() * 0.2;
		

        //  This just gives each star a slightly random bounce value
		firstaid.body.bounce.y = 0.4 + Math.random() * 0.2;
    }
	
	var star = stars.create(45,0, 'star');
	star.body.gravity.y = 50;
	star.body.collideWorldBounds = true;
	
    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 20; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 20 + Math.random() * 0.7, 0, 'star');
        //  Let gravity do its thing
        star.body.gravity.y = 1.6;
		
        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}
	
	// Add keyboard cpntrols
	 // cursors = game.input.keyboard.createCursorKeys();
  */
	//Add Score Text
	scoreText = game.add.text(window.innerWidth / 2, 20, 'ရမွတ္: 0', {font:'20px Arial', align:'center', fill: '#fff', stroke: "#535353", strokeThickness: 5});
	scoreText.fixedToCamera = true;
	scoreText.align = "center";
	scoreText.anchor.setTo(0.5, 0.5);
	
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

					//  live stat
	    live = game.add.text(window.innerWidth/2 +50,16, 'အသက္: ' + player.health +'%', { font: '20px Arial', fill: '#fff', stroke: "#535353", strokeThickness: 7 });
		live.fixedToCamera = true;
		live.render = function () {
		live.text = 'အသက္: ' + Math.max(player.health, 0) +'%';
   		};
		
		   //  Game over text
   		gameOver = game.add.text(window.innerWidth/2,window.innerHeight/2, 'ပန္ၾကိဳးစားပါဦး', { font: '34px Arial', fill: '#fff' });
	 	gameOver.fixedToCamera = true;
		gameOver.anchor.setTo(0.5, 0.5);
		gameOver.visible = false;
		
	
},

	update: function() 
{
		//  Collide the player and the stars with the platforms
    	//	game.physics.arcade.collide(player, platforms);
		//	game.physics.arcade.collide(stars, platforms);
		//	game.physics.arcade.collide(stars, stars);
		//	game.physics.arcade.overlap(player, stars, collectStar, null, this);

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
                        //fireball.physicsEnabled = true;
                        fireball.body.velocity.x = - 180;
						fireball.body.velocity.y = 0;
                        
                    	}
				else
						{
                        fireball.reset(player.x+20, player.y);
                        //fireball.physicsEnabled = true;
                        fireball.body.velocity.x = 180;
                        fireball.body.velocity.y = 0;
                    	}
                    // fireball.body.setCircle(10);
           	}
       	}
   	};
	
	/*	// Update function
/*	function collectStar (player, star) 
	{
    	// Removes the star from the screen
    	star.kill();
    	//  Add and update the score
    	score += 10;
    	scoreText.text = 'ရမွတ္: ' + score ;
		
	player.damage(stars.damageAmount);
		live.render();
		
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
      
	}
	
	// Game Over goodies
	
	
if (score == 200)
	{
		// did we improved our stars in current level?
		game.global.starsArray[game.global.level-1] = 1;
		// if we completed a level and next level is locked - and exists - then unlock it
		game.global.starsArray[game.global.level] = 0;	
		// back to level selection
		
		score = 0;
		game.state.start('LevelSelect');
		if(AdMob) AdMob.showInterstitial();
	
	}
if (score == 30)
	{
		// did we improved our stars in current level?
		game.global.starsArray[game.global.level-1] = 3;
		movies = game.global.starsArray;
		//Save this achievement to local storage
		localStorage.setItem("myokoko",JSON.stringify(movies));
		// back to level selection
		//game.state.start("LevelSelect");
		//score = 0;
		// if(AdMob) AdMob.showInterstitial();
	
	}

	
//}; 
	*/
},
	
};

	
	
	



