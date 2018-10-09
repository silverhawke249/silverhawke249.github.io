var debug_index = 0;

function do_tally() {
	var tallies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0];
	var flavor = ["lv1", "lv2", "lv3", "lv4", "lv5", "lv6", "lv7", "lv8", "lv9", "lv10", "lv11", "lv12", "lv13", "lv14", "lv15", "lv16", "lv17", "lv18", "lv19"];
	for (i in songdata) {
		tallies(parseInt(songdata[i][2]) - 1) += 1
	}
	
	var txt = "";
	for (i in tallies) {
		txt += tallies[i] + " " + flavor[i] + "\n";
	}
	console.log(txt);
}

function song_test() {
	$("input[type=button]").attr("onclick", "debug_scroll();");
}

function debug_scroll(){
	var new_indexes = [];
	for (var i=0; i<10; i++)
		if (debug_index + i >= songdata.length)
			new_indexes.push(null)
		else 
			new_indexes.push(debug_index + i);
	debug_index += i;
	
	indexes = new_indexes;
	for (i in indexes) {
		var x = document.getElementById("song" + i);
		if (indexes[i] == null) {
			$("#song" + i).html("");
			$("#diff" + i).html("");
			$("#lvl" + i).html("");
			$("#song" + i).attr("class", "");
			$("#diff" + i).parent().attr("class", "difficulty");
		} else {
			$("#song" + i).html(songdata[indexes[i]][0]);
			$("#diff" + i).html(songdata[indexes[i]][1]);
			$("#lvl" + i).html(songdata[indexes[i]][2]);
			$("#song" + i).attr("class", to_diff_name(songdata[indexes[i]][1]));
			$("#diff" + i).parent().attr("class", "difficulty " + to_diff_name(songdata[indexes[i]][1]));
		}
	}
	return;
};