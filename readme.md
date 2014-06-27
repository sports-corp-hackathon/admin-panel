#Durandal HTML Starter Kit Pro
[![Build Status](https://travis-ci.org/RainerAtSpirit/HTMLStarterKitPro.png?branch=master)](https://travis-ci.org/RainerAtSpirit/HTMLStarterKitPro)
>  **2013/11/11**: Using grunt with [Durandal's](http://www.durandaljs.com) 2.0.1 HTML starter kit.

##Jump starts your Durandal application testing

### Quick start

1. install node from http://nodejs.org
2. install grunt using `npm install -g grunt-cli`
3. download/clone this repo
4. run `npm install` in repo's root directory to install grunt's dependencies
5. run `grunt` to run the default task, which opens the resultant `_specrunner.html` in the browser... and waits for
you to write some tests

###Writing tests
Testing Durandal apps typically start at the module level and of course there's a grunt task for it.
By typing `grunt` in the root folder the following sequence of grunt tasks will be executed.

```javascript
    grunt.registerTask('default', [
    'jshint',
    'jasmine:dev',
    'connect:dev:livereload',
    'open:dev',
    'watch:dev']);
```

When done grunt has opened your favorite browser with the jasmine `specrunner.html` and is waiting for you do make
changes. Whenever you're updating files in `test/specs/dev/*spec.js` or your module files in `app/**/*.js` grunt will
 first run the `jasmine:dev` task (using `phantomjs` as a testrunner) and then sends a `livereload` event to your
 browsers.

```javascript
dev: {
    files: ['test/specs/dev/**/*spec.js', 'app/**/*.js'],
    tasks: ['jasmine:dev'],
    options: {
        livereload: true
    }
}
```

###Building the app
Experimental: There's a `grunt build` task that builds an optimized version in the build directory.

###Customization
Modify/adjust package.json after cloning.

Open gruntfile.js to add/modify the existing configuration.


###New to grunt?
Head over to http://gruntjs.com/ to learn the basics.



```javascript
    ...
  /*global module, require */
  module.exports = function( grunt ) {
      'use strict';

      // Livereload and connect variables
      var LIVERELOAD_PORT = 35729;
      var lrSnippet = require('connect-livereload')({
          port: LIVERELOAD_PORT
      });
      var mountFolder = function( connect, dir ) {
          return connect.static(require('path').resolve(dir));
      };
      var mixIn = require('mout/object/mixIn');
      var requireConfig = {
          baseUrl: 'app/',
          paths: {
              'jquery': '../lib/jquery/jquery-1.9.1',
              'knockout': '../lib/knockout/knockout-2.3.0.debug',
              'text': '../lib/require/text',
              'durandal': '../lib/durandal/js',
              'plugins': '../lib/durandal/js/plugins',
              'transitions': '../lib/durandal/js/transitions'
          }
      };

      grunt.initConfig({
              pkg: grunt.file.readJSON('package.json'),
              clean: {
                  build: ['build/*']
              },
              connect: {
                  build: {
                      options: {
                          port: 9001,
                          hostname: 'localhost',
                          base: 'build'
                      }
                  },
                  dev: {
                      options: {
                          port: 8999,
                          hostname: 'localhost',
                          middleware: function( connect ) {
                              return [lrSnippet, mountFolder(connect, '.')];
                          }
                      }
                  }
              },
              copy: {
                  lib: {
                      src: 'lib/**/**',
                      dest: 'build/'
                  },
                  index: {
                      src: 'index.html',
                      dest: 'build/'
                  },
                  css: {
                      src: 'css/**',
                      dest: 'build/'
                  }
              },
              open: {
                  dev: {
                      path: 'http://localhost:<%= connect.dev.options.port %>/_SpecRunner.html'
                  },
                  build: {
                      path: 'http://localhost:<%= connect.build.options.port %>'
                  }
              },
              durandal: {
                  main: {
                      src: ['app/**/*.*', 'lib/durandal/**/*.js'],
                      options: {
                          name: '../lib/require/almond-custom',
                          baseUrl: requireConfig.baseUrl,
                          mainPath: 'app/main',
                          paths: mixIn({}, requireConfig.paths, { 'almond': '../lib/require/almond-custom.js' }),
                          exclude: [],
                          optimize: 'none',
                          out: 'build/app/main.js'
                      }
                  }
              },
              jasmine: {
                  dev: {
                      src: 'app/viewmodels/*.js',
                      options: {
                          specs: 'test/specs/dev/**/*spec.js',
                          keepRunner: true,
                          template: require('grunt-template-jasmine-requirejs'),
                          templateOptions: {
                              requireConfig: requireConfig
                          }
                      }
                  },
                  build: {
                      options: {
                          specs: 'test/specs/build/**/*spec.js',
                          keepRunner: true,
                          template: require('grunt-template-jasmine-requirejs'),
                          templateOptions: {
                              requireConfig: requireConfig
                          }
                      }
                  }
              },
              jshint: {
                  all: ['Gruntfile.js', 'app/**/*.js', 'test/specs/**/*.js']
              },
              uglify: {
                  options: {
                      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                          '* Copyright (c) <%= grunt.template.today("yyyy") %> YourName/YourCompany \n' +
                          '* Available via the MIT license.\n' +
                          '* see: http://opensource.org/licenses/MIT for blueprint.\n' +
                          '*/\n'
                  },
                  build: {
                      src: 'build/app/main.js',
                      dest: 'build/app/main-built.js'
                  }
              },

              watch: {
                  build: {
                      files: ['test/specs/build/**/*spec.js'],
                      tasks: ['jasmine:build']
                  },
                  dev: {
                      files: ['test/specs/dev/**/*spec.js', 'app/**/*.js'],
                      tasks: ['jasmine:dev'],
                      options: {
                          livereload: true
                      }
                  }
              }
          }
      )
      ;

  // Loading plugin(s)
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-contrib-connect');
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-contrib-jasmine');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-open');
      grunt.loadNpmTasks('grunt-durandal');

      grunt.registerTask('default', ['jshint', 'jasmine:dev', 'connect:dev:livereload', 'open:dev', 'watch:dev']);
      grunt.registerTask('build', ['jshint', 'jasmine:dev', 'clean', 'copy', 'durandal:main', 'uglify', 'jasmine:build', 'connect:build', 'open:build']);

  };

```

