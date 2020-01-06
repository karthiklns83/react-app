import { resolve } from 'dns';
import Axios from 'axios';

const fs = require('fs');

class authUser {

static validateUser(uid, aid, pwd){
    let config = {
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
        } 
   }
   var params = {
    accountId: aid,
    userId: uid,
    password: pwd
}
Axios.defaults.headers.common = {
    'Content-Type': 'application/json',
 } 
    return new Promise((resolve, reject) => {
        Axios.post('http://localhost:2021/user', params, config ).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        })
    })
  }

  static readQuestion(){
    let config = {
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
        } 
   }
Axios.defaults.headers.common = {
    'Content-Type': 'application/json',
 } 
    return new Promise((resolve, reject) => {
        Axios.post('http://localhost:2021/googapi/get', config ).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        })
    })
      
     /* var data = {
      "appList": [
          {
              "appId": "hardcodednow",
              "appName": "Noah",
              "intentList": [
                  {
                      "id_intent": "1",
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
  data = "";
      return JSON.stringify(data); */
  }

  static saveQuestionSet(questionPayLoad){
    let config = {
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
        } 
   }
Axios.defaults.headers.common = {
    'Content-Type': 'application/json',
 } 
    return new Promise((resolve, reject) => {
        Axios.post('http://localhost:2021/googapi/insert', questionPayLoad, config ).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        })
    })

  }
}

export default authUser;