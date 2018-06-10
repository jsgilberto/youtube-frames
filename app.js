require('./index.js');

const o = $ytvideo('https://www.youtube.com/watch?v=sDj72zqZakE', 'waffle_falling');
const p = $ytvideo('https://www.youtube.com/watch?v=3ueqncw103A', 'bread_falling');
const k = $ytvideo('https://www.youtube.com/watch?v=B7bqAsxee4I', 'person_falling')

o.download('./images1/img').toFrames();
p.download('./images2').toFrames();
k.download('./images3').toFrames();
