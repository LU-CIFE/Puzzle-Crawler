function room_logic() {
	
	generate_player();
	generate_door();
	current_floor ++;
	
	if (current_floor >= 14) {
		generate_enemy(1);
		generate_enemy(2);
		generate_enemy(3);
		generate_enemy(4);
		generate_enemy(5);
		generate_enemy(6);
		generate_potion(1);
		generate_potion(2);
		generate_potion(3);
		generate_cash();
		
	} else if (current_floor >= 11) {
		generate_enemy(1);
		generate_enemy(2);
		generate_enemy(3);
		generate_enemy(4);
		generate_enemy(5);
		generate_potion(1);
		generate_potion(2);
		generate_potion(3);
		generate_cash();
		
		
	} else if (current_floor >= 8) {
		generate_enemy(1);
		generate_enemy(2);
		generate_enemy(3);
		generate_enemy(4);
		generate_potion(1);
		generate_potion(2);
		generate_cash();
		
	} else if (current_floor >= 6) {
		generate_enemy(1);
		generate_enemy(2);
		generate_enemy(3);
		generate_potion(1);
		generate_potion(2);
		generate_cash();
		
	} else if (current_floor >= 5) {
		generate_enemy(1);
		generate_enemy(2);
		generate_enemy(3);
		generate_potion(1);
		generate_cash();
		
	} else if (current_floor >= 4) {
		generate_enemy(1);
		generate_enemy(2);
		generate_potion(1);
		generate_cash();
		
	} else {
		generate_enemy(1);
		generate_potion(1);
		generate_cash();
	}
}