import re
from datetime import date
from urllib.parse import urlparse


# Patterns used to check the submitted values.
STUDENT_ID = re.compile(r"^\d{9}$")
FULLNAME = re.compile(r"^[A-Za-z][A-Za-z .'-]{0,78}[A-Za-z.]$")
EMAIL = re.compile(r"^[A-Za-z0-9._%+-]+@usek\.edu\.lb$", re.IGNORECASE)
PHONE = re.compile(r"^\+961[\s-]?(?:[1-9]\d?)[\s-]?\d{3}[\s-]?\d{3}$")
MONTH = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")
TIME = re.compile(r"^(?:(?:08|09|1[0-7]):[0-5]\d|18:00)$")
HEXCOLOR = re.compile(r"^#[0-9A-Fa-f]{6}$")


# Allowed choices from the profile form.
MAJORS = {
    "computer",
    "electrical",
    "biomedical",
    "telecommunications"
}

GRADUATION = {"spring", "summer", "fall"}
YESNO = {"yes", "no"}

SKILLS = {
    "Programming",
    "Embedded Systems",
    "Electronics",
    "Computer Networks",
    "Telecommunications",
    "Biomedical Instrumentation",
    "Artificial Intelligence / Machine Learning",
    "Signal Processing",
}

SOFTWARE = {
    "MATLAB",
    "Simulink",
    "LabVIEW",
    "LTspice",
    "Visio",
    "SolidWorks",
}

PROJECT_AREAS = {
    "artificial intelligence",
    "web applications",
    "cybersecurity",
    "internet of things",
    "power systems",
    "renewable energy",
    "control systems",
    "medical imaging",
    "biosensors",
    "medical devices",
    "wireless communication",
    "5g / 6g networks",
    "network security",
}


# Fields that must not be empty.
REQUIRED = {
    "student_id",
    "fullname",
    "email",
    "phone",
    "birthdate",
    "major",
    "gpa",
    "credits",
    "graduation",
    "graduation_month",
    "internship_completed",
    "language",
    "software",
    "project_title",
    "project_area",
    "description",
    "team_size",
    "meeting_date",
    "meeting_time",
    "confirmation",
}


def parse_date(value):
    # Return None if the value is not a real date.
    try:
        return date.fromisoformat(value)
    except (TypeError, ValueError):
        return None


def to_number(value):
    # Convert a value to a number.
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def to_int(value):
    # Convert a value to a whole number.
    try:
        number = int(value)

        if str(number) != value.strip():
            return None

        return number

    except (TypeError, ValueError):
        return None


def validate_profile(form):
    errors = {}
    cleaned = {}

    # Read the form values and remove unnecessary spaces.
    fields = [
        "student_id", "fullname", "email", "phone", "birthdate",
        "portfolio", "gin446", "major", "gpa", "credits",
        "graduation", "graduation_month", "internship_completed",
        "language", "project_title", "project_area", "description",
        "team_size", "project_color", "meeting_date", "meeting_time",
        "confirmation", "form_version",
    ]

    for field in fields:
        cleaned[field] = form.get(field, "").strip()

    # Check that required fields have been filled in.
    for field in REQUIRED - {"software"}:
        if cleaned.get(field, "") == "":
            errors[field] = "This field is required."

    # Student ID must contain exactly nine digits.
    student_id = cleaned["student_id"]

    if student_id and not STUDENT_ID.fullmatch(student_id):
        errors["student_id"] = "Student ID must be exactly 9 digits."

    # Check the full name.
    fullname = cleaned["fullname"]

    if fullname and (
        len(fullname) < 2
        or len(fullname) > 80
        or not FULLNAME.fullmatch(fullname)
    ):
        errors["fullname"] = (
            "Use 2-80 characters with letters, spaces, "
            "apostrophes, periods or hyphens."
        )

    # Check the USEK email and normalize it to lowercase.
    email = cleaned["email"].lower()

    if email and not EMAIL.fullmatch(email):
        errors["email"] = "Use your USEK email ending in @usek.edu.lb."

    cleaned["email"] = email

    # Check the Lebanese phone number.
    phone = cleaned["phone"]

    if phone and not PHONE.fullmatch(phone):
        errors["phone"] = (
            "Enter a Lebanese phone number beginning with +961, "
            "e.g. +961 70 123456."
        )

    # Date of birth must be real and not in the future.
    birthdate = cleaned["birthdate"]

    if birthdate:
        birth_day = parse_date(birthdate)

        if birth_day is None:
            errors["birthdate"] = "Enter a valid date of birth."

        elif birth_day > date.today():
            errors["birthdate"] = "Date of birth cannot be in the future."

        else:
            today = date.today()
            age = today.year - birth_day.year

            if (today.month, today.day) < (
                birth_day.month, birth_day.day
            ):
                age -= 1

            if age < 15 or age > 100:
                errors["birthdate"] = "Age must be between 15 and 100."

    # GitHub is optional, but if provided it must be a GitHub URL.
    portfolio = cleaned["portfolio"]

    if portfolio:
        parsed = urlparse(portfolio)

        if (
            parsed.scheme != "https"
            or parsed.netloc.lower() not in {
                "github.com", "www.github.com"
            }
            or not parsed.path.strip("/")
        ):
            errors["portfolio"] = (
                "Use a GitHub URL, e.g. https://github.com/username."
            )

    # The GIN446 website is optional, but must use HTTPS.
    gin446 = cleaned["gin446"]

    if gin446:
        parsed = urlparse(gin446)

        if parsed.scheme != "https" or not parsed.netloc:
            errors["gin446"] = "Enter a valid HTTPS URL."

    # Major must be one of the allowed options.
    major = cleaned["major"].lower()

    if major and major not in MAJORS:
        errors["major"] = "Choose a valid engineering major."

    cleaned["major"] = major

    # GPA must be a number between 40 and 100.
    gpa = cleaned["gpa"]

    if gpa:
        number = to_number(gpa)

        if number is None or not (40 <= number <= 100):
            errors["gpa"] = "GPA must be a number between 40 and 100."

    # Credits must be a whole number between 0 and 148.
    credits = cleaned["credits"]

    if credits:
        number = to_int(credits)

        if number is None or number < 0 or number > 148:
            errors["credits"] = (
                "Credits must be a whole number between 0 and 148."
            )

    # Graduation term must be Spring, Summer or Fall.
    graduation = cleaned["graduation"].lower()

    if graduation and graduation not in GRADUATION:
        errors["graduation"] = "Choose Spring, Summer or Fall."

    cleaned["graduation"] = graduation

    # Graduation month must use the YYYY-MM format.
    graduation_month = cleaned["graduation_month"]

    if graduation_month and not MONTH.fullmatch(graduation_month):
        errors["graduation_month"] = (
            "Use a valid graduation month and year."
        )

    # Internship must be Yes or No.
    internship = cleaned["internship_completed"].lower()

    if internship and internship not in YESNO:
        errors["internship_completed"] = "Choose Yes or No."

    cleaned["internship_completed"] = internship

    # Keep the programming language under 40 characters.
    language = cleaned["language"]

    if language and len(language) >= 40:
        errors["language"] = (
            "Keep the programming language under 40 characters."
        )

    # Validate every selected skill.
    skills = form.getlist("skills")

    unknown_skills = [
        skill for skill in skills if skill not in SKILLS
    ]

    if unknown_skills:
        errors["skills"] = "Choose only skills listed in the form."

    cleaned["skills"] = [
        skill for skill in skills if skill in SKILLS
    ]

    # Validate the selected software.
    software = form.getlist("software")

    unknown_software = [
        item for item in software if item not in SOFTWARE
    ]

    if unknown_software:
        errors["software"] = "Choose only software listed in the form."

    cleaned["software"] = [
        item for item in software if item in SOFTWARE
    ]

    if not software:
        errors["software"] = (
            "Select at least one engineering software option."
        )

    # Project title must not exceed 120 characters.
    project_title = cleaned["project_title"]

    if project_title and len(project_title) > 120:
        errors["project_title"] = (
            "Project title must be 120 characters or fewer."
        )

    # Project area must match one of the available options.
    project_area = cleaned["project_area"]

    if project_area and project_area.casefold() not in PROJECT_AREAS:
        errors["project_area"] = "Choose a valid project area."

    # Project description must not exceed 1000 characters.
    description = cleaned["description"]

    if len(description) > 1000:
        errors["description"] = (
            "Description must be 1000 characters or fewer."
        )

    # Team size must be a whole number from 1 to 4.
    team_size = cleaned["team_size"]

    if team_size:
        number = to_int(team_size)

        if number is None or number < 1 or number > 4:
            errors["team_size"] = (
                "Team size must be a whole number from 1 to 4."
            )

    # Check the dashboard color.
    project_color = cleaned["project_color"]

    if project_color and not HEXCOLOR.fullmatch(project_color):
        errors["project_color"] = (
            "Use a colour in the format #336699."
        )

    if not project_color:
        project_color = "#336699"

    cleaned["project_color"] = project_color

    # Meeting date must be a real date.
    meeting_date = cleaned["meeting_date"]

    if meeting_date and parse_date(meeting_date) is None:
        errors["meeting_date"] = "Enter a valid meeting date."

    # Meeting time must be between 08:00 and 18:00.
    meeting_time = cleaned["meeting_time"]

    if meeting_time and not TIME.fullmatch(meeting_time):
        errors["meeting_time"] = (
            "Choose a meeting time between 08:00 and 18:00."
        )

    # The confirmation checkbox must be checked.
    if cleaned["confirmation"] != "yes":
        errors["confirmation"] = (
            "You must confirm that the information is accurate."
        )

    return errors, cleaned