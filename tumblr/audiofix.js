// fix tumblr audio fuckup
 function audio() {
  x = document.getElementsByClassName('tumblr_audio_player');
  for (i = 0; i<x.length; i++) {
	// x[i].height = 31;
	y = x[i].contentDocument;
	/* if (y.getElementsByClassName('audio-image').length > 0) {
		y.getElementsByClassName('audio-image')[0].style.display = 'none';
	}
	y.getElementsByClassName('audio-player')[0].style.marginRight = 0;
	y.getElementsByClassName('audio-player')[0].style.height = '31px';
	y.getElementsByClassName('audio-player')[0].style.minHeight = '31px';
	y.getElementsByClassName('audio-player')[0].style.paddingLeft = '3px'; */
	y.getElementsByClassName('audio-player')[0].style.background = '#000';
	y.getElementsByClassName('progress')[0].style.background = '#333';
	/* y.getElementsByClassName('track-name')[0].style.display = 'none';
	y.getElementsByClassName('track-artist')[0].style.display = 'none';
	y.getElementsByClassName('play-pause')[0].style.fontSize = '20px'; */
	y.getElementsByClassName('play-pause')[0].style.color = '#fff';
	y.getElementsByClassName('audio-info')[0].style.color = '#fff';
   }
  }