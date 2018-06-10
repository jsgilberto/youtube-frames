# youtube-frames

Another youtube-video-to-frames module. Inspired by [youtube-video-to-frames](https://www.npmjs.com/package/youtube-video-to-frames) and powered by [ytdl-core](https://www.npmjs.com/package/ytdl).

# Usage

```js
require('./index.js');

const o = $ytvideo('https://www.youtube.com/watch?v=sDj72zqZakE', 'waffle_falling');
o.download().toFrames();
```

# API
## $ytvideo(youtubeURL, videoName)

Returns a simple object with the youtube URL and the given name of the video.

### download(path)

Attempts to download a YouTube video (from the url given) and tries to store it in the path specified. If path is not specified, the video is stored in the root path.

### toFrames(fps)

Attempts to get the video frames (as JPEG) and stores them in the same location given by path.