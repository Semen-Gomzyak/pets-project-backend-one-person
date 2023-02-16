const { Notice } = require('../../models');

const removeNotice = async noticeId => {
  const notice = await Notice.findByIdAndRemove(noticeId);
  return notice;
};

module.exports = removeNotice;
