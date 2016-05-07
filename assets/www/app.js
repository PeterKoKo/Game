/*
    Date: 2016-01-01
*/
var app = {
    // Some scoped variables

    onDeviceReady : function () {
	
	
		
		// Adding Game after device ready
		
		game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO,'mygame');
   
   
		game.global = {
		
	thumbRows : 4,
	// number of thumbnail cololumns
	thumbCols : 6,
	// width of a thumbnail, in pixels
	thumbWidth : 64,
	// height of a thumbnail, in pixels
	thumbHeight : 64,
	// space among thumbnails, in pixels
	thumbSpacing : 10,
	// array with finished levels and stars collected.
	// 0 = playable yet unfinished level
	// 1, 2, 3 = level finished with 1, 2, 3 stars
	// 4 = locked
	starsArray : [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,],
	// level currently playing
	level : 0
};

		
		//Add all states
				game.state.add("Boot", Boot);
				game.state.add("Preload", Preload);
				game.state.add("GameTitle", GameTitle);
				//game.state.add("Main", Main);
				game.state.add("level1", level1);
				//game.state.add("level2", level2);
				game.state.add("GameOver", GameOver);

				game.state.add("LevelSelect", levelSelect);
				//game.state.add("PlayLevel", playLevel);

				
				//Start the first state
				game.state.start("Boot");
			
	// AdMob Code
	
	if(AdMob) 
	AdMob.prepareInterstitial( {
	adId: "ca-app-pub-5323026967670907/7819836478",
	autoShow: false,
	overlap:true, // overlap the game, so it won't steal space to canvas
	isTesting: false // show a demo ad
	}); 

	app.receivedEvent('deviceready');
	

	// End of AdMob code


         alert("device ready.");
        console.log("device ready.");
        if (device.platform === "iOS") {
            // deals with post-iOS-7 change that covers the status bar
            // http://coenraets.org/blog/2013/09/phonegap-and-cordova-with-ios-7/
            document.body.style.marginTop = "20px";
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay 
            document.addEventListener('DOMContentLoaded', function() { FastClick.attach(document.body); }, false);
        } else if (device.platform == 'browser') {
            console.log("You are using a brower.");
        }

    }
};

// Wait for PhoneGap to load
document.addEventListener("deviceready", app.onDeviceReady, false);

// This JS object is create to support `app.onDeviceReady()`, and the timeout below.
// When `deviceready` fires, this variable is overwritten.
// The hope is that "Cordova/Phonegap" have completed before the timeout.
var device = {platform:'browser'};

// This timeout check to see if `cordova.js` has loaded the `device` plugin.
setTimeout(function() {
        console.log("timeout fired.");
        if (! ('cordova' in device) ) {
            app.onDeviceReady();
        }
    },
    2000);

// Note: this is created last with the hope that the entire DOM has loaded.
// If needed, we could wrap this with a function.
// The best time to load this binding is after the `deviceready` event has fired.
// 



// Codes to save game process in user's phone by local storage method
// It actually took me a whole night to figure this out and get it work for this game! Trust me. :) .
	
// We declare a varible to hold our game prograss data
	 

var three = [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
var film2;

var retrievedData2 = localStorage.getItem("versionFive");
var film2 = JSON.parse(retrievedData2);
	

if(film2 == null)
{
	film2 = three;
	localStorage.setItem("versionFive",JSON.stringify(three));
   
}

alert(film2);

	/*	function intify(film3, fields) 
			{
  				if (typeof(versionThree) == "undefined") 
					return;
		
  				var numFields = fields.length;
  				for (var i = 0; i < numFields; i++) 
					{
    				var field = fields[i];
	
    			if (typeof(versionThree[field]) != "undefined") 
					{
      film3[field] = parseInt(versionThree[field], 10);
    				}
	
				}
  	
  		return film3;
		};
			
		if(film3 == nudefined)
		{
			localStorage.setItem("versionThree",JSON.stringify(three));
		}
		
	var retrievedData = localStorage.getItem("versionThree");
	var film2 = JSON.parse(retrievedData);
//var movies2;
		
// retrieving our data and converting it back into an array
//var retrievedData = localStorage.getItem("versionTwo");
//var moviesTwo = JSON.parse(retrievedData);
 
//Checking if it still is an array
	*/



// End of local storage method code

