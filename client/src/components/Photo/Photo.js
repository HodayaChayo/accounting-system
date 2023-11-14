import React from 'react';
import ButtonIcon from '../Button/ButtonIcon';
import { AiFillCloseCircle } from 'react-icons/ai';
import PdfViewerComponent from '../DisplayDocuments/PdfViewerComponent';
import css from './photo.module.css';
import doc from './16979164046631376768.pdf';

export default function Photo(props) {
  return (
    <div className={css.screen}>
      <div className={css.popup}>
        <ButtonIcon
          src={<AiFillCloseCircle />}
          fun={() => {
            props.setDisplay(false);
          }}
        />
        <PdfViewerComponent document={props.doc} />
      </div>
    </div>
  );
}
