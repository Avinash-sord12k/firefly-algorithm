flies = Array();

for (let i = 0; i < population; i++) {
    let fly = new Fly();
    flies.push(fly);
}

var loop = function () {

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    for (i in flies) {

        if (mousePos.sub(flies[i].pos).mod < flies[i].size + 30) {
            flies[i].drawDetailBox();
        }
        if (flies[i].love == undefined && attraction_exists) {
            // selecting one fly in array flies
            for (j in flies) {
                if (i != j) {
                    // distance with other flies
                    let distance = flies[j].pos.sub(flies[i].pos).mod;
                    // if the other fly is dimmer than the current target fly
                    if (flies[j].glow > flies[i].glow) {
                        let intensity = flies[j].glow / (1 + medium_opacity * distance ** 2);
                        // settin new love
                        if (intensity > flies[i].attraction) {
                            flies[i].attraction = intensity;
                            flies[i].target_pos = flies[j].pos;
                            flies[i].love = flies[j];
                        }
                    }
                }
            }
        }
        flies[i].update();
        flies[i].draw();
        if (flies[i].love != undefined) { flies[i].draw_line_to_lover(flies[i].love.pos); }

        drawFps();
        framIndex++;

        // if (framIndex % 5 == 0) {
        //     if (fps < 30) {
        //         flies.pop();
        //     } else {
        //         if (flies.length < population) {
        //             let fly = new Fly();
        //             flies.push(fly);
        //         }
        //     }
        // }
    }

    requestAnimationFrame(loop);
}

loop();