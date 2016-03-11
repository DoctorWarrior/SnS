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


    .factory('favoriteFactory', ['$resource', 'baseURL', '$localStorage', function ($resource, baseURL, $localStorage) {
            var favFac = {};
            var favorites = $localStorage.getObject('favorites', '[]');
            console.log(favorites);

            favFac.addToFavorites = function (index) {
                for (var i = 0; i < favorites.length; i++) {
                    if (favorites[i].id == index)
                        return;
                }
                favorites.push({id: index});
                $localStorage.storeObject('favorites', favorites);
            };

            favFac.deleteFromFavorites = function (index) {
                for (var i = 0; i < favorites.length; i++) {
                    if (favorites[i].id == index) {
                        favorites.splice(i, 1);
                    }
                }
                $localStorage.storeObject('favorites', favorites);
            }

            favFac.getFavorites = function () {
                return favorites;
            };

            return favFac;
        }])


    .factory('$localStorage', ['$window', function($window) {
      return {
        store: function(key, value) {
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        storeObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key,defaultValue) {
          return JSON.parse($window.localStorage[key] || defaultValue);
        }
      }
    }])



;