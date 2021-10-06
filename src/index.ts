import { Star } from './star';
import './style.css';
import { Planet } from './planet';
import { clearCanvas, createCanvas } from './canvas-utlis';

const canvas = createCanvas();
const ctx = canvas.getContext('2d');
clearCanvas(canvas);

// ctx.clearRect(0, 0, canvas.width, canvas.height)
// ctx.globalCompositeOperation = 'source-atop';

const star = new Star(100, 100);
star.draw(ctx);

const venus = new Planet(300, 250, 30);
venus.draw(ctx, [star], []);

const earth = new Planet(500, 500, 50);
earth.draw(ctx, [star], [venus, earth], true);
