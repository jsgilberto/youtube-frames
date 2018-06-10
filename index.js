// Immediately Invoked Function Expression
(function(g){
  var ytdl = require('ytdl-core');
  var fs = require('fs');
  var spawn = require('child_process').spawn;

  const $ytvideo = function(youtubeURL, videoName){

    return new $ytvideo.init(youtubeURL, videoName);

  };

  // safely create directory
  const mkdirSync = function (dir) {
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
  };


  $ytvideo.prototype = {
    // Download video from YouTube
    download: function(path){
      const self = this;
      self.path = path || './';

      if (self.path !== './' && self.path){
        mkdirSync(self.path);
      }
      
      // create a promise
      self.prom = new Promise(function(resolve){

        let video = ytdl(self.youtubeURL);
        let vpipe = video.pipe(fs.createWriteStream(`${self.path}/${self.videoName}.mp4`));
        
        video.on('progress', function(chunkLength, downloaded, total){

          const floatDownloaded = downloaded / total;
          console.log(`${self.videoName} - Download progress: ${parseFloat(floatDownloaded*100).toFixed(2)} %`);

        });

        video.on('error', function(err){

          console.log("\nThere was an error downloading.\n");
          throw err;

        });

        video.on('end', function(){

          console.log(`\nFinished downloading: ${self.videoName}\n`);

        });

        vpipe.on('finish', function(){

          console.log(`Finished writing ${self.videoName}.mp4 to disk`);
          resolve();

        });
        /* videoWriteStream.on('open', (data) => {
          console.log(`Downloading ${self.videoName}`);
        });
        videoWriteStream.on('error', (err) => {
          console.log("ERROR!!!!!");
        });
        videoWriteStream.on('close', () => {
          console.log(`Finished downloading ${self.videoName}`);
          resolve();
        }); */
      });
      return self;
    },

    toFrames: function(fps){
      var self = this;
      console.log(self);
      self.convertToFrames(fps, self.prom);
      return self;
    },

    convertToFrames: function(fps, promise) {
      
      var self = this;
      
      fps = fps || 1
      if (typeof fps !== 'number') {
        throw "fps argument must be a number"
      }
      else {
        String(fps);
      }
  
      function getFrames(){

        console.log(`Video Frame Process of ${self.videoName}`);

        let ffmpegVideoFrameProcess = spawn('ffmpeg', [
          '-i', `${self.path}/${self.videoName}.mp4`,
          '-f', 'image2',
          '-bt', '20M',
          '-vf', `fps=${fps}`,
          `${self.path}/${self.videoName}%03d.jpg`,
          '-loglevel', 'panic',
          '-nostdin'
        ]);
        /* ffmpegVideoFrameProcess.stdout.on('data', (data) => {
          console.log(data.toString());
        });
      
        ffmpegVideoFrameProcess.stderr.on('error', (err) => {
          console.log(err.toString());
        });
      
        ffmpegVideoFrameProcess.stdout.on('close', (data) => {
          process.exit()
        }); */
      }

      if(promise){
        promise.then(getFrames);
      }
      
    }
  };

  // this is the object created when you call $ytvideo
  $ytvideo.init = function(youtubeURL, videoName, path){
    this.youtubeURL = youtubeURL;
    this.videoName = videoName || 'video';
    this.path = path || './';
  }

  $ytvideo.init.prototype = $ytvideo.prototype;

  g.$ytvideo = g.$yt = $ytvideo;

}(global));
