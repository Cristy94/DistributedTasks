/**
 * Global variables
 */
var gui, client;

/**
 * Main UI Class.
 *
 * Handless user interaction, displays and updates data.
 */
var UI = function () {
    this.tasks = $('#tasks');
    this.solving = $('#solvingTasks');

    this.bindEvents();

    // Get tasks on page load
    UI.getTasks();
};

/**
 * Binds mouse events to HTML elements
 */
UI.prototype.bindEvents = function() {
    $('#getTasks').click(UI.getTasks);
    $(document).on('click', '.task', function() {
        client.asignTask($(this).attr('data-id'));
    });

    // Auto-update task list on sort change
    $('#sort').change(function() { $('#getTasks').trigger('click');})
};

UI.getTasks = function() {
    var orderBy = $('#sort').val();
    client.requestTasks.call(client, orderBy);
};

/**
 * Converts a task from an Object to a HTML element
 * 
 * @param  {Object} task
 * @return {jQuery} jQuery object with the HTML element
 */
UI.prototype.task2HTML = function(task) {

    var date = new Date(task.date);
    var ul = $('<ul class="task" data-id="' + task.id + '"></ul>');
    ul.append($('<span class="taskName">').text(task.name));
    ul.append('<li class="task_date"> Date:' + date.toLocaleString() + '</li>');
    ul.append('<li class="task_complexity"> Complexity:' + task.complexity + '</li>');

    if(task.asigned) {
        ul.addClass('asigned');
    }
    
    return $('<li>').append(ul);
};

/**
 * Visually updates the tasks list.
 * 
 * @param  {Array} tasks - The tasks list
 */
UI.prototype.updateTasks = function(tasks) {

    this.tasks.html('');

    for(var i in tasks) {
        var task = tasks[i];

        this.tasks.append(this.task2HTML(task));
    }
};

/**
 * Visually adds the given task to the solving tasks list.
 * 
 * @param {Object} task - the task to be added
 */
UI.prototype.addSolving = function(task) {
    // Slide down transition when added
    var el = this.task2HTML(task);
    el.hide();
    this.solving.append(el);
    el.show(200);
};

/**
 * Visually removes the given task, by its taskID, from the solving tasks list.
 * 
 * @param {Object} taskID - the taskID to remove
 */
UI.prototype.removeSolving = function(taskID) {
    $('.task[data-id="' + taskID + '"]', this.solving).parent('li').slideUp(300,
        function(){
            $(this).remove();
    });
};
