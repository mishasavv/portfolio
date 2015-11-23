var testApp = angular.module('testApp', [ 'ngPDFViewer' ]);

testApp.controller('TestCtrl', [ '$scope', 'PDFViewerService', function($scope, pdf) {
    $scope.viewer = pdf.Instance("viewer");

    $scope.nextPage = function() {
        $scope.viewer.nextPage();
    };

    $scope.prevPage = function() {
        $scope.viewer.prevPage();
    };

    $scope.pageLoaded = function(curPage, totalPages) {
        $scope.currentPage = curPage;
        $scope.totalPages = totalPages;
    };
}]);

