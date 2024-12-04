// PersonalityAssessmentScorecard.tsx

import React from "react";

import { Card, Button } from "react-bootstrap";

interface ScorecardProps {
  positiveAttitude: number;

  teamwork: number;

  leadership: number;

  innovation: number;

  onRestart: () => void;
}

const PersonalityAssessmentScorecard: React.FC<ScorecardProps> = ({
  positiveAttitude,

  teamwork,

  leadership,

  innovation,

  onRestart,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Personality Assessment Results</Card.Title>

        <Card.Text>
          <strong>Positive Attitude:</strong> {positiveAttitude}%<br />
          <strong>Teamwork:</strong> {teamwork}%<br />
          <strong>Leadership:</strong> {leadership}%<br />
          <strong>Innovation:</strong> {innovation}%
        </Card.Text>

        <Button onClick={onRestart}>Restart Assessment</Button>
      </Card.Body>
    </Card>
  );
};

export default PersonalityAssessmentScorecard;
