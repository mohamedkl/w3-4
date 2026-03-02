var app = angular.module("SupabaseApp", []);

// POINT 1: SERVICE ARCHITECTURE
app.service("ApiService", function ($http) {
  const baseUrl = "https://drefwnpyfxzwbbkkombb.supabase.co/rest/v1/products";
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZWZ3bnB5Znh6d2Jia2tvbWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NDA1NjcsImV4cCI6MjA4ODAxNjU2N30.b9QpJVmzi9cZLjg-WY0Ybw2fWSnuhkU_DhhncOElfdA";

  const config = {
    headers: {
      apikey: apiKey,
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  };

  // POINT 2: GET (READ)
  this.getAll = () => $http.get(`${baseUrl}?select=*&order=id.desc`, config);

  // POINT 3: POST (CREATE)
  this.create = (data) => {
    let p = angular.copy(data);
    delete p.id;
    return $http.post(baseUrl, p, config);
  };

  // POINT 4: PATCH (UPDATE)
  this.update = (id, data) => {
    let p = angular.copy(data);
    delete p.id;
    delete p.created_at;
    return $http.patch(`${baseUrl}?id=eq.${id}`, p, config);
  };

  // POINT 5: DELETE (DELETE)
  this.delete = (id) => $http.delete(`${baseUrl}?id=eq.${id}`, config);
});

app.controller("ProductCtrl", function ($scope, ApiService) {
  $scope.products = [];
  $scope.form = {};
  $scope.isEdit = false;
  $scope.searchQuery = "";

  $scope.init = () =>
    ApiService.getAll().then((res) => ($scope.products = res.data));

  // POINT 7: VALIDATION & CASTING
  $scope.handleSubmit = () => {
    // Casting price to float to avoid 400 Bad Request errors
    $scope.form.price = parseFloat($scope.form.price);
    // Category is sent as a string (Characters allowed)

    if ($scope.isEdit) {
      ApiService.update($scope.form.id, $scope.form).then(() => {
        $scope.init();
        $scope.cancel();
      });
    } else {
      ApiService.create($scope.form)
        .then((res) => {
          $scope.products.unshift(res.data[0]);
          $scope.cancel();
        })
        .catch((e) => alert("Error: " + e.data.message));
    }
  };

  $scope.edit = (item) => {
    $scope.isEdit = true;
    $scope.form = angular.copy(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  $scope.remove = (id) => {
    if (confirm("Permanently delete this product?")) {
      ApiService.delete(id).then(() => $scope.init());
    }
  };

  $scope.cancel = () => {
    $scope.isEdit = false;
    $scope.form = { category: "" }; // Default empty category
  };

  $scope.init();
});
