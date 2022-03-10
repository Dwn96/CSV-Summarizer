# CSV Summarizer
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
        
# Errors

   ### 1. FileReadError
  
  This error is thrown when the initial read from stdin fails for whatsoever reason. Typically due a missing file. 
  
  #### Troubleshooting:
    i. Check if path has been correctly passed if using absolute path to file.
    ii. Check application has directory read permissions.

  
  ## 2.  FileWriteError

  This error is thrown when the initial read from stdin fails for whatsoever reason. Typically due a directory permissions. 

  #### Troubleshooting:
    i. Check application has directory write permissions.

## 3. InvalidDataEncounteredError
  
  This error is thrown when the application encounters bad / inadequate data during the initial parsing. This could be as a result of mismatched
  lender - receiver combinations or missing data in the amount section.

  #### Troubleshooting:
    i. Check the input csv has complete data in all columns
    ii. Check input csv has correctly typed data where necessary


  
