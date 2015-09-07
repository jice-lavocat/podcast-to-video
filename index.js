var videoshow = require('videoshow')
var glob = require("glob")

var rootFolder = "episodes/713/";

var images = [
  'step1.jpg',
  'step2.jpg',
  'step3.jpg',
  'step4.jpg'
]


// options is optional
var imagesPattern = rootFolder + "*.png"


var videoOptions = {
  fps: 25,
  loop: 5, // seconds
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


glob(imagesPattern, function (er, images) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.

  console.log(images);
  var lenImages = images.length;





  // Video Generation
  videoshow(images, videoOptions)
  .audio(rootFolder + '713.mp3', audioParams)
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



})