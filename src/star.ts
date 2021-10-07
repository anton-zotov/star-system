import { circle, RenderingContext2D } from './canvas-utlis';

export class Star {
    constructor(public x: number, public y: number) {}

    public draw(ctx: RenderingContext2D): void {
        circle(ctx, this.x, this.y, 50, '#ff0');
    }
}
