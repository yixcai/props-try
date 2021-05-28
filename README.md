**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository

Welcome!

We have added to this repository a `README.md`, `.gitignore`, and `.gitattributes`.

* **README.md**: is the document you are currently reading. It should be replaced with information about your project, and instructions on how to use your code in someone else's local computer.

* **.gitignore**: lets you filter out files that should not be added to git. For example, Windows 10 and Mac OS create hidden system files (e.g., .DS_Store) that are local to your computer and should not be part of the repository. This files should be filtered by the `.gitignore` file. This initial `.gitignore` has  been created to filter local files when using MacOS and Node. Depending on your project make sure you update the `.gitignore` file.  More information about this can be found in this [link](https://www.atlassian.com/git/tutorials/saving-changes/gitignore).

* **.gitattributes**: configures the line ending of files, to ensure consistency across development environments. More information can be found in this [link](https://git-scm.com/docs/gitattributes).

Remember that _"this document"_ can use `different formats` to **highlight** important information. This is just an example of different formating tools available for you. For help with the format you can find a guide [here](https://docs.github.com/en/github/writing-on-github).

## Table of contents
* [Team Members](#team-members)
* [General Info](#general-info)
* [Technologies](#technologies)
* [Code Implementation](#code-implementation)
* [Adding Images](#adding-images)

## Team Members

|                 Name                              | Task                        |         State          |
|                 :---                              |            :---:            |          ---:          |
| Zixi Qin, Mengyan Zhang, Zhishang Wang, Yixin Cai |           Back End          |  deliverable 2 done    |
| Xiaochen Hou                                      |          Front End          |  Testing               |
| Mengyan Zhang, Zixi Qin, Zhishang Wang,Yixin Cai  |         README Format       |  deliverable 2 done    |

## General info

This project aims to create an app for ordering snacks from the nearest coffee vendors. The curent version is the deliverable 2 part which is asked to implement routes among customers, snacks and vendors: 

  Each Customer is able to view menu of snacks, details of a specific snack, and start a new order by requesting snacks.
  
  Each Vendor is able to set its location and park status, show the list of all outstanding orders, and mark an order as 'fulfilled'.
  
In order to complete these requirements, our group start to create four parts, "customer", "order", "snack" and "vendor". In details, we separeatly create routes of these four parts for the access, controllers to deal with the data by different functions, models to describe the features needed and one main program file called "server.js".

Inside the customerController, each customer can register their account by entering their family name, given name, email and password, then thier password can be encrypted by using the application "bcryptjs". 

Further, for the ordeController, it can create a new order by each customer and view orders from a specific vendor. 

Moreover, inside the snackController, it can view all snacks menus and the detail of a snack.

Last, for the vendorController, vendors can register by entering the username and password and the password can be encryped by using the application "bcryptjs".

All the features for each part are stored in their corresponding "models.js" and can be accessed through their corresponding routes.

The followings are the variables for customer, vendor, order and snack shown on the Postman, which is used the URL link from heroku. While the URL link in the comment in code is the one with "localhost". 


Access details to our database: 
mongoURL: 'mongodb+srv://LeSillage:ls1234@cluster0.mhnoe.mongodb.net/Cluster0?retryWrites=true&w=majority'


<p align="middle">
  <img src=" resource/readme/error/customerVariable.png"  width="900" >
</p>
<p align="middle">
  <img src=" resource/readme/error/orderVariable.png"  width="900" >
</p>

<p align="middle">
  <img src=" resource/readme/error/snackVariable.png"  width="900" >
</p>

<p align="middle">
  <img src=" resource/readme/error/vendorVariable.png"  width="900" >
</p>

----------------------- Customer -----------------------

POST - Customer Register
input: this rest end point accepts as the following JSON
{
    "familyName": "Smith",
    "givenName": "Vivien",
    "email": "vvsmith@gmail.com",
    "password": "123456"
}
,output this will give a 200 OK if success.

<p align="middle">
  <img src=" resource/readme/example/PostCustomerRegister.png"  width="900" >
</p>

Fault condition to test the fault condition when a customer is already registered, send JSON below
{
    "familyName": "Qin",
    "givenName": "Lydia",
    "email": "qzx.lydiaaa@gmail.com",
    "password": "123456"
}
,then a fault message or error code say 409 Conflict will appear

<p align="middle">
  <img src=" resource/readme/error/errorCustomerAlreadyRegister.png"  width="900" >
</p>

----------------------- Order -----------------------

POST - Create a new order
input: this rest end point accepts as the following JSON

{
    "customer": "6080bcf32a2dc606befa728f",
    "vendor": "607f81bd8e579e77be6b0c88",
    "snacks": [{"Latte":3}, {"Big cake":3}]
}

,output this will give a 200 OK if success.

<p align="middle">
  <img src=" resource/readme/example/PostOrderCreate.png"  width="900" >
</p>


Fault condition to test the fault condition when a vendorID is incorrect, send JSON below

{
    "customer": "6080bcf32a2dc606befa728f",
    "vendor": "dgwkjdfgukwgfue",
    "snacks": [{"Latte":3}, {"Big cake":3}]
}

,then a fault message or error code say 400 Bad Request will appear

<p align="middle">
  <img src=" resource/readme/error/errorCannotCreateNewOrderCausedByWrongVendorID.png"  width="900" >
</p>

GET - Get order from a vendor
input: this rest end point accepts if the vendorID is correct (exampleVendorId: 607f770c8e579e77be6b0c86)
output this will give a 200 OK if success.

<p align="middle">
  <img src=" resource/readme/example/GetOrderFromVendor.png"  width="900" >
</p>

Fault condition to test the fault condition if the status is not defined, 
then a fault message or error code say 404 Not Found will appear

<p align="middle">
  <img src=" resource/readme/error/errorOrderCannotGetCausedByUndefinedStatus.png"  width="900" >
</p>

POST - Update order status and snacks
input: this rest end point accepts as the following JSON

{
    "snacks": [{"Long black":5}, {"Small cake":1}],
    "status": "fulfilled"
}

,output this will give a 200 OK if success.

<p align="middle">
  <img src=" resource/readme/example/PostUpdateStatusAndSnacks.png"  width="900" >
</p>

Fault condition to test the fault condition if the order ID is wrong, send JSON below

{
    "snacks": [{"Cappuccino":5}, {"Small cake":1}]
}

then a fault message or error code say 404 Not Found will appear

<p align="middle">
  <img src=" resource/readme/error/errorCannotUpdateByWrongOrderID.png"  width="900" >
</p>

----------------------- Snack -----------------------

GET - View menu of snacks
input: this rest end point accepts when the mongoose is connected,
output this will give a 200 OK if success.

<p align="middle">
  <img src=" resource/readme/example/GetSnacksMenu.png"  width="900" >
</p>

GET - View detail of each snack 
input: this rest end point accepts if the snackID is correct (exampleSnackId: 607c0fb7c1e9363d1274f6e0)
output this will give a 200 OK if success.

<p align="middle">
  <img src=" resource/readme/example/GetEachSnackDetail.png"  width="900" >
</p>

Fault condition to test the fault condition when a snackID is incorrect, 
example incorrect snackID: sdfhjknfhj56,
then a fault message or error code say 404 Not Found will appear

<p align="middle">
  <img src=" resource/readme/error/errorsSnackDetailCannotGetByWrongID.png"  width="900" >
</p>

----------------------- Vendor ----------------------

POST - Registering vendor
input: this rest end point accepts as the following JSON

{
    "userName": "Good Taste",
    "password": "456787"
}

,output this will give a 200 OK if success.

<p align="middle">
  <img src=" resource/readme/example/PostVendorRegister.png"  width="900" >
</p>

Fault condition to test the fault condition if the vendor name is registered, send JSON below

{
    "userName": "Know know",
    "password": "456787"
}

then a fault message or error code say 409 Conflict will appear

<p align="middle">
  <img src=" resource/readme/error/errorVendorRegisterCausedByNameIsRegistered.png"  width="900" >
</p>

POST - Update vendor location and park status 
input: this rest end point accepts as the following JSON

{
    "location": [-37.80019409247999, 144.96522230111776],
    "textAddress": "near Science Gallery",
    "parkStatment": true
}

,output this will give a 200 OK if success.

<p align="middle">
  <img src=" resource/readme/example/PostVendorLocationChange.png"  width="900" >
</p>

Fault condition to test the fault condition if the vendorID is wrong (exampleWrongVendorID: sdfhg12345), send JSON below

{
    "location": [-37.79, 144.95],
    "textAddress": "near Melborune Central",
    "parkStatment": false
}

then a fault message or error code say 404 Not Found will appear

<p align="middle">
  <img src=" resource/readme/error/errorCannotUpateLocationByWrongVendorID.png"  width="900" >
</p>

## Technologies
Project is created with:
* NodeJs 14.16.X
* Ipsum version: 2.33
* Ament library version: 999

## Code Implementation

You can include a code snippet here.

```HTML
<!--
Example code from: https://www.w3schools.com/jsref/met_win_alert.asp
__>

<!DOCTYPE html>
<html>
<body>

<p>Click the button to display an alert box.</p>

<button onclick="myFunction()">Try it</button>

<script>
function myFunction() {
  alert("Hello! I am an alert box!");
}
</script>

</body>
</html>
```

## Adding Images

The images are shown above and the source is inside the repository.


**Now Get ready to complete all the tasks:**

- [x] Read the Project handouts carefully
- [x] User Interface (UI)mockup
- [x] App server mockup
- [x] Front-end + back-end (one feature)
- [ ] Complete system + source code
- [ ] Report on your work(+ test1 feature)



