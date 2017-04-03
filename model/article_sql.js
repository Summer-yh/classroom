var article = {
	insert:'INSERT INTO `article` (vid,vname) VALUES(?,?)',
	// update:'update user set name=?, age=? where id=?',
	delete: 'DELETE * FROM `article` WHERE vid=?',
	queryById: 'SELECT * FROM `article` WHERE `aid`=?',
	queryAll: 'SELECT * FROM `article`'
};
module.exports = article;
