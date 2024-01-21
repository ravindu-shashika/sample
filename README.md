# taskmanager

# Clone this repository
$ git clone https://github.com/ravindu-shashika/taskmanager.git

# Go into the repository
$ cd task-management-system

# add composer packages
$ composer install

# create env files 
cp .env.example .env

# migrate the tables
$ php artisan migrate

# Generate a key for application
$ php artisan key:generate

# Run the app
$ php artisan serve

# install frontend

# Go into the repository
$ cd task-management-system

# Install dependencies
$ npm install

# Run the app
$ npm start

# register with new user after access the system