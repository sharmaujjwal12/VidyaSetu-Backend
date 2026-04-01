let QuotesClass = require("../model/host/Quote");
let MockClass = require("../model/host/Mock");
let PaidMockClass = require("../model/host/PaidMock");
let PaidMockDetailsClass = require("../model/host/PaidMockDetails");
let QuestionClass = require("../model/host/AddQuestion");
let PaidQuestionClass = require("../model/host/PaidQuestion");
let MockDetailsClass = require("../model/host/MockDetails");
const AddQuestion = require("../model/host/AddQuestion");
const RoadMapClass = require("../model/host/AddRoadMaps");

exports.addQuoteController = async (req, res) => {
  let { quote, author } = req.body;
  console.log("Quotes : ", quote, author);
  let quotes = new QuotesClass({ quote, author });
  await quotes.save();
  res.json({ message: "Quote Submitted" });
};
exports.addRoadMapController = async (req, res) => {
  let roadmapType = req.params.roadMapType;
  console.log(req.file)
  if (!roadmapType) {
    return res.status(400).json({ message: "RoadMapType is Required" });
  }
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "Attached RoadMap File it is Required.." });
  }
  let roadMap = new RoadMapClass({ roadmapType, roadMapPdf:`/uploads/${req.file.filename}` });
  roadMap.save();
   res.status(200).json({
      message: "RooadMap Added Successfully",
      filename: req.file.filename,
    });
};

exports.getRoadMapWithCondition = async (req, res) => {
  let roadMapType = req.params.roadMapType;
  let roadMap = await RoadMapClass.find({roadmapType:roadMapType});
  res.json(roadMap);
};
exports.getRoadMapWithoutCondition = async (req, res) => {
  let roadMap = await RoadMapClass.find({}, { roadmapType: 1, _id: 0 });
  res.json(roadMap);
};

exports.getQuoteController = async (req, res) => {
  let quote = await QuotesClass.find();
  res.json(quote);
};
exports.getMockListsController = async (req, res) => {
  let examName = req.params.examName.trim();
  console.log("MockName at Backend : ", examName);
  let questions = await AddQuestion.find({ examName: examName });
  console.log("MockLists : ", questions);
  res.json(questions);
};
exports.getPaidMockListsController = async (req, res) => {
  let examName = req.params.examName.trim();
  console.log("MockName at Backend : ", examName);
  console.log("Collection Name :", PaidQuestionClass.collection.name);
  console.log("DB Name :", PaidQuestionClass.db.name);
  let questions = await PaidQuestionClass.find({examName: examName });
  console.log("MockLists : ", questions);
  res.json(questions);
};

exports.addMockController = async (req, res) => {
  let { name, noOfMock } = req.body;
  let mock = await MockClass({ name, noOfMock });
  await mock.save();
  res.json({ message: "Mock Added SuccessFully" });
};
exports.addPaidMockController = async (req, res) => {
  let { name, noOfMock } = req.body;
  let mock = await PaidMockClass({ name, noOfMock });
  await mock.save();
  res.json({ message: "Paid Mock Added SuccessFully" });
};
exports.addMockDetailsController = async (req, res) => {
  console.log("Backend Me Aaya", req.body);
  let { exam, duration, questions, marks } = req.body;
  let mock = await MockDetailsClass({ exam, duration, questions, marks });
  await mock.save();
  res.json({ message: "Mock Details Added SuccessFully" });
};
exports.addPaidMockDetailsController = async (req, res) => {
  console.log("Backend Me Aaya", req.body);
  let { exam, duration, questions, marks } = req.body;
  let mock = await PaidMockDetailsClass({ exam, duration, questions, marks });
  await mock.save();
  res.json({ message: "Paid Mock Details Added SuccessFully" });
};

exports.getMockDetailsController = async (req, res) => {
  let examName = req.params.examType;
  let mock = await MockDetailsClass.find({ exam: examName });
  res.json(mock);
};
exports.getPaidMockDetailsController = async (req, res) => {
  let examName = req.params.examType;
  let mock = await PaidMockDetailsClass.find({ exam: examName });
  res.json(mock);
};

exports.addQuestionController = async (req, res) => {
  let { examName, question, options, correctAnswer } = req.body;
  let questionObj = await QuestionClass({
    examName,
    question,
    options,
    correctAnswer,
  });
  await questionObj.save();
  res.json({ message: "Question Added SuccessFully" });
};
exports.addPaidQuestionController = async (req, res) => {
  let { examName, question, options, correctAnswer } = req.body;
  let questionObj = await PaidQuestionClass({
    examName,
    question,
    options,
    correctAnswer,
  });
  await questionObj.save();
  res.json({ message: "Question Added SuccessFully" });
};

exports.deleteMockController = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  console.log("Id At Delete : ", id);
  let mock = await MockClass.findByIdAndDelete(id);
  res.json({ message: "Mock Deleted SuccessFully", mock });
};

exports.editMockController = async (req, res) => {
  let { id } = req.params;
  let { noOfMock } = req.body;
  let mock = await MockClass.findByIdAndUpdate(
    id,
    { noOfMock: noOfMock },
    { success: true },
  );
  res.json({ message: "Mock Updated SuccessFully", mock });
};
exports.editPaidMockController = async (req, res) => {
  let { id } = req.params;
  let { noOfMock } = req.body;
  let mock = await PaidMockClass.findByIdAndUpdate(
    id,
    { noOfMock: noOfMock },
    { success: true },
  );
  res.json({ message: "Paid Mock Updated SuccessFully", mock });
};

exports.getMockController = async (req, res) => {
  let mock = await MockClass.find();
  res.json({ mock, success: true });
};
exports.getPaidMockController = async (req, res) => {
  let mock = await PaidMockClass.find();
  res.json({ mock, success: true });
};
