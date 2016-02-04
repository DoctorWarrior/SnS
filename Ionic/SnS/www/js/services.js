'use strict';

angular.module('SnS.services', ['ngResource'])
        .constant("baseURL","http://localhost:3000/")

    .service('cateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
    
        this.getVideos = function(){
            return $resource(baseURL+"videos/:id",null,  {'update':{method:'PUT' }});
        };
            
    }])

    .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

      var feedbackfac = {};

      feedbackfac.getFeedback = function () {
          return $resource(baseURL + "feedback/:id", null,
              { 'update': { method: 'PUT' } });
      };

      return feedbackfac;
  }])


;