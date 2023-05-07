var width, height, offset, random_acc, mediumm_opacity, phase, performance, x_axis, y_flip, flies, dev_mode, phase, population, draw_love_line,
    come_back_to_screen, attraction_memory_gap, attractoin_memory_min, random_memory_min, random_memory_gap, attraction_color, non_attraction_color,
    wall_collision, fly_fly_collision, attraction_exists, love_line_color;

width = window.innerWidth;
height = window.innerHeight;
offset = 100;
medium_opacity = 1;
performance = false; //not working
dev_mode = false;
phase = -1 / 2;
x_axis = new Vector(1, 0);
y_axis = new Vector(0, 1);
population = 8;
draw_love_line = false;
come_back_to_screen = true;
attraction_memory_gap = 50;
attractoin_memory_min = 100;
random_memory_gap = 30;
random_memory_min = 50;
attraction_color = "fce303"/*"#fc03d3"*/;
non_attraction_color = "#fce303";
wall_collision = false;
fly_fly_collision = false;  // not working
attraction_exists = true;
love_line_color = "#fce303";
population = 10;

var canvas = document.querySelector("#canvas");
canvas.width = width;
canvas.height = height;

var ctx = canvas.getContext('2d');