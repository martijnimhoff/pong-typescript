function triggerGame() {
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    setInterval(game, 8);
}

let pos1: number, pos2: number, speed: number, baseSpeed: number, score1: number, score2: number, bx: number, by: number, bs: number, vx: number,
    vy: number, sh: number, sw: number, pw1: number, pw2: number;
score1 = score2 = 0;
bx = by = 150;
bs = 10;
speed = 1;
baseSpeed = 1;
vx = vy = 1;
sh = 300;
sw = 400;
pw1 = pw2 = 50;
pos1 = pos2 = (sh / 2) - pw1;

function game(event: Event) {
    let c = <HTMLCanvasElement>document.getElementById('game');
    let ctx: CanvasRenderingContext2D = c.getContext('2d');

    // do black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, sw, sh);

    // score point
    if (bx <= 10) {
        score2++;
        bx = (sw / 2) - bs / 2;
        by = (sh / 2) - bs / 2;
        speed = baseSpeed;
    }

    if (bx >= sw - 10) {
        score1++;
        bx = (sw / 2) - bs / 2;
        by = (sh / 2) - bs / 2;
        speed = baseSpeed;
    }

    // collide top and bottom
    if (by < bs) {
        vy = speed;
    }
    if (by > sh - bs) {
        vy = speed * -1;
    }

    // collide w players
    if (bx <= 21 && by + bs >= pos1 && by < pos1 + pw1) {
        speed += 0.25;
        vx = speed;
    }
    if (bx + bs >= sw - 21 && by + bs >= pos2 && by < pos2 + pw2) {
        speed += 0.25;
        vx = speed * -1;
    }

    // move players
    if (wDown && pos1 >= 9) {
        pos1 -= 2;
    }
    if (sDown && pos1 < sh - 9 - pw1) {
        pos1 += 2;
    }
    if (upDown && pos2 >= 9) {
        pos2 -= 2;
    }
    if (downDown && pos2 < sh - 9 - pw2) {
        pos2 += 2;
    }

    // draw players
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, pos1, 10, pw1);
    ctx.fillRect(sw - 20, pos2, 10, pw2);

    // move ball
    bx += vx;
    by += vy;

    // draw ball
    ctx.fillRect(bx, by, bs, bs);

    // draw score
    ctx.font = "20px Courier New";
    ctx.fillText(String(score1), (sw / 2) - 40, 20);
    ctx.fillText(String(score2), (sw / 2) + 40, 20);
}

let wDown: boolean, sDown: boolean, upDown: boolean, downDown: boolean;
wDown = sDown = upDown = downDown = false;

function keyDown(event: KeyboardEvent) {
    if (event.keyCode === 87) {
        // w
        wDown = true;
    }
    if (event.keyCode === 83) {
        // s
        sDown = true;
    }
    if (event.keyCode === 38) {
        // up
        upDown = true;
    }
    if (event.keyCode === 40) {
        // down
        downDown = true;
    }
}

function keyUp(event: KeyboardEvent) {
    if (event.keyCode === 87) {
        // w
        wDown = false;
    }
    if (event.keyCode === 83) {
        // s
        sDown = false;
    }
    if (event.keyCode === 38) {
        // up
        upDown = false;
    }
    if (event.keyCode === 40) {
        // down
        downDown = false;
    }
}
