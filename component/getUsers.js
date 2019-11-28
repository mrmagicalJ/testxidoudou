const fs = require("fs");
const path = require("path");
const readStream = fs.createReadStream(
  path.resolve(__dirname, "../static/用户名.txt")
);

const getUsers = new Promise((resolve, reject) => {
  let stream = "";
  readStream.on("data", data => {
    stream += data;
  });

  readStream.on("end", () => {
    resolve(stream.split(/,|、|，/));
  });

  readStream.on("error", err => {
    reject("读取用户列表文件失败！");
  });
});

module.exports = {
  getUsers
};
