function randomize() {
	var new_indexes = [];
	var fixed_ctr = 0;
	var sub_songdata = [];
	var sub_indexes = [];
	for (i in songdata) {
		if (!($("[name=lv16]").prop("checked")) && songdata[i][2]=="16") continue;
		if (!($("[name=lv17]").prop("checked")) && songdata[i][2]=="17") continue;
		if (!($("[name=lv18]").prop("checked")) && songdata[i][2]=="18") continue;
		if (!($("[name=lv19]").prop("checked")) && songdata[i][2]=="19") continue;
		if (!($("[name=lv20]").prop("checked")) && songdata[i][2]=="20") continue;
		if (!($("[name=allow_pb]").prop("checked")) && songdata[i][3]=="1") continue;
		if (!($("[name=allow_blaster]").prop("checked")) && songdata[i][4]=="1") continue;
		if (!($("[name=allow_od]").prop("checked")) && songdata[i][5]=="1") continue;
		if (!($("[name=allow_events]").prop("checked")) && songdata[i][6]=="1") continue;
		sub_indexes.push(i);
	}
	for (var i=0; i<10; i++) {
		if ($("[name=s"+i+"]").prop("checked")) {
			new_indexes.push(indexes[i]);
			fixed_ctr += 1;
		} else {
			if (new_indexes.length - fixed_ctr >= sub_indexes.length) {
				new_indexes.push(null);
			} else {
				var index = Math.floor(Math.random() * sub_indexes.length);
				while (new_indexes.indexOf(sub_indexes[index]) != -1)
					var index = Math.floor(Math.random() * sub_indexes.length);
				new_indexes.push(sub_indexes[index]);
			}
		}
	}
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
			img_suffix += songdata[indexes[i]][7] + ".png"
			$("#img" + i).attr("src", "https://sdvx.sgfc.co/jackets/" + img_suffix);
		}
	}
	return;
};
function reset() {
	$(":checkbox").prop("checked", true);
	for (var i=0; i<10; i++) {
		$("[name=s"+i+"]").prop("checked", false);
	}
	return;
};
$(document).ready(function(){
	$(".song > span").mouseup(function() {
		$(this).parent().children().toggleClass("disabled");
	});
	$(".song > .difficulty").mouseup(function() {
		$(this).parent().children().toggleClass("disabled");
	});
	$(".song > img").mouseup(function() {
		$(this).parent().children().toggleClass("disabled");
	});
	$(".song > span").mouseover(function() {
		$(this).parent().find("div").toggleClass("hovered");
	});
	$(".song > span").mouseout(function() {
		$(this).parent().find("div").toggleClass("hovered");
	});
	$(".song > div").mouseover(function() {
		$(this).parent().find("span").toggleClass("hovered");
	});
	$(".song > div").mouseout(function() {
		$(this).parent().find("span").toggleClass("hovered");
	});
});