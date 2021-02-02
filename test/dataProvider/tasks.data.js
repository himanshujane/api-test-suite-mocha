import BaseData from './base.data.js'

class TasksData extends BaseData {

  //This class defines test data specific to Tasks related endpoints


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
          [this.commonKeys.title]: this.fakeText
        },
        reqHeader: {
          'Content-Type': 'application/json'
        }
      },

      validDataList: [{
          testName: "Basic title",
          reqBody: {
            [this.commonKeys.title]: "This is test Title"
          },
          reqHeader: {
            'Content-Type': 'application/json'
          },
          expectedResponse: {
            [this.commonKeys.isCompleted]: false,
            [this.commonKeys.due_at]: null
          }
        },
        {
          testName: "Duplicate title",
          reqBody: {
            [this.commonKeys.title]: "This is test Title"
          },
          reqHeader: {
            'Content-Type': 'application/json'
          },
          expectedResponse: {
            [this.commonKeys.isCompleted]: false,
            [this.commonKeys.due_at]: null
          }
        },
        {
          testName: "Title with length 255 char",
          reqBody: {
            [this.commonKeys.title]: this.fakeAlphaNumeric(255)
          },
          reqHeader: {
            'Content-Type': 'application/json'
          },
          expectedResponse: {
            [this.commonKeys.isCompleted]: false,
            [this.commonKeys.due_at]: null
          }
        },
        {
          testName: "Title with is_completed status as true and due by date",
          reqBody: {
            [this.commonKeys.title]: this.fakeAlphaNumeric(10),
            [this.commonKeys.isCompleted]: true,
            [this.commonKeys.due_at]: "12:12:2020"
          },
          reqHeader: {
            'Content-Type': 'application/json'
          },
          expectedResponse: {
            [this.commonKeys.isCompleted]: true,
            [this.commonKeys.due_at]: "2020-12-12T00:00:00+00:00"
          }
        }
      ],

      invalidDataList: [{
          testName: "Empty title",
          reqBody: {
            [this.commonKeys.title]: ""
          },
          reqHeader: {
            'Content-Type': 'application/json'
          },
          expectedErr: {
            [this.commonKeys.title]: [this.commonValues.emptyTitle]
          }
        },
        {
          testName: "Greater than 255 char",
          reqBody: {
            [this.commonKeys.title]: this.fakeAlphaNumeric(256)
          },
          reqHeader: {
            'Content-Type': 'application/json'
          },
          expectedErr: {
            [this.commonKeys.title]: [this.commonValues.titleCharLimit]
          }
        },
        {
          testName: "With Just a space",
          reqBody: {
            [this.commonKeys.title]: " "
          },
          reqHeader: {
            'Content-Type': 'application/json'
          },
          expectedErr: {
            [this.commonKeys.title]: [this.commonValues.emptyTitle]
          }
        },
        {
          testName: "No body payload",
          reqBody: {},
          reqHeader: {
            'Content-Type': 'application/json'
          },
          expectedErr: {
            [this.commonKeys.title]: [this.commonValues.emptyTitle]
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
          testName: "Task ID is special char",
          taskId: "*",
        }, {
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
          [this.commonKeys.title]: "Test Title 123",
          [this.commonKeys.isCompleted]: true
        },
        reqHeader: {
          'Content-Type': 'application/json'
        },
      }
    }
  }
}
export default new TasksData()