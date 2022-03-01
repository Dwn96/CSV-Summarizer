# Medic Take Home
This application takes in a csv file as an input from stdin and returns a summarised csv both in stdout and as a second csv.


# Building and packaging the application

  
1. Install node modules:

        npm install  

2. Builld the application :

        npm run build

3. Package the application into a linux executable

        npm run pkg

4. Step 3 will generate a file named **summarize-csv** which should be made executable via

        chmod +x summarize-csv
        

# Using the application
  
  This application only accepts csv inputs from stdin. Any other file type will throw an error.
  
  To process a csv file run (without the curly braces):
  
        ./summarize-csv {filename.csv}