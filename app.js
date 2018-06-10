require('./index.js');

let o = $ytvideo('https://www.youtube.com/watch?v=3M_5oYU-IsU', 'waffle_falling');


o.download('./images').toFrames();
