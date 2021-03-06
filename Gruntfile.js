module.exports = function(grunt) {
	grunt.initConfig({
		less: {
			main: {
				expand: true,
				cwd: 'src/less/',
				src: ['*.less'],
				dest: 'src/css/',
				ext: '.css'
			}
		},
		concat: {//css文件合并
		    css: {
		      	src: ['vendors/normalize.css/normalize.css','vendors/bootstrap/bootstrap.css','src/css/*.css'],
		      	dest: 'dist/css/style.css'
		    },
		    lib: {
		    	src: ['vendors/jquery/*.js',"vendors/underscore/*.js","vendors/backbone/*.js","vendors/seajs/*.js"],
		      	dest: 'dist/js/lib.js'
		    },
		    app: {
		    	src: ['src/js/app.js'],
		      	dest: 'dist/js/app.js'
		    },
		    js: {
				expand: true,
				cwd: 'src/js/',
				src: ['**/!(app).js'],
				dest: 'dist/js/',
				ext: '.js'
		    }
		},
		uglify: {
			build: {
				src: 'dist/built.js', //压缩源文件是之前合并的buildt.js文件
				dest: 'dist/built.min.js' //压缩文件为built.min.js
			}
		},
		watch: {
			concat: {
				files: 'src/css/*.css',
				tasks: 'concat:css',
				options: {
					debounceDelay: 100
				}
			},
			concat_app: {
				files: 'src/js/**/*.js',
				tasks: 'concat:app',
				options: {
					debounceDelay: 100
				}
			},
			concat_js: {
				files: 'src/js/**/!(app).js',
				tasks: 'concat:js',
				options: {
					debounceDelay: 100
				}
			},
			less: {
				files: 'src/less/*.less',
				tasks: 'less',
				options: {
					debounceDelay: 100
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('lib', ['concat:lib']);
};