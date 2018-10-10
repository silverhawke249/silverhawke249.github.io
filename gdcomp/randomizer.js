function pageload() {
	two_dec = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2});
	$('#lvl-txt').text(two_dec.format($('#lvl').val()));
	$('#lvl-txt-m').text(two_dec.format($('#lvl-m').val()));
	$('#lvl').on('input change', function() {
		if (parseFloat($('#lvl').val()) > parseFloat($('#lvl-m').val())) {
			$('#lvl-m').val(parseFloat($('#lvl').val()))
		}
		$('#lvl-txt').text(two_dec.format($('#lvl').val()));
		$('#lvl-txt-m').text(two_dec.format($('#lvl-m').val()));
	});
	$('#lvl-m').on('input change', function() {
		if (parseFloat($('#lvl').val()) > parseFloat($('#lvl-m').val())) {
			$('#lvl').val($('#lvl-m').val())
		}
		$('#lvl-txt').text(two_dec.format($('#lvl').val()));
		$('#lvl-txt-m').text(two_dec.format($('#lvl-m').val()));
	});
	$('.container').css('visibility', 'visible');
	is_revealed = true;
	indexes = [null, null, null, null, null, null, null, null, null, null];
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
			$("#lvl" + i).html(two_dec.format(songdata[indexes[i]][2]));
			$("#song" + i).attr("class", songdata[indexes[i]][1]);
			$("#diff" + i).parent().attr("class", "difficulty " + songdata[indexes[i]][1]);
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
		if (parseFloat(songdata[i][2]) < $("[name=lvl]").val()) continue;
		if (parseFloat(songdata[i][2]) > $("[name=lvl-m]").val()) continue;
		if (!($("[name=bsc]").prop("checked")) && songdata[i][1]=="BSC") continue;
		if (!($("[name=adv]").prop("checked")) && songdata[i][1]=="ADV") continue;
		if (!($("[name=ext]").prop("checked")) && songdata[i][1]=="EXT") continue;
		if (!($("[name=mas]").prop("checked")) && songdata[i][1]=="MAS") continue;
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
			$("#lvl" + i).html(two_dec.format(songdata[indexes[i]][2]));
			$("#song" + i).attr("class", songdata[indexes[i]][1]);
			$("#diff" + i).parent().attr("class", "difficulty " + songdata[indexes[i]][1]);
		}
	}
	return;
};

function reset() {
	$(":checkbox").prop("checked", true);
	for (var i=0; i<10; i++) {
		$("[name=s"+i+"]").prop("checked", false);
	}
	$("[name=bsc]").prop("checked", false);
	$("[name=lvl]").val(7.00);
	$("#lvl-txt").text(two_dec.format(7.00));
	$("[name=lvl-m]").val(9.00);
	$("#lvl-txt-m").text(two_dec.format(9.00));
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
