import React, { useState } from 'react';
import Sidebars from '../../Sidebars/Sidebars';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import css from './cusIndex.module.css'

export default function CusIndex() {
  return (
    <div className='body'>
      <Sidebars />
      <Header title='דף הבית' />
      <main className={css.article}>
        <p>
          מערכת הנהלת חשבונות מתקדמת, המציעה ניהול יעיל למשרדי הנהלת חשבונות
          ומנגישה את הנתונים ללקוח (בעלי העסקים). מערכת ירוקה, המיועדת לפתור את
          השימוש בדפים וקלסרים ומציגה את כל החומר בצורה נקיה.
        </p>
        <p>
          להעניק למשרדי הנהלת חשבונות חווית עבודה נוחה ומהירה יותר, חסכונית בזמן
          עבודה וטרחה הן ללקוח והן לעובדי המשרד. המערכת תכלול קליטת מסמכים
          וחשבוניות שאותם ניתן להעלות, ולהציג מהם דוחות הנה"ח כגון דוחות מע"מ
          ומס הכנסה, דוח רווח והפסד וכדומה. תרשימים למנהל המשרד המספקים מידע על
          פעילות העובדים ומצב העבודה במשרד.
        </p>
        <p>
          ביצוע הנה"ח חשבונות באופן מקוון לעומת מערכות המתבססות על חומר פיזי.
          ניהול הנתונים בענן מאפשר גישה מכל מקום לעומת תוכנות המתבססות על שרת
          מקומי. מערכת חכמה הלומדת את פעילות המשתמש ומקצרת את זמן העבודה. כיום
          קיימות בשוק מספר מערכות הדומות לרעיון שלנו אך אינם בנויות בצורה מסודרת
          ונוחה ואינם מאפשרות למנהלי חשבונות ורואי חשבון עבודה יעילה מהירה
          ואמינה. אנו ננסה להקים מערכת אחת העונה על החסרונות האלו.
        </p>
      </main>
      <Footer />
    </div>
  );
}
