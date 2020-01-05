const fs = require('fs');

class authUser {

static validateUser(){
    return (
      {
        "accountid" : "12abcd",
        "username": "admin",
        "password": "admin"
    }
    );
  }

  static readQuestion(){
     var data = {
      "appList": [
          {
              "appId": "hardcodednow",
              "appName": "Noah",
              "intentList": [
                  {
                      "id_intent": "",
                      "displayName": "Q-1-2",
                      "trainingParts": [
                          "q1",
                          "q1-2",
                          "q1-3"
                      ],
                      "trainingResponse": [
                          "a1",
                          "a1-2",
                          "a1-3",
                          "a1-4",
                          "a1-5"
                      ]
                  },
                  {
                      "id_intent": "",
                      "displayName": "Q-2-2",
                      "trainingParts": [
                          "q2-1",
                          "q2-2"
                      ],
                      "trainingResponse": [
                          "a2-1"
                      ]
                  }
              ]
          }
      ]
  }
      return data;
  }

  static saveQuestionSet(questionPayLoad){
    fs.writeFile('./questionSet.json', JSON.stringify(questionPayLoad, null, 4), (err) => {
        if (err) {
          console.log(err) 
          return false; 
        }
        else
        {
        console.log("Write to File successful");
        return true 
      }
    })

  }
}

export default authUser;