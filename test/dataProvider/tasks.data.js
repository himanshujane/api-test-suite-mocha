import BaseData from './base.data.js'

class TasksData extends BaseData {

    //This class defines test data specific to Tasks related endpoints

    /**
     * This function defines all the text messages and key labels specific to create tasks endpoint
     */
    get _createTasksText() {
        return {
            title: "title"
        }
    }

    /**
     * This function defines the list of testdata to be used for creating tasks endpoint.
     */
    get _createTasks() {
        return {
            createTasksSchema: {
                "type": "object",
                "properties": {
                  "data": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "integer"
                      },
                      "title": {
                        "type": "string"
                      },
                      "due_at": {
                        "type": "null"
                      },
                      "is_completed": {
                        "type": "boolean"
                      },
                      "author": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer"
                          },
                          "name": {
                            "type": "string"
                          },
                          "email": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "id",
                          "name",
                          "email"
                        ]
                      }
                    },
                    "required": [
                      "id",
                      "title",
                      "due_at",
                      "is_completed",
                      "author"
                    ]
                  }
                },
                "required": [
                  "data"
                ]
              },
            validData: {
                reqBody: {
                    [this._createTasksText.title]: this.fakeText
                },
                reqHeader: {
                    'Content-Type': 'application/json'
                }
            },

            validDataList: [{
                    testName: "Task 1",
                    reqBody: {
                        [this._createTasksText.title]: this.fakeText
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    }
                },
                {
                    testName: "Task 2",
                    reqBody: {
                        [this._createTasksText.title]: this.fakeText
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    }
                }
            ],

            invalidData:  {
                testName: "Empty input",
                reqBody: {
                    [this._createTasksText.title]: ""
                },
                reqHeader: {
                    'Content-Type': 'application/json'
                }
            }
        }
    }
}
export default new TasksData()