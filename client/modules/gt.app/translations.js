'use strict';

angular.module('gt.app').config(['$translateProvider',
    function ($translateProvider) {

        $translateProvider.translations('he', {
            'OK' : 'אישור',
            'Save Tree' : 'שמירת העץ',
            'My Details': 'פרטים אישיים',
            'Mom' : 'אמא',
            'Dad' : 'אבא',
            'Brother': 'אח',
            'Brothers': 'אחים',
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
            'Enter' : 'כניסה',
            'Enter Value' : 'הכנס ערך',
            'Email' : 'דואר אלקטרוני',
            'Confirmation Code': 'קוד אימות',
            'Confirm': 'אישור',
            'Save': 'שמור',
            'Continue': 'המשך',
            'Confirm Email': 'אימות דואר אלקטרוני',
            'AGREE_TO_USAGE_TERMS' : 'קראתי ואני מסכים ל<a href="usageterms.html">תנאי השימוש</a>',
            //'I have read and I agree to the <a href="{0}">usage terms</a>': 'קראתי ואני מסכים לתנאי השימוש',
            'In this site you can create your family tree in 4 simple steps' : 'באתר זה תוכלו ליצור את עץ המשפחה שלכם ב-4 צעדים פשוטים',
            'The family tree will be saved for you in the Beit Hatfutsot archive and you will be able to watch and edit it in the future in Beit Hatfutsot archive site' : 'העץ ישמר בארכיון בית התפוצות ותוכלו לעיין בו ולערוך אותו בעתיד באתר המאגרים של בית התפוצות',
            'Registration Details' : 'פרטי רישום',
            'How many brothers you have ?': 'כמה אחים יש לך ?',
            'Steps': 'שלב {{step}} מתוך {{stepCount}}',
            'Please check all info entered by you is OK.': 'אנא וודא שכל המידע מדוייק. ניתן לחזור למסכים קודמים לצורך עריכה. ניתן לחזור לשלב זה מאוחר יותר.',
            'Please correct all the invalid fields.': 'יש לתקן את כל השדות המופיעים באדום.',
            'Your data has been successfully saved.': 'הנתונים ששלחת נשמרו בהצלחה.',
            'Confirm Email Description': 'בדוק/י את תיבת הדואר שלך. בדקות הדקות תקבל/י הודעה ובה קוד אימות, העתק/י את הקוד לכאן.',
            'Confirm Email No Mail': 'במידה ואינך מקבל/ת הודעה בדוק את תיבת דואר הזבל',
            'Resend':'שלח שוב'
        });

        $translateProvider.preferredLanguage('he');
    }
]);