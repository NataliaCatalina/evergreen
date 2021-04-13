Style guide - best practices

## Fonts
Poppins bold - headers
Poppins semi - bold - sub headers
Poppins regular - body text

## colours
- Primary colours
#DEEDED - background colour, button text
#053642 -  text & icon colour
#B4E1E2 - secondary buttons 
#236F99 - primary buttons
- Tertiary colours
#74DCAF - design & logo colours
#F35B54 - design & logo colours
#ECF6F6 - form background 
 
## Css naming conventions
- Use 2 spaces for indentation
- Use hyphens or camelCasing
- Prefer classes, avoid using ID selectors
- Use Semantic Elements if possible


1. Statements
2. Variables
3. Comments
4. Conditional
5. Operators
6. Functions and Loops
7. Objects
***

## Statements

- End Each line with a ';'.
- When separated by semicolons, multiple short statements on one line are allowed.
- Allow one " " before and after operators
- Correct Use of indention.

                  function myFunction() {
                      document.getElementById("demo1").innerHTML = "Hello Dolly!";
                  }


## Variables

- Variable naming to be in camel casing.

                  thisIsMyFunction

- Variable names should be relevant and descriptive.
- When possible, Variables will be given a value on the same line of declaration.
- Variables will be declared at the beginning of the script/function.

## Comments

- Each block of code will have a comment addressing the function it provides.
- Unrelating comments will be removed before publishing.
- Comments will have a line break above and bellow to allow breathing room.

## Conditional

- If more than 3 possible statements are made, Use the Switch Statement.
- If Statements will have a space after to allow breathing room, the condition will be indented from the "if" and the closing curly brace will have its own line

  #### Bad Example:    
                  if(hour < 18){
                  greeting = "Good day";}


  #### Good Example:    
                  if (hour < 18) {
                    greeting = "Good day";
                  }

## Operators
– Always put spaces around operators ( = + - * / ), and after commas:

#### Example: 
                  var x = y + z;
                  var values = ["Volvo", "Saab", "Fiat"];

## Functions & Loops
- Put the opening bracket at the end of the first line.
- Use one space before the opening bracket.
- Put the closing bracket on a new line, without leading spaces.
- Do not end a complex statement with a semicolon.

#### Example - Function
                  function toCelsius(fahrenheit) {
                    return (5 / 9) * (fahrenheit - 32);
                  }

#### Example - Loop
                  for (i = 0; i < 5; i++) {
                    x += i;
                  }

## Objects
- Place the opening bracket on the same line as the object name.
- Use colon plus one space between each property and its value.
- Use quotes around string values, not around numeric values.
- Do not add a comma after the last property-value pair.
- Place the closing bracket on a new line, without leading spaces.
- Always end an object definition with a semicolon.

#### Example
                  var person = {
                    firstName: "John",
                    lastName: "Doe",
                    age: 50,
                    eyeColor: "blue"
                  };

***         

###### Credit to W3schools for some sections of this readme