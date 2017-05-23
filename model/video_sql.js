var video = {
	insert:'INSERT INTO `video` (vid,vname) VALUES(?,?)',
	// update:'update user set name=?, age=? where id=?',
	delete: 'DELETE * FROM `video` WHERE vid=?',
	queryById: 'SELECT * FROM `video` WHERE `vid`=?',
	queryByNumber: 'select * from video v natural join s_video sv WHERE `sTime`=?',
	queryAll: 'SELECT * FROM `video`',
	queryArticle: 'SELECT * FROM `article`',
	queryArticleById: 'SELECT * FROM `article` where `aid` = ?',
	updateReadById: 'update `article` set `time`=? where `aid`=?',
	numberVideo: 'select * from video v natural join s_video sv natural join semester s order by s.sTime desc'
};
module.exports = video;
