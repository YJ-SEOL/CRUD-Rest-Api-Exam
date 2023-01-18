// MongoDB Atlas 연결(cloud)
// 지희온냐 MongoDB Atlas

require("dotenv").config();

const username = process.env.NODEJS_APP_ATLAS_ID;
const password = process.env.NODEJS_APP_ATLAS_PW;
module.exports = {
    url: `mongodb+srv://${username}:${password}@cluster0.uwatlea.mongodb.net/?retryWrites=true&w=majority`,
};

// Bezkoder_db 원 데이터베이스 및 몽구스 구성 url
// module.exports = {
//     url: "mongodb://localhost:27017/bezkoder_db",
// };
