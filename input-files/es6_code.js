const run = () => {
	const obj = {
		'a': "a's value",
	};
	if(obj?.a) {
		console.log(obj?.a);	
	}
};


run();
