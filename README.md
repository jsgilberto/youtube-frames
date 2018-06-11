# youtube-frames

Another youtube-video-to-frames module. Inspired by [youtube-video-to-frames](https://www.npmjs.com/package/youtube-video-to-frames) and powered by [ytdl-core](https://www.npmjs.com/package/ytdl).

# Install

To use this module you need to have Node.js installed in your computer. You can download the latest version [here](https://nodejs.org/en/download/current/).

Once you have Node.js installed, you should be able to verify your Node.js version. Open your terminal and type the following (without the '$' symbol):
```shell
$ node -v
```
If the command above does not return an error, you are ready to go!
Now that you have Node.js installed and ready to use, the next step is to clone the repository in a directory of your choice; as an example, I'm going to create a directory called youtube-frames, then I'm going to move inside that directory and clone the repository inside:
```shell
$ mkdir youtube-frames
$ cd youtube-frames
youtube-frames$ git clone https://github.com/jsgilberto/youtube-frames.git
```
After the repository gets cloned in your computer, the next step is to install the dependencies of the project. In order to it, type the following command (npm is a package manager for Node.js, and comes with Node.js):
```shell
youtube-frames$ npm install
```
Once the dependencies are successfully installed, try running the following command in your terminal:
```shell
youtube-frames$ node example.js
```
That will run an example of the implementation of the module. The example will create 2 folders called, images1 and images2. Inside those folders you are going to find the youtube videos downloaded and the images of every second of the video.

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