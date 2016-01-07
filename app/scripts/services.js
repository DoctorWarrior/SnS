'use strict';

angular.module('SnSApp')
        .service('cateFactory', function() {
    
            var videos=[
                         {
                            _id:0,
                            name: 'The Baobab',
                            image: 'images/baobab.png',
                            genre: 'Fiction',
                            language: 'ASL',
                            price: '4.99',
                            description: 'The Baobab is an original story about a curious little girl who embarks on an adventure. Complete with enthralling illustrations and talented American Sign Language (ASL) storytelling, this bilingual interactive storybook app features a rich American Sign Language glossary with 170 English to ASL words.',
                            comments: [
                                {
                                   rating:5,
                                   comment:"Good",
                                   author:"John Smith",
                                   date:"2012-10-16T17:57:28.556094Z"
                                },
                                {
                                   rating:4,
                                   comment:"Awesome",
                                   author:"Paul",
                                   date:"2014-09-05T17:57:28.556094Z"
                                },
                                {
                                   rating:3,
                                   comment:"This is a good story with some flaws",
                                   author:"Michael",
                                   date:"2015-02-13T17:57:28.556094Z"
                                },
                                {
                                   rating:4,
                                   comment:"Ultimate, Reaching for the stars!",
                                   author:"Ringo Starry",
                                   date:"2013-12-02T17:57:28.556094Z"
                                },
                                {
                                   rating:2,
                                   comment:"Beautiful sign!",
                                   author:"25 Cent",
                                   date:"2011-12-02T17:57:28.556094Z"
                                }                                                          
                            ]

                        },
                        {
                           _id:1,
                           name: 'The Boy Who Cried Wolf',
                           image: 'images/boywolf.png',
                           genre: 'fiction',
                           language: 'ASL',
                           price: '4.99',
                           description: 'The classic Aesop&#146;s fable about the boy who cried wolf is brought to life in a wholly new medium with vivid American Sign Language storytelling, adding cinematic elements to a timeless tale. Accompanied by detailed paintings that evoke times of yore, this storybook app for the iPad comes with over 140 vocabulary words, signed and fingerspelled. App design is based on proven research on bilingualism and visual learning from Visual Language and Visual Learning.',
                           comments: [
                                {
                                   rating:5,
                                   comment:"Good",
                                   author:"John Smith",
                                   date:"2012-10-16T17:57:28.556094Z"
                                },
                                {
                                   rating:4,
                                   comment:"Awesome",
                                   author:"Paul",
                                   date:"2014-09-05T17:57:28.556094Z"
                                },
                                {
                                   rating:3,
                                   comment:"This is a good story with some flaws",
                                   author:"Michael",
                                   date:"2015-02-13T17:57:28.556094Z"
                                },
                                {
                                   rating:4,
                                   comment:"Ultimate, Reaching for the stars!",
                                   author:"Ringo Starry",
                                   date:"2013-12-02T17:57:28.556094Z"
                                },
                                {
                                   rating:2,
                                   comment:"Beautiful sign!",
                                   author:"25 Cent",
                                   date:"2011-12-02T17:57:28.556094Z"
                                }                                                          
                            ]
                        },
                        {
                            _id:2,
                            name: 'The Solar System',
                            image: 'images/solar_system.png',
                            genre: 'non_F',
                            language: 'ASL',
                            price: '2.99',
                            description: 'The Solar System is an educational narrative in both ASL and English about our eight planets, moons, and the sun. The illustrations and the video narrative provides enhanced visual aids to create an interactive, self-directed reading and learning experience for young deaf children. The Solar System is full of scientific facts along with a fantastic collection of vocabulary words and definitions in ASL.',
                            comments: [
                                {
                                   rating:5,
                                   comment:"Good",
                                   author:"John Smith",
                                   date:"2012-10-16T17:57:28.556094Z"
                                },
                                {
                                   rating:4,
                                   comment:"Awesome",
                                   author:"Paul",
                                   date:"2014-09-05T17:57:28.556094Z"
                                },
                                {
                                   rating:3,
                                   comment:"This is a good story with some flaws",
                                   author:"Michael",
                                   date:"2015-02-13T17:57:28.556094Z"
                                },
                                {
                                   rating:4,
                                   comment:"Ultimate, Reaching for the stars!",
                                   author:"Ringo Starry",
                                   date:"2013-12-02T17:57:28.556094Z"
                                },
                                {
                                   rating:2,
                                   comment:"Beautiful sign!",
                                   author:"25 Cent",
                                   date:"2011-12-02T17:57:28.556094Z"
                                }                                                          
                            ]
                        },
                        {
                            _id:3,
                            name: 'The Blue Lobster',
                            image: 'images/blue_lobster.png',
                            genre: 'emerging_readers',
                            language: 'ASL',
                            price: '2.99',
                            description: 'From the same team who made the award-winning ASL/English bilingual storybook app, The Baobab, we now bring you The Blue Lobster! The adventures of the curious little girl continues! In this storybook designed for younger and emerging readers, ages 3 & up, the curious little girl goes off in search for a rare blue lobster!',
                            comments: [
                                {
                                   rating:5,
                                   comment:"Good",
                                   author:"John Smith",
                                   date:"2012-10-16T17:57:28.556094Z"
                                },
                                {
                                   rating:4,
                                   comment:"Awesome",
                                   author:"Paul",
                                   date:"2014-09-05T17:57:28.556094Z"
                                },
                                {
                                   rating:3,
                                   comment:"This is a good story with some flaws",
                                   author:"Michael",
                                   date:"2015-02-13T17:57:28.556094Z"
                                },
                                {
                                   rating:4,
                                   comment:"Ultimate, Reaching for the stars!",
                                   author:"Ringo Starry",
                                   date:"2013-12-02T17:57:28.556094Z"
                                },
                                {
                                   rating:2,
                                   comment:"Beautiful sign!",
                                   author:"25 Cent",
                                   date:"2011-12-02T17:57:28.556094Z"
                                }                                                          
                            ]
                        }  
            ];
    
    
            this.getVideos = function(){
                   return videos;
            };
            this.getVideo = function (index) {
                   return videos[index];
            };

        });