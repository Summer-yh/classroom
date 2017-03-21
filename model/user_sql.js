var user = {
	insert:'INSERT INTO `classUser` (uid, status, intergral,number,preMenber,menber,timeNumber) VALUES(?,?,?,?,?,?,?)',
	// update:'update user set name=?, age=? where id=?',
	login:'SELECT * FROM `classUser` WHERE `uid`=? AND `password`=?',
	delete: 'DELETE * FROM `classUser` WHERE uid=?',
	queryById: 'SELECT * FROM `allUser` INNER JOIN `classUser` ON allUser.uid = classUser.uid where classUser.uid = ?',
	queryAll: 'SELECT * FROM `classUser` WHERE `timeNumber`=?'
};
module.exports = user;
