function draw_pause_screen() {
	for (index = 0; index < room_point_array.length; index++) {
		flattened_data[room_point_array[index]] = "&emsp14;";
	}
	cursor_pos = 32;
	prev_cursor = 32;
	
	corner_signs();
	
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