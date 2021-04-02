var hidden = false;

function calculateRPM(x, start, end) {
    let degree = start + x * (end - start);
    return degree;
}

function calculateFUEL(x, start, end) {
    let percentage = x / 100;
    let help = start * percentage;
    let degree = 0.48 - help;
    return degree;
}

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;
var ctx = canvas.getContext('2d');
function drawSpeedo(speed, gear, rpm, fuel, isElectric, isEngineOn, mileage) {
    if (speed == undefined) {
        return false;
    } else {
        speed = Math.floor(speed * 3.6);
    }
    if (!isEngineOn) {
        rpm = 0;
    }
    ctx.clearRect(0, 0, 800, 800);
    ctx.beginPath();
    ctx.arc(400, 400, 370, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 12;
    ctx.fill();
    ctx.strokeStyle = '#29abe2';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(400, 400, 340, 0.53 * Math.PI, calculateRPM(rpm, 0.53, 1.48) * Math.PI, false);
    ctx.strokeStyle = '#f7931e';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(400, 400, 340, 0.48 * Math.PI, calculateFUEL(fuel, 0.48, 0) * Math.PI, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = '#f7931e';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(263.5, 472.0);
    ctx.lineTo(536.0, 472.0);
    ctx.bezierCurveTo(547.5, 472.0, 556.7, 462.8, 556.7, 451.4);
    ctx.lineTo(556.7, 348.2);
    ctx.bezierCurveTo(556.7, 336.8, 547.5, 327.5, 536.0, 327.5);
    ctx.lineTo(263.5, 327.5);
    ctx.bezierCurveTo(252.1, 327.5, 242.9, 336.8, 242.9, 348.2);
    ctx.lineTo(242.9, 451.4);
    ctx.bezierCurveTo(242.9, 462.8, 252.1, 472.0, 263.5, 472.0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(311.8, 680.0);
    ctx.lineTo(487.8, 680.0);
    ctx.bezierCurveTo(500.4, 680.0, 510.7, 669.7, 510.7, 657.1);
    ctx.lineTo(510.7, 600.8);
    ctx.bezierCurveTo(510.7, 588.1, 500.4, 577.9, 487.8, 577.9);
    ctx.lineTo(311.8, 577.9);
    ctx.bezierCurveTo(299.1, 577.9, 288.9, 588.1, 288.9, 600.8);
    ctx.lineTo(288.9, 657.1);
    ctx.bezierCurveTo(288.9, 669.7, 299.1, 680.0, 311.8, 680.0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.font = '8vh lexend';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(speed, 400, 405);
    ctx.font = '6vh lexend';
    ctx.fillText(mileage + ' km', 400, 540);
    ctx.font = '4vh lexend';
    ctx.fillText('km/h', 400, 450);
    ctx.fillText('ALT', 400, 640);
    if (gear == 0 && speed > 0) {
        ctx.fillStyle = 'white';
        ctx.font = '9vh lexend';
        ctx.fillText('R', 400, 220);

        ctx.fillStyle = 'white';
        ctx.font = '7vh lexend';
        ctx.fillText('N', 460, 220);
    } else if (gear == 0 && speed == 0) {
        ctx.fillStyle = 'white';
        ctx.font = '9vh lexend';
        ctx.fillText('N', 400, 220);

        ctx.fillStyle = 'white';
        ctx.font = '7vh lexend';
        ctx.fillText('R', 340, 220);

        ctx.font = '7vh lexend';
        ctx.fillText(parseInt(gear) + 1, 460, 220);
    } else if (gear - 1 <= 0) {
        ctx.fillStyle = 'white';
        ctx.font = '9vh lexend';
        ctx.fillText(gear, 400, 220);

        ctx.fillStyle = 'white';
        ctx.font = '7vh lexend';
        ctx.fillText('R', 340, 220);
        if (!isElectric) {
            ctx.font = '7vh lexend';
            ctx.fillText(parseInt(gear) + 1, 460, 220);
        }
    } else {
        ctx.font = '9vh lexend';
        ctx.fillStyle = 'white';
        ctx.fillText(gear, 400, 220);

        ctx.font = '7vh lexend';
        ctx.fillStyle = 'white';
        ctx.fillText(gear - 1, 340, 220);
        if (parseInt(gear) + 1 < 7) {
            ctx.font = '7vh lexend';
            ctx.fillText(parseInt(gear) + 1, 460, 220);
        }
    }
}

//input functions for alt:v (custom online engine for "Grand Theft Auto V")

if ('alt' in window) {
    alt.on(
        'drawSpeedometer',
        (spd, gear, rpm, fuel, isElectric, isEngineOn, mileage) => {
            drawSpeedo(spd, gear, rpm, fuel, isElectric, isEngineOn, mileage);
        }
    );

    alt.on('showSpeedometer', toggle => {
        if (toggle) {
            alt.emit('speedoShown');
            canvas.className = 'show';
        } else {
            alt.emit('speedoHided');
            canvas.className = 'hidden';
        }
    });
}
