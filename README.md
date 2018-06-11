![YOUTUBE!](https://images.fastcompany.net/image/upload/w_937,ar_16:9,c_fill,g_auto,f_auto,q_auto,fl_lossy/fc/3020553-poster-youtubeposter.jpg)
# youtube-frames
Another youtube-video-to-frames module. Inspired by [youtube-video-to-frames](https://www.npmjs.com/package/youtube-video-to-frames) and powered by [ytdl-core](https://www.npmjs.com/package/ytdl).

# Install

To use this module you need to have Node.js installed in your computer. You can download the latest version [here](https://nodejs.org/en/download/current/). Also this module depends on ffmpeg (assumes ffmpeg is in your $PATH variable), you can download it [here](https://www.ffmpeg.org/download.html).

Once you have Node.js and ffmpeg installed (and in your $PATH). Open your terminal and type the following commands(without the '$' symbol):
```shell
$ mkdir name_your_folder  # create a directory
$ cd name_your_folder     # go into the directory
$ npm i youtube-frames   # install module inside directory
```

# Usage
The following code, will download the video from https://www.youtube.com/watch?v=sDj72zqZakE and name it waffle_falling. Then it's going to get the frames of the downloaded video.
```js
require('youtube-frames');

const o = $ytvideo('https://www.youtube.com/watch?v=sDj72zqZakE', 'waffle_falling');
o.download().toFrames();
```

# API
## $ytvideo(youtubeURL, videoName)

Returns a simple object with the youtube URL and the given name of the video.

### download(path)

Attempts to download a YouTube video (from the url given) and tries to store it in the path specified. If path is not specified, the video is stored in the root path.
* path: must be a string containing the path to the directory where the youtube video is going to be downloaded.
Examples:
```js
.download() // default path: ./
.download("./dir") // if path doesn't exist, it will create it: ./dir/
```

### toFrames(fps, begin, end)

Attempts to get the video frames (as JPEG) and stores them in the same location given by path. This function can take 3 parameters:
* fps: must be a number, it specifies the number of frames to get per second. | [fps default value] = 1
* begin: must be a number (seconds) or string ("00:01:40"). It specifies the starting point to get the frames. | [begin default value] = 0
* end: must be a number (seconds) or string ("00:00:03"). It specifies the ending point to get the frames. | [end default value] = length of video
Example:
```js
.toFrames(15) // gets 15 frames per second and uses the default values for begin and end
.toFrames(30, 1, 3) // gets 30 frames per second and starts getting frames beginning from 1 to 3.
.toFrames(2, "00:00:01", "00:00:03") // gets 2 frames per second and starts getting frames beggining from 1 to 3.
.toFrames() // gets 1 frame per second for the entire video.
```
