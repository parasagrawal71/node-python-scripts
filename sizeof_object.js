const { sizeof } = require('sizeof'); 

const anyObject = {
	'key': {
		name: 'abc', 
		age: 123, 
		active: true
	}
}

console.log(sizeof(anyObject));	// 50
console.log(sizeof(anyObject, true));	// 50B
