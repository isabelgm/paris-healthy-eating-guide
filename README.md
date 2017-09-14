# Paris Healthy Eating Guide
A neighborhood map of healthy restaurants in Paris, France using JS.

![Paris Healthy Eating Guide Screenshot](/app/assets/images/paris-healthy-eating-guide.png?raw=true "Paris Healthy Eating Guide")

## How to use it
On first entering the site you will see all the healthy restaurants appear on the map.
You can filter by restaurant name and the map will update accordingly. Go check them out and enjoy! :)

## Installing this app locally
In order to run this app locally you will need to clone the app and add the environment variables for
the Facebook graph api. This is a rails app so you will need rails 5 on your computer if you don't have it already.

1. Clone the repository
2. Install Rails if you haven't yet:
`$ gem install rails`
3. Open the repo
4. Install the necessary gems by running
`bundle install` in your terminal
5. Add a file called .env to the repo.
This should be outside of the app folder but in the directory in to which you downloaded the app.
6. Add the environment variables and save the file.
_Note: The enviornment variables are provided to the Udacity reviewer view notes when the project was submitted._
7. Start the server
`rails s`
Go to localhost:3000 to access the app.

## Resources used for this project
1. Google maps API
2. Facebook Graph API
3. Knockout.JS
