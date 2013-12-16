angular.module('interviewApp.directives', [])
	.directive('question', function(){
		return {
			restrict: 'E',
			replace: true,
			scope: {
				id : '=',
				title: '=',
				content: '='
			},
			templateUrl:'/partials/questionDirective'
		};
	});
