var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
    var getData = function() {
        return $http.get('/book')
            .then(response => {
                $scope.books = response.data;
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };

    getData();

    $scope.del_book = function(book) {
        $http.delete('/book/' + book.isbn)
            .then(response => {
                console.log(response);
                return getData();
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };

    $scope.add_book = function() {
        var body = {
            name: $scope.Name,
            isbn: $scope.Isbn,
            author: $scope.Author,
            pages: $scope.Pages
        };

        $http.post('/book', body)
            .then(response => {
                console.log(response);
                return getData();
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };
});
