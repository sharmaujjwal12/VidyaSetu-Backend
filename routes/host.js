let express = require("express");
let upload = require("../MulterData")
let hostRouter = express.Router();
let {addQuoteController,getQuoteController,addMockController,getMockController,deleteMockController,editMockController,addQuestionController,getMockListsController,addMockDetailsController, getMockDetailsController,addRoadMapController, getRoadMapWithCondition, getRoadMapWithoutCondition,addPaidMockController,editPaidMockController,getPaidMockController,addPaidMockDetailsController, getPaidMockDetailsController,addPaidQuestionController,getPaidMockListsController} = require("../Controller/hostController")

hostRouter.get("/getQuote",getQuoteController);
hostRouter.get("/getMock",getMockController);
hostRouter.get("/getPaidMock",getPaidMockController);
hostRouter.get("/getMockDetails/:examType",getMockDetailsController);
hostRouter.get("/getPaidMockDetails/:examType",getPaidMockDetailsController);
hostRouter.get("/getMockLists/:examName",getPaidMockListsController);
hostRouter.get("/getPaidMockLists/:examName",getPaidMockListsController);
hostRouter.get("/getRoadMap/:roadMapType",getRoadMapWithCondition);
hostRouter.get("/getRoadMap",getRoadMapWithoutCondition);
hostRouter.post("/addQuote",addQuoteController);
hostRouter.post("/addMockDetails",addMockDetailsController);
hostRouter.post("/addPaidMockDetails",addPaidMockDetailsController);
hostRouter.post("/deleteMock/:id",deleteMockController);
hostRouter.post("/addMock",addMockController);
hostRouter.post("/addPaidMock",addPaidMockController);
hostRouter.post("/addQuestion",addQuestionController);
hostRouter.post("/addPaidQuestion",addPaidQuestionController);
hostRouter.post("/postRoadMap/:roadMapType",upload.single("roadMapPdf"),addRoadMapController);
hostRouter.put("/editMock/:id",editMockController);
hostRouter.put("/editPaidMock/:id",editPaidMockController);

module.exports = hostRouter;