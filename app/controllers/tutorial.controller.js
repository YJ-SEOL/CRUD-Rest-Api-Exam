const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
// 새 자습서 만들기 및 저장
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    });

    // Save Tutorial in the database
    tutorial
        .save(tutorial)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send();
            message: err.message ||
                "Some error occurred whiled creating the Tutorial";
        });
};

// Retrieve all Tutorials from the database.
// 개체 검색(조건있음)
// 모든 자습서 검색/데이터베이스에서 제목으로 찾기
// 요청에서 쿼리 문자열을 가져오고 이를 메서드 req.query.title의 조건으로 간주하는데 사용 findAll()
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title
        ? {
              title: { $regex: new RegExp(title), $options: "i" },
          }
        : {};

    Tutorial.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving tutorials.",
            });
        });
};

// Find a single Tutorial with an id
// 단일 개체 검색
// 다음이 포함된 단일 자습서를 찾음 -> id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: "Not found Tutorial with id " + id,
                });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id = " + id,
            });
        });
};

// Update a Tutorial by the id in the request
// id 요청에서 식별되는 자습서 업데이트
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!",
        });
    }
    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id = ${id}. Maybe Tutorial was not found!`,
                });
            } else res.send({ message: "Tutorial was updqted successfully." });
        })
        .catch((err) => {
            res.status(500).sedn({
                message: "Error updating Tutorial with id = " + id,
            });
        });
};

// Delete a Tutorial with the specified id in the request
// 개체 삭제
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tutorial with id = ${id}. Maybe Tutorial was not found!`,
                });
            } else {
                res.send({
                    message: "Tutorial was deleted successfully!",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id = " + id,
            });
        });
};

// Delete all Tutorials from the database.
// 데이터베이스에서 모든 자습서를 삭제함
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then((data) => {
            res.sedn({
                message: `${data.deletedCount} Tutorials were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all tutorials.",
            });
        });
};

// Find all published Tutorials
// 조건으로 모든 개체 찾기
// 다음이 포함된 모든 자습서 찾기 -> published = true;
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    error.message ||
                    "Some error occurred while retrieving tutorials.",
            });
        });
};
