var videoshow = require('videoshow')
var glob = require("glob")
var probe = require('node-ffprobe');

var rootFolder = "episodes/713/";

var logo = 'shared/bandeau.png';
var intro = "shared/intro.mp4";

// options is optional
var imagesPattern = rootFolder + "*.png"
var images = glob.sync(imagesPattern);
var imagesInit = images;   // Duplicate the list for long loop construction
var imageNumber = images.length;
var mp3File = rootFolder + '713.mp3';

var imageDisplayMaxTime = 15;
var imageDisplayMinTime = 3;



probe(mp3File, function(err, probeData) {
    mp3Duration = probeData.format.duration;
    console.log(mp3Duration);

    var loopTime = mp3Duration / imageNumber ;


    if (loopTime < imageDisplayMinTime){
      console.log("There are too many images, they will be displayed for a very short time");
    }

    while (loopTime > imageDisplayMaxTime){
      images = images.concat(imagesInit);
      imageNumber = images.length;
      loopTime = mp3Duration / imageNumber ;
      console.log(images);
    }

    var videoOptions = {
      fps: 25,
      loop: loopTime, // seconds
      //loop: 5, // seconds
      transition: true,
      transitionDuration: 1, // seconds
      videoBitrate: 1024,
      videoCodec: 'libx264',
      size: '640x?',
      audioBitrate: '128k',
      audioChannels: 2,
      format: 'mp4'
    }

    var audioParams = {
      fade: true,
      delay: 2 // seconds
    }



  // Video Generation
  videoshow(imagesInit, videoOptions)
  //videoshow(images, videoOptions)
  .audio(mp3File, audioParams)
  .logo(logo)
  .input(intro)
  .save(rootFolder + 'video.mp4')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Video created in:', output)
  })


});
