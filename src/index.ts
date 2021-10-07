import { Star } from './star';
import './style.css';
import { Planet } from './planet';
import { clearCanvas, createMainCanvas } from './canvas-utlis';

const { canvas, ctx } = createMainCanvas();

const star1 = new Star(100, 100);
const star2 = new Star(300, 100);
const start = [star2];

const venus = new Planet(300, 250, 30);
const earth = new Planet(230, 400, 50);
const mars = new Planet(460, 500, 100);
const planets = [venus, earth, mars];

function step(dt: number) {
    clearCanvas(canvas);

    star1.draw(ctx);
    star2.draw(ctx);

    venus.draw(ctx, start, planets);
    earth.draw(ctx, start, planets);
    mars.draw(ctx, start, planets);

    star2.x += 0.0003 * dt;
    star2.y += 0.0002 * dt;

    requestAnimationFrame(step);
}

requestAnimationFrame(step);
