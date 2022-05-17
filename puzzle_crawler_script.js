//HTML elements
var game_container = document.getElementById('game_container');
var page_color_live = document.getElementById("puzzle_crawler").style.color;
var highscore = localStorage.getItem('highscore_stored');
var sfx_pause1 = document.getElementById("sfx_1");
var sfx_pause2 = document.getElementById("sfx_2");
var sfx_kill1 = document.getElementById("sfx_3");
var sfx_door1 = document.getElementById("sfx_4");
var sfx_hit1 = document.getElementById("sfx_5");
var sfx_step1 = document.getElementById("sfx_6");
var sfx_step2 = document.getElementById("sfx_7");
var sfx_step3 = document.getElementById("sfx_8");
var sfx_step4 = document.getElementById("sfx_9");

//Arrays
var game_container_array_r1 = [];
var flattened_data = [];
let table_data = [];
var save_state = [];
var start_point = [];
var room_point_array = [];
var room_state = [];
var used_slots = [];

//Color parameters
var random_color = random_int(5);
var r = 255;
var g = 0;
var b = 255;
var color_cycle = "";

//gamestates
var pause_state = 0;
var draw_screen = 0;
var upgrade_state = 0;
var death_state = 0;
var prestige_state = 0;

//room generation
const row_amount = 11;
var random_gen_row = 0;
var random_gen_col = 0;
var random_gen_array = 0;
var room_width = 0;
var width_end_point = 0;
var room_height = 0;
var height_end_point = 0;
var corner_point = 0;
var room_width_end_point = 0;
var recurse_fill = 0;
var room_build_check = 0;
var random_room_gen = 0;
var room1_edges = [];
var hall1_length = 0;
var room_width_r1 = 0;
var door_spawnable = 0;

//player variables
var player_direction = 0;
var player_array_pos = 0;
var prev_player_pos = 0;
var current_floor = 0;
var recovery_amount = 0;
var max_health = 3;
var health = 3;
var cash = 0;
var atk = 1;
var prest_recovery = localStorage.getItem('recovery_stored');
var prest_max_health = localStorage.getItem('max_health_stored');
var prest_atk = localStorage.getItem('atk_stored');
var total_max_health = 0;
var total_atk = 0;
var total_recovery = 0;

//enemy variables
var enemy1_health = 4;
var enemy2_health = 0;
var enemy3_health = 0;
var enemy4_health = 0;
var enemy5_health = 0;

var enemy1_atk = 1;
var enemy2_atk = 2;
var enemy3_atk = 4;
var enemy4_atk = 5;
var enemy5_atk = 7;


//misc
var selected_color = 0;

window.onload = function() {
//sets page_color in an interval for when the player dies
	page_color_data = setInterval(function() {
		page_color_live = document.getElementById("puzzle_crawler").style.color;
	}, 1);
	
//see above comment
	death_color_interval = setInterval(function() {
		document.getElementById("game_container").style.color = page_color_live;
		document.getElementById("health_container").style.color = page_color_live;
	}, 1);
//sets variables if page never visited
	if (highscore == null) {highscore = 0;}
	if (prest_atk == null) {prest_atk = 0;}
	if (prest_max_health == null) {prest_max_health = 0;}
	if (prest_recovery == null) {prest_recovery = 0;}
	
	total_atk = atk + prest_atk;
	total_max_health = max_health + prest_max_health;
	total_recovery = recovery_amount + prest_recovery;
	
	document.getElementById("highscore").innerHTML = "Highscore: " + highscore;
//pushes 22 empty spaces into an array and places a <br> at the end
	for (i = 0; i < 22; i++) {
		game_container_array_r1.push("&emsp14;");
	}
	game_container_array_r1.push("<br>");
	
//pushes 11 of those into another array
	for (i = 0; i < row_amount; i++) {
		table_data.push(game_container_array_r1);
	}
	
//flattens and joins the data
	flattened_data = table_data.flat();
	
	page_color();
	
//Rainbow Cycling text
	color_interval = setInterval(function() {
//red calc
	if (r == 255) {
//subtract blue if not empty yet
		if (b != 0) {b--;}
//if it is empty (red only) add green
		else if (g != 255) { g++;}
//green calc
	} if (g == 255) {
//subtract red if not empty yet
		if (r != 0) {r--;}
//if it is empty (green only) increase blue
		 else if (b != 255) {b++;}
//blue calc
	} if (b == 255) {
//subtract green if its not empty yet
		if (g != 0) {g--;}
//if it is empty (blue only) increase red
		 else if (r != 255) {r++;}
	}
	color_cycle = "rgb(" + r + ", " + g + ", " + b + ")";
	
	//place rainbow elements here!
	document.getElementById("rain_bow_1").style.color = color_cycle;
	document.getElementById("title_big_text").style.color = color_cycle;
	document.getElementById("s_tier").style.color = color_cycle;
	document.getElementById("door_open").style.color = color_cycle;
	},1);
	
	new_floor();
	spin_effect();
	
	document.getElementById("title_tab").innerHTML= "Floor: " + current_floor;
	document.getElementById("game_container").innerHTML = flattened_data.join("");
} //onload bracket

function page_color() {
//random page colors and color selection
	if(random_color == 0) {
		document.getElementById("puzzle_crawler").style.color = "#ab20fd";
		document.getElementById("link_text").style.color = "#ab20fd";
	} else if(random_color == 1) {
		document.getElementById("puzzle_crawler").style.color = "orange";
		document.getElementById("link_text").style.color = "orange";
	} else if(random_color == 2) {
		document.getElementById("puzzle_crawler").style.color = "#39FF14";
		document.getElementById("link_text").style.color = "#a39FF14";
	} else if(random_color == 3) {
		document.getElementById("puzzle_crawler").style.color = "white";
		document.getElementById("link_text").style.color = "white";
	} else if(random_color == 4) {
		
		if (selected_color == 4) {
				document.getElementById("puzzle_crawler").style.color = "#e65c9b";
		document.getElementById("link_text").style.color = "#e65c9b";
		} else {
//extra rare rainbow!
			let rainbow_random = random_int(5);
			if (rainbow_random == 0) {
		
			setInterval(function() {//needs an interval to work
			
				document.getElementById("puzzle_crawler").style.color = color_cycle;
				document.getElementById("link_text").style.color = color_cycle;
				document.getElementById("game_container").style.color = document.getElementById("puzzle_crawler").style.color;
				document.getElementById("health_container").style.color = document.getElementById("puzzle_crawler").style.color;
			},1);
			} else {
				document.getElementById("puzzle_crawler").style.color = "#e65c9b";
				document.getElementById("puzzle_crawler").style.color = "#e65c9b";
				document.getElementById("game_container").style.color = "#e65c9b";
				document.getElementById("health_container").style.color = "#e65c9b";
			}
		}
	} else if (random_color == 5) {
		selected_color_interval = setInterval(function() { //needs an interval to work
				document.getElementById("puzzle_crawler").style.color = color_cycle;
				document.getElementById("link_text").style.color = color_cycle;
		},1);
	}
}

//Random World Gen (oh god)
function generate_room(hall_value) {
	
	random_room_gen = random_int(6);
//Beutifully efficient
	if (random_room_gen <= 2) {
		random_room_gen += 47;
	} else {
		random_room_gen += 67;
	}
	
	if (hall_value != 1) {
	start_point = random_room_gen;
		generate_first_normal_room();
	} else {
		start_point = room1_edges[hall1_position] + hall1_length;
		
		if (start_point <= 100) {
			generate_normal_room();
		} else {
			generate_upside_room();
		}
	}
	
	room_state.push(room_point_array);
	room_state.flat();
	
//removes duped entries
	room_state.concat(room_state);
	room_point_array.concat(room_point_array);
	
}

function generate_first_normal_room() {
	
	//Now we need to generate the room width, which is very easy. 
	room_width_r1 = random_int(4);
	room_width_r1 += 2;
	
	width_end_point = start_point + room_width_r1;
	
	//The room height is much more complex though.
	room_height = random_int(4);
	room_height += 2;
	
	height_end_point = start_point + room_height;
	
	//Now we have kind of an upside down L shape, now it just needs to be filled in!
	corner_point = start_point + room_width_r1;
	
	recurse_fill = 0;
	for (i = start_point; i <= height_end_point+1; i++) {
		for (i2 = start_point; i2 <= width_end_point; i2++) {
			room_point_array.push(i2 + recurse_fill);
		}
		recurse_fill += 23;
	}
//No clue why this works
	
	room_point_array.sort( function( a , b){
		if(a > b) return 1;
		if(a < b) return -1;
		return 0;
	});

}function generate_normal_room() {
	
	//Now we need to generate the room width, which is very easy. 
	room_width = random_int(4);
	room_width += 2;
	
	width_end_point = start_point + room_width_r1;
	
	//The room height is much more complex though.
	room_height = random_int(4);
	room_height += 2;
	
	height_end_point = start_point + room_height;
	
	//Now we have kind of an upside down L shape, now it just needs to be filled in!
	corner_point = start_point + room_width_r1;
	
	recurse_fill = 0;
	for (i = start_point; i <= height_end_point+1; i++) {
		for (i2 = start_point; i2 <= width_end_point; i2++) {
			room_point_array.push(i2 + recurse_fill);
		}
		recurse_fill += 23;
	}
//No clue why this works
	
	room_point_array.sort( function( a , b){
		if(a > b) return 1;
		if(a < b) return -1;
		return 0;
	});
	
}

function generate_upside_room() {
	
//Now we need to generate the room width, which is very easy. 
	room_width = random_int(4);
	room_width += 2;
	
	width_end_point = start_point + room_width;
	
//The room height is much more complex though.
	room_height = random_int(4);
	room_height += 2;
	
	height_end_point = start_point + room_height;
	
//Now we have kind of an upside down L shape, now it just needs to be filled in!
	recurse_fill = 0;
	for (i = start_point; i <= height_end_point+1; i++) {
		for (i2 = start_point; i2 <= width_end_point; i2++) {
			room_point_array.push(i2 - recurse_fill);
		}
		recurse_fill += 23;
	}
//No clue why this works
	
	room_point_array.sort(function(a,b) {
		return b - a;
	});
		for (var i=room_point_array.length; i--;) {
	if ( room_point_array[i] < 0 ) room_point_array.pop();
	}
	
	room_point_array.sort( function( a , b){
		if(a > b) return 1;
		if(a < b) return -1;
		return 0;
	});
}

function generate_hall() {
//find right edges of room1
	for (index = 0; index < room_point_array.length; index++) {
		if (room_point_array[index] + 1 != room_point_array[index + 1]) {
			room1_edges.push(room_point_array[index]);
		}
	}
	hall1_position = random_int(room1_edges.length);
	hall1_length = random_int(3);
	hall1_length += 2;
	
	for (i = 1; i < hall1_length; i++) {
		room_point_array.push(room1_edges[hall1_position] + i);
	}
	
//Why does .sort() not sort numerically but based off of UTF-8?
	room_point_array.sort( function( a , b){
		if(a > b) return 1;
		if(a < b) return -1;
		return 0;
	});
	generate_room(1);
}

//ELEMENT GENERATION
function generate_player() {
//obtained a random position from the generated room
	player_array_pos = random_int(7)
	used_slots[0]= player_array_pos;
	flattened_data[room_point_array[player_array_pos]] = "0";
}

//Draws the player in the new location
function regenerate_player() {
	flattened_data[room_point_array[player_array_pos]] = "0";
}

function generate_door() {
//obtained a random position from the generated room
	door_location = random_int(room_point_array.length);
	
//prevents the door from spawning in the hall
	door_spawnable = 0;
	 while (door_spawnable != 1) {
		
//regens if below and above are empty / inside hall
		if (flattened_data[room_point_array[door_location] - 23] == "&emsp14;") {
			if (flattened_data[room_point_array[door_location] + 23] == "&emsp14;") {
				door_location = random_int(room_point_array.length);
			} else if (flattened_data[room_point_array[door_location] + 22] == "&emsp14;") {
				door_location = random_int(room_point_array.length);
			} else if (flattened_data[room_point_array[door_location] + 24] == "&emsp14;") {
				door_location = random_int(room_point_array.length);
			} else {
				door_spawnable = 1;
			}
		} else if (flattened_data[room_point_array[door_location] - 22] == "&emsp14;") {
			if (flattened_data[room_point_array[door_location] + 24] == "&emsp14;") {
				door_location = random_int(room_point_array.length);
			} else {
				door_spawnable = 1;
			}
		} else if (flattened_data[room_point_array[door_location] - 24] == "&emsp14;") {
			if (flattened_data[room_point_array[door_location] + 22] == "&emsp14;") {
				door_location = random_int(room_point_array.length);
			} else {
				door_spawnable = 1;
			}
		} else {
			door_spawnable = 1;
		}
	}
	
//prevents door from spawning on player
	generation_counter = 0;
	while (generation_counter != 1) {
		for (index = 0; index <= used_slots.length; index++) {
			if (door_location == used_slots[index]) {
				door_location = random_int(room_point_array.length);
				generation_counter = 0;
			} else {
				generation_counter = 1;
			}
		}
	}
		used_slots[1] = door_location;
		flattened_data[room_point_array[door_location]] = "<div id='door_locked'>#</div>";
}

function generate_enemy(enemy_tier) {

	if (enemy_tier == 1) {
		
//obtained a random position from the generated room
	enemy1_health = 4;
	enemy1_location = random_int(room_point_array.length);
	
//prevents enemy1 from spawning on player
	generation_counter = 0;
	while (generation_counter != 1) {
		for (index = 0; index <= used_slots.length; index++) {
			if (enemy1_location == used_slots[index]) {
				enemy1_location = random_int(room_point_array.length);
				generation_counter = 0;
			} else {
				generation_counter = 1;
			}
		}
	}
		used_slots[2] = enemy1_location;
		flattened_data[room_point_array[enemy1_location]] = "<div id='f_tier'>&</div>";
		
	} else if (enemy_tier == 2) {
//obtained a random position from the generated room
	enemy2_health = 7;
	enemy2_location = random_int(room_point_array.length);
	
	
//prevents enemy2 from spawning on player
	generation_counter = 0;
	while (generation_counter != 1) {
		for (index = 0; index <= used_slots.length; index++) {
			if (enemy2_location == used_slots[index]) {
				enemy2_location = random_int(room_point_array.length);
				generation_counter = 0;
			} else {
				generation_counter = 1;
			}
		}
	}
	
		used_slots[5] = enemy2_location;
		flattened_data[room_point_array[enemy2_location]] = "<div id='d_tier'>&</div>";
		
	} else if (enemy_tier == 3) {
	
//obtained a random position from the generated room
	enemy3_health = 10;
	enemy3_location = random_int(room_point_array.length);
	
//prevents enemy3 from spawning on player
	generation_counter = 0;
	while (generation_counter != 1) {
		for (index = 0; index <= used_slots.length; index++) {
			if (enemy3_location == used_slots[index]) {
				enemy3_location = random_int(room_point_array.length);
				generation_counter = 0;
			} else {
				generation_counter = 1;
			}
		}
	}
	
		used_slots[6] = enemy3_location;
		flattened_data[room_point_array[enemy3_location]] = "<div id='c_tier'>&</div>";
		
	} else if (enemy_tier == 4) {
//obtained a random position from the generated room
	enemy4_health = 12;
	enemy4_location = random_int(room_point_array.length);
	
	
//prevents enemy4 from spawning on player
	generation_counter = 0;
	while (generation_counter != 1) {
		for (index = 0; index <= used_slots.length; index++) {
			if (enemy4_location == used_slots[index]) {
				enemy4_location = random_int(room_point_array.length);
				generation_counter = 0;
			} else {
				generation_counter = 1;
			}
		}
	}
	
		used_slots[7] = enemy4_location;
		flattened_data[room_point_array[enemy4_location]] = "<div id='b_tier'>&</div>";
		
	} else if (enemy_tier == 5) {
//obtained a random position from the generated room
	enemy5_health = 17;
	enemy5_location = random_int(room_point_array.length);
	
	
//prevents enemy5 from spawning on player
	generation_counter = 0;
	while (generation_counter != 1) {
		for (index = 0; index <= used_slots.length; index++) {
			if (enemy5_location == used_slots[index]) {
				enemy5_location = random_int(room_point_array.length);
				generation_counter = 0;
			} else {
				generation_counter = 1;
			}
		}
	}
	
		used_slots[8] = enemy5_location;
		flattened_data[room_point_array[enemy5_location]] = "<div id='a_tier'>&</div>";
		
	}
}

function generate_potion(potion_tier) {
	
	if (potion_tier == 1) {
	
//obtained a random position from the generated room
	potion1_location = random_int(room_point_array.length);
	
//prevents potion1 from spawning on player
	generation_counter = 0;
	while (generation_counter != 1) {
		for (index = 0; index <= used_slots.length; index++) {
			if (potion1_location == used_slots[index]) {
				potion1_location = random_int(room_point_array.length);
				generation_counter = 0;
			} else {
				generation_counter = 1;
			}
		}
	}
	
		used_slots[3] = potion1_location;
		flattened_data[room_point_array[potion1_location]] = "<div id='f_tier'>Q</div>";
		
	} else if (potion_tier == 2) {
	
//obtained a random position from the generated room
	potion2_location = random_int(room_point_array.length);
	
//prevents potion2 from spawning on player
	generation_counter = 0;
	while (generation_counter != 1) {
		for (index = 0; index <= used_slots.length; index++) {
			if (potion2_location == used_slots[index]) {
				potion2_location = random_int(room_point_array.length);
				generation_counter = 0;
			} else {
				generation_counter = 1;
			}
		}
	}
		used_slots[8] = potion2_location;
		flattened_data[room_point_array[potion1_location]] = "<div id='d_tier'>Q</div>";
		
	}
	
}



function generate_cash() {
//obtained a random position from the generated room
	cash1_location = random_int(room_point_array.length);
	
//prevents door from spawning on player
	for (i = 0; i <= used_slots.length; i++) {
		if (cash1_location == used_slots[i]) {
			cash1_location = random_int(room_point_array.length);
		}
	}
		used_slots[4] = cash1_location;
		flattened_data[room_point_array[cash1_location]] = "<div id='f_tier'>$</div>";
}


//KEYPRESS FUNCTIONS

function d_key_down() {
	if (pause_state != 1) {
		document.getElementById("user_alert").innerHTML = "";
		player_direction = 1;
		check_tile();
	}
}

function a_key_down() {
	if (pause_state != 1) {
		document.getElementById("user_alert").innerHTML = "";
		player_direction = -1;
		check_tile();
	}
}


function s_key_down() {
		document.getElementById("user_alert").innerHTML = "";
	if (pause_state != 1) {
		player_direction = 23;
		check_tile();
	} else {
		move_cursor("down");
	}
	
}

function w_key_down() {
		document.getElementById("user_alert").innerHTML = "";
	if (pause_state != 1) {
		player_direction = -23;
		check_tile();
	} else {
		move_cursor("up");
	}
	
}

function move_cursor(cursor_direction) {

		prev_cursor = cursor_pos;
	if (cursor_direction == "up") {
		
		if (!(cursor_pos - 23 <= 9)) {
			
			cursor_pos -= 23;
		
			flattened_data[prev_cursor] = "&emsp14;";
			flattened_data[cursor_pos] = "<div id='sprite_p_rotate'>0</div>";
		
		}
	} else {
		
		if (!(cursor_pos + 23 >= 146)) {
			
			cursor_pos +=23;
			
			flattened_data[prev_cursor] = "&emsp14;";
			flattened_data[cursor_pos] = "<div id='sprite_p_rotate'>0</div>";
		
		}
		
	}
	
}


function new_floor() {
	
	used_slots = [];
	room_point_array = [];
	room1_edges = [];
	
	enemy1_health = 4;
//flattens and joins the data
	flattened_data = table_data.flat();
	
	generate_room();
	generate_hall();
	
//adds room data to flattened_data for printing
	for (index = 0; index < room_point_array.length; index++) {
		flattened_data[room_point_array[index]] = ".";
	}
	
	room_logic();
	
	if (current_floor >= highscore) {
		document.getElementById("highscore").innerHTML = "Highscore: " + current_floor;
	}
	
	document.getElementById("floor_level").innerHTML = "Floor: " + current_floor;
}

//moves the player if check_tile saw the tile was free or there was potion/cash
function move_player () {
	flattened_data[room_point_array[player_array_pos]] = ".";
	player_array_pos = room_point_array.indexOf(room_point_array[player_array_pos] + player_direction);
	regenerate_player();
}

function player_death() {
		document.getElementById("game_container").style.color = "red";
		document.getElementById("health_container").style.color = "red";
		document.getElementById("health_container").innerHTML = "Health: 0/" + total_max_health;
			
			sfx_kill1.pause();
			sfx_kill1.currentTime = 0;
			sfx_kill1.play();
			
			save_state = flattened_data.slice(0);
			
			for (index = 0; index < room_point_array.length; index++) {
				flattened_data[room_point_array[index]] = "&emsp14;";
			}
			
			clearInterval(death_color_interval);
			pause_state = 1;
			death_state = 1;
			document.getElementById("title_tab").innerHTML= "You Died!";
			draw_death_screen();
			
			if (current_floor >= highscore) {
				highscore = current_floor;
			}
			localStorage.setItem('highscore_stored', current_floor);
			current_floor = 0;
			draw_screen = 1;
}

function random_enemy_drop_f_tier() {
	
	enemy_random_drop = random_int(3);
	
	if (enemy_random_drop == 0) {
	flattened_data[room_point_array[player_array_pos] + player_direction] = "<div id='f_tier'>Q</div>";
	} else {
	flattened_data[room_point_array[player_array_pos] + player_direction] = ".";
	}
}

function random_enemy_drop_d_tier() {
	
	enemy_random_drop = random_int(2);
	
	if (enemy_random_drop == 0) {
	flattened_data[room_point_array[player_array_pos] + player_direction] = "<div id='d_tier'>Q</div>";
	} else {
	flattened_data[room_point_array[player_array_pos] + player_direction] = "<div id='f_tier'>Q</div>";
	}
}

const log = document.getElementById('game_container');
document.addEventListener('keydown', logKey);
function logKey(e) {
	keypress = `${e.code}`;
	
//ESCAPE KEY
	if (keypress == "Escape") {
		
		upgrade_state = 0;
		prestige_state = 0;
//MAKE SURE TO USE .SLICE FOR COPIES. ARRAYS ARE REFERENCES, NOT OBJECTS.
		if (health <= 0) {
		} else if (pause_state == 0) {
			
			sfx_pause1.pause();
			sfx_pause1.currentTime = 0;
			sfx_pause1.play();
			
			save_state = flattened_data.slice(0);
			
			for (index = 0; index < room_point_array.length; index++) {
				flattened_data[room_point_array[index]] = "&emsp14;";
			}
			
			draw_pause_screen();
			pause_state = 1;
			draw_screen = 1;
		} else {
			draw_screen = 1;
			sfx_pause2.pause();
			sfx_pause2.currentTime = 0;
			sfx_pause2.play();
			pause_state = 0;
			
//restores session and player location
			flattened_data = save_state;
			regenerate_player();
		}
		
		} else if (keypress == "Enter") {
			
			if (health <= 0) {
			
			death_color_interval = setInterval(function() {
				document.getElementById("game_container").style.color = page_color_live;
				document.getElementById("health_container").style.color = page_color_live;
			}, 1);
				
			sfx_pause2.pause();
			sfx_pause2.currentTime = 0;
			sfx_pause2.play();
				health = 3;
				max_health = 3;
				enemy1_health = 0;
				enemy2_health = 0;
				enemy3_health = 0;
				enemy4_health = 0;
				atk = 1;
				recovery_amount = 0;
				cash = 0;
				new_floor();
				pause_state = 0;
				death_state = 0;
				document.getElementById("title_tab").innerHTML= "Floor " + current_floor;
				
				total_atk = atk + prest_atk;
				total_max_health = max_health + prest_max_health;
				total_recovery = recovery_amount + prest_recovery;
				document.getElementById("cash_container").innerHTML = "Cash: 0";
				document.getElementById("atk_container").innerHTML = "ATK: " + total_atk;
				document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
				document.getElementById("game_container").innerHTML = flattened_data.join("");
				
			} else if (pause_state == 1) {
//pause screen select
				if (upgrade_state != 1) {
					if (prestige_state != 1) {
						if (cursor_pos == 32) {
							if (selected_color == 5) {
								clearInterval(selected_color_interval);
							}
							selected_color += 1;
							if (selected_color == 6) {
								selected_color = 0;
							}
							random_color = selected_color;
							page_color();
						} else if (cursor_pos == 55) {
							current_floor = 0;
							health = total_max_health;
							document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
							new_floor();
							pause_state = 0;
							draw_screen = 1;
						}
					}
					
//upgrade screen select
				} else if (upgrade_state = 1) {
//first selection
					if (cursor_pos == 32) {
						if (cash - 1 >= 0) {
							cash--;
							atk ++;
							total_atk = atk + prest_atk;
							document.getElementById("atk_container").innerHTML = "ATK: " + total_atk;
							shake_effect("cash_container");
							shake_effect("atk_container");
						}
						
//second selection
					} else if (cursor_pos == 55) {
						if (cash - 1 >= 0) {
							cash--;
							max_health ++;
							total_max_health = max_health + prest_max_health;
							document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
							shake_effect("cash_container");
							shake_effect("health_container");
						}
					} else if (cursor_pos == 78) {
						if (cash - 1 >= 0) {
							cash --;
							recovery_amount ++;
							total_recovery = recovery_amount + prest_recovery;
							document.getElementById("recovery_container").innerHTML = "Recovery: " + total_recovery;
							shake_effect("cash_container");
							shake_effect("recovery_container");
						}
						
					}
					
					document.getElementById("cash_container").innerHTML = "Cash: " + cash;
//prestige slection
				} else if (prestige_state == 1) {
//first selection
					if (cursor_pos == 32) {
						if (cash - 1 >= 0) {
							cash--;
							prest_atk ++;
							localStorage.setItem('atk_stored', prest_atk);
							total_atk = atk + prest_atk;
							document.getElementById("atk_container").innerHTML = "ATK: " + total_atk;
							shake_effect("cash_container");
							shake_effect("atk_container");
						}
						
//second selection
					} else if (cursor_pos == 55) {
						if (cash - 1 >= 0) {
							cash--;
							prest_max_health ++;
							total_max_health = max_health + prest_max_health;
							localStorage.setItem('max_health_stored', prest_max_health);
							document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
							shake_effect("cash_container");
							shake_effect("health_container");
						}
					} else if (cursor_pos == 78) {
						if (cash - 1 >= 0) {
							cash --;
							prest_recovery ++;
							total_recovery = recovery_amount + prest_recovery;
							localStorage.setItem('reoovery_stored', prest_recovery);
							document.getElementById("recovery_container").innerHTML = "Recovery: " + total_recovery;
							shake_effect("cash_container");
							shake_effect("recovery_container");
						}
					}
					document.getElementById("cash_container").innerHTML = "Cash: " + cash;
				}
			}
		} else {
//D KEY
			if (keypress == "KeyD") {
				if (death_state != 1) {
					
					d_key_down();
					draw_screen = 1;
				}
//A KEY
			} else if (keypress == "KeyA") {
				if (death_state != 1) {
					a_key_down();
					draw_screen = 1;
				}
//S KEY
			} else if (keypress == "KeyS") {
				if (death_state != 1) {
					s_key_down();
					draw_screen = 1;
				}
				
//W KEY
			} else if (keypress == "KeyW") {
				if (death_state != 1) {
					
					w_key_down();
					draw_screen = 1;
				}
//E KEY
			} else if (keypress == "KeyE") {
				if (pause_state != 1) {
				if (upgrade_state == 0) {
						sfx_pause1.pause();
						sfx_pause1.currentTime = 0;
						sfx_pause1.play();
						
						save_state = flattened_data.slice(0);
						
						
						for (index = 0; index < room_point_array.length; index++) {
							flattened_data[room_point_array[index]] = "&emsp14;";
						}
						
						draw_upgrade_screen();
						upgrade_state = 1;
						pause_state = 1;
						draw_screen = 1;
					} else {
						upgrade_state = 0;
						regenerate_player();
						draw_screen = 1;
						sfx_pause2.pause();
						sfx_pause2.currentTime = 0;
						sfx_pause2.play();
						pause_state = 0;
					}
				}
//P Key
			} else if (keypress == "KeyP") {
				if (pause_state != 1) {
					if (prestige_state == 0) {
						if (upgrade_state == 0) {
							
							sfx_pause1.pause();
							sfx_pause1.currentTime = 0;
							sfx_pause1.play();
							
							save_state = flattened_data.slice(0);
							
							for (index = 0; index < room_point_array.length; index++) {
								flattened_data[room_point_array[index]] = "&emsp14;";
							}
							
							draw_prestige_screen();
							prestige_state = 1;
							pause_state = 1;
							draw_screen = 1;
						} else {
							upgrade_state = 0;
							prestige_state = 0;
							regenerate_player();
							draw_screen = 1;
							sfx_pause2.pause();
							sfx_pause2.currentTime = 0;
							sfx_pause2.play();
							pause_state = 0;
						}
					}
				}
//P Key
			}
		}
	if (draw_screen == 1) {
	document.getElementById("game_container").innerHTML = flattened_data.join("");
		draw_screen = 0;
	}
	
}//Keypress Bracket

//Random Number Generation
function random_int(max) {
	return Math.floor(Math.random() * max);
}

//shake function shake container is the element to apply the effect to.
function shake_effect(shake_container) {
	
	let shake_counter = 0;
	let inter1 = setInterval(function() {
	
		if (shake_counter == 0) {
			document.getElementById(shake_container).style.transform = "rotate(0.015turn)";
			shake_counter = 1;
		} else  if (shake_counter == 1) {
			document.getElementById(shake_container).style.transform = "rotate(-0.015turn)";
			shake_counter = 2;
		} else {
			document.getElementById(shake_container).style.transform = "rotate(0.0turn)";
			clearInterval(inter1);
		}
	},30);
}


function spin_effect() {
	
	let current_rotation = 0;
	let inter2 = setInterval(function() {
		
		
		current_rotation += 1;
		document.getElementById("sprite_p_rotate").style.transform = 'rotate(' + current_rotation + 'deg)';
		
	},1);
}

function play_random_walk() {
	var random_sound = random_int(4);
	if (random_sound == 0) {
		sfx_step1.pause();
		sfx_step1.currentTime = 0;
		sfx_step1.play();
	} else  if (random_sound == 1) {
		sfx_step2.pause();
		sfx_step2.currentTime = 0;
		sfx_step2.play();
	} else  if (random_sound == 2) {
		sfx_step3.pause();
		sfx_step3.currentTime = 0;
		sfx_step3.play();
	} else  if (random_sound == 3) {
		sfx_step4.pause();
		sfx_step4.currentTime = 0;
		sfx_step4.play();
	}
}

function corner_signs() {
	flattened_data[0] = '<div id="sprite_p">$</div>';
	flattened_data[21] = '<div id="sprite_p">$</div>';
	flattened_data[230] = '<div id="sprite_p">$</div>';
	flattened_data[251] = '<div id="sprite_p">$</div>';
}
//TODO

//PRESTIGE MENU (P)
//PRESTIGE POINTS (EVERY 6th FLOOR)
//PRESTIGE UPGRADES
//LOCAL PRESTIGE STORAGE
//RESET PRESTIGE