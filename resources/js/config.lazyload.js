// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   ['../resources/vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
      sparkline:      ['../resources/vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
      plot:           ['../resources/vendor/jquery/charts/flot/jquery.flot.min.js',
                          '../resources/vendor/jquery/charts/flot/jquery.flot.resize.js',
                          '../resources/vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                          '../resources/vendor/jquery/charts/flot/jquery.flot.spline.js',
                          '../resources/vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                          '../resources/vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
      slimScroll:     ['../resources/vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       ['../resources/vendor/jquery/sortable/jquery.sortable.js'],
      nestable:       ['../resources/vendor/jquery/nestable/jquery.nestable.js',
                          '../resources/vendor/jquery/nestable/nestable.css'],
      filestyle:      ['../resources/vendor/jquery/file/bootstrap-filestyle.min.js'],
      slider:         ['../resources/vendor/jquery/slider/bootstrap-slider.js',
                          '../resources/vendor/jquery/slider/slider.css'],
      chosen:         ['../resources/vendor/jquery/chosen/chosen.jquery.min.js',
                          '../resources/vendor/jquery/chosen/chosen.css'],
      TouchSpin:      ['../resources/vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          '../resources/vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
      wysiwyg:        ['../resources/vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          '../resources/vendor/jquery/wysiwyg/jquery.hotkeys.js'],
      dataTable:      ['../resources/vendor/jquery/datatables/jquery.dataTables.min.js',
                          '../resources/vendor/jquery/datatables/dataTables.bootstrap.js',
                          '../resources/vendor/jquery/datatables/dataTables.bootstrap.css'],
      vectorMap:      ['../resources/vendor/jquery/jvectormap/jquery-jvectormap.min.js',
                          '../resources/vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                          '../resources/vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                          '../resources/vendor/jquery/jvectormap/jquery-jvectormap.css'],
      footable:       ['../resources/vendor/jquery/footable/footable.all.min.js',
                          '../resources/vendor/jquery/footable/footable.core.css']
      }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: [
              {
                  name: 'ngGrid',
                  files: [
                      '../resources/vendor/modules/ng-grid/ng-grid.min.js',
                      '../resources/vendor/modules/ng-grid/ng-grid.min.css',
                      '../resources/vendor/modules/ng-grid/theme.css'
                  ]
              },
              {
                  name: 'datepicker',
                  files: [
                      '../resources/vendor/libs/bootstrap-datepicker/css/datepicker3.css',
                      '../resources/vendor/libs/bootstrap-datepicker/js/bootstrap-datepicker.js',
                      '../resources/vendor/libs/bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN.js'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      '../resources/vendor/modules/angular-ui-select/select.min.js',
                      '../resources/vendor/modules/angular-ui-select/select.min.css'
                  ]
              },
              {
                  name:'angularFileUpload',
                  files: [
                    '../resources/vendor/modules/angular-file-upload/angular-file-upload.min.js'
                  ]
              },
              {
                  name:'ui.calendar',
                  files: ['vendor/modules/angular-ui-calendar/calendar.js']
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      '../resources/vendor/modules/ngImgCrop/ng-img-crop.js',
                      '../resources/vendor/modules/ngImgCrop/ng-img-crop.css'
                  ]
              },
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      '../resources/vendor/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
                      '../resources/vendor/modules/angular-bootstrap-nav-tree/abn_tree.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      '../resources/vendor/modules/angularjs-toaster/toaster.js',
                      '../resources/vendor/modules/angularjs-toaster/toaster.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      '../resources/vendor/modules/textAngular/textAngular-sanitize.min.js',
                      '../resources/vendor/modules/textAngular/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      '../resources/vendor/modules/angular-slider/angular-slider.min.js',
                      '../resources/vendor/modules/angular-slider/angular-slider.css'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular',
                  files: [
                      '../resources/vendor/modules/videogular/videogular.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.controls',
                  files: [
                      '../resources/vendor/modules/videogular/plugins/controls.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.buffering',
                  files: [
                      '../resources/vendor/modules/videogular/plugins/buffering.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.overlayplay',
                  files: [
                      '../resources/vendor/modules/videogular/plugins/overlay-play.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.poster',
                  files: [
                      '../resources/vendor/modules/videogular/plugins/poster.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.imaads',
                  files: [
                      '../resources/vendor/modules/videogular/plugins/ima-ads.min.js'
                  ]
              }
          ]
      });
  }])
;