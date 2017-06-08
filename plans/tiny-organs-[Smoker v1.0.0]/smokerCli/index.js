#!/usr/bin/env node
"use strict";
const program = require("commander");
const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile"); //https://www.npmjs.com/package/jsonfile
const node_xj = require("xls-to-json"); //https://github.com/DataGarage/node-xls-json


var args = process.argv;
args.splice(0, 2);

if(args.length != 0){
	
	// usage:: smoker init [folder-name]
	if(args[0] == "init"){
		// parent directory
		var dir = process.cwd() + "\\" + args[1];
		if (!fs.existsSync(dir)){ 
			fs.mkdirSync(dir);
			console.log("Parent directory created at " + path.basename(dir));
		}
		else{ console.log("Unable to create directory " + path.basename(dir)); }

		// logs directory
		var logs = dir + "\\logs";
		if (!fs.existsSync(logs)){ 
			fs.mkdirSync(logs);
			console.log("Child directory created at " + path.basename(logs));
		}
		else{ console.log("Unable to create child " + path.basename(logs)); }

		// pool directory
		var pool = dir + "\\pool";
		if (!fs.existsSync(pool)){ 
			fs.mkdirSync(pool);
			console.log("Child directory created at " + path.basename(pool));
		}
		else{ console.log("Unable to create child " + path.basename(pool)); }

		// write default config file
		var defaultConfig = {
			"test-info": {
				"name": "",
				"description": "",
				"goal": "",
				"personnel": ""
			},
			"data-source": {
				"file": {
					"path": "",
					"remarks": ""
				},
				"binder-convention": {
					"row": 1,
					"title": "Title",
					"html-element": "Address",
					"event": "Event",
					"data": "Input",
					"success-callback": "Success",
					"failed-callback": "Failed",
					"failed-continue-flag": "Continue"
				}
			},
			"init-default": {
				"timeout-seconds": 3,
				"screenshot-on-failed": true,
				"concurrent": {
					"instance": 1,
					"delay-per-instance-in-seconds": 1
				},
				"startup-url": ""
			},
			"logs": {
				"file": {
					"path": path.normalize(logs + "\\logs.txt"),
					"remarks": ""
				},
				"write-on-event-filter": ["onSuccess", "onFailed"]
			}
		};
		jsonfile.writeFileSync(pool + "\\config.json", defaultConfig, {spaces: 4});
	}

	// usage: smoker bind [file-path ---> ex. pool\config.json filename]
	else if(args[0] == "bind"){
		var dir = process.cwd() + "\\" + args[1];

		jsonfile.readFile(dir, function(err, obj) {
			if(err){ console.log(err); }

			var bind = obj;
			var fileXLS = dir.replace("\\config.json", "") + "\\" + bind["data-source"]["file"]["path"];

			node_xj({ input: fileXLS, output: path.dirname(fileXLS) + "\\" + args[2], sheet: "Sheet1"}, function(err, result) {
				if(err) { console.error(err); } 
				else { console.log(result); }
			});
		});
	}

	// usage: smoker start-smoking [file-path ---> ex. pool\login-raw-data\login.json]
	else if(args[0] == "start-smoking"){ 
		var toSmoke = process.cwd() + "\\" + args[1];
		var testCases = null;

		jsonfile.readFile(toSmoke, function(err, obj) {
			testCases = obj;

			for (var i = 0; i < testCases.length; i++) {
				console.log(testCases[i]);
			}
		});
	}

	// as of the time of coding this project, this part here are not relevant...
	else if(args[0] == "-h" || args[0] == "-help"){ console.log("No! I don't want to help you... Help yourself!"); }
	else if(args[0] == "-v" || args[0] == "--v" || args[0] == "-version" || args[0] == "--version"){ console.log("version unspecified..."); }
	else{ console.log("Argument format."); }
}
else{ console.log("Argument unknown. \n" + args); }