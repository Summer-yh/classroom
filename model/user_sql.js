var user = {
	insert:'INSERT INTO `s_user` (sTime,uid,first_score,last_score) VALUES(?,?,0,0)',
	insertArticle:'INSERT INTO `article` (title,content,readNumber) VALUES(?,?,0)',
	// update:'update user set name=?, age=? where id=?',
	login:'SELECT * FROM `classUser` WHERE `uid`=? AND `password`=?',
	delete: 'DELETE * FROM `classUser` WHERE uid=?',
	queryById: 'SELECT a.*,su.first_score,su.last_score,s.* FROM `allUser` a NATURAL JOIN `s_user` su NATURAL JOIN `semester` s where a.uid = ?',
	queryAll: 'SELECT a.tel FROM `allUser` a NATURAL JOIN `s_user` su',
	queryById2: 'SELECT a.* FROM `allUser` a where a.uid = ?',
	queryByNumber: 'SELECT a.*,su.first_score,su.last_score,s.* FROM `allUser` a NATURAL JOIN `s_user` su NATURAL JOIN `semester` s where su.sTime = ?'
};
module.exports = user;
