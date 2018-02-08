/**
 * Created by Administrator on 2015/10/8.
 */
var async = require('async');
var moment = require('moment');
var mongoDB = require('../common/mongo_pool');
var mysqlDao = require('../common/mysql_pool');

exports.getLogList = function (logLevel, keys, source, timeChecked, startDate, endDate, offSet, pageSize, callback) {
	var col = mongoDB.collection('log');
	var condition = {$and: []};
	if (logLevel != 'ALL') {
		condition.$and.push({logLevel: logLevel});
	}

	if (source != 'ALL') {
		condition.$and.push({source: source.trim()});
	}

	if (timeChecked) {
		condition.$and.push({createTime: {$gte: new Date(startDate), $lt: new Date(endDate)}});
	}
	//console.log("condition-->" + JSON.stringify(condition));
	if (keys && keys.length > 0) {
		var keyCon = {$or: []};
		condition.$and.push(keyCon);
		keys.forEach(function (key) {
			keyCon.$or.push({key: new RegExp('^' + key.trim())});
		});
	}

	if (condition.$and.length == 0) {
		condition = {};
	}

	function tranformResult(err, results) {
		var countResult = (results && results.length > 0) ? results[0] : 0;
		var logResults = (results[1] ? results[1] : []);
		logResults.forEach(function (log) {
			log.createTime = moment(log.createTime).format('YYYY-MM-DD HH:mm:ss');
		});

		callback(err, {total: countResult, rows: logResults});
	}

	var tasks = [];
	tasks.push(function (callback2) {
		col.count(condition, callback2);
	});
	tasks.push(function (callback2) {
		col.findItems(condition, {skip: offSet, limit: pageSize, sort: [['createTime', -1]]}, callback2);
	});

	async.parallel(
			tasks,
			tranformResult
	);
};


exports.getExportLog = function (logLevel, keys, source, timeChecked, startDate, endDate, limit, callback) {
	var col = mongoDB.collection('log');
	var condition = {$and: []};
	if (logLevel != 'ALL') {
		condition.$and.push({logLevel: logLevel});
	}

	if (source != 'ALL') {
		condition.$and.push({source: source.trim()});
	}

	if (timeChecked) {
		condition.$and.push({createTime: {$gte: new Date(startDate), $lt: new Date(endDate)}});
	}
	//console.log("condition-->" + JSON.stringify(condition));
	if (keys && keys.length > 0) {
		var keyCon = {$or: []};
		condition.$and.push(keyCon);
		keys.forEach(function (key) {
			keyCon.$or.push({key: new RegExp('^' + key.trim())});
		});
	}

	if (condition.$and.length == 0) {
		condition = {};
	}

	function tranformResult(err, results) {
		var logResults = results[0];
		logResults.forEach(function (log) {
			log.createTime = moment(log.createTime).format('YYYY-MM-DD HH:mm:ss');
		});

		callback(err, logResults);
	}

	var tasks = [];
	tasks.push(function (callback2) {
		col.findItems(condition, {skip: 0, limit: limit, sort: [['createTime', -1]]}, callback2);
	});

	async.parallel(
			tasks,
			tranformResult
	);
};

exports.getDeviceList = function (query, callback) {
	var sql = "select  t.udid as sn,t.productId,t.iccid,t.sw_version,o.organName,p.babyId " +
			"from t_device t join t_organ o on t.organId = o.id " +
			"left join t_device_baby p on t.udid = p.deviceId " +
			"where o.path like concat('%,', :organID, ',%') " +
			(query.SN ? " and t.udid=:SN" : "");
	mysqlDao.executeListForPagination(sql, query, callback);
};

exports.getSetting = function (babyId, callback) {
	var sql = "select a.paraName,a.paraValue,b.desc " +
			"from t_baby_config a " +
			"inner join t_setting_desc b on b.paraName=a.paraName " +
			"where a.babyId=:babyId and a.module='setting'";
	mysqlDao.executeList(sql, {'babyId': babyId}, callback);
};

exports.getMembers = function (babyId, callback) {
	var sql = "select nickName,phone,otherPhone from t_member where id in(" +
			"select memberId from t_family_member where familyId=(" +
			"select familyId from t_family_baby where babyId=:babyId))";
	mysqlDao.executeList(sql, {'babyId': babyId}, callback);
};

exports.getBabies = function (babyId, callback) {
	var sql = "select name,phone,otherPhone from t_baby where id in(" +
			"select babyId from t_family_baby where familyId=(" +
			"select familyId from t_family_baby where babyId=:babyId))";
	mysqlDao.executeList(sql, {'babyId': babyId}, callback);
};

exports.getPackageList = function (callback) {
	var sql = "select id,name,fromVersion,toVersion,url,md5,size,productId as product,summary from t_ota_diff_package";
	mysqlDao.executeList(sql, callback);
};
exports.removePackage = function (id, callback) {
	var sql = "delete from t_ota_diff_package where id=:id";
	mysqlDao.executeUpdate(sql, {"id": id}, callback);
};
exports.savePackage = function (fromVersion, toVersion, url, md5, size, summary, createTime, product, callback) {
	var sql = "insert into t_ota_diff_package(name,fromVersion,toVersion,url,md5,size,summary,createTime,productId) " +
			"values('watch.bin',:fromVersion,:toVersion,:url,:md5,:size,:summary,:createTime,:product)";
	mysqlDao.executeUpdate(sql, {
		"fromVersion": fromVersion,
		"toVersion": toVersion,
		"url": url,
		"md5": md5,
		"size": size,
		"summary": summary,
		"createTime": createTime,
		"product": product
	}, callback);
};
exports.updatePackage = function (fromVersion, toVersion, url, md5, size, summary, id, product, callback) {
	var sql = "update t_ota_diff_package " +
			"set fromVersion=:fromVersion,toVersion=:toVersion,url=ifnull(:url,url),md5=ifnull(:md5,md5)," +
			"size=ifnull(:size,size),summary=:summary,productId=:product " +
			"where id=:id";
	mysqlDao.executeUpdate(sql, {
		"fromVersion": fromVersion,
		"toVersion": toVersion,
		"url": url,
		"md5": md5,
		"size": size,
		"summary": summary,
		"id": id,
		"product": product
	}, callback);
};


exports.getUpdateList = function (callback) {
	var sql = "select u.id," +
			"u.version," +
			"u.modifyDesc," +
			"u.updateDesc," +
			"u.updatePreTip," +
			"u.updatingTip," +
			"u.failureTip," +
			"u.productId as product," +
			"d.version wVersion " +
			"from t_ota_update u,t_ota_update_detail d " +
			"where u.id=d.updateId";
	mysqlDao.executeList(sql, callback);
};

exports.removeUp = function (id, callback) {
	mysqlDao.executeByTran([{
		'sql': 'delete from t_ota_update where id=?',
		'paras': [id]
	},
		{
			'sql': "delete from t_ota_update_detail where otaName='watch.bin' and updateId=?",
			'paras': [id]
		}], callback);
};

exports.saveUp = function (version, wVersion, modifyDesc, updateDesc, updatePreTip, updatingTip, failureTip, product, callback) {
	mysqlDao.getConnection(function (err, connection) {
		if (err) {
			return callback(err);
		}

		connection.beginTransaction(function (err) {
			if (err) {
				connection.release();
				return callback(err);
			}

			var sql = "insert into t_ota_update(version,modifyDesc,updateDesc,updatePreTip,updatingTip,failureTip,productId,createTime) " +
					"values(?,?,?,?,?,?,?,now())";
			connection.query(sql,
					[version, modifyDesc, updateDesc, updatePreTip, updatingTip, failureTip, product],
					function (err, result) {
						if (err) {
							connection.rollback(function () {
								connection.release();
								return callback(err);
							});
							return;
						}

						var sql2 = "insert into t_ota_update_detail(updateId,otaName,version) " +
								"values(?,'watch.bin',?);";
						connection.query(sql2, [result.insertId, wVersion],
								function (err) {
									if (err) {
										connection.rollback(function () {
											connection.release();
											return callback(err);
										});
										return;
									}

									connection.commit(function (err) {
										connection.release();
										callback(err);
									});
								});
					});
		});
	});
};

exports.updateUp = function (id, version, wVersion, modifyDesc, updateDesc, updatePreTip, updatingTip, failureTip, product, callback) {
	var sql = "update t_ota_update " +
			"set version=?,modifyDesc=?,updateDesc=?,updatePreTip=?,updatingTip=?,failureTip=?,productId=? " +
			"where id=?";
	var sql2 = "update t_ota_update_detail set version=? " +
			"where otaName='watch.bin' and updateId=? ";
	mysqlDao.executeByTran([{
		'sql': sql,
		'paras': [version, modifyDesc, updateDesc, updatePreTip, updatingTip, failureTip, product, id]
	},
		{
			'sql': sql2,
			'paras': [wVersion, id]
		}], callback);
};
