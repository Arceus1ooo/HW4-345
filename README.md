## Submission and Answers Description

I have edited index.js to handle various GitHub API functionalities, which were listing branching, creating a new repo, creating a new issue, and enabling wiki support. I did this by manipulating attributes in JSON, mainly using the JSON.stringify() command.
#### Bugs

1. The first bug was trying to run the functions with an unauthorized personal access token. This took me a couple hours to figure out, since it had to deal with something that I did outside the assignment, as I had set my access token weeks prior to completing this assignment.
2. When creating a repo, a 422 error is thrown when a repo already exists. I was able to handle it in the index.js file, but it always fails on the test.js file. In the index.js file, I have the create repo function set up such tht if a repo already exists, it will be deleted and replaced with a new, empty repo. Due to the instructions of the assignment, I though that this was the best course of action because technically a new repo is created every time that function is run. *Alternative functionality is just deleting the repo when the 422 error is thrown. This returns a passed test case **the 2nd time the test is run**. Do this by commenting out line 126 in index.js.*

## Screencast Link
https://stevens.zoom.us/rec/share/BoBIcHWBNop3X68gZ7-mL2vvKsCS5mGrdzKp9TMN0Y2vtb9wdFPEQ_rsprZYREj8.qbGWFyfrLIZkVGLZ
