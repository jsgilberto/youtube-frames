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
      });
      return self;
    },

    toFrames: function(fps, begin, end){
      begin = begin || '00:00:00';
      const self = this;
      self.fps = fps || 1;

      if (typeof self.fps !== 'number') {
        throw "fps argument must be a number"
      }
      else {
        self.fps = String(self.fps);
      }

      // spawn ffmpeg to get frames from video
      function getFrames(){
        console.log(`Starting Video Frame Process of ${self.videoName}`);

        let ffmpegProcess = spawn('ffmpeg', [
          '-i', `${self.path}/${self.videoName}.mp4`,
          '-ss', `${begin}`,
          '-f', 'image2',
          '-bt', '20M',
          '-vf', `fps=${self.fps}`,
          `${self.path}/${self.videoName}%03d.jpg`,
          '-loglevel', 'panic',
          '-nostdin'
        ]);

        ffmpegProcess.stdout.on('data', (data) => {
          console.log(data.toString());
        });
      
        ffmpegProcess.stderr.on('error', (err) => {
          console.log(err.toString());
        });

        ffmpegProcess.stdout.on('close', () => {
          console.log(`Finished Video Frame Process of ${self.videoName}`);
        });
      };

      if(self.prom){
        self.prom.then(getFrames);
      }
      else{
        getFrames();
      }

      return self;
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
