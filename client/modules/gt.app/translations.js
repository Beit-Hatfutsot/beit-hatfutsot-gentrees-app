'use strict';

angular.module('gt.app').config(['$translateProvider',
    function ($translateProvider) {

        $translateProvider.translations('he', {
            'OK' : 'אישור',
            'Cancel' : 'ביטול',
            'Remove' : 'הסר',
            'Save Tree' : 'שמירת העץ',
            'My Details': 'פרטים אישיים',
            'Data Validation':'אימות נתונים',
            'Mom' : 'אמא',
            'Dad' : 'אבא',
            'Brother': 'אח/ות שלי',
            'Brother of mam': 'אח/ות של אמא',
            'Brother of dad': 'אח/ות של אבא',
            'Brothers': 'אחים שלי',
            'MomsBrothers': 'אחים של אמא',
            'DadsBrothers': 'אחים של אבא',
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
            'Image' : 'תמונה',
            'Is Alive' : 'עדיין בחיים',
            'Register' : 'הרשמה',
            'Enter' : 'כניסה',
            'Enter Value' : 'הכניסו ערך',
            'Email' : 'דואר אלקטרוני',
            'Phone':'טלפון',
            'CellPhone':'טלפון סלולרי',
            'Confirmation Code': 'קוד אימות',
            'Confirm': 'אישור',
            'Choose': 'בחר',
            'Save': 'שמירה',
            'Delete': 'מחיקה',
            'Continue': 'המשך',
            'Confirm Email': 'אימות דואר אלקטרוני',
            'Confirm SMS': 'אימות הודעת SMS',
            'SMS success': 'ההודעה נשלחה בהצלחה',
            'Usageterms' : 'תנאי השימוש',
            'Day' : 'יום:',
            'Mounth' : 'חודש:',
            'Year' : 'שנה:',
            'Invalid code or deviceId' : 'קוד לא תואם',
            'Cant sending email' : 'שליחת האיימל נכשלה',
            'Cant sending sms' : 'שליחת הודעת SMS נכשלה',
            'Cant sending sms more than 10 times' : 'אי אפשר לשלוח יותר מ10 SMS',
            'Send sms' : 'שלח הודעת SMS',
            'thanks':'תודה רבה!',
            'Tree Saved':'העץ שלך נשמר',
            'saved_tree_p1':'העץ נשמר במאגר שבחרתם.',
            'saved_tree_p2':'אתם מוזמנים לחזור הנה שוב כדי לעדכן את העץ שלכם ולהוסיף לו עוד אנשים. ',
            'saved_tree_p3' : 'כדי לערוך את העץ שלכם <a href="#!/home">לחצו כאן.</a> ',
            'saved_tree_p4' : 'אתם מוזמנים לבקר במוזיאון בית התפוצות ולהמשיך ללמוד, לחקור ולהיות חלק מסיפור. ',
            'saved_tree_p5' : 'לאתר בית התפוצות <a href="http://www.bh.org.il/">לחצו כאן.</a>  ',
            'If you dont know the specific date you can use only year' : 'אם לא ידוע התאריך המדויק, ניתן להזין שנה בלבד',
            'AGREE_TO_USAGE_TERMS' : 'קראתי ואני מסכים/ה ל<a href="#!/usageterms">תנאי השימוש</a>',
            'In this site you can create your family tree in 4 simple steps' : 'ברוכים הבאים לפרויקט עצי המשפחה של צה"ל ובית התפוצות. כאן תוכלו ליצור את עץ המשפחה שלכם ב-4 צעדים פשוטים.',
            'Registration Details' : 'פרטי רישום',
            'How many brothers you have ?': 'כמה אחים יש לך?',
            'How many brothers your mom have ?': 'כמה אחים יש לאמא?',
            'How many brothers your dad have ?': 'כמה אחים יש לאבא?',
            'Steps': ' ({{step}}/{{stepCount}})',
            'Please check all info entered by you is OK.1': 'זה הכל! עכשיו נשאר לכם רק לעבור על המידע שהזנתם. אם יש טעויות, לחצו על השדה כדי לתקן. מידע שלא הזנתם',
            'Please check all info entered by you is OK.2': 'מסומן במסגרת אדומה',
            'Please check all info entered by you is OK.3': '– כדאי לברר את המידע החסר עם בני משפחה ולהשלים אותו בהמשך.',
            'Please correct all the invalid fields.': 'יש לתקן את כל השדות המופיעים באדום.',
            'Your data has been successfully saved Beit Hatfutsot': 'תודה רבה! עץ המשפחה שלך נוצר ברגעים אלה והוא יישמר במאגר עצי המשפחות של בית התפוצות. אתם מוזמנים לצפות בו באתר בית התפוצות.',
            'Your data has been successfully saved Other':'תודה רבה! עץ המשפחה  שלך נוצר ברגעים אלה.',
            'Confirm Email Description': 'בשניות הקרובות תקבלו הודעת sms ובה קוד אימות, הזינו אותו כאן:',
            'Confirm Email No Mail Part1': 'במידה ולא התקבלה הודעה,',
            'Confirm Email No Mail Part2': 'שוב ונשלח את ההודעה שוב',
            'Resend':'לחצו כאן',
            'Click to add':'לחצו להוספה',
            'Name before marriage':'שם משפחה לפני החתונה',
            'City and or country':'עיר ו/או מדינה',
            "Mother's side": ' הצד של אמא',
            "Father's side": 'הצד של אבא',
            'The family tree will be saved for you in the Beit Hatfutsot archive and you will be able to watch and edit it in the future in Beit Hatfutsot archive site' : 'העץ שתבנו יישמר במאגר עצי המשפחה המאובטח של בית התפוצות ותוכלו לעיין בו ולערוך אותו בעתיד באתר בית התפוצות.',
            'Where do you want to save the tree':'היכן תרצו לשמור את העץ המשפחתי:',
            'Stockpile Beit Hatfutsot':'מאגר העם היהודי בית התפוצות',
            'Stockpile Bedouin':'מאגר העם הבדואי',
            'Stockpile Circassian':'מאגר העם הצרקסי',
            'Stockpile Druse':'מאגר העם הדרוזי',
            'Stockpile Arab Christians':'מאגר ערבי נוצרי',
            'Stockpile Arab Muslim':'מאגר ערבי מוסלמי',
            'usageterms-content-1':'אני מתחייב/ת בזאת כי הפרטים אשר מסרתי באילן היוחסין שהפקדתי במרכז לגניאלוגיה יהודית ע"ש דגלס א. גודלמן שבבית התפוצות (להלן" "המרכז"), נכונים למיטב ידיעתי, ונמסרו על ידי בתום לב.',
            'usageterms-content-2':' ידוע לי, כי בכל מקרה בו יפנה למרכז צד ג  כלשהו, שפרטיו מופעים באילן היוחסין שהפקדתי, בדרישה להסיר את פרטיו מהאילן – מכל סיבה שהיא – ייאלץ המרכז להסיר את הקובץ מהמאגר, שכן אין באפשרות המרכז לבדוק את אמיתות המידע הנמסר על ידי. המרכז מתחייב להודיע לי על הסרת הקובץ בנסיבות האמורות.',
            'usageterms-content-3':'במקרה בו ייתבע המרכז בגין פרטיו המצויים באילן היוחסין שהפקדתי, ולא ניתן יהיה להסתפק בהורדת הקובץ מהמאגר, אני מתחייב/ת לשפות את המרכז בגין כל תביעה כאמור.',
            'usageterms-content-4':'אני מסכים/ה שהמידע שמסרתי (לרבות שמי, כתובתי, מספר הטלפון ודוא"ל), יעמוד לרשות הציבור לצורך עריכת חיפושים גניאלוגיים ו/או מחקרים אחרים.',
            'usageterms-content-5':' אני מתחייב/ת, כי אין ולא יהיו לי בעתיד כל תביעות כלפי המרכז בגין הכללת אילן היוחסין שמסרתי במאגר המרכז (לרבות העלאתו של האתר אינטרנט), וכן לגבי הסרת האילן האמור.'

        });

        $translateProvider.translations('en', {
            // 'OK' : 'אישור',
            // 'Cancel' : 'ביטול',
            // 'Remove' : 'הסר',
            // 'Save Tree' : 'שמירת העץ',
            // 'My Details': 'פרטים אישיים',
            // 'Data Validation':'אימות נתונים',
            // 'Mom' : 'אמא',
            // 'Dad' : 'אבא',
            'Brother': 'My Sibling',
            'Brother of mam': 'Mother\'s Sibling',
            'Brother of dad': 'Father\'s Sibling',
            'Brothers': 'Siblings',
            'MomsBrothers': 'Mother\'s Siblings',
            'DadsBrothers': 'Father\'s Siblings',
            'Mom\'s Dad' : 'Maternal Grandfather',
            'Mom\'s Mom' : 'Maternal Grandmother',
            'Dad\'s Dad' : 'Paternal Grandfather',
            'Dad\'s Mom' : 'Paternal Grandmother',
            // 'First Name' : 'שם פרטי',
            // 'Last Name' : 'שם משפחה',
            // 'Maiden Name' : 'שם נעורים',
            // 'Date of Birth' : 'תאריך לידה',
            // 'Gender' : 'מין',
            // 'Date of Death' : 'תאריך פטירה',
            // 'Place of Birth' : 'מקום לידה',
            // 'Image' : 'תמונה',
            // 'Is Alive' : 'עדיין בחיים',
            // 'Register' : 'הרשמה',
            // 'Enter' : 'כניסה',
            // 'Enter Value' : 'הכניסו ערך',
            // 'Email' : 'דואר אלקטרוני',
            // 'Phone':'טלפון',
            'CellPhone':'Cell Phone',
            // 'Confirmation Code': 'קוד אימות',
            // 'Confirm': 'אישור',
            // 'Choose': 'בחר',
            // 'Save': 'שמירה',
            // 'Delete': 'מחיקה',
            // 'Continue': 'המשך',
            // 'Confirm Email': 'אימות דואר אלקטרוני',
            // 'Confirm SMS': 'אימות הודעת SMS',
            'SMS success': 'SMS Sent Successfully',
            'Usageterms' : 'Usage Terms',
            'Day' : 'Day:',
            'Mounth' : 'Month:',
            'Year' : 'Year:',
            // 'Invalid code or deviceId' : 'קוד לא תואם',
            'Cant sending email' : 'Failed to send Email',
            'Cant sending sms' : 'Failed to send SMS',
            // 'Cant sending sms more than 10 times' : 'אי אפשר לשלוח יותר מ10 SMS',
            // 'Send sms' : 'שלח הודעת SMS',
            'thanks':'Thank you very much!',
            'Tree Saved':'Your tree was saved',
            'saved_tree_p1':'Your tree was saved in the selected collection',
            'saved_tree_p2':'You are welcome to come back to update your tree. ',
            'saved_tree_p3' : 'To edit your tree <a href="#!/home">click here.</a> ',
            'saved_tree_p4' : 'You are invited to visit The Museum of The Jewish People to . ',
            'saved_tree_p5' : 'For the Museum of The Jewish People website, <a href="http://www.bh.org.il/">click here.</a>  ',
            // 'If you dont know the specific date you can use only year' : 'אם לא ידוע התאריך המדויק, ניתן להזין שנה בלבד',
            'AGREE_TO_USAGE_TERMS' : 'I read and agree to the <a href="#!/usageterms">usage terms</a>',
            // 'In this site you can create your family tree in 4 simple steps' : 'ברוכים הבאים לפרויקט עצי המשפחה של צה"ל ובית התפוצות. כאן תוכלו ליצור את עץ המשפחה שלכם ב-4 צעדים פשוטים.',
            // 'Registration Details' : 'פרטי רישום',
            // 'How many brothers you have ?': 'כמה אחים יש לך?',
            // 'How many brothers your mom have ?': 'כמה אחים יש לאמא?',
            // 'How many brothers your dad have ?': 'כמה אחים יש לאבא?',
            // 'Steps': ' ({{step}}/{{stepCount}})',
            'Please check all info entered by you is OK.1': 'Thats all! Please review the data you entered ',
            'Please check all info entered by you is OK.2': ' any missing details are marked in red',
            'Please check all info entered by you is OK.3': '– you should ask family members and complete the missing details later.',
            // 'Please correct all the invalid fields.': 'יש לתקן את כל השדות המופיעים באדום.',
            'Your data has been successfully saved Beit Hatfutsot': 'Thank you! Your family tree has been saved successfully to The Museum of The Jewish People family trees database',
            'Your data has been successfully saved Other':'Thank you! Your family tree has been saved successfully',
            'Confirm Email Description': 'In the following seconds you will get an SMS message with verification code, please enter it here:',
            'Confirm Email No Mail Part1': 'In case the message was not received,',
            'Confirm Email No Mail Part2': 'again and we will resend the message',
            'Resend':'click here',
            // 'Click to add':'לחצו להוספה',
            // 'Name before marriage':'שם משפחה לפני החתונה',
            // 'City and or country':'עיר ו/או מדינה',
            // "Mother's side": ' הצד של אמא',
            // "Father's side": 'הצד של אבא',
            // 'The family tree will be saved for you in the Beit Hatfutsot archive and you will be able to watch and edit it in the future in Beit Hatfutsot archive site' : 'העץ שתבנו יישמר במאגר עצי המשפחה המאובטח של בית התפוצות ותוכלו לעיין בו ולערוך אותו בעתיד באתר בית התפוצות.',
            // 'Where do you want to save the tree':'היכן תרצו לשמור את העץ המשפחתי:',
            'Stockpile Beit Hatfutsot':'The Museum of The Jewish People family trees collection',
            'Stockpile Bedouin':'Bedouin Family Trees Collection',
            'Stockpile Circassian':'Circassian Family Trees Collection',
            'Stockpile Druse':'Druse Family Trees Collection',
            'Stockpile Arab Christians':'Arab Christians Family Trees Collection',
            'Stockpile Arab Muslim':'Arab Muslim Family Trees Collection',
            'usageterms-content-1':'I hereby undertake that the information I have provided in the family tree that I have deposited at the Douglas E. Goodman Jewish Genealogy Center at Beth Hatefutsoth (the "Center") is correct, to the best of my knowledge, and has been delivered by me in good faith.',
            'usageterms-content-2':'  I know that in any case in which any third party, whose details appear in the family tree that I ordered, will be required to remove the file from the tree for any reason, the Center will be required to check the authenticity of the information provided by me. The Center undertakes to inform me of the removal of the file in the said circumstances.',
            'usageterms-content-3':'If the Center is sued for its details in the family tree that I deposited, and it will not be sufficient to download the file from the database, I undertake to indemnify the Center for any such claim.',
            'usageterms-content-4':'I agree that the information I have provided (including my name, address, phone number and email) will be available to the public for genealogical and / or other research.',
            'usageterms-content-5':'  I undertake that I will not have any future claims against the Center for the inclusion of the family tree that I provided in the Central Database (including the uploading of the Internet site), and regarding the removal of the said tree.'

        });

        $translateProvider.preferredLanguage('he');
    }
]);