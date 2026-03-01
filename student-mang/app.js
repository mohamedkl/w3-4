var app = angular.module("studentApp", []);

app.controller("StudentCtrl", function ($scope) {
  // Default sort order
  $scope.sortOrder = "name";

  // Sample Student Data
  $scope.students = [
    { name: "Alice", marks: 92 },
    { name: "David", marks: 29 },
    { name: "Emma", marks: 74 },
    { name: "John", marks: 85 },
    { name: "Robert", marks: 38 },
    { name: "Sophia", marks: 81 },
    { name: "Khaled", marks: 94 },
  ];
});
