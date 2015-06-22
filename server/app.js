var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var taskManager = require('./taskManager')();

var port = 3000;


io.on('connection', function(socket) {
    socket.emit('welcome');

    /**
     * @event requestTasks
     * 
     * Returns the list of available tasks.
     *
     * @param orderBy - The ordering criteria.
     * @emits taskList
     */
    socket.on('requestTasks', function(orderBy) {

        // Copy tasks in order to sort them for the user
        var orderedTasks = JSON.parse(JSON.stringify(taskManager.tasks));

        switch(orderBy) {
            // Oldest task
            case '1':
                orderedTasks.sort(function(a, b) {
                    return a.date > b.date;
                });
            break;

            // Most complex
            case '2':
                orderedTasks.sort(function(a, b) {
                    return a.complexity < b.complexity;
                });
            break;

            // Least complex
            case '3':
                orderedTasks.sort(function(a, b) {
                    return a.complexity > b.complexity;
                });
            break;
        }

        socket.emit('taskList', orderedTasks);
    });

    /**
     * @event asignTask
     * 
     * Tries to asign the given task to the socket.
     * If the asignment is successful, the task is returned.
     * Otherwise and invalidTask event is sent.
     *
     * @param taskID
     * @emits task
     * @emits invalidTask
     */
    socket.on('asignTask', function(taskID) {
        var stillValid = taskManager.canAsign(taskID);

        if(stillValid) {
            var task = taskManager.getTaskByID(taskID);

            // Append the code to the task
            task.code = taskManager.taskCode[task.id];

            socket.emit('task', task);

            // Mark task as being solved
            task.asigned = true;

            // Notify other clients that this task is being solved
            io.sockets.emit('shouldUpdate');
        } else {
            socket.emit('invalidTask', taskID);
        }
    });

    /**
     * @event solveTask
     *
     * Marks the given task as solved.
     *
     * @param {Object} data - taskID & result
     */
    socket.on('solveTask', function(data) {
        taskManager.solveTask(data.taskID, data.result);

        // Notify other clients that this task has been solved
        io.sockets.emit('shouldUpdate');
    });
});

server.listen(port);
console.log('Started Socket.io, linstening on port:' + port);
