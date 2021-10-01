"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
    searchResults = searchByName(people);
      break; 
    case 'no':
     searchResults = searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

function searchByTraits(people){
  let list = '';
  let filtered = (people);

  filtered = searchByEyeColor(filtered);
  filtered = searchByGender(filtered);
  filtered = searchByDateOfBirth(filtered);
  filtered = searchByHeight(filtered);
  filtered = searchByOccupation(filtered);
  filtered = searchByWeight(filtered);
  
  if(filtered.length !== 22){
    
  }
  else{
   displayPeople(filtered)
  }
}

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })

  console.log(foundPerson)
  console.log(foundPerson[0])
  return foundPerson[0];
}


//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
   let eyeColor;
   if(confirm('if eye color is known: Select Ok, otherwise Select Cancel') == true){
    eyeColor = promptFor("What is the person's eye color?", autoValid)
    let foundPerson = people.filter(function(potentialMatch){
      if(potentialMatch.eyeColor === eyeColor){
        return true;
      }
      else{
        return false;
      }
    })
   console.log(foundPerson)
   return foundPerson;
   }
   else{
     return people;
   }
  }


function searchByGender(people){
  let gender;
  if(confirm('if gender is known: Select Ok, otherwise Select Cancel') == true){
  gender = promptFor("What is the person's gender?", autoValid);
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
      }
      else{
        return false;
      }
    })
    console.log(foundPerson)
    return foundPerson;
  }
  else{
    return people;
  }
}
  
 

function searchByDateOfBirth(people){
  let dateOfBirth;
  if(confirm('if DOB is known: Select Ok, otherwise Select Cancel') == true){
    dateOfBirth = promptFor("what is the person's DOB?", autoValid);
    let foundPerson = people.filter(function(potentialMatch){
      if(potentialMatch.dateOfBirth === dateOfBirth){
        return true;
      }
      else{
        return false;
      }
    })
    console.log(foundPerson)
    return foundPerson;
  }
  else{
    return people;
  }
}
  

function searchByHeight(people){
  let personHeight;
  if(confirm('if Height is known: Select Ok, otherwise Select Cancel') == true){
    personHeight = promptFor("what is the person's height in inches?", autoValid);
    let foundPerson = people.filter(function(potentialMatch){
      if(potentialMatch.personHeight === personHeight){
        return true;
      }
      else{
        return false;
      }
    })
    console.log(foundPerson)
    return foundPerson;
  }
  else{
    return people;
  }
}
  
 

function searchByOccupation(people){
  let occupation;
  if(confirm('if Occupation is known: Select Ok, otherwise Select Cancel') == true){
    occupation = promptFor("What is the peron's occupation?", autoValid);
    let foundPerson = people.filter(function(potentialMatch){
      if(potentialMatch.occupation === occupation){
        return true;
      }    
      else{
        return false;
      }
    })
    console.log(foundPerson);
    return foundPerson;
  }
  else{
    return people;
  }
}
  
 

function searchByWeight(people){
  let weight;
  if(confirm('if Weight is known: Select Ok, otherwise Select Cancel') == true){
    weight = promptFor("What is the person's weight in LBS?", autoValid);
    let foundPerson = people.filter(function (potentialMatch){
      if(potentialMatch.weight === weight){
        return true;
      }
      else {
        return false;
      }
    })
    console.log(foundPerson);
    return foundPerson;
  }
  else{
    return people;
  }
}
  

//TODO: add other trait filter functions here.


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion