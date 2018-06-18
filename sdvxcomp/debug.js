var debug_index = 0;

function do_tally() {
	var tallies = [0, 0, 0, 0, 0];
	var flavor = ["lv16", "lv17", "lv18", "lv19", "lv20"];
	for (i in songdata) {
		if (songdata[i][2] == "16") tallies[0] += 1;
		else if (songdata[i][2] == "17") tallies[1] += 1;
		else if (songdata[i][2] == "18") tallies[2] += 1;
		else if (songdata[i][2] == "19") tallies[3] += 1;
		else if (songdata[i][2] == "20") tallies[4] += 1;
	}
	
	var txt = "";
	for (i in tallies) {
		txt += tallies[i] + " " + flavor[i] + "\n";
	}
	console.log(txt);
}

function list_pb() {
	var ctr = 0;
	for (i in songdata) {
		if (songdata[i][3] == "1") {
			ctr += 1;
			console.log(songdata[i][0] + " [" + songdata[i][1] + "]");
		}
	}
	console.log(ctr + " songs.");
}

function list_blaster() {
	var ctr = 0;
	for (i in songdata) {
		if (songdata[i][4] == "1") {
			ctr += 1;
			console.log(songdata[i][0] + " [" + songdata[i][1] + "]");
		}
	}
	console.log(ctr + " songs.");
}

function list_od() {
	var ctr = 0;
	for (i in songdata) {
		if (songdata[i][5] == "1") {
			ctr += 1;
			console.log(songdata[i][0] + " [" + songdata[i][1] + "]");
		}
	}
	console.log(ctr + " songs.");
}

function list_events() {
	var ctr = 0;
	for (i in songdata) {
		if (songdata[i][6] == "1") {
			ctr += 1;
			console.log(songdata[i][0] + " [" + songdata[i][1] + "]");
		}
	}
	console.log(ctr + " songs.");
}

function get_temp_names() {
	var ctr = 0;
	for (i in songdata) {
		if (songdata[i][7] == "0") {
			ctr += 1;
			console.log(songdata[i][0] + " [" + songdata[i][1] + "]");
			console.log("img/" + songdata[i][0].hashCode() + songdata[i][1] + ".png");
		}
	}
	console.log(ctr + " songs.");
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
			$("#img" + i).attr("class", "");
			$("#img" + i).attr("src", "dummy.png");
		} else {
			$("#song" + i).html(songdata[indexes[i]][0]);
			$("#diff" + i).html(songdata[indexes[i]][1]);
			$("#lvl" + i).html(songdata[indexes[i]][2]);
			$("#song" + i).attr("class", songdata[indexes[i]][1]);
			$("#diff" + i).parent().attr("class", "difficulty " + songdata[indexes[i]][1]);
			$("#img" + i).attr("class", "");
			$("#img" + i).attr("src", "dummy.png");
			
			var img_suffix = "";
			if (songdata[indexes[i]][1] == "EXH") img_suffix += "3/";
			else if (songdata[indexes[i]][1] == "MXM") img_suffix += "5/";
			else img_suffix += "4/";
			if (songdata[indexes[i]][7] != "0") {
				img_suffix += songdata[indexes[i]][7] + ".png"
				$("#img" + i).attr("src", "https://sdvx.sgfc.co/jackets/" + img_suffix);
			} else {
				$("#img" + i).attr("src", "img/" + songdata[indexes[i]][0].hashCode() + songdata[indexes[i]][1] + ".png");
			}
		}
	}
	return;
};