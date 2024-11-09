var _a, _b, _c;
// Selecting elements from the DOM
var form = document.getElementById('resume-form');
var generateResumeButton = document.getElementById('generate-resume');
var generatedResumeDiv = document.getElementById('generated-resume');
var workExperienceDiv = document.getElementById('work-experience');
var educationDiv = document.getElementById('education');
var skillsDiv = document.getElementById('skills');
var profilePicInput = document.getElementById('profile-pic');
var resume = {
    name: '',
    email: '',
    phone: '',
    profilePic: null,
    workExperience: [],
    education: [],
    skills: []
};
// Add event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
});
generateResumeButton.addEventListener('click', generateResume);
(_a = document.getElementById('add-work-exp')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addWorkExperience);
(_b = document.getElementById('add-education')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', addEducation);
(_c = document.getElementById('add-skill')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', addSkill);
// Add work experience input fields dynamically
function addWorkExperience(event) {
    event.preventDefault();
    var workExpDivItem = document.createElement('div');
    workExpDivItem.classList.add('work-exp-item');
    var companyInput = createInput('Company');
    var positionInput = createInput('Position');
    var datesInput = createInput('Dates');
    var descriptionInput = createInput('Description');
    workExpDivItem.append(companyInput, positionInput, datesInput, descriptionInput);
    workExperienceDiv.appendChild(workExpDivItem);
}
// Add education input fields dynamically
function addEducation(event) {
    event.preventDefault();
    var educationDivItem = document.createElement('div');
    educationDivItem.classList.add('education-item');
    var institutionInput = createInput('Institution');
    var degreeInput = createInput('Degree');
    var datesInput = createInput('Dates');
    educationDivItem.append(institutionInput, degreeInput, datesInput);
    educationDiv.appendChild(educationDivItem);
}
// Add skills input fields dynamically
function addSkill(event) {
    event.preventDefault();
    var skillInput = createInput('Skill');
    skillsDiv.appendChild(skillInput);
}
// Helper function to create an input field
function createInput(placeholder) {
    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    return input;
}
// Handle profile picture upload
function handleProfilePicUpload(event) {
    var _a;
    var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            resume.profilePic = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(file);
    }
}
// Add event listener to the profile picture input
profilePicInput === null || profilePicInput === void 0 ? void 0 : profilePicInput.addEventListener('change', handleProfilePicUpload);
// Collect form data and generate the resume
function generateResume(event) {
    event.preventDefault();
    // Collect contact information
    resume.name = document.getElementById('name').value;
    resume.email = document.getElementById('email').value;
    resume.phone = document.getElementById('phone').value;
    // Collect work experience data
    resume.workExperience = [];
    var workExpItems = workExperienceDiv.getElementsByClassName('work-exp-item');
    Array.from(workExpItems).forEach(function (workExpItem) {
        var company = workExpItem.querySelector('input[placeholder="Company"]').value;
        var position = workExpItem.querySelector('input[placeholder="Position"]').value;
        var dates = workExpItem.querySelector('input[placeholder="Dates"]').value;
        var description = workExpItem.querySelector('input[placeholder="Description"]').value;
        resume.workExperience.push({ company: company, position: position, dates: dates, description: description });
    });
    // Collect education data
    resume.education = [];
    var educationItems = educationDiv.getElementsByClassName('education-item');
    Array.from(educationItems).forEach(function (educationItem) {
        var institution = educationItem.querySelector('input[placeholder="Institution"]').value;
        var degree = educationItem.querySelector('input[placeholder="Degree"]').value;
        var dates = educationItem.querySelector('input[placeholder="Dates"]').value;
        resume.education.push({ institution: institution, degree: degree, dates: dates });
    });
    // Collect skills data
    resume.skills = [];
    var skillItems = skillsDiv.getElementsByTagName('input');
    Array.from(skillItems).forEach(function (skillItem) {
        var skill = skillItem.value;
        if (skill.trim()) {
            resume.skills.push(skill);
        }
    });
    // Display the generated resume
    displayResume();
}
// Display the generated resume
function displayResume() {
    var profilePicHTML = resume.profilePic ? "<img src=\"".concat(resume.profilePic, "\" alt=\"Profile Picture\" width=\"100\">") : '';
    generatedResumeDiv.innerHTML = "\n        <h2>Resume for ".concat(resume.name, "</h2>\n        ").concat(profilePicHTML, "\n        <p>Email: ").concat(resume.email, "</p>\n        <p>Phone: ").concat(resume.phone, "</p>\n\n        <h3>Work Experience</h3>\n        <ul>\n            ").concat(resume.workExperience.map(function (work) { return "\n                <li>\n                    <strong>".concat(work.position, "</strong> at ").concat(work.company, " (").concat(work.dates, ")<br>\n                    ").concat(work.description, "\n                </li>\n            "); }).join(''), "\n        </ul>\n\n        <h3>Education</h3>\n        <ul>\n            ").concat(resume.education.map(function (edu) { return "\n                <li>\n                    <strong>".concat(edu.degree, "</strong> from ").concat(edu.institution, " (").concat(edu.dates, ")\n                </li>\n            "); }).join(''), "\n        </ul>\n\n        <h3>Skills</h3>\n        <ul>\n            ").concat(resume.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n        </ul>\n    ");
}
