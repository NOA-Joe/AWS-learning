### How to use GitHub and Trello 

#### Branch: Master, develop, personal

- **Master**: Release version, release to client or market.
- **develop**: Internal development version, Head of Team/PM take responsible for it. The test team(when we have) should do testing/checking on this branch and create a pull request to master after confirm.
- **personal**: Can be the name of the developer, the developer takes responsibility for it. Commit and push to this branch every day of your work, developer should create at least one pull requrest to develop branth, I will check and approve it.

>Note: Please create least one pull requrest a week, two to three pull requrest each week will be better.

#### What is requiret in README.md
1. Describe what is this project/product, what is it for. Let the reader know what is this code for.
2. What SDK/library was use for this project, how to set it up.
3. Main version release note

#### How to use gitignore file 
 Please ignore the build and export folder in your project.
 1. Example for [ESP32](https://github.com/espressif/esp-idf-template/blob/master/.gitignore)
 2. [SEGGER Embedded Studio](https://github.com/NordicPlayground/nrf5-sdk-for-eddystone/blob/master/.gitignore)
 3. Others in [gitignore.io](https://www.gitignore.io/)


#### How to create a pull requrest
1. Install [hub](https://hub.github.com/) tool  and use the [command](https://hub.github.com/hub-pull-request.1.html?tdsourcetag=s_pctim_aiomsg) of it.
2. Create a pull requiret on web side of Github.
> Charles and Alain has been use Github in this way in pass few week, seem it is good for us create a good habit.

#### [Trello](https://trello.com/) for project development tracking 
Trello is a good tool to track all the issue/question of project, and help you flow up them easily.
 - **Issue**:  For Tester/PM/Client to post up question/issue 
 - **In Progress**: Developer move the issue tag to here and start working on it.
 - **Under Review**: Developer move the tag after he fix the issue, it is waiting tester/PM to review and verify it.
 - **Done**: Tester/PM move the tag to done when he confirm it was fixed.
 - **Pending Question**: (Optional) 
 - **Documents Shared**: (Optional)
>I do not ask every project to start to use Trello from now immediately, but it is a very good tool for us to tracking the issue and discuss it.
