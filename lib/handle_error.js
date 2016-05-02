module.exports = exports = (err, res, status, message) => {
	console.log(err);
	var statusMessage = message || '';

	if(!statusMessage) {
		if(status === 401) {
			statusMessage = 'Could not authenticate.';
		}
		if(status === 500) {
			statusMessage = 'Server error.';
		}
	}

	// Default response: status 500; 'Error. Please try again later.'
	return res.status(status || 500).json({msg: statusMessage || 'Error. Please try again later.'});
};
