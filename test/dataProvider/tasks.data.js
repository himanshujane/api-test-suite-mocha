import BaseData from './base.data.js'

class TasksData extends BaseData {

  //This class defines test data specific to Tasks related endpoints

  /**
   * This function defines all the text messages and key labels specific to create tasks endpoint
   */
  get _createTasksText() {
    return {
      title: "title",

      invalidData: "The given data was invalid.",
      emptyTitle: "The title field is required.",
      titleCharLimit: "The title may not be greater than 255 characters.",
      unauthorized: "Unauthenticated."
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
}
export default new TasksData()