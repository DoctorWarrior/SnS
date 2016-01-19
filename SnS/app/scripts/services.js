'use strict';

angular.module('SnSApp')
        .constant("baseURL","http://localhost:3000/")
        .service('cateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            
    
    
            this.getVideos = function(){
                return $resource(baseURL+"videos/:id",null,  {'update':{method:'PUT' }});
            };
            
            
            
            
            

        }])

       
;