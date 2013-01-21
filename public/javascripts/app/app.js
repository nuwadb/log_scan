/**
 * Created with JetBrains WebStorm.
 * User: kun
 * Date: 1/21/13
 * Time: 9:29 AM
 * To change this template use File | Settings | File Templates.
 */



function SearchCtrl($scope,$http){


    $scope.groupedItems = [];
    $scope.filteredItems = [];
    $scope.itemsPerPage = 20;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = [];
  // [{"id":"1","name":"name 1","description":"description 1","field3":"field3 1","field4":"field4 1","field5 ":"field5 1"}]
    $http.get('lvdb/httpd/time_state?pId=60').success(function(data) {
        $scope.time_states = data;
        lvdb_d3.time_chart(data,'#d3_svg');
    });

    $http.get('lvdb/httpd/time_log?pId=60').success(function(data) {
        $scope.filteredItems = data;
        $scope.groupToPages();
        //lvdb_d3.time_chart(data,'#d3_svg');
    });



    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
//        console.log('nextpage: ');
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
//        console.log('setpage: ');
        $scope.currentPage = this.n;
    };



//    $scope.orderProp = 'age';
}