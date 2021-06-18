# React front-end

This project was built with [Create React App](https://github.com/facebook/create-react-app).

## How to setup

1. Intall the long term support version of [Node.js](https://nodejs.org/en/) and make sure to leave the default "Add to PATH" option during the process.
2. Clone this repository on your computer
3. Using your command-line tool of preference cd into the project folder and type `npm install`
4. Done! All the necessary packages will be downloaded and install and you are ready to run the app. This is the standard process to setup a Node.js app.

## Run app 

### Development start

In the project directory, you can run: `npm start`

Runs the app in the development mode retaining full functionality. The app was demo'd in this state.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits in code.\
You will also see any lint errors in the console.

### Build for deployment 

!IMPORTANT: it is not recommended to deploy this app permanently on the web as is without implementing some type of authentication. To get started you can run it in dev mode, download the data you want and stop the app.

In the project directory run: `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# Python back-end

## Installation and setup

Install python 3.8 and pip.  For Windows 10 you can find it easily in the Microsoft Store. For Linux you can download from python.org. Again make sure it is added to PATH. Install the required packages from the requirements.txt file by running `pip install -r requirements.txt` with your prefered command-line tool in the project folder. 

## Twitter API bearer token

In order to be able to make requests to the Twitter API you need to apply for a free [developer account](https://developer.twitter.com/en/apply-for-access). This is a standard and common procedure and requires only a few minutes. After you have created your account and a project to link it to you will be able to get produce a bearer token (long string of characters). Simply create a text file named `token.txt` in the project folder and paste your bearer token inside. Save and close the file and your back-end should now be able to authenticate with Twitter API and make requests. 
In case you have access to an Academic account you can use your bearer token in the same way and get access to even more powerful query operators without changing anything in the application code. Keep an eye out for the Advanced Availability in the operators [documentation](https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query). One such operator is also implemented in the UI (Area field) and could be very useful in the event of academic access. You can also get access to the full archive of tweets just by changing between the 2 URLs found in the source code (comment the first one and uncomment the second).

!IMPORTANT: Keep your bearer token safe. This is only for your own use. If you misplace it others can make requests in your name and expend your tweet budget.

## Run the server

Run the app using the command-line tool like a normal python script. Your server should be now running and able to communicate with the front-end in order to serve requests and save data.


# How to use

The app is built with the purpose of assisting users to create and execute queries to the Twitter API. Using the + and - buttons you can easily add or remove parameters to the query as explained in the in-app instructions. Using the given fields you can create useful queries already but after you get familiar with their structure you should be able to create even more complex ones by ticking the "Manual" checkbox and typing in your own, combining more logical operators and parameters. For a full documentation of how to build queries you can refer in the [documentation](https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query)

## Data

The data retrieved by the queries made are saved in 2 files in the project folder: tweets.json and tweets.csv. The csv file contains rows with tweets and their directly related metadata. The json file contains an array of objects where each one corresponds to an executed query. The `data` property includes all the tweets, similarly to the csv lines. However, in the json file there are also expanded objects related to one or more of the tweets retrieved that offer additional information on the user or the geo data if available. The query that retrieved these tweets is also saved in the object. A small note about the json file is that sometimes the data may not get saved with indenting and proper spacing which makes it harder to read (by a human). In case you want to manually inspect it and its not indented you can parse it with a json formatter such as [this](https://jsonformatter.curiousconcept.com/#)

As long as you keep making requests the results will get appended on those files. You can move the files elsewhere as you please or delete them and new ones will be created as soon as you make new requests.
