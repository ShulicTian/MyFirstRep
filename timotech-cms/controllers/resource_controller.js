/**
 * Author:ShulicTian
 * Date:2017/12/30
 */

var _ = require('lodash');
var i18n = require('../config/i18n_cn');
var resource_dao = require('../lib/dao/resource_dao');
var RetJson = require('../proxy/retjson');
var redisClient = require('../lib/common/redis_pool');
var validator = require('../lib/common/validator_extend');

exports.audio = function (req, res, next) {
	res.render("resource/audios");
};

exports.dial = function (req, res, next) {
	res.render("resource/dial");
};

exports.emoticon = function (req, res, next) {
	res.render("resource/emoticon");
};

exports.theme = function (req, res, next) {
	res.render("resource/theme");
};

exports.getAudios = function (req, res, next) {
	var name = "audio";
	resource_dao.getAudios(name, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

exports.getDials = function (req, res, next) {
	var name = "dial";
	resource_dao.getDials(name, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

exports.getEmoticons = function (req, res, next) {
	var name = "emoticon";
	resource_dao.getEmoticons(name, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

exports.getThemes = function (req, res, next) {
	var name = "theme";
	resource_dao.getThemes(name, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

/**
 * update
 */
exports.updateAudio = function (req, res, next) {

	var resourceId = req.body.resourceId;
	var url = req.body.url;
	var version = req.body.version;
	var productId = req.body.productId;

	/*    if(!validator.isNull(url) || !validator.isNull(version)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_DATA_ISNULL, null));
	 return;
	 }

	 if(!validator.isInt(version)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_VERSION_ISINT, null));
	 return;
	 }*/

	resource_dao.updateAudio(resourceId, url, version, productId, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

exports.updateEmoticon = function (req, res, next) {
	var resourceId = req.body.resourceId;
	var url = req.body.url;
	var version = req.body.version;
	var tag = req.body.tag;
	var productId = req.body.productId;
	console.log(productId)
	/*    if(!validator.isNull(url) || !validator.isNull(version) || !validator.isNull(tag)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_DATA_ISNULL, null));
	 return;
	 }

	 if(!validator.isInt(version)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_VERSION_ISINT, null));
	 return;
	 }*/

	resource_dao.updateEmoticon(resourceId, url, version, tag, productId, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}
		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

exports.updateDialAndTheme = function (req, res, next) {
	var resourceId = req.body.resourceId;
	var url = req.body.url;
	var version = req.body.version;
	var previewUrl = req.body.previewUrl;
	var tag = req.body.tag;
	var size = req.body.size;
	var name = req.body.resourceName;
	var productId = req.body.productId;
	console.log(productId)
	/*    if(!validator.isNull(url) || !validator.isNull(version) || !validator.isNull(tag)
	 || !validator.isNull(previewUrl) || !validator.isNull(size)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_DATA_ISNULL, null));
	 return;
	 }

	 if(!validator.isInt(version)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_VERSION_ISINT, null));
	 return;
	 }

	 if(!validator.isInt(size)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_SIZE_ISINT, null));
	 return;
	 }*/

	resource_dao.updateDialAndTheme(resourceId, url, version, name, previewUrl, tag, size, productId, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

/**
 *  save
 */
exports.saveAudio = function (req, res, next) {
	var resourceId = req.body.resourceId;
	var url = req.body.url;
	var version = req.body.version;
	var createTime = new Date();
	var productId = req.body.productId;

	/*	if(!validator.isNull(resourceId) || !validator.isNull(url) || !validator.isNull(version)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_DATA_ISNULL, null));
	 return;
	 }

	 if(!validator.isInt(version)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_VERSION_ISINT, null));
	 return;
	 }*/

	resource_dao.saveAudio(resourceId, url, version, createTime, productId, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}
		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

exports.saveEmoticon = function (req, res, next) {
	var resourceId = req.body.resourceId;
	var url = req.body.url;
	var version = req.body.version;
	var tag = req.body.tag;
	var createTime = new Date();
	var productId = req.body.productId;

	/*    if(!validator.isNull(resourceId) || !validator.isNull(url) || !validator.isNull(version) || !validator.isNull(tag)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_DATA_ISNULL, null));
	 return;
	 }

	 if(!validator.isInt(version)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_VERSION_ISINT, null));
	 return;
	 }*/

	resource_dao.saveEmoticon(resourceId, url, version, tag, createTime, productId, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}
		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

exports.saveDialAndTheme = function (req, res, next) {
	var resourceId = req.body.resourceId;
	var url = req.body.url;
	var version = req.body.version;
	var previewUrl = req.body.previewUrl;
	var tag = req.body.tag;
	var size = req.body.size;
	var name = req.body.resourceName;
	var createTime = new Date();
	var productId = req.body.productId;

	/*    if(!validator.isNull(resourceId) || !validator.isNull(url) || !validator.isNull(version) || !validator.isNull(tag)
	 || !validator.isNull(previewUrl) || !validator.isNull(size)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_DATA_ISNULL, null));
	 return;
	 }

	 if(!validator.isInt(version)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_VERSION_ISINT, null));
	 return;
	 }

	 if(!validator.isInt(size)){
	 res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.RESOURCE_SAVE_SIZE_ISINT, null));
	 return;
	 }*/

	resource_dao.saveDialAndTheme(resourceId, url, version, name, previewUrl, tag, size, createTime, productId, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

/**
 *  delete
 */
exports.deleteAudio = function (req, res, next) {
	var productId = req.body.productId;
	var resourceId = req.body.resourceId;
	resource_dao.deleteAudio(productId, resourceId, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

exports.deleteEmoticon = function (req, res, next) {
	var productId = req.body.productId;
	var resourceId = req.body.resourceId;
	resource_dao.deleteEmoticon(productId, resourceId, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

exports.deleteDialAndTheme = function (req, res, next) {
	var productId = req.body.productId;
	var resourceId = req.body.resourceId;
	var name = req.body.resourceName;
	resource_dao.deleteDialAndTheme(productId, resourceId, name, function (err, audios) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE, audios));
	});
};

exports.publish = function (req, res, next) {
	var name = req.body.resourceName;
	redisClient.hget('system_config', 'resource', function (err, resource) {
		if (err) {
			console.log(err);
			return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
		}

		var resource_versions = JSON.parse(resource);
		if (resource_versions[name]) {
			resource_versions[name] = resource_versions[name] + 1;
		}
		redisClient.hset('system_config', 'resource', JSON.stringify(resource_versions), function (err) {
			if (err) {
				console.log(err);
				return res.send(new RetJson(i18n.SYS_ERROR_CODE, i18n.SYS_ERROR_MESSAGE, []));
			}

			res.send(new RetJson(i18n.SYS_SUCCESS_CODE, i18n.SYS_SUCCESS_MESSAGE));
		})
	});
};