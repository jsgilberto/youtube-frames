require('./index.js');

const o = $ytvideo('https://www.youtube.com/watch?v=sDj72zqZakE', 'waffle_falling');
//const p = $ytvideo('https://www.youtube.com/watch?v=3ueqncw103A', 'bread_falling');

o.download('./images1').toFrames(1, 4, 6);
//p.download('./images2').toFrames();
