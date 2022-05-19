function draw_prestige_screen() {
	for (index = 0; index < room_point_array.length; index++) {
		flattened_data[room_point_array[index]] = "&emsp14;";
	}
	cursor_pos = 32;
	prev_cursor = 32;
	
	corner_signs();
	
	flattened_data[prev_cursor] = "<div id='sprite_p_rotate'>0</div>";
	
	//arrays shorten the amount of times i have to type flattened_data
	let paused_array = ["P", "R", "E", "S", "T", "I", "G", "E"];
	
	for (i = 0; i <= 7; i++) {
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