module.exports = function(app) {
	require(__dirname + '/controllers/cloud_data_controller')(app);
	require(__dirname + '/directives/d3_cloud_directive')(app);
};
