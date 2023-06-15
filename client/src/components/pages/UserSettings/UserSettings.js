'use strict';
export default function UserSettings(props) {
  return (
    <div>
      <h1>הגדרות עוסק</h1>
      <h2>פרטי לקוח</h2>
      <input type='email' name='userName' placeholder='(מייל)שם משתמש'></input>
      <input type='text' name='userName' placeholder='סיסמה'></input>
      <input type='text' name='userName' placeholder='שם לקוח/חברה'></input>
      <input type='text' name='userName' placeholder='טלפון נייד'></input>
      <input type='text' name='userName' placeholder='מספר עוסק ח.פ'></input>
      <h2>נתוני רשויות</h2>
      <p>
        סוג עוסק:
        <select name='type' onChange={e => setType(e.target.value)}>
          <option label='עוסק מורשה' value='מורשה'></option>
          <option label='חברה' value='חברה'></option>
          <option label='עוסק פטור' value='פטור'></option>
        </select>
      </p>
      <p>
        תדירות מע"מ:
        <select
          name='VAT'
          onChange={e => setVATFrequency(e.target.value)}
          disabled={type === 'פטור'}
        >
          <option label='חד חודשי' value='1'></option>
          <option label='דו חודשי' value='2'></option>
        </select>
      </p>
      <p>
        תדירות מ.ה:
        <select
          name='incomeTax'
          onChange={e => setTaxFrequency(e.target.value)}
        >
          <option label='חד חודשי' value='1'></option>
          <option label='דו חודשי' value='2'></option>
        </select>
      </p>
      <p>
        *אחוז מקדמות:
        <input
          type='text'
          name='taxPercent'
          placeholder='אחוז מקדמות מ.ה'
          onChange={e => setTaxPercent(e.target.value)}
        ></input>
      </p>

      <p>
        עובד מטפל:
        <select name='manager' onChange={e => setManager(e.target.value)}>
          <option label='עובד מטפל - לא פעיל'></option>
        </select>
      </p>
    </div>
  );
}
