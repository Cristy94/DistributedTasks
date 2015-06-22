# DistributedTasks

 
#####App.js - having as functionality the `io.on('connection', function(socket)` function which awaits a connection to be established between server and client
	
    socket.on('requestTasks', function(orderBy)
	   
- Param orderBy - The ordering criteria.
- Returns the list of available tasks. 

    socket.on('solveTask', function(data) 
  
- Marks the given task as solved.
- Param Object data - taskID and result
	    
    socket.on('asignTask', function(taskID) 	   
- Tries to asign the given task to the socket. If the asignment is successful, the task is returned. Otherwise and invalidTask event is sent.

#####taskManager.js

		var taskManager = function()
	   
- taskManager class to store & update status of tasks
	   
    taskManager.prototype.getTaskByID = function(taskID)
	    
- Return the task object that has the given taskID.
- Param {Number} taskID - The ID of the task to receive
- Returns {Object} - The task object.
	    
    taskManager.prototype.canAsign = function(taskID) 
    
- Check if the given task is still valid.
- Param {Number} taskID - The ID of the task being checked
- Returns {Boolean} - True if the task can be asigned.
		
    taskManager.prototype.solveTask = function(taskID, result) 
	    
- Mark the task as solved by removing it from the task list
- Param {Number} taskID - The ID of the task that was solved
	
#####Client.js
	
    var Client = function (socket)  
    
- Client controller
	
    Client.prototype.requestTasks = function(orderBy)  
	  
- Request the list of available tasks
- Client.prototype.asignTask = function(taskID)  
- Ask to be asigned the task taskID
- Param  {Number} taskID - the ID of the task to be asigned to
	
    Client.prototype.solveTask = function(taskID, result)  
	    
- Send the result of the completed task, taskID.
- Param  {[type]} taskID - The ID of the solved task
- Param  {Object} result - The result of the task's execution
	
    Client.prototype.taskList = function(tasks)  
- Receive the list of available tasks
- Param  {Array} tasks 
	
    Client.prototype.invalidTask = function(taskID) 
	    
- Thie client's list might be updated. It should get again the list.
- Param  {Number} taskID
    	
    Client.prototype.task = function(task 
	    
- Receive, from the server, a task to solve
- Param  {Object} task 
	   
    Client.prototype.shouldUpdate = function() 
	    
- The client's list might be updated. It should get again the list.
 
#####UI.js
	
    var UI = function ()	   
	    
- Main UI Class. Handles user interaction, displays and updates data
- Param  {Object} task 
	
    UI.prototype.bindEvents = function()
    
- Binds mouse events to HTML events.
	
	
#####UI.getTasks = function() 
	
    UI.prototype.task2HTML = function(task)
	
- Converts a task from an Object to a HTML element
- Param  {Object} task
- Return {jQuery} jQuery object with the HTML element
	
    UI.prototype.updateTasks = function(tasks)
	
- Visually updates the tasks list.
- Param  {Array} tasks - The tasks list
	
    UI.prototype.addSolving = function(task)
	
- Visually adds the given task to the solving tasks list.
- Param {Object} task - the task to be added
	
    UI.prototype.removeSolving = function(taskID) 
	
- Visually removes the given task, by its taskID, from the solving tasks list.
- Param {Object} taskID - the taskID to remove
	
#####Worker.js
	
    onmessage = function(e) 
	
- Message Controller
	
