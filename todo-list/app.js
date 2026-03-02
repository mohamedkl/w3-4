var app = angular.module("todoApp", []);

// Parent Controller
app.controller("MainCtrl", function ($scope) {
  $scope.dailyTasks = [
    { text: "Do The Tasks", completed: false },
    { text: "Go to the Gym", completed: true },
  ];
});

// Todo List Directive
app.directive("todoList", function () {
  return {
    restrict: "E",
    scope: {
      tasks: "=", // Two-way binding with parent controller
      title: "@", // String binding for the title
    },
    template: `
            <div class="card shadow-sm border-secondary bg-dark text-white">
                <div class="card-body">
                    <h3 class="card-title h5 mb-4">{{title}}</h3>
                    
                    <div class="input-group mb-3">
                        <input type="text" class="form-control bg-secondary text-white border-0" 
                               placeholder="New task" ng-model="newTaskText">
                        <button class="btn btn-outline-info" type="button" ng-click="addTask()">Add</button>
                    </div>

                    <ul class="list-unstyled">
                        <li ng-repeat="task in tasks" class="d-flex align-items-center mb-2 justify-content-between p-2 border-bottom border-secondary">
                            <div class="d-flex align-items-center">
                                <input type="checkbox" class="form-check-input me-2" ng-model="task.completed">
                                <span ng-class="{'text-decoration-line-through text-muted': task.completed}">
                                    {{task.text}}
                                </span>
                            </div>
                            <button class="btn btn-sm btn-outline-danger border-0" ng-click="deleteTask($index)">
                                ✕
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        `,
    link: function (scope) {
      // Add new task
      scope.addTask = function () {
        if (scope.newTaskText) {
          scope.tasks.push({
            text: scope.newTaskText,
            completed: false,
          });
          scope.newTaskText = ""; // Clear input
        }
      };

      // Delete task
      scope.deleteTask = function (index) {
        scope.tasks.splice(index, 1);
      };
    },
  };
});
