String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return (hash + 2147483647) + 1;
};

// <-- manual exclusion/inclusion stuff
function dropdown_update(q) {
	if (q) {
		$('#songlist > option').toggle(false);
		for (var i=0; i<inclusion.length; i++)
			if (songdata[i][0].toLowerCase().includes(q) || songdata[i][8].some(function(e){ return e.includes(q) }))
				$('#songlist > option').eq(i).toggle();
	} else $('#songlist > option').toggle(true);
};

function clear_sel() {
	var setval = !inclusion.some(function(e){ return e });
	inclusion.fill(setval);
	$('#songlist > option').each(function(){
		$(this).prop('selected', setval);
	});
};
// -->

function pageload() {
	is_revealed = true;
	indexes = [null, null, null, null, null, null, null, null, null, null];
	
	// <-- manual exclusion/inclusion stuff
	inclusion = new Array(songdata.length);
	inclusion.fill(true);
	
	for (var i=0; i<inclusion.length; i++)
		$('#songlist').append($('<option>', {value:i, selected:inclusion[i], text:songdata[i][0] + ' [' + songdata[i][1] + ']'}));
	
	$(document).keyup(function(e){
		if (e.which == 0x31 && e.altKey) {
			$('.editor').toggle();
			$('#songsearch').val('');
			$('#songsearch').focus();
			dropdown_update();
		}
	});
	$('select > option').mousedown(function(e) {
		e.preventDefault();
		var originalScrollTop = $(this).parent().scrollTop();
		$(this).prop('selected', $(this).prop('selected') ? false : true);
		inclusion[$(this).val()] = $(this).prop('selected');
		var self = this;
		$(this).parent().focus();
		setTimeout(function() {
			$(self).parent().scrollTop(originalScrollTop);
		}, 0);
		return false;
	});
	$('#songsearch').keyup(function() {
		var q = $(this).val().trim().toLowerCase();
		dropdown_update(q);
	});
	// -->
	
	$('.container').css('visibility', 'visible');
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
			$("#img" + i).attr("class", "");
			$("#img" + i).attr("src", "dummy.png");
		}
		is_revealed = false;
	} else {
		$("#toggler").attr("value", "Hide songs");
		for (i in indexes) {
			$("#song" + i).html(songdata[indexes[i]][0]);
			$("#diff" + i).html(songdata[indexes[i]][1]);
			$("#lvl" + i).html(songdata[indexes[i]][2]);
			$("#song" + i).attr("class", songdata[indexes[i]][1]);
			$("#diff" + i).parent().attr("class", "difficulty " + songdata[indexes[i]][1]);
			$("#img" + i).attr("class", "");
			$("#img" + i).attr("src", "dummy.png");
			
			if (songdata[indexes[i]][7] != "0") {
				var img_suffix = "";
				if (songdata[indexes[i]][1] == "EXH") img_suffix += "3/";
				else if (songdata[indexes[i]][1] == "MXM") img_suffix += "5/";
				else img_suffix += "4/";
				img_suffix += songdata[indexes[i]][7] + ".png"
				$("#img" + i).attr("src", "https://sdvx.sgfc.co/jackets/" + img_suffix);
			} else {
				$("#img" + i).attr("src", "img/" + songdata[indexes[i]][0].hashCode() + songdata[indexes[i]][1] + ".png");
			}
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
	$("#toggler").attr("value", "Hide songs");
	
	for (i in songdata) {
		if (songdata[i][2]=="0") continue;
		if (!($("[name=lv16]").prop("checked")) && songdata[i][2]=="16") continue;
		if (!($("[name=lv17]").prop("checked")) && songdata[i][2]=="17") continue;
		if (!($("[name=lv18]").prop("checked")) && songdata[i][2]=="18") continue;
		if (!($("[name=lv19]").prop("checked")) && songdata[i][2]=="19") continue;
		if (!($("[name=lv20]").prop("checked")) && songdata[i][2]=="20") continue;
		if (!($("[name=allow_pb]").prop("checked")) && songdata[i][3]=="1") continue;
		if (!($("[name=allow_blaster]").prop("checked")) && songdata[i][4]=="1") continue;
		if (!($("[name=allow_od]").prop("checked")) && songdata[i][5]=="1") continue;
		if (!($("[name=allow_events]").prop("checked")) && songdata[i][6]=="1") continue;
		// manual inclusion/exclusion stuff
		if (!inclusion[i]) continue;
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
			
			if (songdata[indexes[i]][7] != "0") {
				var img_suffix = "";
				if (songdata[indexes[i]][1] == "EXH") img_suffix += "3/";
				else if (songdata[indexes[i]][1] == "MXM") img_suffix += "5/";
				else img_suffix += "4/";
				img_suffix += songdata[indexes[i]][7] + ".png"
				$("#img" + i).attr("src", "https://sdvx.sgfc.co/jackets/" + img_suffix);
			} else {
				$("#img" + i).attr("src", "img/" + songdata[indexes[i]][0].hashCode() + songdata[indexes[i]][1] + ".png");
			}
		}
	}
	return;
};

function reset() {
	$(":checkbox").prop("checked", true);
	for (var i=0; i<10; i++) {
		$("[name=s"+i+"]").prop("checked", false);
	}
	$("[name=lv16]").prop("checked", false);
	$("[name=lv18]").prop("checked", false);
	$("[name=lv19]").prop("checked", false);
	$("[name=lv20]").prop("checked", false);
	// manual inclusion/exclusion stuff
	inclusion.fill(true);
	$('#songlist > option').each(function(){
		$(this).prop('selected', true);
	});
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
		$(this).parent().find("img").toggleClass("hovered");
	});
	$(".song > span").mouseout(function() {
		$(this).parent().find("div").toggleClass("hovered");
		$(this).parent().find("img").toggleClass("hovered");
	});
	$(".song > div").mouseover(function() {
		$(this).parent().find("span").toggleClass("hovered");
		$(this).parent().find("img").toggleClass("hovered");
	});
	$(".song > div").mouseout(function() {
		$(this).parent().find("span").toggleClass("hovered");
		$(this).parent().find("img").toggleClass("hovered");
	});
	$(".song > img").mouseover(function() {
		$(this).parent().find("span").toggleClass("hovered");
		$(this).parent().find("div").toggleClass("hovered");
	});
	$(".song > img").mouseout(function() {
		$(this).parent().find("span").toggleClass("hovered");
		$(this).parent().find("div").toggleClass("hovered");
	});
});
