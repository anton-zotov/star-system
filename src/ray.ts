import Victor from 'victor';
import { Body } from './body';
import { line, RenderingContext2D } from './canvas-utlis';

export class Ray {
    private v: Victor;

    constructor(private cx, private cy, x: number, y: number) {
        this.v = new Victor(x, y);
        this.v.normalize();
    }

    public draw(ctx: RenderingContext2D, dx = 0, dy = 0): void {
        const end = this.v.clone().multiply(new Victor(1000, 1000));
        line(ctx, this.cx - dx, this.cy - dy, this.cx + end.x - dx, this.cy + end.y - dy, '#FFF5', 3);
    }

    public doesIntersect(planet: Body) {
        let dist = new Victor(planet.x - this.cx, planet.y - this.cy).length();
        let tip = this.v.clone().multiply(new Victor(dist, dist));
        let tipDistToPlanet = new Victor(
            this.cx + tip.x - planet.x,
            this.cy + tip.y - planet.y,
        ).length();
        return tipDistToPlanet <= planet.radius;
    }
}
