import BaseData from './base.data.js'

class TasksData extends BaseData {

  //This class defines test data specific to Tasks related endpoints

  /**
   * This function defines all the text messages and key labels specific to create tasks endpoint
   */
  get _createTasksText() {
    return {
      title: "title",
      isCompleted: "is_completed",

      emptyTitle: "The title field is required.",
      titleCharLimit: "The title may not be greater than 255 characters.",
    }
  }

  /**
   * This function defines the list of testdata to be used for creating tasks.
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
          testName: "Basic title",
          reqBody: {
            [this._createTasksText.title]: "This is test Title"
          },
          reqHeader: {
            'Content-Type': 'application/json'
          }
        },
        {
          testName: "Duplicate title",
          reqBody: {
            [this._createTasksText.title]: "This is test Title"
          },
          reqHeader: {
            'Content-Type': 'application/json'
          }
        },
        {
          testName: "Title with length 255 char",
          reqBody: {
            [this._createTasksText.title]: this.fakeAlphaNumeric(255)
          },
          reqHeader: {
            'Content-Type': 'application/json'
          }
        }
      ],

      invalidDataList: [{
          testName: "Empty title",
          reqBody: {
            [this._createTasksText.title]: ""
          },
          reqHeader: {
            'Content-Type': 'application/json'
          },
          expectedErr: {
            [this._createTasksText.title]: [this._createTasksText.emptyTitle]
          }
        },
        {
          testName: "Greater than 255 char",
          reqBody: {
            [this._createTasksText.title]: this.fakeAlphaNumeric(256)
          },
          reqHeader: {
            'Content-Type': 'application/json'
          },
          expectedErr: {
            [this._createTasksText.title]: [this._createTasksText.titleCharLimit]
          }
        },
        {
          testName: "With Just a space",
          reqBody: {
            [this._createTasksText.title]: " "
          },
          reqHeader: {
            'Content-Type': 'application/json'
          },
          expectedErr: {
            [this._createTasksText.title]: [this._createTasksText.emptyTitle]
          }
        },
        {
          testName: "No body payload",
          reqBody: {},
          reqHeader: {
            'Content-Type': 'application/json'
          },
          expectedErr: {
            [this._createTasksText.title]: [this._createTasksText.emptyTitle]
          }
        }
      ]
    }
  }

  /**
   * This function defines the list of testdata to be used for getting all tasks.
   */
  get _getAllTasks() {
    return {
      getAllTasksSchema: {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "items": [{
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
              },
              {
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
            ]
          }
        },
        "required": [
          "data"
        ]
      },
      validDataList: [{
          testName: "Having No Tasks",
          expectedData: []
        },
        {
          testName: "Having one Task"
        },
        {
          testName: "Having two Task"
        }
      ],
      invalidDataList: [{
          testName: "Empty token",
          token: ""
        },
        {
          testName: "Expired token",
          token: this.expiredToken
        }
      ]
    }
  }

  /**
   * This function defines the list of testdata to be used for deleting tasks.
   */
  get _deleteTask() {
    return {
      invalidDataList: [{
          testName: "Task ID is ==> 0",
          taskId: 0,
        },
        {
          testName: "Task ID is ==> 100",
          taskId: 100,
        },
        {
          testName: "Task ID is ==> -1",
          taskId: -1,
        }
      ]
    }
  }

  /**
   * This function defines the list of testdata to be used for updating tasks.
   */
  get _updateTask() {
    return {
      validData: {
        reqBody: {
          [this._createTasksText.title]: "Test Title 123",
          [this._createTasksText.isCompleted]: true
        },
        reqHeader: {
          'Content-Type': 'application/json'
        },
      }
    }
  }
}
export default new TasksData()