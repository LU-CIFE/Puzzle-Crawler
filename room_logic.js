function room_logic() {
	
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
	if (current_floor >= 7) {
		generate_enemy(4);
	}
	if (current_floor >= 9) {
		generate_enemy(5);
	}
	
	if (current_floor >= 13) {
		generate_enemy(6);
	}
	
	
	generate_potion(1);
	generate_cash();
	current_floor ++;
}