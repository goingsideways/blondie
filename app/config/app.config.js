/**
*   AngularJS Application Controller
*   @name:        application configuration
*   @description: app settings for angular
*   @author:      jamie sellars (@goingsideways on github)
**/
"use-strict";
angular.module('app')

/**
*   @name:        Application HTTP configuration
*   @description: Attach AuthInterceptor service (services/services.auth.js) to all http negotiations
**/
.config(['$httpProvider', function($httpProvider){

  $httpProvider.interceptors.push('AuthInterceptor');

}])

/**
*   @name:        Application State Configuration
*   @description: Using angular-ui-router to handle angular JS application states for ui-views
**/
.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    // Unsatifised routes / states
    $urlRouterProvider.when('/settings', 'settings/categories');

    //$urlRouterProvider.when('/dashboard', 'dashboard/statistics/categories');
    //$urlRouterProvider.when('/tickets', 'tickets/all');

    $urlRouterProvider.otherwise("/tickets/all");

    // Programmed states
    $stateProvider

    // authentication
    .state('signin', {
        url: "/signin", // UI will show login window
        templateUrl: "views/partials/partial.signin.html",
        controller: "AuthenticationController as auth"
    })

      /**
      *   @description: DASHBOARD STATISTICS
      **/

      .state('dashboard.statistics', {
          url: '/statistics/:item',
          parent: 'dashboard',
          templateUrl: "views/dashboard/partial.statistics.html",
          controller: "statisticsController as statistics"
      })

      /**
      *   @description: TICKETS
      **/
      .state('tickets', {
          url: "/tickets",
          templateUrl: "views/tickets/tickets.main.html"
      })
      /**
      *   @description: TICKETS | States
      **/
      .state('tickets.all', {
          url: "/all",
          parent: "tickets",
          templateUrl: "views/tickets/tickets.all.html",
          controller: "ticketsController as tickets"
      })

      .state('tickets.create', {
          url: "/create",
          parent: "tickets",
          templateUrl: "views/tickets/tickets.create.html",
          controller: "ticketsCreateController as ticket"
      })
      .state('tickets.quick', {
          url: "/quick",
          parent: "tickets",
          templateUrl: "views/tickets/tickets.quick.html",
          controller: "ticketsQuickController as quick"
      })

      .state('tickets.view', {
          url: "/ticket/:id",
          parent: "tickets",
          templateUrl: "views/tickets/tickets.create.html",
          controller: "ticketsCreateController as ticket"
      })

      /**
      *   @description: SETTINGS STATES
      **/
      .state('settings', {
          url: "/settings",
          templateUrl: '/views/view.settings.html'
      })
      /**
      *   @description: SETTINGS > CATEGORIES
      **/
      .state('settings.categories', {
          url: "/categories",
          parent: 'settings',
          templateUrl: "views/partials/settings/categories/partial.categories.html",
          controller: "categoriesSettingsController as settings"
      })
      .state('settings.category', {
          url: "/category/:id",
          parent: 'settings',
          templateUrl: "views/partials/settings/categories/partial.category.html",
          controller: "categorySettingsController as category"
      })
      /**
      *   @description: SETTINGS > SUB-CATEGORIES
      **/
      .state('settings.subcategories', {
          url: "/subcategories/:categoryId",
          parent: 'settings',
          templateUrl: "views/partials/settings/subcategories/partial.subcategories.html",
          controller: "subCategoriesSettingsController as settings"
      })
      .state('settings.subcategory', {
          url: "/subcategory/:id",
          parent: 'settings',
          templateUrl: "views/partials/settings/subcategories/partial.subcategory.html",
          controller: "subCategorySettingsController as subCategory"
      })
      /**
      *   @description: SETTINGS > STATUSES
      **/
      .state('settings.statuses', {
          url: "/statuses",
          parent: 'settings',
          templateUrl: "views/partials/settings/statuses/partial.statuses.html",
          controller: "statusesSettingsController as settings"
      })
      .state('settings.status', {
          url: "/status/:id",
          parent: 'settings',
          templateUrl: "views/partials/settings/statuses/partial.status.html",
          controller: "statusSettingsController as status"
      })
      /**
      *   @description: SETTINGS > SOURCES
      **/
      .state('settings.sources', {
          url: "/sources",
          parent: 'settings',
          templateUrl: "views/partials/settings/sources/partial.sources.html",
          controller: "sourcesSettingsController as settings"
      })
      .state('settings.source', {
          url: "/source/:id",
          parent: 'settings',
          templateUrl: "views/partials/settings/sources/partial.source.html",
          controller: "sourceController as source"
      })
      /**
      *   @description: SETTINGS > USERS
      **/
      .state('settings.users', {
          url: "/users",
          parent: 'settings',
          templateUrl: "views/partials/settings/users/partial.users.html",
          controller: "usersSettingsController as settings"
      })
      .state('settings.user', {
        url: '/user/:id',
        parent: 'settings',
        templateUrl: "views/partials/settings/users/partial.user.html",
        controller: "userController as user"
      })
      /**
      *   @description: SETTINGS > TYPES
      **/
      .state('settings.types', {
          url: "/types",
          parent: 'settings',
          templateUrl: "views/partials/settings/types/partial.types.html",
          controller: "typesSettingsController as settings"
      })
      .state('settings.type', {
        url: '/type/:id',
        parent: 'settings',
        templateUrl: "views/partials/settings/types/partial.type.html",
        controller: "typeController as type"
      })

      /**
       * 
       *    Lost & Found
       * 
       */
        .state('lostandfound', {
            url: '/lostandfound',
            abstract: true,
            templateUrl: 'views/lostandfound/lostandfound.template.html',            
        })
        .state('lostandfound.items', {
            parent: 'lostandfound',
            url: '',
            templateUrl: 'views/lostandfound/items.template.html',                        
            controller: 'LostandFoundItemsController as items'
        })
        .state('lostandfound.item', {
            parent: 'lostandfound',
            url: '/item/:id',
            templateUrl: 'views/lostandfound/item.template.html',                        
            controller: 'LostandFoundItemController as item'
        })


        .state('lostandfound.settings', {
            url: "/settings",
            abstract: true,
            parent: 'lostandfound',
            templateUrl: "views/lostandfound/settings.template.html",
        })
        .state('lostandfound.settings.categories', {
            url: "",
            parent: 'lostandfound.settings',
            templateUrl: "views/lostandfound/categories.template.html",
            controller: 'LostandfoundCategoriesController as categories'
        })
        .state('lostandfound.settings.category', {
            url: "/category/:id",
            parent: 'lostandfound.settings',
            templateUrl: "views/lostandfound/category.template.html",
            controller: 'LostandfoundCategoryController as category'
        })

        .state('lostandfound.settings.subcategories', {
            url: "/category/:id/subcategories",
            parent: 'lostandfound.settings',
            templateUrl: "views/lostandfound/subcategories.template.html",
            controller: 'LostandfoundSubcategoriesController as subcategories'
        })
        .state('lostandfound.settings.subcategory', {
            url: "/category/:id/subcategory/:subcatId",
            parent: 'lostandfound.settings',
            templateUrl: "views/lostandfound/subcategory.template.html",
            controller: 'LostandfoundSubcategoryController as subcategory'
        })


        .state('lostandfound.settings.locations', {
            url: "/locations",
            parent: 'lostandfound.settings',
            templateUrl: "views/lostandfound/locations.template.html",
            controller: 'LocationsController as locations'
        })
        .state('lostandfound.settings.location', {
            url: "/location/:id",
            parent: 'lostandfound.settings',
            templateUrl: "views/lostandfound/location.template.html",
            controller: 'LocationController as location'
        })


        .state('lostandfound.settings.statuses', {
            url: "/statuses",
            parent: 'lostandfound.settings',
            templateUrl: "views/lostandfound/statuses.template.html",
            controller: 'LostandFoundStatusesController as statuses'
        })
        .state('lostandfound.settings.status', {
            url: "/statuses/:id",
            parent: 'lostandfound.settings',
            templateUrl: "views/lostandfound/status.template.html",
            controller: 'LostandfoundStatusController as status'
        })
 
 


    .state('changepassword', {
        url: "/changepassword", 
        templateUrl: "views/partials/me/partial.changepassword.html",
        controllerAs: "meController as me"
    })
    // Error Pages
    .state('403', {
      url: "/403",
      templateUrl: "views/err/403.html"
    });

}]);
