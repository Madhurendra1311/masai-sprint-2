

var player = [];
var tobj = [];
function table() {
	var row = 10;
	var col = 10;
	var n = 100;
	var t = document.getElementById('table');
	t.innerHTML = '';
	var s = [16, 6, 53, 33, 63, 59, 86, 23, 92, 72, 94, 74, 98, 77];
	var l = [3, 13, 8, 30, 19, 37, 27, 87, 39, 58, 50, 66, 62, 80, 70, 90];
	var sobj = [];
	var lobj = [];
	for(var y = 0; y < s.length; ++y) {  
		sobj.push({
			h: s[y],
			t: s[++y]
		})
	}
	for(var z = 0; z < l.length; ++z) {
		lobj.push({
			h: l[z],
			t: l[++z]
		})
	}
	for(var x =0, a = 0, b = 0; x<row*col; x++) {
		tobj.push({
	        number: x,
	        shead: false,
	        snaket: 0,
	        lhead: false,
	        laddert: 0
	    });
	    if(sobj[a] && x === sobj[a].h) {
	    	tobj[x].shead = true;
	    	tobj[x].snaket = sobj[a].t;
	    	a++;
	    }
	    if (lobj[b] && x === lobj[b].h) {
	    	tobj[x].lhead = true;
	    	tobj[x].laddert = lobj[b].t;
	    	b++;
	    }
	}

	for(var i = 0; i < row; i++) {
		if(i%2 !== 0) {
			for(var j = 9; j >= 0; j--) {
				if(tobj[(n-j-1)].shead) {
					t.innerHTML += "<div class='box snake' id=box"+ (n-j) +">"+ (n-j) +"<p class='little-text'>Snake: Go to "+ tobj[(n-j-1)].snaket +"</p></div>";
				}
				else if(tobj[(n-j-1)].lhead) {
					t.innerHTML += "<div class='box ladder' id=box"+ (n-j) +">"+ (n-j) +"<p class='little-text'>Ladder: Go to "+ tobj[(n-j-1)].laddert +"</p></div>"
				}
				else {
					t.innerHTML += "<div class='box' id=box"+ (n-j) +">"+ (n-j) +"</div>";
				}
			}
		}
		else {
			for(var k = 0; k < col; k++) {
				if(tobj[(n-k-1)].shead) {
					t.innerHTML += "<div class='box snake' id=box"+ (n-k) +">"+ (n-k) +"<p class='little-text'>Snake: Go to "+ tobj[(n-k-1)].snaket +"</p></div>";
				}
				else if(tobj[(n-k-1)].lhead) {
					t.innerHTML += "<div class='box ladder' id=box"+ (n-k) +">"+ (n-k) +"<p class='little-text'>Ladder: Go to "+ tobj[(n-k-1)].laddert +"</p></div>";
				}
				else {
					t.innerHTML += "<div class='box' id=box"+ (n-k) +">"+ (n-k) +"</div>";
				}
			}
		}
		n -= 10;
		t.innerHTML += '<br/>';
	}
}


function random(){
	return Math.floor(Math.random() * (6)) + 1;
}


function displayPlayer(pno, n) {
	if(pno === 0){
		var el1 = document.querySelector(".one.on-t");
		if(el1) {
			el1.parentNode.removeChild(el1);
		}
		document.getElementById('box'+n).innerHTML += "<div class='player one on-t'></div>";
	}
	else {
		var el2 = document.querySelector(".two.on-t");
		if(el2) {
			el2.parentNode.removeChild(el2);
		}
		document.getElementById('box'+n).innerHTML += "<div class='player two on-t'></div>";
	}
}


function positionCheck(pno) {
	if(player[pno].pos >= 100) {
		alert('Player'+(pno+1)+' win');
		location.reload();
	}
	if(tobj[player[pno].pos - 1].shead) {
		player[pno].pos = tobj[player[pno].pos - 1].snaket;
	}
	if(tobj[player[pno].pos - 1].lhead) {
		player[pno].pos = tobj[player[pno].pos - 1].laddert;
	}
	displayPlayer(pno, player[pno].pos);
}


function move(pno) {
	if(!pno){
		document.getElementById('play0').setAttribute('disabled', 'disabled');
		document.getElementById('play1').removeAttribute('disabled');
		document.querySelector(".player1").innerHTML = "";
	}
	else {
		document.getElementById('play1').setAttribute('disabled', 'disabled');
		document.getElementById('play0').removeAttribute('disabled');
		document.querySelector(".player0").innerHTML = "";
	}
	var dice;
	dice = random();
	document.querySelector(".player"+pno).innerHTML = dice;
	player[pno].pos += dice;
	positionCheck(pno);
	localStorage.setItem('playerPositions', JSON.stringify(player));
}


function reset() {
	localStorage.removeItem('playerPositions');
	location.reload();
}


function saved() {
	player = JSON.parse(localStorage.getItem('playerPositions')) || [{pos: 0},{pos: 0}];
	if(player[0].pos && player[1].pos) {
		displayPlayer(0, player[0].pos);
		displayPlayer(1, player[1].pos);
	}
}
table();
saved();