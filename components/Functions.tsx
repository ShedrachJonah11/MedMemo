import { capitalize } from "@/application/utils/functions";
import React from "react";
import Markdown from "react-markdown";

interface SubjectiveProps {
    data: { [key: string]: string };
  } 
  export const renderSubjective: React.FC<SubjectiveProps> = (data,toText=false) => {

    if (toText) {
      const textItems = Object.entries(data).map(([key, value]) => (
        `${capitalize(key.replace(/_/g, ' '))}: ${value}`
      )).join('\n');
  
      return textItems;
    }

    const listItems = Object.entries(data).map(([key, value]) => (
      <li key={key}>
        <b>{capitalize(key.replace(/_/g, ' '))}</b>: <Markdown>{value}</Markdown>
      </li>
    ));
  
    return (
      <div>
        <ul>{listItems}</ul>
      </div>
    );
  };

  interface ObjectiveProps {
    data: {
      vital_signs: {
        temperature: string;
        heart_rate: string;
        respiratory_rate: string;
        blood_pressure: string;
      };
      general_appearance: string;
      exam_findings: { [key: string]: string };
    };
  } 
  
  export const renderObjective = (data: ObjectiveProps['data'],isText=false): JSX.Element | string => {
    const renderObjectiveData = (sectionTitle: string, sectionData: { [key: string]: string }): any => {
      const items = Object.entries(sectionData).map(([key, value]) => (
        isText
      ? `${capitalize(key.replace(/_/g, ' '))}: ${value}`
      : <React.Fragment key={key}><b>{capitalize(key.replace(/_/g, ' '))}</b> <Markdown>{value}</Markdown></React.Fragment>
      ));
  
      if(isText){
        return `*${sectionTitle}*\n${items.join('\n')}\n`;
      }else{
        return (
          <div key={sectionTitle}>
          <h2 style={{ color: "grey", fontStyle: "italic" }}><b>{sectionTitle}</b></h2>
          <ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul>
        </div>
        )
      }
    };
  
    if (isText) {
      return `${renderObjectiveData('Vital Signs', data.vital_signs)}General Appearance:${data.general_appearance}\n${renderObjectiveData('Exam Findings', data.exam_findings)}`;
    }
  
    return (
      <div>
        <div>
          {renderObjectiveData('Vital Signs', data.vital_signs)}
          <div>
            <h4>General Appearance</h4>
            <p>{data.general_appearance}</p>
          </div>
          {renderObjectiveData('Exam Findings', data.exam_findings)}
        </div>
      </div>
    );
  };
