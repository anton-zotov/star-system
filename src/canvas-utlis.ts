export type RenderingContext2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
export type FillStyle = string | CanvasGradient;

export function line(
    ctx: RenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    lineWidth = 1,
) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export function circle(ctx: RenderingContext2D, x: number, y: number, r: number, color: FillStyle) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}

export function rect(
    ctx: RenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    color: FillStyle,
) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

export function clearCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#005';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function createMainCanvas() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.id = 'main-canvas';
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    document.body.appendChild(canvas);
    return { canvas, ctx };
}

export function createOffscreenCanvas(width, height, centerX = 0, centerY = 0) {
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.translate(centerX * width, centerY * height);
    return { canvas, ctx };
}
