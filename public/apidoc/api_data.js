define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/event",
    "title": "Get Events",
    "version": "1.0.0",
    "name": "Get_All_Events",
    "description": "<p>Get all the events</p>",
    "permission": [
      {
        "name": "anyone"
      }
    ],
    "group": "Event",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "    HTTP/1.1 200 OK\n{\n     \"events\": [\n       {\n         \"_id\": \"5e7d68a35810b017d552cae8\",\n         \"IsDeleted\": false,\n         \"code\": \"F06\",\n         \"message\": \"Newspaper vendor stabs man at Addison Road Metro station\",\n         \"status\": 0,\n         \"date\": \"Thu Mar 31 15:18:38 2016\"\n       },\n       {\n         \"_id\": \"5e7d68a35810b017d552caed\",\n         \"IsDeleted\": false,\n         \"code\": \"F06\",\n         \"message\": \"Update: Anacostia station is back open,\n                     MTPD has apprehended and identified two suspects wmata\",\n         \"status\": 0,\n         \"date\": \"Tue Feb 23 19:49:07 2016\"\n       }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "route/event.js",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/api/v1/event",
    "title": "Get WebPush",
    "version": "1.0.0",
    "name": "Get_Web_Push",
    "description": "<p>Get Web Push data</p>",
    "permission": [
      {
        "name": "anyone"
      }
    ],
    "group": "Event",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "    HTTP/1.1 200 OK\n{\n \"auth\": \"auth==\",\n \"endpoint\": \"https://fcm.googleapis.com/fcm/send/xxxxxx\",\n \"p256dh\": \"p256dhstring\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "route/event.js",
    "groupTitle": "Event"
  },
  {
    "type": "put",
    "url": "/api/v1/event",
    "title": "Update Events",
    "version": "1.0.0",
    "name": "Update_Event",
    "description": "<p>Update Event status, if the event not exist, insert it into database.</p>",
    "permission": [
      {
        "name": "apikey"
      }
    ],
    "group": "Event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "api-key",
            "description": "<p>Permission key for this api</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 500 INTERNAL_SERVER_ERROR",
          "type": "json"
        }
      ]
    },
    "filename": "route/event.js",
    "groupTitle": "Event"
  },
  {
    "type": "put",
    "url": "/api/v1/event",
    "title": "Update WebPush",
    "version": "1.0.0",
    "name": "Update_WebPush",
    "description": "<p>Update WebPush link</p>",
    "permission": [
      {
        "name": "apikey"
      }
    ],
    "group": "Event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "api-key",
            "description": "<p>Permission key for this api</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "    HTTP/1.1 200 OK\n{\n \"auth\": \"auth==\",\n \"endpoint\": \"https://fcm.googleapis.com/fcm/send/xxxxxx\",\n \"p256dh\": \"p256dhstring\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 500 INTERNAL_SERVER_ERROR",
          "type": "json"
        }
      ]
    },
    "filename": "route/event.js",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/api/v1/station",
    "title": "Get Stations",
    "version": "1.0.0",
    "name": "Get_Station",
    "description": "<p>Get all the stations infomations with their events</p>",
    "permission": [
      {
        "name": "anyone"
      }
    ],
    "group": "Station",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "    HTTP/1.1 200 OK\n{\n\"_id\": \"5e72879f1c9d440000fadf88\",\n \"Stations\": [\n   {\n     \"Code\": \"A01\",\n     \"Name\": \"Metro Center\",\n     \"StationTogether1\": \"C01\",\n     \"StationTogether2\": \"\",\n     \"LineCode1\": \"RD\",\n     \"LineCode2\": null,\n     \"LineCode3\": null,\n     \"LineCode4\": null,\n     \"Lat\": 38.898303,\n     \"Lon\": -77.028099,\n     \"Address\": {\n       \"Street\": \"607 13th St. NW\",\n       \"City\": \"Washington\",\n       \"State\": \"DC\",\n       \"Zip\": \"20005\"\n     },\n    \"stories\": []\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "filename": "route/station.js",
    "groupTitle": "Station"
  }
] });
