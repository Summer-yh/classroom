var video = {
	insert:'INSERT INTO `video` (vid,vname) VALUES(?,?)',
	// update:'update user set name=?, age=? where id=?',
	delete: 'DELETE * FROM `video` WHERE vid=?',
	queryById: 'SELECT * FROM `video` WHERE `vid`=?',
	queryAll: 'SELECT * FROM `video`'
};
module.exports = video;
