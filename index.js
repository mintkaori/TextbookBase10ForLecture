window.onload = function() {
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    img.addEventListener('mouseover', function(event) {
      var audioFile = event.target.getAttribute('data-sound');
      var audio = new Audio(audioFile);
      audio.autoplay = true; // 자동 재생
      audio.play();
    });
  }
}
