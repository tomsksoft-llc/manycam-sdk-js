//@ts-check
"use strict";
const jsdoc2md = require("jsdoc-to-markdown");
const fs = require("fs");
const path = require("path");
/* input and output paths */
const inputFile = "src/**/*.js";
const outputDir = "docs";

let output = "";
// const template = fs.readFileSync("./template.hbs").toString();

/* get template data */
const templateData = jsdoc2md.getTemplateDataSync({ files: inputFile });
templateData.sort((a, b) => {
	if (a.name > b.name) {
		return 1;
	}
	if (a.name < b.name) {
		return -1;
	}
	return 0;
});
/* reduce templateData to an array of class names */
const classes = templateData.reduce((classes, identifier) => {
	if (identifier.kind === "class") classes.push(identifier);
	return classes;
}, []);
const constants = templateData.reduce((constants, identifier) => {
	if (identifier.kind === "constant") constants.push(identifier);
	return constants;
}, []);
const typedefs = templateData.reduce((typedefs, identifier) => {
	if (identifier.kind === "typedef") typedefs.push(identifier);
	return typedefs;
}, []);
makeSection("Classes", classes);
makeSection("Constants", constants, `constants.md#`);
makeSection("Type definitions", typedefs);

fs.writeFileSync(path.resolve(outputDir, `index.md`), output);

makeClassFiles();

/* create a documentation file for constants */
const template = `
{{#globals}}
{{>docs}}
{{/globals}}
`;
output = jsdoc2md.renderSync({
	data: constants,
	template: template,
	separators: true,
});
fs.writeFileSync(path.resolve(outputDir, `constants.md`), output);

function makeClassFiles() {
	const classNames = templateData.reduce((classNames, identifier) => {
		if (identifier.kind === "class" && !identifier.ignore)
			classNames.push(identifier.name);
		return classNames;
	}, []);
	/* create a documentation files for each class */
	for (const className of classNames) {
		const template = `
{{#class name="${className}"}}
{{>docs}}
{{/class}}
`;
		console.log(`rendering ${className}, template: ${template}`);
		const output = jsdoc2md.renderSync({
			data: templateData,
			template: template,
			separators: true,
		});
		fs.writeFileSync(path.resolve(outputDir, `${className}.md`), output);
	}
}

function makeSection(section, array, path) {
	let filePath = path ? `${path}{{name}}` : `{{name}}.md`;
	let template = `
{{#globals}}
| [{{name}}](${filePath}) | {{description}} |
{{/globals}}`;

	output += ` 

# ${section}
| Name | Description |
|------------|-------------|`;

	output += jsdoc2md.renderSync({
		data: array,
		template: template,
		separators: true,
	});
}
