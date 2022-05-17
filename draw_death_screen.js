function draw_death_screen() {
	for (index = 0; index < room_point_array.length; index++) {
		flattened_data[room_point_array[index]] = "&emsp14;";
	}
	
	corner_signs();
	
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