const mongoose = require('mongoose');
const { noteModel } = require('../../models');

const updateNote = async (id, user, ...rest) => {
	return new Promise(async (resolve, reject) => {
		await noteModel.findOneAndUpdate(
			{ _id: id, author: user._id },
			rest,
			{ new: true, useFindAndModify: false },
			(err, res) => {
				if (err) reject(err);
				resolve(res);
			}
		);
	});
};

module.exports = updateNote;
