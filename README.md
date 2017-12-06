Project information:
This project is developed using ReactJS and Bootstrap 4. 
This project is started using 'create-react-app', this is the default start project of React, refer here for more information: https://reactjs.org/docs/installation.html#creating-a-new-application.
All code was written by Vy Nguyen.


To start project:
- cd to 'todo-app' folder
- Run 'npm install' (only the first time start project)
- Run 'npm start'
- Access http://localhost:3000/ using browser.
- This project uses bootstrapcdn, so please turn on internet to see correct style.


Using Todo app:
+ To add item:
  - Click + icon to show Add form (shown as default when load page)
  - Field both title and description fields
  - Press enter or click on + icon
  - Error popup will display if there are any error/ Item will be added if everything is valid

+ To search item:
  - Click on search icon to show Search form
  - Field search input with search text
  - The list will reload everytime search text is changed, don't need to click search icon

+ To view items:
  - Items are listed in the list below the forms
  - Click on Down Arrow icon to see full description, Created date and Last Modified date
  - Click on Up Arrow to collapsed the item

+ To edit item:
  - Click on checkbox at the left of item to mark it as completed/incompleted
  - Click on title/description to edit. Click outside or press enter to save

+ To delete item:
  - When item is hover/focus, delete button will display on the right of item
  - Click on delete button
  - Error popup will display if the item is incompleted
  - Check the checkbox to mark item as completed, then click delete button again, item will be deleted

+ To delete all completed item:
  - Click on 'Clear ... completed item', on the bottom right of the page

+ To mark all items as completed/incompleted:
  - Click on 'Mark all as completed' checkbox below Add/Search form

+ To view history:
  - Click on 'History' link on top right of Home page

+ To back to main page:
  - Click on 'Back to Todo list' link on top right of History page


Project structure:
- 'node_modules' folder: store all node modules need to run the project, 'npm install' command will download modules to this folder.
- 'package.json': defines all dependencies of the project.
- 'public' folder: store public files (html, favicon, and manifest).
- 'src' folder: store all assets (js, css, images).

  - 'src/components' folder: store all Presentational Components (components that are concerned with how things look, often been reused many times, don't have their own state, or only state to support display).
  - 'src/containers' folder: store all Container Components (smart components, that are concerned with how things work, have their own state, and manipulate data and logic things).
  - 'src/images' folder: store all images.
  - 'src/styles' folder: store all stylesheet of project, each stylesheet file is corresponding to one component.

    - 'src/components/PopupModal.js': Popup component, used to show warning/error.
    - 'src/components/StatusBar.js': Status Bar component, placed at bottom of page, used to show number of completed/incompleted item, and to remove all completed item.
    - 'src/components/TodoItem.js': Todo Item component, present 1 todo item in the list.
    - 'src/components/TodosForm.js': Todos Form component, present form to add, search and mark all items as completed.

    - 'src/containers/Home.js': Home Page component, contain all components, and logic for todo app.
    - 'src/containers/History.js': History Page component, show history of CRUD actions.

    - 'src/App.js': Main component of project, decide which component will be render for each url.
    - 'src/index.js': starting point, render the App component.

