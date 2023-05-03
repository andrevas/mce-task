# mce-task

### Running both client and server

* run `npm install` from root directory

* To `npm install` both projects at once - run `npm run pre_build`

* To build both projects run `npm run build`

* To run both server and frontend app run `npm start`

* After server and client is loaded you can navigate to [localhost:8080](http://localhost:8080) and see the result

* You can click the "Switch View" button to switch between hierarchical and by type views

My client uses long polling for fetching the devices data with 1 second delay between requests.

As I was surprised to find out some hubs are not recognized as devices, some recognized as separate hubs, anyway I hope in your tests it will go well :)
