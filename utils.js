var spawner = function (fps) {
    if (fps < 60) {

    }
    else {
        let new_fly = new Fly();
        flies.push(new_fly);
    }
}

var random = function (range, negative = false) {
    if (negative) {
        return ((-1) ** random([1, 2])) * (Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0]);
    }
    else {
        return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    }
}

// Define a Vector class that takes in two parameters, x and y
function Vector(x, y) {

    // Store the x and y values as properties of the Vector object
    this.x = x;
    this.y = y;

    // Define a call property of the Vector object that returns an array of the x and y values
    this.call = [this.x, this.y];

    // Define a mod property of the Vector object that calculates the magnitude of the vector using the Math.hypot method
    this.mod = Math.hypot(this.x, this.y);

    // Define an angle property of the Vector object that calculates the angle of the vector in radians using the Math.atan2 method, with an optional phase parameter
    this.angle = function (phase = 0) {
        return Math.atan2(this.y, this.x) + phase * Math.PI;
    }

    // Define a null method of the Vector object that returns a new Vector object with x and y values of 0
    this.null = function () {
        return new Vector(0, 0);
    }

    // Define an add method of the Vector object that takes in another Vector object as a parameter and returns a new Vector object that is the sum of the two vectors
    this.add = function (other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    // Define a sub method of the Vector object that takes in another Vector object as a parameter and returns a new Vector object that is the difference of the two vectors
    this.sub = function (other) {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    // Define a dot method of the Vector object that takes in another Vector object as a parameter and returns the dot product of the two vectors
    this.dot = function (other) {
        return this.x * other.x + this.y * other.y;
    }

    // Define a cross method of the Vector object that takes in another Vector object as a parameter and returns NaN as this method is not needed for 2D vectors
    this.cross = function (other) {
        return NaN; // no need in here
    }

    // Define a perp method of the Vector object that returns a new Vector object that is perpendicular to the current vector
    this.perp = function () {
        return new Vector((-1) * this.y, this.x);
    }

    // Define a dir method of the Vector object that returns a new Vector object that is the direction of the current vector
    this.dir = function () {
        return new Vector(this.x / this.mod, this.y / this.mod);
    }

    // Define a n_dir method of the Vector object that returns a new Vector object that is the normalized direction of the current vector but with the direction rotated 90 degrees
    this.n_dir = function () {
        return new Vector(-this.y / this.mod, this.x / this.mod);
    }

    // Define a reverse method of the Vector object that returns a new Vector object that is the reverse of the current vector
    this.reverse = function () {
        return new Vector((-1) * this.x, (-1) * this.y);
    }

    // Define an x_flip method of the Vector object that returns a new Vector object that is the x-flip of the current vector
    this.x_flip = function () {
        return new Vector((-1) * this.x, this.y);
    }


    // object that returns a new Vector object that is the y-flip of the current vector
    this.y_flip = function () {
        return new Vector(this.x, (-1) * this.y);
    }

    // Define an intensify method of the Vector object that takes in an optional amplitude parameter and returns a new Vector object that is the current vector with the magnitude multiplied by the amplitude
    this.intensify = function (amplitude = 1) {
        return new Vector(this.x * amplitude, this.y * amplitude);
    }
}

function drawFps() {
    ctx.beginPath();
    ctx.shadowColor = "transparent";
    ctx.font = "20px Arial";
    ctx.fillStyle = love_line_color;
    if (framIndex % 100 == 0) {
        timediff = Date.now() - lastTimeCalled; 
        fps = Math.round(1000 / timediff);
    }
    ctx.fillText(`fps: ${fps}`, 10, 30);
    lastTimeCalled = Date.now();
} 