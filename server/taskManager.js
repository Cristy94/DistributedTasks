/**
 * taskManager class to store & update status of tasks
 */
var taskManager = function() {

    var startDate = new Date();
    // Info about available tasks
    this.tasks = [
        {
            id: 1,
            name: 'task1',
            complexity: 1000,
            date: new Date(startDate.getTime() + 10000),
            asigned: false,
        },
        {
            id: 2,
            name: 'task2',
            complexity: 5000,
            date: new Date(),
            asigned: false,
        },
        {
            id: 3,
            name: 'A difficult one',
            complexity: 100000,
            date: new Date(startDate.getTime() + 3000),
            asigned: false,
        },
        {
            id: 4,
            name: 'This is medium',
            complexity: 10000000,
            date: new Date(),
            asigned: false,
        },
        {
            id: 5,
            name: 'Is this possible?',
            complexity: 100000000,
            date: new Date(startDate.getTime() + 30000000),
            asigned: false,
        },
        {
            id: 6,
            name: 'This is medium-hard',
            complexity: 500000000,
            date: new Date(),
            asigned: false,
        },
        {
            id: 100,
            name: 'BruteForce: SHA256 [12000000 - 12100000]',
            complexity: 100000,
            date: new Date(startDate.getTime() - 30000000),
            asigned: false,
        },
        {
            id: 101,
            name: 'BruteForce: SHA256 [12100001 - 12200000]',
            complexity: 100000,
            date: new Date(startDate.getTime() - 30000000),
            asigned: false,
        },
        {
            id: 102,
            name: 'BruteForce: SHA256 [12200001 - 12400000]',
            complexity: 200000,
            date: new Date(startDate.getTime() - 30000000),
            asigned: false,
        }
    ];

    // The code to be executed for each task
    // The key is the taskID
    this.taskCode = {
        1: "(function() { for(var i = 0; i<= 1000; ++i){var b = Math.sqrt(Math.random());} return i;})();",
        2: "(function() { for(var i = 0; i<= 5000; ++i){var b = Math.sqrt(Math.random());} return i;})();",
        3: "(function() { for(var i = 0; i<= 100000; ++i){var b = Math.sqrt(Math.random());} return i;})();",
        4: "(function() { for(var i = 0; i<= 10000000; ++i){var b = Math.sqrt(Math.random());} return i;})();",
        5: "(function() { for(var i = 0; i<= 100000000; ++i){var b = Math.sin(Math.sqrt(Math.random()));} return i;})();",
        6: "(function() { for(var i = 0; i<= 500000000; ++i){var b = Math.sin(Math.sqrt(Math.random()));} return i;})();",
        100: "(function() { for(var i = 12000000; i<= 12100000; ++i){if(CryptoJS.SHA256('' + i).toString() == 'f931c308fc5b60b421c09969912839dff2776957d98b8d2f91c554ed8fc80f78') return i;} return 'Password not found';})();",
        101: "(function() { for(var i = 12100001; i<= 12200000; ++i){if(CryptoJS.SHA256('' + i).toString() == 'f931c308fc5b60b421c09969912839dff2776957d98b8d2f91c554ed8fc80f78') return i;} return 'Password not found';})();",
        102: "(function() { for(var i = 12200001; i<= 12400000; ++i){if(CryptoJS.SHA256('' + i).toString() == 'f931c308fc5b60b421c09969912839dff2776957d98b8d2f91c554ed8fc80f78') return i;} return 'Password not found';})();",
    };
};

/**
 * Mark the task as solved by removing it from the task list.
 * 
 * @param {Number} taskID - The ID of the task that was solved
 */
taskManager.prototype.solveTask = function(taskID, result) {

    var tasks = this.tasks;

    // Remove the task form the task list, based on the ID
    for(var idx in tasks) {
        if(tasks[idx].id == taskID) {
            tasks.splice(idx, 1);
            break;
        }
    }

    console.log("Task " + taskID + " was solved!");
    console.log("The result was:", result);
    console.log("------------");
};

/**
 * Return the task object that has the given taskID.
 *
 * @param {Number} taskID - The ID of the task to receive
 * @returns {Object} - The task object.
 */
taskManager.prototype.getTaskByID = function(taskID) {

    var tasks = this.tasks;

    for(var idx in tasks) {
        if(tasks[idx].id == taskID) {
            return tasks[idx];
        }
    }
};

/** 
 * Check if the given task is still valid
 *
 * @param {Number} taskID - The ID of the task being checked
 * @returns {Boolean} - True if the task can be asigned.
 */
taskManager.prototype.canAsign = function(taskID) {
    var task = this.getTaskByID(taskID);

    if(typeof task === 'undefined') return false;
    return !task.asigned;
};

// Export it as a Node module
module.exports = function() {
    return new taskManager()
};