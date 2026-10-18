const form = document.getElementById("profileForm");

const reviewPanel = document.getElementById("reviewPanel");
const reviewContent = document.getElementById("reviewContent");
const editButton = document.getElementById("editButton");
const confirmButton = document.getElementById("confirmButton");


// Intercept the form submission.
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate the form.
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }


    // PERSONAL INFORMATION
    const studentId = document.getElementById("student_id").value;
    const fullName = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const birthdate = document.getElementById("birthdate").value;
    const portfolio = document.getElementById("portfolio").value;
    const gin446 = document.getElementById("gin446").value;


    // ACADEMIC INFORMATION
    const major = document.getElementById("major").value;
    const gpa = document.getElementById("gpa").value;
    const credits = document.getElementById("credits").value;
    const graduationMonth =
        document.getElementById("graduation_month").value;

    const graduation = document.querySelector(
        'input[name="graduation"]:checked'
    )?.value;

    const internshipCompleted = document.querySelector(
        'input[name="internship_completed"]:checked'
    )?.value;


    // TECHNICAL BACKGROUND
    const language = document.getElementById("language").value;

    const skills = [
        ...document.querySelectorAll('input[name="skills"]:checked')
    ].map(function (checkbox) {
        return checkbox.value;
    });

    const softwareSelect = document.getElementById("software");

    const software = [
        ...softwareSelect.selectedOptions
    ].map(function (option) {
        return option.value;
    });


    // FINAL YEAR PROJECT
    const projectTitle =
        document.getElementById("project_title").value;

    const projectArea =
        document.getElementById("project_area").value;

    const description =
        document.getElementById("description").value;

    const teamSize =
        document.getElementById("team_size").value;

    const projectColor =
        document.getElementById("project_color").value;

    const meetingDate =
        document.getElementById("meeting_date").value;

    const meetingTime =
        document.getElementById("meeting_time").value;


    // CONFIRMATION AND FORM VERSION
    const confirmation =
        document.getElementById("confirmation").checked;

    const formVersion = document.querySelector(
        'input[name="form_version"]'
    ).value;


    // Clear the review panel before adding the values.
    reviewContent.textContent = "";


    // PERSONAL INFORMATION
    const personalHeading = document.createElement("h3");
    personalHeading.textContent = "PERSONAL INFORMATION";
    reviewContent.appendChild(personalHeading);

    const studentIdLine = document.createElement("p");
    studentIdLine.textContent = "Student ID: " + studentId;
    reviewContent.appendChild(studentIdLine);

    const fullNameLine = document.createElement("p");
    fullNameLine.textContent = "Full Name: " + fullName;
    reviewContent.appendChild(fullNameLine);

    const emailLine = document.createElement("p");
    emailLine.textContent = "USEK Email: " + email;
    reviewContent.appendChild(emailLine);

    const phoneLine = document.createElement("p");
    phoneLine.textContent = "Mobile Number: " + phone;
    reviewContent.appendChild(phoneLine);

    const birthdateLine = document.createElement("p");
    birthdateLine.textContent = "Date of Birth: " + birthdate;
    reviewContent.appendChild(birthdateLine);

    const portfolioLine = document.createElement("p");
    portfolioLine.textContent =
        "GitHub: " + (portfolio || "Not provided");
    reviewContent.appendChild(portfolioLine);

    const gin446Line = document.createElement("p");
    gin446Line.textContent =
        "GIN446 Website: " + (gin446 || "Not provided");
    reviewContent.appendChild(gin446Line);


    // ACADEMIC INFORMATION
    const academicHeading = document.createElement("h3");
    academicHeading.textContent = "ACADEMIC INFORMATION";
    reviewContent.appendChild(academicHeading);

    const majorLine = document.createElement("p");
    majorLine.textContent = "Engineering Major: " + major;
    reviewContent.appendChild(majorLine);

    const gpaLine = document.createElement("p");
    gpaLine.textContent = "GPA: " + gpa;
    reviewContent.appendChild(gpaLine);

    const creditsLine = document.createElement("p");
    creditsLine.textContent = "Credits Completed: " + credits;
    reviewContent.appendChild(creditsLine);

    const graduationLine = document.createElement("p");
    graduationLine.textContent =
        "Expected Graduation: " + (graduation || "Not selected");
    reviewContent.appendChild(graduationLine);

    const graduationMonthLine = document.createElement("p");
    graduationMonthLine.textContent =
        "Graduation Month and Year: " + graduationMonth;
    reviewContent.appendChild(graduationMonthLine);

    const internshipLine = document.createElement("p");
    internshipLine.textContent =
        "Engineering Internship Completed: " +
        (internshipCompleted || "Not selected");
    reviewContent.appendChild(internshipLine);


    // TECHNICAL BACKGROUND
    const technicalHeading = document.createElement("h3");
    technicalHeading.textContent = "TECHNICAL BACKGROUND";
    reviewContent.appendChild(technicalHeading);

    const skillsLine = document.createElement("p");
    skillsLine.textContent =
        "Skills: " +
        (skills.length > 0 ? skills.join(", ") : "None selected");
    reviewContent.appendChild(skillsLine);

    const languageLine = document.createElement("p");
    languageLine.textContent =
        "Primary Programming Language: " + language;
    reviewContent.appendChild(languageLine);

    const softwareLine = document.createElement("p");
    softwareLine.textContent =
        "Engineering Software Used: " +
        (software.length > 0 ? software.join(", ") : "None selected");
    reviewContent.appendChild(softwareLine);


    // FINAL YEAR PROJECT
    const projectHeading = document.createElement("h3");
    projectHeading.textContent = "FINAL YEAR PROJECT";
    reviewContent.appendChild(projectHeading);

    const projectTitleLine = document.createElement("p");
    projectTitleLine.textContent =
        "Proposed Project Title: " + projectTitle;
    reviewContent.appendChild(projectTitleLine);

    const projectAreaLine = document.createElement("p");
    projectAreaLine.textContent =
        "Preferred Project Area: " + projectArea;
    reviewContent.appendChild(projectAreaLine);

    const descriptionLine = document.createElement("p");
    descriptionLine.textContent =
        "Project Description: " + description;
    reviewContent.appendChild(descriptionLine);

    const teamSizeLine = document.createElement("p");
    teamSizeLine.textContent =
        "Preferred Team Size: " + teamSize;
    reviewContent.appendChild(teamSizeLine);

    const projectColorLine = document.createElement("p");
    projectColorLine.textContent =
        "Project Dashboard Color: " + projectColor;
    reviewContent.appendChild(projectColorLine);

    const meetingDateLine = document.createElement("p");
    meetingDateLine.textContent =
        "Preferred Meeting Date: " + (meetingDate || "Not provided");
    reviewContent.appendChild(meetingDateLine);

    const meetingTimeLine = document.createElement("p");
    meetingTimeLine.textContent =
        "Preferred Meeting Time: " + (meetingTime || "Not provided");
    reviewContent.appendChild(meetingTimeLine);


    // CONFIRMATION AND FORM VERSION
    const confirmationHeading = document.createElement("h3");
    confirmationHeading.textContent = "CONFIRMATION";
    reviewContent.appendChild(confirmationHeading);

    const confirmationLine = document.createElement("p");
    confirmationLine.textContent =
        "Information Confirmed: " + (confirmation ? "Yes" : "No");
    reviewContent.appendChild(confirmationLine);

    const formVersionLine = document.createElement("p");
    formVersionLine.textContent = "Form Version: " + formVersion;
    reviewContent.appendChild(formVersionLine);


    // Hide the form and display the review panel.
    form.classList.add("hidden");
    reviewPanel.classList.remove("hidden");

    // Scroll to the review panel.
    reviewPanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// EDIT BUTTON
editButton.addEventListener("click", function () {
    reviewPanel.classList.add("hidden");
    form.classList.remove("hidden");

    // Return to the form without losing the answers.
    form.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// CONFIRM AND SUBMIT BUTTON
confirmButton.addEventListener("click", function () {
    // Send the form to Flask without triggering the submit listener again.
    form.submit();
});