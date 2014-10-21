'use strict';

angular.module('gt.app').config(['$translateProvider',
    function ($translateProvider) {

        $translateProvider.translations('he', {
            'OK' : 'אישור',
            'Save Tree' : 'שמירת העץ',
            'My Details': 'פרטים אישיים',
            'Mom' : 'אמא',
            'Dad' : 'אבא',
            'Brother': 'אח/ות',
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
            'Is Alive' : 'עדיין בחיים',
            'Register' : 'הרשמה',
            'Enter' : 'כניסה',
            'Enter Value' : 'הכניסו ערך',
            'Email' : 'דואר אלקטרוני',
            'Confirmation Code': 'קוד אימות',
            'Confirm': 'אישור',
            'Save': 'שמירה',
            'Continue': 'המשך',
            'Confirm Email': 'אימות דואר אלקטרוני',
            'AGREE_TO_USAGE_TERMS' : 'קראתי ואני מסכים/ה ל<a href="usageterms.html">תנאי השימוש</a>',
            'In this site you can create your family tree in 4 simple steps' : 'ברוכים הבאים לפרויקט עצי המשפחה של צה"ל ובית התפוצות. כאן תוכלו ליצור את עץ המשפחה שלכם ב-4 צעדים פשוטים.',
            'The family tree will be saved for you in the Beit Hatfutsot archive and you will be able to watch and edit it in the future in Beit Hatfutsot archive site' : 'העץ שתבנו יישמר במאגר עצי המשפחה המאובטח של בית התפוצות ותוכלו לעיין בו ולערוך אותו בעתיד באתר בית התפוצות.',
            'Registration Details' : 'פרטי רישום',
            'How many brothers you have ?': 'כמה אחים יש לך?',
            'Steps': ' ({{step}}/{{stepCount}})',
            'Please check all info entered by you is OK.': 'זה הכל! עכשיו נשאר לכם רק לעבור על המידע שהזנתם. אם יש טעויות, לחצו על השדה כדי לתקן. מידע שלא הזנתם מסומן במסגרת אדומה – כדאי לברר את המידע החסר עם בני משפחה ולהשלים אותו בהמשך.',
            'Please correct all the invalid fields.': 'יש לתקן את כל השדות המופיעים באדום.',
            'Your data has been successfully saved.': 'תודה רבה! עץ המשפחה שלך נוצר ברגעים אלה והוא יישמר במאגר עצי המשפחה של בית התפוצות. מייל אישור עם הקובץ של עץ המשפחה יישלח אליכם בהקדם".',
            'Confirm Email Description': 'בדקו את תיבת הדואר. בדקות הקרובות תתקבל הודעה ובה קוד אימות, יש להעתיק את הקוד לכאן.',
            'Confirm Email No Mail': 'במידה ולא התקבלה הודעה, בדקו את תיבת דואר הזבל',
            'Resend':'שלח שוב',
            'Click to add':'לחצו להוספה',
            'Name before marriage':'שם משפחה לפני החתונה',
            'City and or country':'עיר ו/או מדינה',
            "Mother_s side": ' הצד של אמא',
            "Father_s side": 'הצד של אבא'
        });

        $translateProvider.preferredLanguage('he');
    }
]);