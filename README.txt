// README.txt

Note-Taking API

### Prerequisites

- Node.js (latest version)
- npm (latest version)

===> Clone the repo
===> navigate to project
===> npm install
===> npm start


## ============ Testing================

===> use postman or other tool

1:- Create Note: POST /api/notes
   ==> body
    {
        "title": "git readme",
        "content": "Readme for testing post api.",
        "tags": ["test1", "test2"]
    }
    
2:- Get All Notes: GET /api/notes
3:- Get Note by ID: GET /api/notes/:id
4:- Update Note by ID: PUT /api/notes/:id
5:- Delete Note by ID: DELETE /api/notes/:id

6.1 Add tags --> PUT /api/notes/:id/tags
    {
        "tags": ["test1"]
    }
6.2 Remove tags: DELETE /api/notes/:id/tags
    {
        "tags": ["test1"]
    }
