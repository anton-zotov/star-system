import Victor from 'victor';
import { Body } from './body';
import { circle, createOffscreenCanvas, line, rect, RenderingContext2D } from './canvas-utlis';
import { Ray } from './ray';
import { Star } from './star';

export class Planet implements Body {
    constructor(public x: number, public y: number, public radius: number) {}

    public draw(ctx: RenderingContext2D, stars: Star[], bodies: Body[]): void {
        const creactCanvas = () => createOffscreenCanvas(canvasSize, canvasSize, 0.5, 0.5);

        const canvasSize = this.radius * 3;
        let { canvas: planetCanvas, ctx: planetCtx } = creactCanvas();
        let { canvas: lightMapCanvas, ctx: lightMapCtx } = creactCanvas();

        circle(planetCtx, 0, 0, this.radius, '#00F');

        for (let star of stars) {
            let { canvas: starLightMapCanvas, ctx: starLightMapCtx } = creactCanvas();
            let strait = new Victor(this.x - star.x, this.y - star.y).normalize();

            let gradient = ctx.createLinearGradient(
                0,
                0,
                (strait.x * canvasSize) / 2,
                (strait.y * canvasSize) / 2,
            );
            gradient.addColorStop(0, '#FFF8');
            gradient.addColorStop(0.5, '#FFF0');
            circle(starLightMapCtx, 0, 0, this.radius, gradient);

            let { startX, startY, endX, endY } = this.getPerpCoords(star);
            let steps = this.radius * 5;
            let stepX = (endX - startX) / steps;
            let stepY = (endY - startY) / steps;

            let { canvas: raysCanvas, ctx: raysCtx } = creactCanvas();

            for (let x = startX, y = startY, i = 0; i < steps; x += stepX, y += stepY, i++) {
                let ray = new Ray(star.x, star.y, x - star.x, y - star.y);
                if (bodies.some((body) => body !== this && ray.doesIntersect(body))) continue;
                ray.draw(raysCtx, this.x, this.y);
                // if (debug) {
                // }
            }

            starLightMapCtx.globalCompositeOperation = 'source-atop';
            starLightMapCtx.drawImage(raysCanvas, -canvasSize / 2, -canvasSize / 2);
            lightMapCtx.drawImage(starLightMapCanvas, -canvasSize / 2, -canvasSize / 2);
        }

        planetCtx.globalCompositeOperation = 'destination-in';
        planetCtx.drawImage(lightMapCanvas, -canvasSize / 2, -canvasSize / 2);
        ctx.drawImage(planetCanvas, this.x, this.y);
    }

    private getPerpCoords(star: Star): {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    } {
        let strait = new Victor(this.x - star.x, this.y - star.y);

        let perpendicular = strait
            .rotateDeg(90)
            .normalize()
            .multiply(new Victor(this.radius, this.radius));
        let startX = this.x + perpendicular.x;
        let startY = this.y + perpendicular.y;

        perpendicular.rotateDeg(180);
        let endX = this.x + perpendicular.x;
        let endY = this.y + perpendicular.y;

        return { startX, startY, endX, endY };
    }
}
