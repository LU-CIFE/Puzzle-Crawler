function check_tile() {
	
	if (flattened_data[room_point_array[player_array_pos] + player_direction] == ".") {
		
		play_random_walk();
		move_player();
		
	} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='door_locked'>#</div>") {
	
		if (enemy1_health <= 0 && enemy2_health <= 0 && enemy3_health <= 0 && enemy4_health <= 0 && enemy5_health <=0 && enemy6_health <= 0) {
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
		health += 3 + total_recovery;
		
		if (health > total_max_health) {
			health = total_max_health;
		}
		
		document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
		
		play_random_walk();
		move_player();
	} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='d_tier'>Q</div>") {
		health += 5 + total_recovery;
		
		if (health > total_max_health) {
			health = total_max_health;
		}
		
		document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
		
		play_random_walk();
		move_player();
	 else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='c_tier'>Q</div>") {
		health += 7 + total_recovery;
		
		if (health > total_max_health) {
			health = total_max_health;
		}
		
		document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
		
		play_random_walk();
		move_player();
	} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='f_tier'>&</div>") {
		
		if (random_int(2) == 0) {
			shake_effect("health_container");
			health -= enemy1_atk;
		}
		enemy1_health -= (total_atk);
		if (health <= 0) {
			player_death();
		} else if (enemy1_health <= 0) {
			random_enemy_drop_f_tier();
		}
		
		sfx_hit1.pause();
		sfx_hit1.currentTime = 0;
		sfx_hit1.play();
		document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
		
	} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='d_tier'>&</div>") {
		
		if (random_int(2) == 0) {
			shake_effect("health_container");
			health -= enemy2_atk;
		}
		enemy2_health -= (total_atk);
		if (health <= 0) {
			player_death();
		} else if (enemy2_health <= 0) {
			random_enemy_drop_f_tier();
		}
		
		sfx_hit1.pause();
		sfx_hit1.currentTime = 0;
		sfx_hit1.play();
		document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
		
	} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='c_tier'>&</div>") {
		
		if (random_int(2) == 0) {
			shake_effect("health_container");
			health -= enemy3_atk;
		}
		enemy3_health -= (total_atk);
		if (health <= 0) {
			player_death();
		} else if (enemy3_health <= 0) {
			random_enemy_drop_d_tier();
		}
		
		sfx_hit1.pause();
		sfx_hit1.currentTime = 0;
		sfx_hit1.play();
		document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
		
	} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='b_tier'>&</div>") {
		
		if (random_int(2) == 0) {
			shake_effect("health_container");
			health -= enemy4_atk;
		}
		enemy4_health -= (total_atk);
		if (health <= 0) {
			player_death();
		} else if (enemy4_health <= 0) {
			random_enemy_drop_d_tier();
		}
		
		sfx_hit1.pause();
		sfx_hit1.currentTime = 0;
		sfx_hit1.play();
		document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
		
	} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='a_tier'>&</div>") {
		
		if (random_int(2) == 0) {
			shake_effect("health_container");
			health -= enemy5_atk;
		}
		enemy5_health -= (total_atk);
		if (health <= 0) {
			player_death();
		} else if (enemy5_health <= 0) {
			random_enemy_drop_d_tier();
		}
		
		sfx_hit1.pause();
		sfx_hit1.currentTime = 0;
		sfx_hit1.play();
		document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
		
	} else if (flattened_data[room_point_array[player_array_pos] + player_direction] == "<div id='s_tier'>&</div>") {
		
		if (random_int(2) == 0) {
			shake_effect("health_container");
			health -= enemy6_atk;
		}
		enemy6_health -= (total_atk);
		if (health <= 0) {
			player_death();
		} else if (enemy6_health <= 0) {
			random_enemy_drop_d_tier();
		}
		
		sfx_hit1.pause();
		sfx_hit1.currentTime = 0;
		sfx_hit1.play();
		document.getElementById("health_container").innerHTML = "Health: " + health + "/" + total_max_health;
		
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