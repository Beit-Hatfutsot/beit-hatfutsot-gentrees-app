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
            'Is Alive' : 'עדין חי',
            'Register' : 'הרשמה',
            'Email' : 'דואר אלקטרוני',
            'I Agree': 'אני מסכים',
            'In this site you can create your family tree in 4 simple steps' : 'באתר זה תוכלו ליצור את עץ המשפחה שלכם ב-4 צעדים פשוטים',
            'The family tree will be saved for you in the Beit Hatfutsot archive and you will be able to watch and edit it in the future in Beit Hatfutsot archive site' : 'העץ ישמר בארכיון בית התפוצות ותוכלו לעיין בו ולערוך אותו בעתיד באתר המאגרים של בית התפוצות'
        });

        $translateProvider.preferredLanguage('he');
    }
]);