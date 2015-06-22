var Client = function (socket) {
    var self = this;

    this.socket = socket;

    // Bind server messages to callback functions
    socket.on('taskList', this.taskList.bind(self));
    socket.on('invalidTask', this.invalidTask.bind(self));
    socket.on('task', this.task.bind(self));
    socket.on('shouldUpdate', this.shouldUpdate.bind(self));
};

/****************
 * Outgoing messages (sent to the server)
 ***************/

/**
 * Request the list of available tasks
 */
Client.prototype.requestTasks = function(orderBy) {
    this.socket.emit('requestTasks', orderBy);
};

/**
 * Ask to be asigned the task taskID
 * 
 * @param  {Number} taskID - the ID of the task to be asigned to
 */
Client.prototype.asignTask = function(taskID) {
    this.socket.emit('asignTask', taskID);
};

/**
 * Send the result of the completed task, taskID.
 * 
 * @param  {[type]} taskID - The ID of the solved task
 * @param  {Object} result - The result of the task's execution
 */
Client.prototype.solveTask = function(taskID, result) {
    this.socket.emit('solveTask', {
        taskID: taskID,
        result: result
    });

    gui.removeSolving(taskID);
};

/****************
 * Ingoing messages (received from server)
 ***************/

/**
 * Receive the list of available tasks
 * 
 * @param  {Array} tasks 
 */
Client.prototype.taskList = function(tasks) {
    gui.updateTasks(tasks);
};

/**
 * Thie client's list might be updated. It should get again the list.
 */
Client.prototype.shouldUpdate = function() {
    UI.getTasks();
};

/**
 * Receive an error saying that the task we have asked for is no longer available.
 * 
 * @param  {Number} taskID
 */
Client.prototype.invalidTask = function(taskID) {
    alert("The task " + taskID + " is no longer available!");
};

/**
 * Receive, from the server, a task to solve
 * 
 * @param  {Object} task 
 */
Client.prototype.task = function(task) {
    gui.addSolving(task); // Update the solving list

    var self = this;

    
    // Create a web worker to solve the task
    var worker = new Worker("js/worker.js");

    // Start the worker
    worker.postMessage({
        action: 'code',
        code: task.code
    });

    worker.onmessage = function(e) {
        var action = e.data.action;

        switch(action){
            case 'finished':
                var result = e.data.result;

                self.solveTask(task.id, result);
                worker.terminate();
            break;
        }
    }
};
