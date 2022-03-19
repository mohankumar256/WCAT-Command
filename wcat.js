#!/usr/bin/env node
// commands used -> npm init -y , npm link
let fs = require("fs");
//input
let inputArr = process.argv.slice(2);
// console.log(inputArr);
//option
let optionsArr = [];
let filesArr = [];
// identify -> options
for (let i = 0; i < inputArr.length; i++) {
	let firstChar = inputArr[i].charAt(0);
	if (firstChar == "-")
		optionsArr.push(inputArr[i]);
	else
		filesArr.push(inputArr[i]);
}

//option check
let isBothPresent = optionsArr.includes("-b") && optionsArr.includes("-n");
if (isBothPresent) {
	console.log("either enter -n or -n");
	return;
}
//existence
for (let i = 0; i < filesArr.length; i++) {
	//buffer
	let isPresent = fs.existsSync(filesArr[i]);
	if(!isPresent){
	console.log(`file ${filesArr[i]} is not present`);
	return;
	}
}

//read
let content = "";
for (let i = 0; i < filesArr.length; i++) {
	//buffer
	let bufferContent = fs.readFileSync(filesArr[i]);
	content += bufferContent + "\r\n";
}
// console.log(content);
let contentArr = content.split("\r\n");
// console.log(contentArr);

//-s
let isSPresent = optionsArr.includes("-s");
if (isSPresent) {
	for (let i = 1; i < contentArr.length; i++) {
		if (contentArr[i] == "" && contentArr[i - 1] == "")  //if previous and current element is empty 
			contentArr[i] = null;
		else if (contentArr[i] == "" && contentArr[i - 1] == null)
			contentArr[i] = null; //if previous element is null and current element is empty
	}
	let tempArr = [];
	for (let i = 0; i < contentArr.length; i++) {
		if (contentArr[i] != null)
			tempArr.push(contentArr[i]);
	}
	contentArr = tempArr;
}
// console.log(contentArr);

//-n

let isNPresent = optionsArr.includes("-n");
if (isNPresent) {
	for (let i = 0; i < contentArr.length; i++) {
		contentArr[i] = `${i + 1} ${contentArr[i]}`;
	}
}
// console.log(contentArr.join("\n"));

//-b
let isBPresent = optionsArr.includes("-b");
if (isBPresent) {
	let counter = 1;
	for (let i = 0; i < contentArr.length; i++) {
		if (contentArr[i] != "") {
			contentArr[i] = `${counter} ${contentArr[i]}`;
			counter++;
		}
	}
}
//output
console.log(contentArr.join("\n"));
