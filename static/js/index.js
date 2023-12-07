window.HELP_IMPROVE_VIDEOJS = false;

$(window).on("load", function(){
  // Reset gifs once everything is loaded to synchronize playback.
  $('.preload').attr('src', function(i, a){
      $(this).attr('src','').removeClass('preload').attr('src', a);
  });

  // Create two input elements for the sliders
  const xSlider = $('<input>').attr({
    type: 'range',
    min: 0,
    max: 9,
    value: 4
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
    max: 19,
    value: 10
  });
  const zLabel = $('<label>').text('Light direction');
  const zWrapper = $('<div>').addClass('slider-wrapper').append(zSlider, zLabel);
  $('#sliders').append(xWrapper, yWrapper, zWrapper);

  // Update the cursor position based on the slider values
  onInput = function() {
    let x = parseInt(xSlider.val());
    let y = parseInt(ySlider.val());
    let z = parseInt(zSlider.val());
    let point = { x: x, y: y, z: z };
    updateImage(point);
  };

  const video = document.querySelector("#interact");
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const updateCanvas = (now, metadata) => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    video.requestVideoFrameCallback(updateCanvas);
  };
  video.requestVideoFrameCallback(updateCanvas);

  const updateImage = (point) => {
    video.currentTime = (point.x*20 + point.y*10*20 + point.z);
  }

  xSlider.on('input', onInput);
  ySlider.on('input', onInput);
  zSlider.on('input', onInput);

  xSlider.value = 4;
  zSlider.value = 10;
  onInput();

});

Number.prototype.clamp = function(min, max) {
return Math.min(Math.max(this, min), max);
};
