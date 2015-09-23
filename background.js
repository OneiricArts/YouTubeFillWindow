



/*
  What happens when the extension icon is clicked ...
*/
chrome.browserAction.onClicked.addListener(function(){  

	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    	
    	var url = tabs[0].url;
    	var urlArr = url.split('/');

    	if(urlArr.length < 4) {return;}

    	var urlHost = urlArr[2]; // www.youtube.com --or-- m.youtube.com
    	var urlHostArr = urlHost.split('.'); // www youtube com

    	if(urlHostArr[1] !== "youtube") {return;}

    	var urlYouTubeVid = urlArr[3]; // watch?v=blah_blah --or-- embed/_blah

    	var urlYouTubeVidArr = urlYouTubeVid.split('=');

    	//console.log(urlYouTubeVidArr.length);
    	//console.log(urlYouTubeVidArr);

		var embedVideoURl = urlArr[4];


    	var newUrlArr = urlArr.splice(0,3);
    	var newUrl = newUrlArr.join('/') + '/';

    	//console.log(newUrl);

    	if(urlYouTubeVidArr.length == 2) { // is watch?v=...
    		newUrl += 'embed/' + urlYouTubeVidArr[1];
    	}

    	else if(urlYouTubeVidArr.length == 1) {
    		newUrl += 'watch?v=' + embedVideoURl;
    	}

    	else {
    		return;
    	}

    	chrome.tabs.update({
	        url: newUrl
	    });
	});

});



