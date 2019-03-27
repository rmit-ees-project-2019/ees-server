const Test = require("../models/test");

class TestList {
  /**
   * Handles the various APIs for displaying and managing tests
   * @param {Test} test
  */
 constructor(test) {
 this.test = test;
 }

 async showTest(req, res) {
  console.log("here 4");
   const querySpec = {
     query: "SELECT * FROM root r"
   };

   const items = await this.test.find(querySpec);
   
   console.log("here 3");
   console.log(items);
 }

 async addTest(req, res) {
   const item = req.body;

   await this.test.addItem(item);
   res.redirect("/");
 }
}

module.exports = TestList;