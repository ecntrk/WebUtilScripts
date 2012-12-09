The workflow:

0. upon running it creates a folder "quizzard" (in the Downloads directory) and inside it, another folder "images" for downloaded images.

1. The code from Line 354 onwards accesses the main site and takes all the quizzes
it first produces a file "list.xml" containing all the quizzes, their name and their links.

2. The rest of the code inside the function doQuiz goes to those links and executes one by one.
This produces xml files in the name of each quizzes.


3. if there's an image in the results, it is stored in the images folder inside the folder "quizzard".



********

The junk folder contains some of the parts i was working on before finishing.
every script in there are also perfectly 

