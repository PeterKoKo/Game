var Main = function(game){

};

var score = 0;
var scoreText; 

Main.prototype = {
	
	

	create: function() {


    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');
	
	
   //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height -46, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    //ground.scale.setTo(2, 2);

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

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 2;
    player.body.collideWorldBounds = true;
	player.anchor.setTo(0.5, 0);
	

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	game.camera.follow(player); //always center player
	

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
	cursors = game.input.keyboard.createCursorKeys();
  
	//Add Score Text
	scoreText = game.add.text(20, 16, 'ရမွတ္: 0', { fontSize: '10px', align:'center', fill: '#fff' });

 

},

	update: function() {
		
		 //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(stars, stars);
	game.physics.arcade.overlap(player, stars, collectStar, null, this);

	 //  Reset the players velocity (movement)
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
	

		// Update function
	function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'ရမွတ္: ' + score ;
	
	if (score == 100)
	{
		game.state.start('GameTitle');
	}

};

function gameEnd (){
	
	if (score == 100)
	{
		game.state.start('GameTitle');
	}
};

},


	
	
	gameOver: function(){
	game.state.start('GameOver');
	}

};
	
	
	



