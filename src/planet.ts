import Victor from 'victor';
import { Body } from './body';
import { circle, line } from './canvas-utlis';
import { Ray } from './ray';
import { Star } from './star';

export class Planet implements Body {
    constructor(public x: number, public y: number, public radius: number) {}

    public draw(ctx: CanvasRenderingContext2D, stars: Star[], bodies: Body[], debug = false): void {
        circle(ctx, this.x, this.y, this.radius, '#77f');

        for (let star of stars) {
            let { startX, startY, endX, endY } = this.getPerpCoords(star);
            let steps = this.radius;
            let stepX = (endX - startX) / steps;
            let stepY = (endY - startY) / steps;
            if (debug) line(ctx, startX, startY, endX, endY, '#fff');

            for (let x = startX, y = startY, i = 0; i < steps; x += stepX, y += stepY, i++) {
                let ray = new Ray(star.x, star.y, x - star.x, y - star.y);
                if (bodies.some((body) => body !== this && ray.doesIntersect(body))) continue;
                if (debug) ray.draw(ctx);
            }
        }
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
