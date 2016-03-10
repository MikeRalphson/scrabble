'use strict';

var fs = require('fs');

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function tidy(a, from, to) {
	return a.filter(function(item) {
		return ((item.length>=from) && (item.length<=to) && (item.indexOf("'")<0)
			&& (item.substr(0,1).toLocaleLowerCase()==item.substr(0,1)));
	});
}

var limit = 8;

if (process.argv.length>2) {

	if (process.argv.length>3) {
		limit = parseInt(process.argv[3],10);
	}

	var infile = process.argv[2];
	console.log('Processing '+infile);
	var input = [];
	input = fs.readFileSync(infile,'utf8').split('\r\n');
	console.log('Words: '+input.length);

	input.sort();
	while (input[0]=='') { //remove (was)trailing blank line from input file
		input.remove(0,1);
	}
	
	input = tidy(input,6,limit);
	console.log('Number of candidate words: '+input.length);
	
	var lookup = [];
	var temp = [];
	for (var i=0;i<input.length;i++) {
		temp = input[i].split('').sort();
		lookup.push(temp.join(''));
	}

	var filename = './dict/words'+limit;
	var ws = fs.createWriteStream(filename);
	ws.once('open', function(fd) {
		for (var i=0;i<input.length;i++) {
			ws.write(input[i]+','+lookup[i]+'\n');
		}
		ws.end();
	});

}
else {
	console.log('Usage: process_scowl infile');
}