/* var GameOver = function(game){};

GameOver.prototype = {

  	create: function(){

	},

	restartGame: function(){
		this.game.state.start("GameTitle");
	}
	
}; */

var GameOver = function(game){};

GameOver.prototype = {
	
	
  preload: function () {
    this.optionCount = 1;
    this.creditCount = 0;

  },

  addCredit: function(task, author) {
    var authorStyle = { fontSize: '40px', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var taskStyle = { fontSize: '20px', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var authorText = game.add.text(game.world.centerX, 400, author, authorStyle);
    var taskText = game.add.text(game.world.centerX, 450, task, taskStyle);
    authorText.anchor.setTo(0.5);
    authorText.stroke = "rgba(0,0,0,0)";
    authorText.strokeThickness = 4;
    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(0,0,0,0)";
    taskText.strokeThickness = 4;
    game.add.tween(authorText).to( { y: -300 }, 30000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    game.add.tween(taskText).to( { y: -200 }, 30000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    this.creditCount ++;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { fontSize: '30px', fill: 'white', align: 'right', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(10, (this.optionCount * 80) + 50, text, optionStyle);

    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
  },


	create: function(){
		
		
		
	this.stage.disableVisibilityChange = true;
   
    var bg = game.add.sprite(0, 0, 'dude');
    this.addCredit('MK GAME ZONE', 'Powered By');
    this.addCredit('ကိုမ်ိဳး', 'Developed By');
    this.addCredit('Myanmar', 'PRODUCTION');
    this.addCredit('KO MYO', 'MUSIC');
    this.addCredit('', '');
    this.addCredit('', '');
    this.addMenuOption('BACK', function (e) {
      game.state.start("GameTitle");
    });
    //game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 1000);
  
		
	},

	
};
