import Victor from 'victor';
import { Body } from './body';
import { line } from './canvas-utlis';

export class Ray {
    private v: Victor;

    constructor(private cx, private cy, x: number, y: number) {
        this.v = new Victor(x, y);
        this.v.normalize();
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const end = this.v.clone().multiply(new Victor(1000, 1000));
        line(ctx, this.cx, this.cy, this.cx + end.x, this.cy + end.y, '#FFF');
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
