flies = Array();

for (let i = 0; i < population; i++) {
    let fly = new Fly();
    flies.push(fly);
}

const bigFly = new Fly();
bigFly.size = 10;
flies.push(bigFly);

var loop = function () {

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    

    for (i in flies) {
        if (flies[i].love == undefined && attraction_exists) {
            // selecting one fly in array flies
            for (j in flies) {
                if (i != j) {
                    // distance with other flies
                    let distance = flies[j].pos.sub(flies[i].pos).mod;
                    if (flies[j].glow > flies[i].glow) {
                        let intensity = flies[j].glow / (1 + medium_opacity * distance ** 2);
                        if (intensity > flies[i].attraction) {
                            // settin new love
                            console.log("new love");
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
    }
    requestAnimationFrame(loop);
}

loop();