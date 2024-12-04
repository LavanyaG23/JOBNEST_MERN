import React, { useState } from "react";

import { Card, Button, Form } from "react-bootstrap";

import PersonalityAssessmentScorecard from "./PersonalityAssessmentScorecard";

// Define the types for the answers

type Answer =
  | "Strongly Agree"
  | "Agree"
  | "Neutral"
  | "Disagree"
  | "Strongly Disagree";

interface Answers {
  positiveAttitude: Answer[];

  teamwork: Answer[];

  leadership: Answer[];

  innovation: Answer[];
}

const PersonalityAssessment: React.FC = () => {
  // Define state for answers, with proper typing

  const [answers, setAnswers] = useState<Answers>({
    positiveAttitude: Array(4).fill(null),

    teamwork: Array(4).fill(null),

    leadership: Array(4).fill(null),

    innovation: Array(4).fill(null),
  });

  const [showScorecard, setShowScorecard] = useState(false);

  // Function to handle answer changes

  const handleAnswerChange = (
    section: keyof Answers,
    index: number,
    value: Answer
  ) => {
    setAnswers((prev) => ({
      ...prev,

      [section]: prev[section].map((answer, i) =>
        i === index ? value : answer
      ),
    }));
  };

  const handleSubmit = () => {
    setShowScorecard(true);
  };

  const totalQuestions = 4;

  // Score mapping for the answers

  const scoreMapping: Record<Answer, number> = {
    "Strongly Agree": 5,

    Agree: 4,

    Neutral: 3,

    Disagree: 2,

    "Strongly Disagree": 1,
  };

  // Calculate the percentage for each section

  const calculatePercentage = (section: keyof Answers) => {
    const score = answers[section].reduce(
      (acc, answer) => acc + (answer ? scoreMapping[answer] : 0),

      0
    );

    return (score / (totalQuestions * 5)) * 100;
  };

  const percentages = {
    positiveAttitude: calculatePercentage("positiveAttitude"),

    teamwork: calculatePercentage("teamwork"),

    leadership: calculatePercentage("leadership"),

    innovation: calculatePercentage("innovation"),
  };

  const handleRestart = () => {
    setShowScorecard(false);

    setAnswers({
      positiveAttitude: Array(4).fill(null),

      teamwork: Array(4).fill(null),

      leadership: Array(4).fill(null),

      innovation: Array(4).fill(null),
    });
  };

  return (
    <Card>
      <Card.Body>
        {showScorecard ? (
          <PersonalityAssessmentScorecard
            positiveAttitude={percentages.positiveAttitude}
            teamwork={percentages.teamwork}
            leadership={percentages.leadership}
            innovation={percentages.innovation}
            onRestart={handleRestart}
          />
        ) : (
          <>
            <Card.Title>Start the Assessment!!</Card.Title>

            <Card.Text>
              Please rate the following statements based on your agreement:
            </Card.Text>

            {/* Positive Attitude Section */}

            <h5>Positive Attitude</h5>

            {[
              "I believe that challenges are opportunities to grow.",

              "I remain optimistic even when things are tough.",

              "I try to focus on solutions instead of problems.",

              "I encourage my team members to stay positive during difficult situations.",
            ].map((question, index) => (
              <Form.Group key={index}>
                <Form.Label>{question}</Form.Label>

                {[
                  "Strongly Agree",
                  "Agree",
                  "Neutral",
                  "Disagree",
                  "Strongly Disagree",
                ].map((value) => (
                  <Form.Check
                    key={value}
                    type="radio"
                    label={value}
                    value={value}
                    checked={answers.positiveAttitude[index] === value}
                    onChange={() =>
                      handleAnswerChange(
                        "positiveAttitude",
                        index,
                        value as Answer
                      )
                    }
                  />
                ))}
              </Form.Group>
            ))}

            {/* Teamwork Section */}

            <h5>Teamwork</h5>

            {[
              "I collaborate well with colleagues to achieve common goals.",

              "I am open to receiving feedback from others in a team setting.",

              "I actively contribute during team discussions and meetings.",

              "I am willing to assist my teammates when they need help.",
            ].map((question, index) => (
              <Form.Group key={index}>
                <Form.Label>{question}</Form.Label>

                {[
                  "Strongly Agree",
                  "Agree",
                  "Neutral",
                  "Disagree",
                  "Strongly Disagree",
                ].map((value) => (
                  <Form.Check
                    key={value}
                    type="radio"
                    label={value}
                    value={value}
                    checked={answers.teamwork[index] === value}
                    onChange={() =>
                      handleAnswerChange("teamwork", index, value as Answer)
                    }
                  />
                ))}
              </Form.Group>
            ))}

            {/* Leadership Section */}

            <h5>Leadership</h5>

            {[
              "I take initiative to lead projects or tasks without being asked.",

              "I motivate and inspire others to perform at their best.",

              "I take responsibility for both my success and failures.",

              "I provide clear guidance to my team members when they need direction.",
            ].map((question, index) => (
              <Form.Group key={index}>
                <Form.Label>{question}</Form.Label>

                {[
                  "Strongly Agree",
                  "Agree",
                  "Neutral",
                  "Disagree",
                  "Strongly Disagree",
                ].map((value) => (
                  <Form.Check
                    key={value}
                    type="radio"
                    label={value}
                    value={value}
                    checked={answers.leadership[index] === value}
                    onChange={() =>
                      handleAnswerChange("leadership", index, value as Answer)
                    }
                  />
                ))}
              </Form.Group>
            ))}

            {/* Innovation Section */}

            <h5>Innovation</h5>

            {[
              "I frequently come up with new ideas to solve problems.",

              "I am open to exploring unconventional approaches to tasks.",

              "I actively seek out new trends and developments in my field.",

              "I encourage others to think creatively and propose innovative solutions.",
            ].map((question, index) => (
              <Form.Group key={index}>
                <Form.Label>{question}</Form.Label>

                {[
                  "Strongly Agree",
                  "Agree",
                  "Neutral",
                  "Disagree",
                  "Strongly Disagree",
                ].map((value) => (
                  <Form.Check
                    key={value}
                    type="radio"
                    label={value}
                    value={value}
                    checked={answers.innovation[index] === value}
                    onChange={() =>
                      handleAnswerChange("innovation", index, value as Answer)
                    }
                  />
                ))}
              </Form.Group>
            ))}

            <Button onClick={handleSubmit}>Submit</Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default PersonalityAssessment;
