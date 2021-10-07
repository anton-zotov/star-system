import { Star } from './star';
import './style.css';
import { Planet } from './planet';
import { clearCanvas, createMainCanvas } from './canvas-utlis';

const { canvas, ctx } = createMainCanvas();
clearCanvas(canvas);

const star1 = new Star(100, 100);
star1.draw(ctx);

const star2 = new Star(300, 100);
star2.draw(ctx);

const start = [star1, star2];

const venus = new Planet(300, 250, 30);
venus.draw(ctx, start, []);

const earth = new Planet(230, 400, 50);
earth.draw(ctx, start, [venus, earth]);

const mars = new Planet(460, 500, 100);
mars.draw(ctx, start, [venus, earth, mars]);
