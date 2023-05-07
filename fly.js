function Fly() {

    this.size = random([4, 7]);
    this.pos = new Vector(random([100, width - 100]), random([100, height - 100]));
    this.vel = new Vector(random([1, 4], true) / this.size, random([1, 4], true) / this.size);
    this.acc = new Vector(0, 0);
    this.color = "#fff500";

    this.glow = this.size;
    this.target_pos = undefined;
    this.attraction = 0;
    this.love = undefined;

    this.attraction_memory = random([attractoin_memory_min, attractoin_memory_min + attraction_memory_gap]);
    this.direction_mood = 0;
    this.back_to_screen_redius = random([80, 140]);

    this.wing_freq = this.wing_freq_const = this.size;
    this.wing_phase = false;
    this.fapp_freq = random([2, 6]);


    this.update = function () {
        // moving the fly with its speed and acceleration.
        this.pos = this.pos.add(this.vel);
        this.vel = this.vel.add(this.acc);

        (this.vel.mod > 3) ? this.vel = this.vel.intensify(3) : null;

        // stopping the fly if it is approaching the wall.
        if (this.vel.mod > 3 && (((this.pos.x < width - 100) || (this.pos.x > 100)) || ((this.pos.y > height - 100) || (this.pos.y < 100)))) {
            this.acc = this.vel.dir().reverse();
            // console.log("reversed");
        }
        // when it is very near or out of the wall, it will come back to the screen.
        if ((this.pos.x > width - 100) || (this.pos.x < 100) || (this.pos.y > height - 100) || (this.pos.y < 100)) {


            if (((this.vel.dot(x_axis) > 0) && (this.pos.y < 100))) {

                this.acc = this.vel.n_dir().intensify((this.vel.mod ** 2) / (this.back_to_screen_redius));
            }

            else if (((this.vel.dot(x_axis) < 0) && (this.pos.y < offset))) {
                this.acc = this.vel.n_dir().reverse().intensify((this.vel.mod ** 2) / (this.back_to_screen_redius));
            }


            if ((this.vel.dot(x_axis) > 0) && (this.pos.y > height - offset)) {
                this.acc = this.vel.n_dir().reverse().intensify((this.vel.mod ** 2) / (this.back_to_screen_redius));
            }

            else if (((this.vel.dot(x_axis) < 0) && (this.pos.y > height - offset))) {
                this.acc = this.vel.n_dir().intensify((this.vel.mod ** 2) / (this.back_to_screen_redius));
            }

            if (((this.vel.dot(y_axis) > 0) && (this.pos.x < offset))) {
                this.acc = this.vel.n_dir().reverse().intensify((this.vel.mod ** 2) / (this.back_to_screen_redius));
            }

            else if (((this.vel.dot(y_axis) < 0) && (this.pos.x < offset))) {
                this.acc = this.vel.n_dir().intensify((this.vel.mod ** 2) / (this.back_to_screen_redius));
            }

            if (((this.vel.dot(y_axis) > 0) && (this.pos.x > width - offset))) {
                this.acc = this.vel.n_dir().intensify((this.vel.mod ** 2) / (this.back_to_screen_redius));
            }

            else if (((this.vel.dot(y_axis) < 0) && (this.pos.x > width - offset))) {
                this.acc = this.vel.n_dir().reverse().intensify((this.vel.mod ** 2) / (this.back_to_screen_redius));
            }

        }

        // if it is not near the wall, it will move randomly.
        else {

            this.acc = this.acc.null();

            // console.log(this.attraction_memory, this.love, this.direction_mood);

            if (this.attraction_memory <= 0 && this.direction_mood == 0) {
                this.direction_mood = random([random_memory_min, random_memory_min + random_memory_gap/*100, 200*/]);
                this.love = undefined;
                this.attraction = 0;
                rand_acc_index = random([0, 1])
            } else if (this.attraction_memory > 0) {
                if (this.love != undefined) {
                    this.target_pos = this.love.pos;
                    this.acc = this.target_pos.sub(this.pos).intensify(0.001);
                    if (draw_love_line) { this.draw_line_to_lover(this.target_pos); }
                } this.attraction_memory--;
            }

            if (this.direction_mood > 0 && this.attraction_memory == 0) {
                random_acc = [this.vel.n_dir().intensify(0.025), this.vel.n_dir().reverse().intensify(0.025)][rand_acc_index];
                this.acc = random_acc;
                this.direction_mood--;

            }
            if (this.direction_mood <= 0) {
                this.acc = this.acc.null();
                this.attraction_memory = random([attractoin_memory_min, attractoin_memory_min + attraction_memory_gap]);
            }
        }
    }

    this.draw = function () {
        // if (this.direction_mood) {this.color = non_attraction_color;}
        // else {this.color = attraction_color;}
        
        ctx.beginPath();
        ctx.shadowColor = this.color; 
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x, this.pos.y, this.size * 2, 0, 2 * Math.PI);
        ctx.fill();

        // console.log(this.vel.angle());

        if (!this.wing_phase) {
            this.wing_freq -= 0.1 * this.fapp_freq;
            // console.log("shorting");
            if (this.wing_freq <= 0) {
                this.wing_phase = true;
            }
        }
        if (this.wing_phase) {
            this.wing_freq += 0.1 * this.fapp_freq;
            // console.log("larging");
            if (this.wing_freq >= this.wing_freq_const) {
                this.wing_phase = false;
            }
        }

        ctx.beginPath();
        ctx.fillStyle = "#111";
        ctx.arc(this.pos.x, this.pos.y, (this.size * 2 + (this.wing_freq_const / 1 - this.wing_freq) - 1), -1 / 4 * Math.PI + this.vel.angle(phase) + this.wing_freq * (this.fapp_freq * 0.01), 3 / 4 * Math.PI + this.vel.angle(phase) + this.wing_freq * (this.fapp_freq * 0.01));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#333";
        ctx.arc(this.pos.x, this.pos.y, (this.size * 2 + (this.wing_freq_const / 1 - this.wing_freq) - 1), 1 / 4 * Math.PI + this.vel.angle(phase) - this.wing_freq * (this.fapp_freq * 0.01), 5 / 4 * Math.PI + this.vel.angle(phase) - this.wing_freq * (this.fapp_freq * 0.01));
        ctx.fill();

        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = this.color /*'#ffffff99'*/;
        ctx.shadowBlur = this.size * 5 + (this.wing_freq_const / 1 - this.wing_freq) * 3;

        if (dev_mode) {
            ctx.strokeStyle = "#ff0000"/*"#ff0000"*/;
            ctx.lineWidth = 3;

            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x + this.vel.x * 25, this.pos.y + this.vel.y * 25);
            ctx.stroke();

            ctx.strokeStyle = "#0000ff"/*"#0000ff"*/;
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x + this.acc.x * 1000, this.pos.y + this.acc.y * 1000);
            ctx.stroke();
            this.drawDetailBox();
        }

    }

    this.draw_line_to_lover = function (vector) {
        ctx.strokeStyle = love_line_color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(vector.x, vector.y);
        ctx.stroke();
    }

    this.drawDetailBox = function () {
        ctx.beginPath();
        ctx.shadowColor = "transparent";
        ctx.fillStyle = this.color;
        ctx.rect(this.pos.x - 132, this.pos.y - 17, 102, 62);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.rect(this.pos.x - 131, this.pos.y - 16, 100, 60);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x - 30, this.pos.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = love_line_color;
        ctx.font = "10px Monospace";
        ctx.fillText("Vel: " + this.vel.mod.toFixed(2), this.pos.x - 125, this.pos.y - 5);
        ctx.fillText("Acc: " + this.acc.mod.toFixed(2), this.pos.x - 125, this.pos.y + 6);
        const loveDetail = (this.love === undefined) ? "none" : this.love.pos.call.map(ele => `${Math.round(ele)}`).join(" "); 
        ctx.fillText("Love: " + loveDetail, this.pos.x - 125, this.pos.y + 17);
        ctx.fillText("Memory: " + this.attraction_memory, this.pos.x - 125, this.pos.y + 28);
        ctx.fillText("Mood: " + this.direction_mood, this.pos.x - 125, this.pos.y + 39);

    }
}
