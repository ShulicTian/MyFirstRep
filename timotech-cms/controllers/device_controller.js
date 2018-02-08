/*****************************************************
 * Author  : wadecha
 * Version : 1.0
 * Date    :  2015/9/18
 ****************************************************/
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var fileUpload = require('file-upload');
var async = require('async');
var i18n = require('../config/i18n_cn');
var device_dao = require('../lib/dao/device_dao');
var webConfig = require('../config/web_config');
var RetJson = require('../proxy/retjson');
var validator = require('../lib/common/validator_extend');
var watchUtil = require('watch-util');
var serviceClient = new watchUtil.ServiceClient(webConfig.service.host, webConfig.service.port);
var redisClient = require('../lib/common/redis_pool');

exports.log = function (req, res, next) {
	res.render('device/log');
};

exports.watch = function (req, res, next) {
	res.render('device/watch');
};

exports.device = function (req, res, next) {
	res.render('device/device');
};

exports.package = function (req, res, next) {
	res.render("device/package");
}

exports.update = function (req, res, next) {
	res.render("device/update");
}

exports.sendCommand = function (req, res, next) {
	var deviceId = req.body.udid;
	var code = parseInt(req.body.type);
	var content = JSON.parse(req.body.content);
	redisClient.publish('m_device_command',
			JSON.stringify({'deviceId': deviceId, 'code': code, 'body': content}),
			function (err) {
				if (err) {
					res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
					return;
				}
				res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE));
			});
};

exports.getLogList = function (req, res, next) {
	var source = req.body.source ? req.body.source : 'ALL';
	var logLevel = req.body.logLevel ? req.body.logLevel : 'ALL';
	var timeChecked = req.body.timeChecked == 1 ? true : false;
	var startDate = req.body.startDate ? req.body.startDate : '';
	var endDate = req.body.endDate ? req.body.endDate : '';
	var pageSize = validator.isNotZeroInt(req.body.rows) ? parseInt(req.body.rows) : webConfig.initPageSize;
	var offSet = validator.isNotZeroInt(req.body.page) ? (parseInt(req.body.page) - 1) * pageSize : 0;

	var clientKey = req.body.clientKey ? req.body.clientKey : '';
	clientKey = _.filter(clientKey.split(' '), function (key) {
		key = key.trim();
		return key.length > 0;
	});

	if (timeChecked) {
		if (!(validator.isDateTime(startDate) && validator.isDateTime(endDate))) {
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.ADMIN_LOG_TIME_FORMAT_ERROR, []));
			return;
		}
	}

	device_dao.getLogList(logLevel, clientKey, source, timeChecked, startDate, endDate, offSet, pageSize, function (err, logResults) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}
		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, logResults));
	});
};

exports.exportLog = function (req, res, next) {
	var source = req.query.source ? req.query.source : 'ALL';
	var logLevel = req.query.logLevel ? req.query.logLevel : 'ALL';
	var timeChecked = req.query.timeChecked == 1 ? true : false;
	var startDate = req.query.startDate ? req.query.startDate : '';
	var endDate = req.query.endDate ? req.query.endDate : '';


	var clientKey = req.query.clientKey ? req.query.clientKey : '';
	clientKey = _.filter(clientKey.split(' '), function (key) {
		key = key.trim();
		return key.length > 0;
	});

	device_dao.getExportLog(logLevel, clientKey, source, timeChecked, startDate, endDate, 500, function (err, logResults) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}

		var content = '';
		logResults.forEach(function (log) {
			content += log.createTime + '|' + log.key + '|' + log.logLevel + '|' + log.source + '|' + log.logContent + '\r\n';
		});
		res.set({
			'Content-Type': 'application/octet-stream',
			'Content-Disposition': 'attachment; filename=log.txt'
		});
		res.end(content);
	});
};

exports.getDeviceList = function (req, res, next) {
	var organID = req.body.organID;
	var sn = req.body.SN ? validator.trim(req.body.SN) : '';
	var pageSize = validator.isNotZeroInt(req.body.rows) ? parseInt(req.body.rows) : webConfig.initPageSize;
	var offSet = validator.isNotZeroInt(req.body.page) ? (parseInt(req.body.page) - 1) * pageSize : 0;


	function getCurrentOrganID(callback) {
		callback(undefined, {organID: organID, offSet: offSet, pageSize: pageSize, SN: sn});
	}

	async.waterfall([
		getCurrentOrganID,
		device_dao.getDeviceList
	], function (err, deviceData) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, deviceData));
	});
};

exports.unbind = function (req, res, next) {
	var babyId = req.body.babyId;
	serviceClient.invoke('baby/unBind', {
		'memberId': 0,
		'babyId': babyId
	}, function (err) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE));
	});
};

/**
 * SN查询 通讯录
 */
exports.getContact = function (req, res, next) {
	var babyId = req.body.babyId;
	if (!babyId) {
		return res.send(RetJson.invalidParameter());
	}

	async.parallel([function (callback) {
		device_dao.getMembers(babyId, callback);
	}, function (callback) {
		device_dao.getBabies(babyId, callback);
	}, function (callback) {
		serviceClient.invoke('baby/getContactsOfBaby', {
			'babyId': babyId
		}, callback);
	}], function (err, results) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}

		var contacts = [];
		results[0].forEach(function (member) {
			contacts.push({
				'name': member.nickName || member.name,
				'phone': member.phone,
				'otherPhone': member.otherPhone,
				'role': '家长'
			});
		});

		results[1].forEach(function (baby) {
			contacts.push({
				'name': baby.name,
				'phone': baby.phone,
				'otherPhone': baby.otherPhone,
				'role': '孩子'
			});
		});

		results[2].forEach(function (contact) {
			contacts.push({
				'name': contact.nickName,
				'phone': contact.phone,
				'otherPhone': contact.otherPhone,
				'role': '电话联系人'
			});
		});

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, contacts));
	});
};

/**
 *  SN查询 通话记录
 */
exports.getCallLog = function (req, res, next) {
	var babyId = req.body.babyId;
	if (!babyId) {
		return res.send(RetJson.invalidParameter());
	}

	serviceClient.invoke('baby/getCallLog',
			{'babyId': babyId, 'tops': 100},
			function (err, callLogs) {
				if (err) {
					console.log(err);
					return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
				}

				res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, callLogs));
			});

};

/**
 *  SN查询 课堂模式
 */
exports.getScene = function (req, res, next) {
	var babyId = req.body.babyId;
	if (!babyId) {
		return res.send(RetJson.invalidParameter());
	}

	serviceClient.invoke('baby/getScenes', {
		'babyId': babyId
	}, function (err, scenes) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, scenes));
	});
};
/**
 *  SN查询 闹钟
 */
exports.getAlarm = function (req, res, next) {
	var babyId = req.body.babyId;
	if (!babyId) {
		return res.send(RetJson.invalidParameter());
	}

	serviceClient.invoke('baby/getAlarms', {
		'babyId': babyId
	}, function (err, alarms) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, alarms));
	});
};
/**
 *  SN查询 好友
 */
exports.getFriends = function (req, res, next) {
	var babyId = req.body.babyId;
	if (!babyId) {
		return res.send(RetJson.invalidParameter());
	}

	serviceClient.invoke('baby/getFriendsOfBaby',
			{'babyId': babyId},
			function (err, friends) {
				if (err) {
					console.log(err);
					return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
				}

				var bindedFriends = _.filter(friends, function (friend) {
					return friend.deviceId;
				});

				res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, bindedFriends));
			});
};


/**
 *  SN查询 其他设置
 */
exports.getSetting = function (req, res, next) {
	var babyId = req.body.babyId;
	if (!babyId) {
		return res.send(RetJson.invalidParameter());
	}

	device_dao.getSetting(babyId, function (err, settings) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, settings));
	});
};


/**
 * 获取包
 */
exports.getPackageList = function (req, res, next) {

	device_dao.getPackageList(function (err, datas) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, datas));
	});
};
/**
 * 删除
 */
exports.removePackage = function (req, res, next) {
	var id = req.body.id;

	device_dao.removePackage(id, function (err, datas) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, datas));
	});
};

exports.updatePackage = function (req, res, next) {
	var fromVersion = req.body.fromVersion;
	var toVersion = req.body.toVersion;
	var fileName = req.body.url;
	var summary = req.body.summary;
	var id = req.body.id;
	var product = req.body.product;
	var md5 = null;
	var size = null;
	var url = null;

	function update() {
		device_dao.updatePackage(fromVersion, toVersion, url, md5, size, summary, id, product, function (err, datas) {
			if (err) {
				console.log(err);
				res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
				return;
			}

			res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, datas));
		});
	}

	if (fileName.indexOf('http://') == 0) {
		return update();
	}

	var filePath = path.join(webConfig.siteDirBaseUrl, '/upload/', fileName);
	var buffer = fs.readFileSync(filePath);
	size = buffer.length;
	var md5Hash = crypto.createHash('md5');
	md5Hash.update(buffer);
	md5 = md5Hash.digest('hex');
	var destPath = path.join('/data/source/timotech-official/public/download/ota/', product, fromVersion + '-' + toVersion);
	//var destPath = path.join(webConfig.siteDirBaseUrl, '/upload/', product, fromVersion + '-' + toVersion);
	if (!fs.existsSync(destPath)) {
		fs.mkdirSync(destPath);
	}

	fs.rename(filePath, path.join(destPath, 'watch.bin'), function (err) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}

		url = 'http://cms.titakid.com:19040/download/ota/' + product + '/' + fromVersion + '-' + toVersion + '/watch.bin';
		update();
	});
};
/**
 * 保存
 */
exports.savePackage = function (req, res, next) {
	var fromVersion = req.body.fromVersion;
	var toVersion = req.body.toVersion;
	var fileName = req.body.url;
	var summary = req.body.summary;
	var product = req.body.product;
	var createTime = new Date();
	var filePath = path.join(webConfig.siteDirBaseUrl, '/upload/', fileName);
	var buffer = fs.readFileSync(filePath);
	var size = buffer.length;
	var md5Hash = crypto.createHash('md5');
	md5Hash.update(buffer);
	var md5 = md5Hash.digest('hex');
	var destPath = path.join('/data/source/timotech-official/public/download/ota/', product, fromVersion + '-' + toVersion);
	//var destPath = path.join(webConfig.siteDirBaseUrl, '/upload/', product, fromVersion + '-' + toVersion);
	if (!fs.existsSync(destPath)) {
		fs.mkdirSync(destPath);
	}

	fs.rename(filePath, path.join(destPath, 'watch.bin'), function (err) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}

		var url = 'http://cms.titakid.com:19040/download/ota/' + product + '/' + fromVersion + '-' + toVersion + '/watch.bin';
		device_dao.savePackage(fromVersion, toVersion, url, md5, size, summary, createTime, product, function (err, datas) {
			if (err) {
				console.log(err);
				res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
				return;
			}

			res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, datas));
		});
	});
};


exports.uploadPackage = function (req, res, next) {
	fileUpload.fileHandler({
		uploadDir: function () {
			return path.join(webConfig.siteDirBaseUrl, '/upload/');
		},
		uploadUrl: function () {
			return '/upload/';
		}
	})(req, res, function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		var successResult = (result && result.files && result.files.length > 0) ? result.files[0].name : '';
		res.send(new RetJson(
				successResult ? i18n.SYS_SUCCESS_CODE : i18n.SYS_ERROR_CODE,
				successResult ? i18n.SYS_SUCCESS_MESSAGE : i18n.SYS_ERROR_MESSAGE,
				successResult));
	});
};


exports.getUpdate = function (req, res, next) {

	device_dao.getUpdateList(function (err, datas) {
		if (err) {
			console.log(err)
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}
		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, datas));
	});

}

exports.removeUp = function (req, res, next) {
	var id = req.body.id;
	device_dao.removeUp(id, function (err) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, null));
	});
};

exports.saveUp = function (req, res, next) {

	var version = req.body.version;
	var wVersion = req.body.wVersion;
	var modifyDesc = req.body.modifyDesc;
	var updateDesc = req.body.updateDesc;
	var updatePreTip = req.body.updatePreTip || '';
	var updatingTip = req.body.updatingTip || '';
	var failureTip = req.body.failureTip || '';
	var product = req.body.product;

	device_dao.saveUp(version, wVersion, modifyDesc, updateDesc, updatePreTip, updatingTip, failureTip, product, function (err) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, null));
	});
};

exports.updateUp = function (req, res, next) {
	var id = req.body.id;
	var version = req.body.version;
	var wVersion = req.body.wVersion;
	var modifyDesc = req.body.modifyDesc;
	var updateDesc = req.body.updateDesc;
	var updatePreTip = req.body.updatePreTip || '';
	var updatingTip = req.body.updatingTip || '';
	var failureTip = req.body.failureTip || '';
	var product = req.body.product;

	device_dao.updateUp(parseInt(id), version, wVersion, modifyDesc, updateDesc, updatePreTip, updatingTip, failureTip, product, function (err) {
		if (err) {
			console.log(err);
			res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			return;
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, null));
	});
};