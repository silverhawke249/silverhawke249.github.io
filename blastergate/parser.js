var reqs = {
	96: "Have HE4VEN ～天国へようこそ～ [EXH] unlocked.",
	95: "Have Fin.ArcDeaR [EXH] unlocked.",
	94: "Have Immortal saga [EXH] unlocked.",
	93: "Have Make Magic [EXH] unlocked.",
	92: "Have Infinite:youniverse [EXH] unlocked.",
	82: "Have BLACK or WHITE? [EXH] unlocked.",
	81: "Have Last Concerto [EXH] unlocked.",
	78: "Have Growth Memories [EXH] unlocked.",
	77: "Have CODE -CRiMSON- [EXH] unlocked.",
	76: "Have Wish upon Twin stars [EXH] unlocked.",
	75: "Have Appliqué [EXH] unlocked.",
	74: "Have はわわｗ！な展開っ！ [EXH] unlocked.",
	73: "Have FLügeL《Λrp:ΣggyØ》 [EXH] unlocked.",
	72: "Have Lord=Crossight [EXH] unlocked.",
	71: "Have DIABLOSIS::Nāga [EXH] unlocked.",
	70: "Have NEO TREASON [EXH] unlocked.",
	69: "Have Celestial stinger [EXH] unlocked.",
	68: "Have Completeness Under Incompleteness [EXH] unlocked.",
	67: "Have ウエンレラの氷華 [EXH] unlocked.",
	66: "Have Ok!! Hug Me [EXH] unlocked.",
	65: "Have Triple Counter [EXH] unlocked.",
	54: "Have Bangin' Burst [EXH] unlocked.",
	53: "Have Hellfire [EXH] unlocked.",
	52: "Have choux à la crème [EXH] unlocked.",
	51: "Have Erlung [EXH] unlocked.",
	38: "Have XyHATTE [EXH] unlocked.",
	37: "Have Preserved Valkyria [EXH] unlocked.",
	36: "Have Blastix Riotz [EXH] unlocked.",
	35: "Have AΩ [EXH] unlocked.",
	34: "Have Opium and Purple haze [EXH] unlocked."
}

function clearall() {
	for (i=0; i<nument; i++) {
		state[i] = 0;
		$('input[name=opt'+i+']').val(["no"]);
	}
	x = document.getElementsByClassName("requirement")
	for (i=0; i<x.length; i++) {
		x[i].style.display = "none";
	}
	$('.inputtxt').val("");
}

function update() {
	var blaster_accel = false;
	var text = "";
	var reqtext = "";
	var runningtotal = 0;
	var omega = 0;
	if (blaster_accel)
		text += "BLASTER OverDrive active!!\n";
	for (i=0; i<nument; i++) {
		if (state[i]==1) {
			cur_data = textdb[i].split(sep);
			if (blaster_accel) {
				text += Math.ceil(parseInt(cur_data[4])/990/2) + " " + cur_data[1];
				runningtotal += Math.ceil(parseInt(cur_data[4])/990/2);
			} else {
				text += Math.ceil(parseInt(cur_data[4])/990) + " " + cur_data[1];
				runningtotal += Math.ceil(parseInt(cur_data[4])/990);
			}
			text += " [" + cur_data[2] + "]\n";
			if (i in reqs) {
				if (reqtext.indexOf(reqs[i]) === -1)
					reqtext += "<p>・ " + reqs[i] + "</p>";
			}
		}
	}
	for (i=0; i<omegadb.length; i++) {
		cur_data = omegadb[i].split(o_sep);
		if (o_state[i*2] == 1) {
			text += cur_data[1] + " [EXH]\n";
			omega += 1;
		}
		if (o_state[i*2 + 1] == 1) {
			text += cur_data[1] + " [MXM]\n";
			omega += 1;
		}
	}
	text += "---------------\n";
	var crnum = (omega > Math.ceil(runningtotal/2) ? 0 : (runningtotal - omega*2)/3) + omega;
	text += runningtotal + " tracks = " + crnum + " blaster starts.";
	x = document.getElementsByClassName("requirement");
	for (i=0; i<x.length; i++) {
		x[i].style.display = reqtext == "" ? "none" : "block";
	}
	reqtext = "<p style=\"font-size: 20pt\">Requirements</p>" + reqtext;
	x[1].innerHTML = reqtext;
	$('.inputtxt').val(text);
	var request = new XMLHttpRequest();
	request.open('GET',"https://api.fixer.io/latest?base=SGD&symbols=USD&callback=?",true);
	request.send(null);
	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			var exch = JSON.parse(request.responseText.substring(2,request.responseText.length-1));
			var cost = Math.floor(crnum * 4 * exch["rates"]["USD"] * 102) / 100;
			text += "\n" + crnum + " blaster starts = " + cost + " USD.";
			document.getElementById('paypal').href = "https://paypal.me/silverhawke/" + cost + "usd";
			$('.inputtxt').val(text);
			if (runningtotal == 0) {
				$('.inputtxt').val("");
				document.getElementById('paypal').href = "https://paypal.me/silverhawke";
			}
		}
	}
}

function clickbind() {
	$("body").on("change",".inputbtn", function(){
		var curpos = $(this).attr("name");
		curpos = parseInt(curpos.substring(3));
		var newstate;
		if ($(this).val() == "no")
			newstate = 0;
		else if ($(this).val() == "yes")
			newstate = 1;
		else
			newstate = -1;
		state[curpos] = newstate;
		cur_data = textdb[curpos].split(sep);
		if (newstate == 0) {
			succ = cur_data[6].split(",");
			if (succ[0] == -1) succ.shift();
			while (succ.length > 0) {
				n_ent = parseInt(succ.shift());
				state[n_ent] = 0;
				$('input[name=opt'+n_ent+']').val(["no"]);
				nextsucc = (textdb[n_ent].split(sep))[6].split(",");
				for (i=0; i<nextsucc.length; i++)
					if (parseInt(nextsucc[i]) != -1)
						succ.push(nextsucc[i]);
			}
		} else {
			pred = cur_data[5].split(",");
			if (pred[0] == -1) pred.shift();
			while (pred.length > 0) {
				p_ent = parseInt(pred.shift());
				state[p_ent] = state[p_ent]==-1?-1:newstate;
				$('input[name=opt'+p_ent+']').val([state[p_ent]==1?"yes":"skip"]);
				nextpred = (textdb[p_ent].split(sep))[5].split(",");
				for (i=0; i<nextpred.length; i++) 
					if (parseInt(nextpred[i]) != -1)
						pred.push(nextpred[i]);
			}
		}
		update();
	});
	$("body").on("change",".ochk", function(){
		var curpos = $(this).attr("name");
		curdiff = curpos.substring(curpos.length-1);
		curpos = parseInt(curpos.substring(5, curpos.length-2))*2;
		if (curdiff == 'm')
			curpos += 1;
		if ($(this).checked)
			o_state = 1;
		else
			o_state = 0;
		update();
	});
}

function writequeue() {
	var path = "/blastergate/queue.txt";
	var request = new XMLHttpRequest();
	request.open('GET',path,true);
	request.send(null);
	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			x = document.getElementsByClassName("fixed")[0];
			qdb = request.responseText.split("\n");
			var s = "";
			var p = 0;
			for (i=0; i<qdb.length; i++) {
				if (qdb[i][0] == '[') {
					if (s != "") {
						if (c > 1) {
							s2 = "<div class=\"cards\">";
							s2 += "[" + p + "]";
							s2 += "<div class=\"wrapper dropdown\">";
							s2 += s;
							s2 += "</div></div>";
						} else {
							s2 = "<div class=\"cards inactive\">";
							s2 += "[" + p + "]";
							s2 += "</div>";
						}
						x.innerHTML += s2;
					}
					p++;
					s = "";
					c = 0;
				} else {
					if (c == 0) {
						s += "<p class=\"cardnum\">";
						s += qdb[i].trim();
						s += "</p>";
					} else {
						s += "<p>";
						s += qdb[i].trim();
						s += "</p>";
					}
					c++;
				}
			}
			if (c > 1) {
				s2 = "<div class=\"cards\">";
				s2 += "[" + p + "]";
				s2 += "<div class=\"wrapper dropdown\">";
				s2 += s;
				s2 += "</div></div>";
			} else {
				s2 = "<div class=\"cards inactive\">";
				s2 += "[" + p + "]";
				s2 += "</div>";
			}
			x.innerHTML += s2;
		}
	}
}

function parse() {
	var path = "/blastergate/blaster.txt";
	var request = new XMLHttpRequest();
	request.open('GET',path,true);
	request.send(null);
	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			textdb = request.responseText.split("\n");
			for (i=0; i<textdb.length; i++) {
				textdb[i] = textdb[i].trim();
			}
			nument = parseInt(textdb.shift());
			sep = textdb.shift();
			state = new Array(nument);
			var pos = 0;
			if (textdb.length < nument) {
				console.log("parser error: malformed database file");
			} else {
				for (i=0; i<nument; i++) {
					cur_data = textdb[i].split(sep);
					state[i] = 0;
					var x = document.getElementsByClassName("container")[0];
					if (parseInt(cur_data[7]) == 1) {
						continue;
					}
					var writein = "";
					writein += "<div class=\"item l" + cur_data[3];
					if (parseInt(cur_data[5]) != -1 || parseInt(cur_data[6]) != -1) {
						writein += " chain";
					}
					writein += "\">";
					writein += "<label><input class=\"inputbtn\" type=\"radio\" name=\"opt" + cur_data[0] + "\" value=\"yes\">";
					writein += "yes</label>";
					writein += "<label><input class=\"inputbtn\" type=\"radio\" name=\"opt" + cur_data[0] + "\" value=\"no\" checked>";
					writein += "no</label>";
					writein += "<div";
					if (parseInt(cur_data[6]) == -1) {
						writein += " class=\"hide\"";
					}
					writein +="><label><input class=\"inputbtn\" type=\"radio\" name=\"opt" + cur_data[0] + "\" value=\"skip\">";
					writein += "skip</label></div>";
					writein += "<div class=\"songname\">" + cur_data[1] + "</div>";
					writein += "<div class=\"diff\">" + cur_data[2] + " " + cur_data[3] + "</div>";
					writein += "<div class=\"life\">" + cur_data[4] + "</div></div><br/>";
					x.innerHTML += writein;
				}
				writein = "<div class=\"item blank\">Ω Dimension</div><br/>";
				x.innerHTML += writein;
			}
			var o_path = "/blastergate/omega.txt";
			var o_request = new XMLHttpRequest();
			o_request.open('GET',o_path,true);
			o_request.send(null);
			o_request.onreadystatechange = function () {
				if (request.readyState === 4 && request.status === 200) {
					omegadb = request.responseText.split("\n");
					for (i=0; i<omegadb.length; i++) {
						omegadb[i] = omegadb[i].trim();
					}
					o_nument = parseInt(omegadb.shift());
					o_sep = omegadb.shift();
					o_state = new Array(2*o_nument);
					var pos = 0;
					if (omegadb.length < o_nument) {
						console.log("parser error: malformed database file");
					} else {
						for (i=0; i<o_nument; i++) {
							cur_data = omegadb[i].split(o_sep);
							o_state[2*i] = 0;
							o_state[2*i+1] = 0;
							var x = document.getElementsByClassName("container")[0];
							var writein = "";
							writein += "<div class=\"item omega\">"
							writein += "<label class=\"omegachk\"><input class=\"ochk\" type=\"checkbox\" name=\"omega" + cur_data[0] + "e\" value=\"EXH\">";
							writein += "EXH</label>";
							writein += "<label class=\"omegachk\"><input class=\"ochk\" type=\"checkbox\" name=\"omega" + cur_data[0] + "m\" value=\"EXH\">";
							writein += "MXM</label>";
							writein += "<div class=\"songname\">" + cur_data[1] + "</div>";
							writein += "<div class=\"diff\">EXH " + cur_data[2] + "</div>";
							writein += "<div class=\"diff\">MXM " + cur_data[3] + "</div></div><br/>";
							x.innerHTML += writein;
						}
						writein = "<textarea class=\"inputtxt\" onclick=\"this.select()\" rows=8 type=\"text\" readonly></textarea>";
						writein += "<input class=\"btn\" type=\"button\" value=\"clear all\" onclick=\"clearall()\">";
						x.innerHTML += writein;
						clickbind();
						writequeue();
						$('.wrapper').css("visibility", "visible");
					}
		}
	}
		}
	}

	
}
