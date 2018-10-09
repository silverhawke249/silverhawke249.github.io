function pageload() {
	$('#lvl-txt').text($('#lvl').val());
	$('#lvl-txt-m').text($('#lvl-m').val());
	$('#lvl').on('input change', function() {
		if (parseInt($('#lvl').val()) > parseInt($('#lvl-m').val())) {
			$('#lvl-m').val(parseInt($('#lvl').val()))
		}
		$('#lvl-txt').text($('#lvl').val());
		$('#lvl-txt-m').text($('#lvl-m').val());
	});
	$('#lvl-m').on('input change', function() {
		if (parseInt($('#lvl').val()) > parseInt($('#lvl-m').val())) {
			$('#lvl').val($('#lvl-m').val())
		}
		$('#lvl-txt').text($('#lvl').val());
		$('#lvl-txt-m').text($('#lvl-m').val());
	});
	$('.container').css('visibility', 'visible');
	is_revealed = true;
	indexes = [null, null, null, null, null, null, null, null, null, null];
};

function to_diff_name(s) {
	if (s.substring(0, 1) == "b")
		return "BEG"
	else if (s.substring(0, 1) == "B")
		return "BAS"
	else if (s.substring(0, 1) == "D")
		return "DIF"
	else if (s.substring(0, 1) == "E")
		return "EXP"
	else if (s.substring(0, 1) == "C")
		return "CHA"
	else
		return "UNK";
};

function to_style_name(s) {
	if (s.substring(1, 2) == "S")
		return "SP"
	else if (s.substring(1, 2) == "D")
		return "DP"
	else
		return "NA";
};

function toggle_songs() {
	if (is_revealed) {
		$("#toggler").attr("value", "Show songs");
		for (var i=0; i<10; i++) {
			$("#song" + i).html("---");
			$("#diff" + i).html("---");
			$("#lvl" + i).html("");
			$("#song" + i).attr("class", "noentry");
			$("#diff" + i).parent().attr("class", "difficulty noentry");
		}
		is_revealed = false;
	} else {
		$("#toggler").attr("value", "Hide songs");
		for (i in indexes) {
			$("#song" + i).html(songdata[indexes[i]][0]);
			$("#diff" + i).html(songdata[indexes[i]][1]);
			$("#lvl" + i).html(songdata[indexes[i]][2]);
			$("#song" + i).attr("class", to_diff_name(songdata[indexes[i]][1]));
			$("#diff" + i).parent().attr("class", "difficulty " + to_diff_name(songdata[indexes[i]][1]));
		}
		is_revealed = true;
	}
};

function randomize() {
	var new_indexes = [];
	var fixed_ctr = 0;
	var sub_songdata = [];
	var sub_indexes = [];
	is_revealed = true;
	
	for (i in songdata) {
		if (parseInt(songdata[i][2]) < $("[name=lvl]").val()) continue;
		if (parseInt(songdata[i][2]) > $("[name=lvl-m]").val()) continue;
		if (!($("[name=beg]").prop("checked")) && to_diff_name(songdata[i][1])=="BEG") continue;
		if (!($("[name=bas]").prop("checked")) && to_diff_name(songdata[i][1])=="BAS") continue;
		if (!($("[name=dif]").prop("checked")) && to_diff_name(songdata[i][1])=="DIF") continue;
		if (!($("[name=exp]").prop("checked")) && to_diff_name(songdata[i][1])=="EXP") continue;
		if (!($("[name=cha]").prop("checked")) && to_diff_name(songdata[i][1])=="CHA") continue;
		if (!($("[name=sp]").prop("checked")) && to_style_name(songdata[i][1])=="SP") continue;
		if (!($("[name=dp]").prop("checked")) && to_style_name(songdata[i][1])=="DP") continue;
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
			$("#song" + i).html("---");
			$("#diff" + i).html("---");
			$("#lvl" + i).html("");
			$("#song" + i).attr("class", "noentry");
			$("#diff" + i).parent().attr("class", "difficulty noentry");
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

function reset() {
	$(":checkbox").prop("checked", true);
	for (var i=0; i<10; i++) {
		$("[name=s"+i+"]").prop("checked", false);
	}
	$("[name=beg]").prop("checked", false);
	$("[name=bas]").prop("checked", false);
	$("[name=dif]").prop("checked", false);
	$("[name=dp]").prop("checked", false);
	$("[name=lvl]").val(13);
	$("#lvl-txt").text(13);
	$("[name=lvl-m]").val(16);
	$("#lvl-txt-m").text(16);
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
