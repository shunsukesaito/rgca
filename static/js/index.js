window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})


$(window).on("load", function(){
  // Reset gifs once everything is loaded to synchronize playback.
  $('.preload').attr('src', function(i, a){
      $(this).attr('src','').removeClass('preload').attr('src', a);
  });

  $('.author-portrait').each(function() {
    $(this).mouseover(function() {
        $(this).find('.depth').css('top', '-100%');
    });
    $(this).mouseout(function() {
        $(this).find('.depth').css('top', '0%');
    });
  });

  // Create two input elements for the sliders
  const xSlider = $('<input>').attr({
    type: 'range',
    min: 0,
    max: 19,
    value: 0
  });
  const xLabel = $('<label>').text('View points');
  const xWrapper = $('<div>').addClass('slider-wrapper').append(xSlider, xLabel);
  const ySlider = $('<input>').attr({
    type: 'range',
    min: 0,
    max: 9,
    value: 0
  });
  const yLabel = $('<label>').text('Facial expression');
  const yWrapper = $('<div>').addClass('slider-wrapper').append(ySlider, yLabel);
  const zSlider = $('<input>').attr({
    type: 'range',
    min: 0,
    max: 9,
    value: 0
  });
  const zLabel = $('<label>').text('Light direction');
  const zWrapper = $('<div>').addClass('slider-wrapper').append(zSlider, zLabel);
  $('#sliders').append(xWrapper, yWrapper, zWrapper);

  // Update the cursor position based on the slider values
  onInput = function() {
    let x = xSlider.val();
    let y = ySlider.val();
    let z = zSlider.val();
    let point = { x: x, y: y, z: z };
    updateHyperGrid(point);
  };

  xSlider.on('input', onInput);
  ySlider.on('input', onInput);
  zSlider.on('input', onInput);

});

Number.prototype.clamp = function(min, max) {
return Math.min(Math.max(this, min), max);
};
function updateHyperGrid(point) {
  let top =  point.y  * 100 + point.z * 10 * 100;
  let left = point.x  * 100;
    
$('.hyper-grid-rgb > img').css('left', -left + '%');
$('.hyper-grid-rgb > img').css('top', -top + '%');
}
