


var Main = function(game){

};

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




	

Main.prototype = {
	
	

	create: function() {
		
	
		
	// setting the Camera view bound 
	game.world.setBounds(0, 0, 1920, 1920);
	
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
	
	
	
	
    //  A simple background for our game
    var sky = game.add.sprite(0, 0, 'sky');
	sky.scale.setTo (10, 10);
	
	fireballs = game.add.group();  // add a new group for fireballs
    fireballs.enableBody = true;
	fireballs.createMultiple(500, 'fireball', 0, false);  // create plenty of them hidden and out of the game world
	
   //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height -46, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    //ground.scale.setTo(10, 10);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

   // ledge = platforms.create(-150, 250, 'ground');

    // ledge.body.immovable = true;
	
	ledge = platforms.create(-150, 5, 'diamond');
	ledge.body.immovable = true;
	
	    // The player and its settings
    player = game.add.sprite(100, game.world.height -300, 'dude');
	game.camera.follow(player); //always center player
	
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
	player.anchor.setTo(0.5, 0);
	

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	

    //  Finally some stars to collect
    stars = game.add.group();
	
    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;
	
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
	star.body.gravity.y = 9;

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
  
	//Add Score Text
	scoreText = game.add.text(window.innerWidth / 2, 16, 'ရမွတ္: 0', { fontSize: '10px', align:'center', fill: '#fff' });
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

                buttonleft = game.add.button(40, 312, 'buttonhorizontal', null, this, 0, 1, 0, 1);
                buttonleft.anchor.setTo(0.5, 0.5);
                buttonleft.fixedToCamera = true;
                buttonleft.events.onInputOver.add(function(){left=true;});
                buttonleft.events.onInputOut.add(function(){left=false;});
                buttonleft.events.onInputDown.add(function(){left=true;});
                buttonleft.events.onInputUp.add(function(){left=false;});

                buttonbottomleft = game.add.button(48, 352, 'buttondiagonal', null, this, 6, 4, 6, 4);
                buttonbottomleft.anchor.setTo(0.5, 0.5);
                buttonbottomleft.fixedToCamera = true;
                buttonbottomleft.events.onInputOver.add(function(){left=true;duck=true;});
                buttonbottomleft.events.onInputOut.add(function(){left=false;duck=false;});
                buttonbottomleft.events.onInputDown.add(function(){left=true;duck=true;});
                buttonbottomleft.events.onInputUp.add(function(){left=false;duck=false;});

                buttonright = game.add.button(136, 312, 'buttonhorizontal', null, this, 0, 1, 0, 1);
                buttonright.anchor.setTo(0.5, 0.5);
                buttonright.fixedToCamera = true;
                buttonright.events.onInputOver.add(function(){right=true;});
                buttonright.events.onInputOut.add(function(){right=false;});
                buttonright.events.onInputDown.add(function(){right=true;});
                buttonright.events.onInputUp.add(function(){right=false;});

                buttonbottomright = game.add.button(128, 352, 'buttondiagonal', null, this, 7, 5, 7, 5);
                buttonbottomright.anchor.setTo(0.5, 0.5);
                buttonbottomright.fixedToCamera = true;
                buttonbottomright.events.onInputOver.add(function(){right=true;duck=true;});
                buttonbottomright.events.onInputOut.add(function(){right=false;duck=false;});
                buttonbottomright.events.onInputDown.add(function(){right=true;duck=true;});
                buttonbottomright.events.onInputUp.add(function(){right=false;duck=false;});

                buttondown = game.add.button(88, 360, 'buttonvertical', null, this, 0, 1, 0, 1);
                buttondown.anchor.setTo(0.5, 0.5);
                buttondown.fixedToCamera = true;
                buttondown.events.onInputOver.add(function(){duck=true;});
                buttondown.events.onInputOut.add(function(){duck=false;});
                buttondown.events.onInputDown.add(function(){duck=true;});
                buttondown.events.onInputUp.add(function(){duck=false;});
           

},

	update: function() {
		
		 //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(stars, stars);
	game.physics.arcade.overlap(player, stars, collectStar, null, this);

	 if (left && !duck) {
                //  Move to the left
		player.scale.x = -1;
        player.body.velocity.x = -50;
        player.animations.play('left');
                // player.animations.play('walk');
            }
       else if (right && !duck) {
        player.scale.x = 1;
        player.body.velocity.x = 50;
        player.animations.play('left');
        //player.animations.play('walk');
            } 
      else if (duck && !left && !right) {
                player.body.velocity.x=0;
                //player.animations.play('duck');
            } 
            else if (duck && right) {
                player.scale.x = 1;
                player.body.moveRight(100);
                //player.animations.play('duckwalk');
            }
           else if (duck && left) {
                player.scale.x = -1;
                player.body.moveLeft(100);
                //player.animations.play('duckwalk');
            }
		else
		{
			player.animations.stop();
			player.body.velocity.x=0;
		}
           
           if (jump){ 
		   
		   player.body.velocity.y = - 320;
			}
			
		if (fire){
			
			fire_now();
		}
			// jump_now(); } //player.loadTexture('dude', 5);}  //change to another frame of the spritesheet
            //if (fire){fire_now(); } //player.loadTexture('dude', 8); }
           /* if (duck){ player.body.setCircle(16,0,6);
			}
			else 
				{ player.body.setCircle(22);}  //when ducking create a smaller hitarea - (radius,offsetx,offsety)
           // if (game.input.currentPointers == 0 && !game.input.activePointer.isMouse){ fire=false; right=false; left=false; duck=false; jump=false;} //this works around a "bug" where a button gets stuck in pressed state
        
 //some useful functions
        function jump_now(){  //jump with small delay
            if (game.time.now > nextJump ){
                player.body.moveUp(300);
                nextJump = game.time.now + 800;
            }
        } */
        function fire_now() {
            if (game.time.now > nextFire){
                nextFire = game.time.now + fireRate;
                var fireball = fireballs.getFirstExists(false); // get the first created fireball that no exists atm
                if (fireball){
                    fireball.exists = true;  // come to existance !
                    fireball.lifespan=2500;  // remove the fireball after 2500 milliseconds - back to non-existance
                    if(player.scale.x == -1){  // if player looks to the left - create the fireball on his left side
                        fireball.reset(player.x-20, player.y);
                        //fireball.physicsEnabled = true;
                        fireball.body.velocity.x = -800;
						fireball.body.velocity.y = 180;
                        
                    }else{
                        fireball.reset(player.x+20, player.y);
                        //fireball.physicsEnabled = true;
                        fireball.body.velocity.x = 800;
                        fireball.body.velocity.y = - 180;
                    }
                    // fireball.body.setCircle(10);
                }
            }
        }
		
		
		// preppare and load ad resource in background, e.g. at begining of game level

			
/*	 //  Reset the players velocity (movement)
     player.body.velocity.x = 0;

   if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 2;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    } 
	
	*/

		// Update function
	function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'ရမွတ္: ' + score ;
	
	if (score == 200)
	{
	
		score = 0;
		game.state.start('GameTitle');
		if(AdMob) AdMob.showInterstitial();
	}

};



},


	
	
	gameOver: function(){
	game.state.start('GameOver');
	}

};
	
	
	



