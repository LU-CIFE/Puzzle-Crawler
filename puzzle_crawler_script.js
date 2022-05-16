
	//Passes variables between functions by initializing them outside.
	
	//HTML elements
	var game_container = document.getElementById('game_container');
	
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
	var joined_data = [];
	var flattened_data = [];
	var joined_data = [];
	let table_data = [];
	var save_state = [];
	var start_point = [];
	var room_point_array = [];
	var room_state = [];
	var text = game_container_array_r1.join("");
	
	//Parameters
	let row_amount = 11;
	
	var random_gen_row = 0;
	var random_gen_col = 0;
	
	//Color parameters
	var r = 255;
	var g = 0;
	var b = 255;
	var color_cycle = "";
	
	//gamestates
	var pause_state = 0;
	draw_screen = 0;
	
	var random_gen_array = 0;
	
	var room_width = 0;
	
	var width_end_point = 0;
	
	var room_height = 0;
	
	var height_end_point = 0;
	
	var corner_point = 0;
	
	var room_width_end_point = 0;
	
	var recurse_fill = 0;
	
	var room_build_check = 0;
	
	var player_array_pos = 0;
	
	var prev_player_pos = 0;
	
	var random_room_gen = 0;
	
	var room1_edges = [];
	
	var hall1_length = 0;
	
	var room_width_r1 = 0;
	
	var used_slots = [];
	
	var player_direction = 0;
	
	var door_spawnable = 0;
	
	var max_health = 3;
	
	var health = 3;
	
	var cash = 0;
	
	var atk = 1;
	
	var recovery_amount = 0;
	
	var enemy1_health = 4;
	
	var enemy2_health = 0;
	
	var enemy3_health = 0;
	
	var enemy4_health = 0;
	
	var enemy5_health = 0;
	
	var current_floor = 0;
	
	var enemy1_atk = 1;
	
	var enemy2_atk = 2;
	
	var enemy3_atk = 4;
	
	var enemy4_atk = 5;
	
	var enemy5_atk = 7;
	
	var highscore = localStorage.getItem('highscore_stored');;
	
	var curser_pos = 32;
	
	var prev_cursor = 32;
	
	var random_color = random_int(5);
	
	var selected_color = 0;
	
	var upgrade_state = 0;
	
	var death_state = 0;
	
	var page_color_live = document.getElementById("puzzle_crawler").style.color;
	
	window.onload = function() {
		
		page_color_data = setInterval(function() {
			page_color_live = document.getElementById("puzzle_crawler").style.color;
		}, 1);
		
		
		death_color_interval = setInterval(function() {
			document.getElementById("game_container").style.color = page_color_live;
			document.getElementById("health_container").style.color = page_color_live;
		}, 1);
		
		if (highscore == null) {
			highscore = 0;
		}
		
		document.getElementById("highscore").innerHTML = "Highscore: " + highscore;
		
		for (i = 0; i < 22; i++) {
			game_container_array_r1.push("&emsp14;");
		}
		//pushes 22 empty spaces into game_container_array_r1
		//places a <br> at the end to call a new line
		game_container_array_r1.push("<br>");
		
		//pushes 11 of those into another array
		for (i = 0; i < row_amount; i++) {
			table_data.push(game_container_array_r1);
		}
		
		//flattens and joins the data
		flattened_data = table_data.flat(10);
		joined_data = flattened_data.join("");
		
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
		
		if(random_color == 0) {
			document.getElementById("puzzle_crawler").style.color = "#ab20fd";
		} else if(random_color == 1) {
			document.getElementById("puzzle_crawler").style.color = "orange";
		} else if(random_color == 2) {
			document.getElementById("puzzle_crawler").style.color = "#39FF14";
		} else if(random_color == 3) {
			document.getElementById("puzzle_crawler").style.color = "white";
		} else if(random_color == 4) {
			
			if (selected_color == 4) {
				
					document.getElementById("puzzle_crawler").style.color = "#e65c9b";
			} else {
		
		//extra rare rainbow!
				let rainbow_random = random_int(5);
				if (rainbow_random == 0) {
			
				setInterval(function() { //needs an interval to work
				
					document.getElementById("puzzle_crawler").style.color = color_cycle;
					document.getElementById("game_container").style.color = document.getElementById("puzzle_crawler").style.color;
					document.getElementById("health_container").style.color = document.getElementById("puzzle_crawler").style.color;
					
				},1);
				} else {
					document.getElementById("puzzle_crawler").style.color = "#e65c9b";
					document.getElementById("game_container").style.color = "#e65c9b";
					document.getElementById("health_container").style.color = "#e65c9b";
				}
			}
		} else if (random_color == 5) {
		
			selected_color_interval = setInterval(function() { //needs an interval to work
				
					document.getElementById("puzzle_crawler").style.color = color_cycle;
					
			},1);
		}
	}
	
	
	
	//Random World Gen (oh god)
	function generate_room(hall_value) {
		
		//To calculate array values of table_data
		//find position on first row (0-22) 23 is <br>
		//add n(23) to the first value where n is the row the point is located on.
		
		//0, 1, 2, 3, 4, 5
		random_room_gen = random_int(6);
		
		if (random_room_gen == 0) {
			random_room_gen = 47;
		} else if (random_room_gen == 1) {
			random_room_gen = 48;
		} else if (random_room_gen == 2) {
			random_room_gen = 49;
		} else if (random_room_gen == 3) {
			random_room_gen = 70;
		} else if (random_room_gen == 4) {
			random_room_gen = 71;
		} else if (random_room_gen == 5) {
			random_room_gen = 72;
		}
		//Beutifully efficient
		
		//USE SIX VALUES. CONVERT THEM TO 49, 50, 51, 72, 73, 74 BY RANDOM.
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
		
		
		//Random room generation is finished, might add hallways, which is easy. maybe.
		
		room_state.push(room_point_array);
		room_state.flat(10);
		
		//removes duped entries
		room_state.concat(room_state);
		room_point_array.concat(room_point_array);
		
	}
	function generate_first_normal_room() {
		
		//now we have our starting point, start_point.
		//it stores the beginning/starting point for room generation, and is the basis of all calculation.
		//it's possible values are 49, 50, 51, 72, 73, and 74.
		
		//Now we need to generate the room width, which is very easy. 
		room_width_r1 = random_int(4);
		room_width_r1 += 2;
		
		width_end_point = start_point + room_width_r1;
		
		//We have width_end_point which is the second corner of the room. now we need the height.
		//The room height is much more complex though.
		//ARRAYS ARE STORED LINEARLY, ADD 23 TO FIND THE NEXT ROW.
		
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
		} //No clue why this works
		
		room_point_array.sort( function( a , b){
			if(a > b) return 1;
			if(a < b) return -1;
			return 0;
		});
	
	
	}function generate_normal_room() {
		
		//now we have our starting point, start_point.
		//it stores the beginning/starting point for room generation, and is the basis of all calculation.
		//it's possible values are 49, 50, 51, 72, 73, and 74.
		
		//Now we need to generate the room width, which is very easy. 
		room_width = random_int(4);
		room_width += 2;
		
		width_end_point = start_point + room_width_r1;
		
		//We have width_end_point which is the second corner of the room. now we need the height.
		//The room height is much more complex though.
		//ARRAYS ARE STORED LINEARLY, ADD 23 TO FIND THE NEXT ROW.
		
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
		} //No clue why this works
		
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
		
		//We have width_end_point which is the second corner of the room. now we need the height.
		//The room height is much more complex though.
		//ARRAYS ARE STORED LINEARLY, ADD 23 TO FIND THE NEXT ROW.
		
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
		} //No clue why this works
		
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
		door_counter = 0;
		while (door_counter != 1) {
			for (index = 0; index <= used_slots.length; index++) {
				if (door_location == used_slots[index]) {
					door_location = random_int(room_point_array.length);
					door_counter = 0;
				} else {
					door_counter = 1;
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
		//prevents door from spawning on player
		for (i = 0; i <= used_slots.length; i++) {
			if (enemy1_location == used_slots[i]) {
				enemy1_location = random_int(room_point_array.length);
			}
		}
			used_slots[2] = enemy1_location;
			flattened_data[room_point_array[enemy1_location]] = "<div id='f_tier'>&</div>";
			
		} else if (enemy_tier == 2) {
		//obtained a random position from the generated room
		enemy2_health = 7;
		enemy2_location = random_int(room_point_array.length);
		//prevents door from spawning on player
		for (i = 0; i <= used_slots.length; i++) {
			if (enemy2_location == used_slots[i]) {
				enemy2_location = random_int(room_point_array.length);
			}
		}
			used_slots[5] = enemy2_location;
			flattened_data[room_point_array[enemy2_location]] = "<div id='d_tier'>&</div>";
			
		} else if (enemy_tier == 3) {
		
		//obtained a random position from the generated room
		enemy3_health = 10;
		enemy3_location = random_int(room_point_array.length);
		//prevents door from spawning on player
		for (i = 0; i <= used_slots.length; i++) {
			if (enemy3_location == used_slots[i]) {
				enemy3_location = random_int(room_point_array.length);
			}
		}
			used_slots[6] = enemy3_location;
			flattened_data[room_point_array[enemy3_location]] = "<div id='c_tier'>&</div>";
			
		} else if (enemy_tier == 4) {
		//obtained a random position from the generated room
		enemy4_health = 12;
		enemy4_location = random_int(room_point_array.length);
		//prevents door from spawning on player
		for (i = 0; i <= used_slots.length; i++) {
			if (enemy4_location == used_slots[i]) {
				enemy4_location = random_int(room_point_array.length);
			}
		}
			used_slots[7] = enemy4_location;
			flattened_data[room_point_array[enemy4_location]] = "<div id='b_tier'>&</div>";
			
		} else if (enemy_tier == 5) {
		//obtained a random position from the generated room
		enemy5_health = 17;
		enemy5_location = random_int(room_point_array.length);
		//prevents door from spawning on player
		for (i = 0; i <= used_slots.length; i++) {
			if (enemy5_location == used_slots[i]) {
				enemy5_location = random_int(room_point_array.length);
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
		
		//prevents door from spawning on player
		for (i = 0; i <= used_slots.length; i++) {
			if (potion1_location == used_slots[i]) {
				potion1_location = random_int(room_point_array.length);
			}
		}
			used_slots[3] = potion1_location;
			flattened_data[room_point_array[potion1_location]] = "<div id='f_tier'>Q</div>";
			
		} else if (potion_tier == 2) {
		
		//obtained a random position from the generated room
		potion2_location = random_int(room_point_array.length);
		
		//prevents door from spawning on player
		for (i = 0; i <= used_slots.length; i++) {
			if (potion2_location == used_slots[i]) {
				potion2_location = random_int(room_point_array.length);
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
		flattened_data = table_data.flat(10);
		
		generate_room();
		generate_hall();
		
		//adds room data to flattened_data for printing
		for (index = 0; index < room_point_array.length; index++) {
			flattened_data[room_point_array[index]] = ".";
		}
		
		generate_player();
		generate_door();
		generate_enemy(1);
		
		if (current_floor >= 3) {
			generate_enemy(2);
		}
		
		if (current_floor >= 4) {
			generate_enemy(3);
		}
		
		if (current_floor >= 5) {
				generate_potion(2);
		}
		
		if (current_floor >= 6) {
			generate_enemy(4);
		}
		
		if (current_floor >= 8) {
			generate_enemy(5);
		}
		
		generate_potion(1);
		generate_cash();
		
		current_floor ++;
		
		if (current_floor >= highscore) {
			document.getElementById("highscore").innerHTML = "Highscore: " + current_floor;
		}
		
		document.getElementById("floor_level").innerHTML = "Floor: " + current_floor;
	}
	
	//checks what tile type is in front of the player
	function check_tile() {
		
		if (flattened_data[room_point_array[player_array_pos] + player_direction] == ".") {
			
			play_random_walk();
			move_player();
			
		} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='door_locked'>#</div>") {
		
			if (enemy1_health <= 0 && enemy2_health <= 0 && enemy3_health <= 0 && enemy4_health <= 0) {
				flattened_data[room_point_array[player_array_pos] + player_direction] = '<div id="door_open">_</div>';
			} else {
				document.getElementById("user_alert").innerHTML = "Locked!";
			}
		
		} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == '<div id="door_open">_</div>') {
			
			sfx_door1.pause();
			sfx_door1.currentTime = 0;
			sfx_door1.play();
			new_floor();
			document.getElementById("title_tab").innerHTML= "Floor " + current_floor;
			
		} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='f_tier'>Q</div>") {
			health += 3 + recovery_amount;
			
			if (health > max_health) {
				health = max_health;
			}
			
			document.getElementById("health_container").innerHTML = "Health: " + health + "/" + max_health;
			
			play_random_walk();
			move_player();
		} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='d_tier'>Q</div>") {
			health += 5 + recovery_amount;
			
			if (health > max_health) {
				health = max_health;
			}
			
			document.getElementById("health_container").innerHTML = "Health: " + health + "/" + max_health;
			
			play_random_walk();
			move_player();
		} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='f_tier'>&</div>") {
			
			if (random_int(2) == 0) {
				shake_effect("health_container");
				health -= enemy1_atk;
			}
			enemy1_health -= atk;
			if (health <= 0) {
				
			document.getElementById("game_container").style.color = "red";
			document.getElementById("health_container").style.color = "red";
			document.getElementById("health_container").innerHTML = "Health: 0/" + max_health;
				
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
			} else if (enemy1_health <= 0) {
				
				enemy_random_drop = random_int(3);
				
				if (enemy_random_drop == 0) {
				flattened_data[room_point_array[player_array_pos] + player_direction] = "<div id='f_tier'>Q</div>";
				} else {
				flattened_data[room_point_array[player_array_pos] + player_direction] = ".";
				}
			}
			
			sfx_hit1.pause();
			sfx_hit1.currentTime = 0;
			sfx_hit1.play();
			document.getElementById("health_container").innerHTML = "Health: " + health + "/" + max_health;
			
		} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='d_tier'>&</div>") {
			
			if (random_int(2) == 0) {
				shake_effect("health_container");
				health -= enemy2_atk;
			}
			enemy2_health -= atk;
			if (health <= 0) {
				
			document.getElementById("game_container").style.color = "red";
			document.getElementById("health_container").style.color = "red";
			document.getElementById("health_container").innerHTML = "Health: 0/" + max_health;
				
				sfx_kill1.pause();
				sfx_kill1.currentTime = 0;
				sfx_kill1.play();
				
				save_state = flattened_data.slice(0);
				
				for (index = 0; index < room_point_array.length; index++) {
					flattened_data[room_point_array[index]] = "&emsp14;";
				}
				
				clearInterval(death_color_interval);
				pause_state = 1;
				document.getElementById("title_tab").innerHTML= "You Died!";
				draw_death_screen();
				
				
				if (current_floor >= highscore) {
					highscore = current_floor;
				}
				localStorage.setItem('highscore_stored', current_floor);
				
				current_floor = 0;
				
				draw_screen = 1;
			} else if (enemy2_health <= 0) {
				
				enemy_random_drop = random_int(3);
				
				if (enemy_random_drop == 0) {
				flattened_data[room_point_array[player_array_pos] + player_direction] = "<div id='f_tier'>Q</div>";
				} else {
				flattened_data[room_point_array[player_array_pos] + player_direction] = ".";
				}
			}
			
			sfx_hit1.pause();
			sfx_hit1.currentTime = 0;
			sfx_hit1.play();
			document.getElementById("health_container").innerHTML = "Health: " + health + "/" + max_health;
			
		} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='c_tier'>&</div>") {
			
			if (random_int(2) == 0) {
				shake_effect("health_container");
				health -= enemy3_atk;
			}
			enemy3_health -= atk;
			if (health <= 0) {
				
			document.getElementById("game_container").style.color = "red";
			document.getElementById("health_container").style.color = "red";
			document.getElementById("health_container").innerHTML = "Health: 0/" + max_health;
				
				sfx_kill1.pause();
				sfx_kill1.currentTime = 0;
				sfx_kill1.play();
				
				save_state = flattened_data.slice(0);
				
				for (index = 0; index < room_point_array.length; index++) {
					flattened_data[room_point_array[index]] = "&emsp14;";
				}
				
				clearInterval(death_color_interval);
				pause_state = 1;
				document.getElementById("title_tab").innerHTML= "You Died!";
				draw_death_screen();
				
				
				if (current_floor >= highscore) {
					highscore = current_floor;
				}
				localStorage.setItem('highscore_stored', current_floor);
				
				current_floor = 0;
				
				draw_screen = 1;
			} else if (enemy3_health <= 0) {
				
				enemy_random_drop = random_int(2);
				
				if (enemy_random_drop == 0) {
				flattened_data[room_point_array[player_array_pos] + player_direction] = "<div id='d_tier'>Q</div>";
				} else {
				flattened_data[room_point_array[player_array_pos] + player_direction] = "<div id='d_tier'>Q</div>";
				}
			}
			
			sfx_hit1.pause();
			sfx_hit1.currentTime = 0;
			sfx_hit1.play();
			document.getElementById("health_container").innerHTML = "Health: " + health + "/" + max_health;
			
		} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='b_tier'>&</div>") {
			
			if (random_int(2) == 0) {
				shake_effect("health_container");
				health -= enemy4_atk;
			}
			enemy4_health -= atk;
			if (health <= 0) {
				
			document.getElementById("game_container").style.color = "red";
			document.getElementById("health_container").style.color = "red";
			document.getElementById("health_container").innerHTML = "Health: 0/" + max_health;
				
				sfx_kill1.pause();
				sfx_kill1.currentTime = 0;
				sfx_kill1.play();
				
				save_state = flattened_data.slice(0);
				
				for (index = 0; index < room_point_array.length; index++) {
					flattened_data[room_point_array[index]] = "&emsp14;";
				}
				
				clearInterval(death_color_interval);
				pause_state = 1;
				document.getElementById("title_tab").innerHTML= "You Died!";
				draw_death_screen();
				
				
				if (current_floor >= highscore) {
					highscore = current_floor;
				}
				localStorage.setItem('highscore_stored', current_floor);
				
				current_floor = 0;
				
				draw_screen = 1;
			} else if (enemy4_health <= 0) {
				
				enemy_random_drop = random_int(3);
				
				if (enemy_random_drop == 0) {
				flattened_data[room_point_array[player_array_pos] + player_direction] = "<div id='f_tier'>Q</div>";
				} else {
				flattened_data[room_point_array[player_array_pos] + player_direction] = ".";
				}
			}
			
			sfx_hit1.pause();
			sfx_hit1.currentTime = 0;
			sfx_hit1.play();
			document.getElementById("health_container").innerHTML = "Health: " + health + "/" + max_health;
			
		} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='a_tier'>&</div>") {
			
			if (random_int(2) == 0) {
				shake_effect("health_container");
				health -= enemy5_atk;
			}
			enemy5_health -= atk;
			if (health <= 0) {
				
			document.getElementById("game_container").style.color = "red";
			document.getElementById("health_container").style.color = "red";
			document.getElementById("health_container").innerHTML = "Health: 0/" + max_health;
				
				sfx_kill1.pause();
				sfx_kill1.currentTime = 0;
				sfx_kill1.play();
				
				save_state = flattened_data.slice(0);
				
				for (index = 0; index < room_point_array.length; index++) {
					flattened_data[room_point_array[index]] = "&emsp14;";
				}
				
				clearInterval(death_color_interval);
				pause_state = 1;
				document.getElementById("title_tab").innerHTML= "You Died!";
				draw_death_screen();
				
				
				if (current_floor >= highscore) {
					highscore = current_floor;
				}
				localStorage.setItem('highscore_stored', current_floor);
				
				current_floor = 0;
				
				draw_screen = 1;
			} else if (enemy5_health <= 0) {
				
				enemy_random_drop = random_int(3);
				
				if (enemy_random_drop == 0) {
				flattened_data[room_point_array[player_array_pos] + player_direction] = "<div id='f_tier'>Q</div>";
				} else {
				flattened_data[room_point_array[player_array_pos] + player_direction] = ".";
				}
			}
			
			sfx_hit1.pause();
			sfx_hit1.currentTime = 0;
			sfx_hit1.play();
			document.getElementById("health_container").innerHTML = "Health: " + health + "/" + max_health;
			
		} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='f_tier'>$</div>") {
			cash ++;
			play_random_walk();
			move_player();
			document.getElementById("cash_container").innerHTML = "Cash: " + cash;
			shake_effect("cash_container");
		} else {
			regenerate_player();
		}
		
	}
	
	//moves the player if check_tile saw the tile was free or there was potion/cash
	function move_player () {
		flattened_data[room_point_array[player_array_pos]] = ".";
		player_array_pos = room_point_array.indexOf(room_point_array[player_array_pos] + player_direction);
		regenerate_player();
	}
	
	const log = document.getElementById('game_container');
	document.addEventListener('keydown', logKey);
	function logKey(e) {
		keypress = `${e.code}`;
		
//ESCAPE KEY
		if (keypress == "Escape") {
			
			upgrade_state = 0;
			//23x11 including <br> at the end.the below values are the visible corners.
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
			
			joined_data = flattened_data.join("");
			
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
					recovery = 0;
					cash = 0;
					new_floor();
					pause_state = 0;
					death_state = 0;
					document.getElementById("title_tab").innerHTML= "Floor " + current_floor;
					
					
					document.getElementById("recovery_container").innerHTML = "Recovery: 0";
					document.getElementById("cash_container").innerHTML = "Cash: 0";
					document.getElementById("atk_container").innerHTML = "ATK: 1";
					document.getElementById("health_container").innerHTML = "Health: " + health + "/" + max_health;
					document.getElementById("game_container").innerHTML = flattened_data.join("");
					
				} else if (pause_state == 1) {
//pause screen select
					if (upgrade_state != 1) {
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
							health = max_health;
							document.getElementById("health_container").innerHTML = "Health: " + health + "/" + max_health;
							new_floor();
							pause_state = 0;
							draw_screen = 1;
						}
						
//upgrade screen select
					} else if (upgrade_state = 1) {
	//first selection
						if (cursor_pos == 32) {
							if (cash >= 1) {
								cash--;
								atk ++;
								shake_effect("cash_container");
								shake_effect("atk_container");
							}
							
	//second selection
						} else if (cursor_pos == 55) {
							if (cash >= 1) {
								cash--;
								max_health ++;
								shake_effect("cash_container");
								shake_effect("health_container");
							}
						} else if (cursor_pos == 78) {
							if (cash >= 1) {
								cash --;
								recovery ++;
								shake_effect("recovery_container");
								shake_effect("cash_container");
							}
						}
						
						document.getElementById("recovery_container").innerHTML = "Recovery: " + recovery;
						document.getElementById("atk_container").innerHTML = "ATK: " + atk;
						document.getElementById("health_container").innerHTML = "Health: " + health + "/" + max_health;
						document.getElementById("cash_container").innerHTML = "Cash: " + cash;
						
					
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
	
	function draw_pause_screen() {
		for (index = 0; index < room_point_array.length; index++) {
			flattened_data[room_point_array[index]] = "&emsp14;";
		}
		cursor_pos = 32;
		prev_cursor = 32;
		
		
		flattened_data[0] = '<div id="sprite_p">$</div>';
		flattened_data[21] = '<div id="sprite_p">$</div>';
		flattened_data[230] = '<div id="sprite_p">$</div>';
		flattened_data[251] = '<div id="sprite_p">$</div>';
		
		flattened_data[prev_cursor] = "<div id='sprite_p_rotate'>0</div>";
		
		//arrays shorten the amount of times i have to type flattened_data
		let paused_array = ["P", "A", "U", "S", "E", "D"];
		
		for (i = 0; i <= 5; i++) {
			flattened_data[i + 24] = paused_array[i];
		}
		
		let paused_array_set1 = ["C", "O", "L", "O", "R"];
		
		
		for (i = 0; i <= 4; i++) {
			flattened_data[i + 33] = paused_array_set1[i];
		}
		
		let paused_array_set2 = ["R", "E", "S", "E", "T"];
		
		for (i = 0; i <= 4; i++) {
			flattened_data[i + 56] = paused_array_set2[i];
		}
		
	}
	
	function draw_death_screen() {
		for (index = 0; index < room_point_array.length; index++) {
			flattened_data[room_point_array[index]] = "&emsp14;";
		}
		flattened_data[0] = '<div id="sprite_p">$</div>';
		flattened_data[21] = '<div id="sprite_p">$</div>';
		flattened_data[230] = '<div id="sprite_p">$</div>';
		flattened_data[251] = '<div id="sprite_p">$</div>';
		
		
		//arrays shorten the amount of times i have to type flattened_data
		let death_array = ["Y", "O", "U", "&emsp14;", "D", "I", "E", "D"];
		
		for (i = 0; i <= 7; i++) {
			flattened_data[i + 24] = death_array[i];
		}
		
		let death_array_set1 = ["H", "I", "T", "&emsp14;", "E", "N", "T", "E", "R", "&emsp14;", "T", "O", "&emsp14;", "R", "E", "T", "R", "Y"];
		
		for (i = 0; i <= 17; i++) {
			flattened_data[i + 70] = death_array_set1[i];
		}
	}
	
	function draw_upgrade_screen() {
		for (index = 0; index < room_point_array.length; index++) {
			flattened_data[room_point_array[index]] = "&emsp14;";
		}
		cursor_pos = 32;
		prev_cursor = 32;
		
		
		flattened_data[0] = '<div id="sprite_p">$</div>';
		flattened_data[21] = '<div id="sprite_p">$</div>';
		flattened_data[230] = '<div id="sprite_p">$</div>';
		flattened_data[251] = '<div id="sprite_p">$</div>';
		
		flattened_data[prev_cursor] = "<div id='sprite_p_rotate'>0</div>";
		
		//arrays shorten the amount of times i have to type flattened_data
		let paused_array = ["U", "P", "G", "R", "A", "D", "E"];
		
		for (i = 0; i <= 6; i++) {
			flattened_data[i + 24] = paused_array[i];
		}
		
		let paused_array_set1 = ["A", "T", "K", "&emsp14;", "&emsp14;", "&emsp14;", "&emsp14;", "&emsp14;", "&emsp14;", "+", "1"];
		
		
		for (i = 0; i <= 10; i++) {
			flattened_data[i + 33] = paused_array_set1[i];
		}
		
		let paused_array_set2 = ["H", "E", "A", "L", "T", "H", "&emsp14;", "&emsp14;", "&emsp14;", "+", "1"];
		
		for (i = 0; i <= 10; i++) {
			flattened_data[i + 56] = paused_array_set2[i];
		}
		
		let paused_array_set3 = ["R", "E", "C", "O", "V", "E", "R", "Y", "&emsp14;", "+", "1"];
		
		for (i = 0; i <= 10; i++) {
			flattened_data[i + 79] = paused_array_set3[i];
		}
	}
	
	
	//TODO
	
	//PRESTIGE MENU (P)
	//PRESTIGE POINTS (EVERY 6th FLOOR)
	//PRESTIGE UPGRADES
	//LOCAL PRESTIGE STORAGE
	//RESET PRESTIGE
	
	
	
