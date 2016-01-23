describe('Controller: CategoryController', function () {

  // load the controller's module
  beforeEach(module('SnSApp'));

  var CategoryController, scope, $httpBackend;
    
    
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, cateFactory) {

          // place here mocked dependencies
      $httpBackend = _$httpBackend_;

      $httpBackend.expectGET("http://localhost:3000/videos").respond([
        {
      "id": 0,
      "name": "The Baobab",
      "image": "images/baobab.png",
      "genre": "Fiction",
      "language": "ASL",
      "price": 4.99,
      "description": "The Baobab is an original story about a curious little girl who embarks on an adventure. Complete with enthralling illustrations and talented American Sign Language (ASL) storytelling, this bilingual interactive storybook app features a rich American Sign Language glossary with 170 English to ASL words.",
      "comments":[{}]
      },
      {
      "id": 1,
      "name": "The Boy Who Cried Wolf",
      "image": "images/boywolf.png",
      "genre": "fiction",
      "language": "ASL",
      "price": 4.99,
      "description": "The classic Aesop&#146;s fable about the boy who cried wolf is brought to life in a wholly new medium with vivid American Sign Language storytelling, adding cinematic elements to a timeless tale. Accompanied by detailed paintings that evoke times of yore, this storybook app for the iPad comes with over 140 vocabulary words, signed and fingerspelled. App design is based on proven research on bilingualism and visual learning from Visual Language and Visual Learning.",
      "comments":[{}]
      }
      ]);

    scope = $rootScope.$new();
    CategoryController = $controller('CategoryController', {
      $scope: scope, cateFactory: cateFactory
    });
            $httpBackend.flush();

  }));
    

  it('should have showDetails as false', function () {

    expect(scope.showDetails).toBeFalsy();

  });

  it('should create "videos" with 2 videos fetched from xhr', function(){

      expect(scope.showMenu).toBeTruthy();
      expect(scope.videos).toBeDefined();
      expect(scope.videos.length).toBe(2);

  });
    
    
  it('should have the correct data order in the videos', function() {

      expect(scope.videos[0].name).toBe("The Baobab");
      expect(scope.videos[1].language).toBe("ASL");

  });

 

  it('should change the tab selected based on tab clicked', function(){

      expect(scope.tab).toEqual(1);

      scope.select(3);

      expect(scope.tab).toEqual(3);
      

  });

    
});