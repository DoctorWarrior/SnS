'use strict';

angular.module('SnS.services', ['ngResource'])
    .constant("baseURL","http://localhost:3000/")




    .factory('cateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "videos/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    }])



    .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

      var feedbackfac = {};

      feedbackfac.getFeedback = function () {
          return $resource(baseURL + "feedback/:id", null,
              { 'update': { method: 'PUT' } });
      };

      return feedbackfac;
  }])


    .factory('favoriteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
            var favFac = {};
            var favorites = [];

            favFac.addToFavorites = function (index) {
                for (var i = 0; i < favorites.length; i++) {
                    if (favorites[i].id == index)
                        return;
                }
                favorites.push({id: index});
            };

            
            //delete button feature of Ionic lists
            favFac.deleteFromFavorites = function (index) {
                for (var i = 0; i < favorites.length; i++) {
                    if (favorites[i].id == index) {
                        favorites.splice(i, 1);
                    }
                }
            }

            favFac.getFavorites = function () {
                return favorites;
            };
            
            return favFac;


    }])



;