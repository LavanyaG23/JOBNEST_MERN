import React, { useState } from "react";

import { Button, Form, Col, Row, Badge } from "react-bootstrap";

import Select from "react-select";

import { components } from "react-select";

// Define the option type for react-select dropdown

interface OptionType {
  label: string;

  value: string;
}

const PostJob: React.FC = () => {
  // State to manage form data

  const [jobTitle, setJobTitle] = useState("");

  const [jobDescription, setJobDescription] = useState("");

  const [requiredSkills, setRequiredSkills] = useState<OptionType[]>([]);

  const [jobPreference, setJobPreference] = useState<OptionType[]>([]);

  const [companyCulture, setCompanyCulture] = useState<OptionType[]>([]);

  const [salaryRange, setSalaryRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });

  // Skill, Job Preference, and Culture options (can be expanded or fetched from an API)

  const skillOptions = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "C++",
    "Java",
    "Ruby",
    "SQL",
  ];

  const jobPreferenceOptions = [
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX",
    "Sales",
    "Marketing",
    "Testing",
    "Accounting",
    "Project Manager",
    "Product Manager",
  ];

  const cultureOptions = [
    "Positive Attitude",
    "Team Work",
    "Leadership",
    "Innovation",
    "Collaboration",
    "Diversity",
  ];

  // Convert the options into the format expected by react-select

  const skillSelectOptions = skillOptions.map((skill) => ({
    label: skill,
    value: skill,
  }));

  const jobPreferenceSelectOptions = jobPreferenceOptions.map((preference) => ({
    label: preference,
    value: preference,
  }));

  const cultureSelectOptions = cultureOptions.map((culture) => ({
    label: culture,
    value: culture,
  }));

  // Handle change for multi-select dropdown

  const handleMultiSelectChange = (selectedOptions: any, field: string) => {
    if (field === "skills") setRequiredSkills(selectedOptions || []);

    if (field === "preferences") setJobPreference(selectedOptions || []);

    if (field === "culture") setCompanyCulture(selectedOptions || []);
  };

  // Handle custom tag addition

  const handleAddCustomTag = (field: string, tag: string) => {
    if (!tag) return;

    const newTag = { label: tag, value: tag };

    if (field === "skills") setRequiredSkills((prev) => [...prev, newTag]);

    if (field === "preferences") setJobPreference((prev) => [...prev, newTag]);

    if (field === "culture") setCompanyCulture((prev) => [...prev, newTag]);
  };

  // Handle form submission

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle the form data submission logic here (e.g., API call)

    console.log({
      jobTitle,

      jobDescription,

      requiredSkills,

      jobPreference,

      companyCulture,

      salaryRange,
    });
  };

  // Custom components for react-select to allow manual tag input

  const CustomTagInput = ({ selectProps }: any) => {
    const [customTag, setCustomTag] = useState("");

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        selectProps.onChange([
          ...selectProps.value,
          { label: customTag, value: customTag },
        ]);

        setCustomTag("");
      }
    };

    return (
      <div>
        <input
          type="text"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add custom tag and press Enter"
        />
      </div>
    );
  };

  return (
    <div className="post-job-container">
      <h3>Post a Job</h3>

      <Form onSubmit={handleSubmit}>
        {/* Job Title */}

        <Form.Group controlId="jobTitle">
          <Form.Label>Job Title</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </Form.Group>

        {/* Job Description */}

        <Form.Group controlId="jobDescription">
          <Form.Label>Job Description</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter job description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </Form.Group>

        {/* Required Skills (Multi-select with checkboxes and custom tags) */}

        <Form.Group controlId="requiredSkills">
          <Form.Label>Required Skills</Form.Label>

          <Select
            isMulti
            options={skillSelectOptions}
            value={requiredSkills}
            onChange={(selectedOptions) =>
              handleMultiSelectChange(selectedOptions, "skills")
            }
            components={{ DropdownIndicator: CustomTagInput }}
            placeholder="Select required skills"
          />
        </Form.Group>

        {/* Job Preference (Multi-select with checkboxes and custom tags) */}

        <Form.Group controlId="jobPreference">
          <Form.Label>Job Preference</Form.Label>

          <Select
            isMulti
            options={jobPreferenceSelectOptions}
            value={jobPreference}
            onChange={(selectedOptions) =>
              handleMultiSelectChange(selectedOptions, "preferences")
            }
            components={{ DropdownIndicator: CustomTagInput }}
            placeholder="Select job preferences"
          />
        </Form.Group>

        {/* Company Culture (Multi-select dropdown with checkboxes and custom tags) */}

        <Form.Group controlId="companyCulture">
          <Form.Label>Company Culture</Form.Label>

          <Select
            isMulti
            options={cultureSelectOptions}
            value={companyCulture}
            onChange={(selectedOptions) =>
              handleMultiSelectChange(selectedOptions, "culture")
            }
            components={{ DropdownIndicator: CustomTagInput }}
            placeholder="Select company culture"
          />
        </Form.Group>

        {/* Salary Range */}

        <Form.Group controlId="salaryRange">
          <Form.Label>Salary Range</Form.Label>

          <Row>
            <Col>
              <Form.Control
                type="number"
                placeholder="Min Salary"
                value={salaryRange.min}
                onChange={(e) =>
                  setSalaryRange({ ...salaryRange, min: +e.target.value })
                }
                required
              />
            </Col>

            <Col>
              <Form.Control
                type="number"
                placeholder="Max Salary"
                value={salaryRange.max}
                onChange={(e) =>
                  setSalaryRange({ ...salaryRange, max: +e.target.value })
                }
                required
              />
            </Col>
          </Row>
        </Form.Group>

        {/* Submit Button */}

        <Button variant="primary" type="submit">
          Post Job
        </Button>
      </Form>
    </div>
  );
};

export default PostJob;
