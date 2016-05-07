var admobid = {};

// TODO: replace the following ad units with your own
if( /(android)/i.test(navigator.userAgent) ) { 
  admobid = { // for Android
    banner: 'ca-app-pub-5323026967670907/7819836478',
    interstitial: 'ca-app-pub-5323026967670907/3250036078'
  };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
  admobid = { // for iOS
    banner: '',
    interstitial: ''
  };
} else {
  admobid = { // for Windows Phone
    banner: '',
    interstitial: ''
  };
}

function initApp() {
  if (! AdMob ) { alert( 'admob plugin not ready' ); return; }

  // this will create a banner on startup
  AdMob.createBanner( {
    adId: admobid.banner,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    isTesting: false, // TODO: remove this line when release
    overlap: false,
    offsetTopBar: false,
    bgColor: 'black'
	autoshow: false,
  } );

  // this will load a full screen ad on startup
  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    isTesting: false, // TODO: remove this line when release
    overlap: true,
	autoShow: false,
  });
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}
