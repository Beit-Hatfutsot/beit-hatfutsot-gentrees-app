'use strict';

angular.module('gt.app').config(['$translateProvider',
    function ($translateProvider) {

        $translateProvider.translations('he', {
            'Mom' : 'אמא',
            'Dad' : 'אבא',
            'Mom\'s Dad' : 'אבא של אמא',
            'Mom\'s Mom' : 'אמא של אמא',
            'Dad\'s Dad' : 'אבא של אבא',
            'Dad\'s Mom' : 'אמא של אבא',
            'First Name' : 'שם פרטי',
            'Last Name' : 'שם משפחה',
            'Maiden Name' : 'שם נעורים',
            'Date of Birth' : 'תאריך לידה',
            'Gender' : 'מין',
            'Date of Death' : 'תאריך פטירה',
            'Place of Birth' : 'מקום לידה',
            'Is Alive' : 'עדין חי'
        });

        $translateProvider.preferredLanguage('he');
    }
]);