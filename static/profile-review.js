
const profileForm = document.getElementById("profileForm");
const reviewPanel = document.getElementById("profileReview");
const reviewContent = document.getElementById("reviewContent");
const editButton = document.getElementById("editProfile");
const confirmButton = document.getElementById("confirmProfile");

// Organize the form fields into sections for the review panel.
const reviewSections = [
    {
        title: "Personal Information",
        fields: [
            { name: "student_id", label: "Student ID" },
            { name: "fullname", label: "Full Name" },
            { name: "email", label: "USEK Email" },
            { name: "phone", label: "Mobile Number" },
            { name: "birthdate", label: "Date of Birth" },
            { name: "portfolio", label: "GitHub" },
            { name: "gin446", label: "GIN446 Website" }
        ]
    },
    {
        title: "Academic Information",
        fields: [
            { name: "major", label: "Engineering Major" },
            { name: "gpa", label: "GPA" },
            { name: "credits", label: "Credits Completed" },
            { name: "graduation", label: "Expected Graduation" },
            { name: "graduation_month", label: "Graduation Month and Year" },
            { name: "internship_completed", label: "Internship Completed" }
        ]
    },
    {
        title: "Technical Background",
        fields: [
            { name: "skills", label: "Technical Skills" },
            { name: "language", label: "Programming Language" },
            { name: "software", label: "Engineering Software" }
        ]
    },
    {
        title: "Final Year Project",
        fields: [
            { name: "project_title", label: "Project Title" },
            { name: "project_area", label: "Project Area" },
            { name: "description", label: "Project Description" },
            { name: "team_size", label: "Preferred Team Size" },
            { name: "project_color", label: "Project Dashboard Color" },
            { name: "meeting_date", label: "Preferred Meeting Date" },
            { name: "meeting_time", label: "Preferred Meeting Time" }
        ]
    },
    {
        title: "Submission Details",
        fields: [
            { name: "confirmation", label: "Information Confirmation" },
            { name: "form_version", label: "Form Version" }
        ]
    }
];

// Stop the normal submission so the review can happen first.
profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Check all the validation rules already defined in the HTML.
    if (!profileForm.checkValidity()) {
        profileForm.reportValidity();
        return;
    }

    showReview();
});


// Read the value of a field, including groups of controls.
function getFieldValue(fieldName) {
    const fields = Array.from(profileForm.elements).filter(
        function (field) {
            return field.name === fieldName;
        }
    );

    if (fields.length === 0) {
        return "Not provided";
    }

    const firstField = fields[0];

    // Return the selected radio button.
    if (firstField.type === "radio") {
        const selectedField = fields.find(function (field) {
            return field.checked;
        });

        return selectedField
            ? selectedField.value
            : "Not selected";
    }

    // Collect all selected checkboxes.
    if (firstField.type === "checkbox") {
        const selectedFields = fields.filter(function (field) {
            return field.checked;
        });

        if (fieldName === "confirmation") {
            return selectedFields.length > 0
                ? "Confirmed"
                : "Not confirmed";
        }

        return selectedFields.length > 0
            ? selectedFields.map(function (field) {
                return field.value;
            }).join(", ")
            : "None selected";
    }

    // Collect every selected option from a multiple-select list.
    if (firstField.tagName === "SELECT" && firstField.multiple) {
        const selectedOptions = Array.from(
            firstField.selectedOptions
        );

        return selectedOptions.length > 0
            ? selectedOptions.map(function (option) {
                return option.textContent.trim();
            }).join(", ")
            : "None selected";
    }

    // Use the visible label for a normal dropdown.
    if (firstField.tagName === "SELECT") {
        const selectedOption = firstField.selectedOptions[0];

        return selectedOption
            ? selectedOption.textContent.trim()
            : "Not selected";
    }

    // Read text, numbers, dates, colors, and hidden inputs.
    return firstField.value !== ""
        ? firstField.value
        : "Not provided";
}


// Build and display the read-only review panel.
function showReview() {
    reviewContent.textContent = "";

    reviewSections.forEach(function (section) {
        const sectionBox = document.createElement("section");
        sectionBox.className = "review-section";

        const heading = document.createElement("h3");
        heading.textContent = section.title;
        sectionBox.appendChild(heading);

        section.fields.forEach(function (field) {
            const row = document.createElement("div");
            row.className = "review-field";

            const label = document.createElement("strong");
            label.textContent = field.label;

            const value = document.createElement("p");
            value.textContent = getFieldValue(field.name);

            row.appendChild(label);
            row.appendChild(value);
            sectionBox.appendChild(row);
        });

        reviewContent.appendChild(sectionBox);
    });

    // Hide the original form without removing its values.
    profileForm.style.display = "none";

    // Show the review panel.
    reviewPanel.style.display = "block";

    confirmButton.focus();
}


// Return to the original form so answers can be edited.
editButton.addEventListener("click", function () {
    reviewPanel.style.display = "none";
    profileForm.style.display = "";

    const firstField = profileForm.querySelector(
        'input:not([type="hidden"]), select, textarea'
    );

    if (firstField) {
        firstField.focus();
    }
});


// Submit to the existing Flask route after confirmation.
confirmButton.addEventListener("click", function () {
    profileForm.submit();
});
