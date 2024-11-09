// Interfaces for the data structure
interface Resume {
    name: string;
    email: string;
    phone: string;
    profilePic: string | null;
    workExperience: WorkExperience[];
    education: Education[];
    skills: string[];
}

interface WorkExperience {
    company: string;
    position: string;
    dates: string;
    description: string;
}

interface Education {
    institution: string;
    degree: string;
    dates: string;
}

// Selecting elements from the DOM
const form = document.getElementById('resume-form') as HTMLFormElement;
const generateResumeButton = document.getElementById('generate-resume') as HTMLButtonElement;
const generatedResumeDiv = document.getElementById('generated-resume') as HTMLDivElement;
const workExperienceDiv = document.getElementById('work-experience') as HTMLDivElement;
const educationDiv = document.getElementById('education') as HTMLDivElement;
const skillsDiv = document.getElementById('skills') as HTMLDivElement;
const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;

let resume: Resume = {
    name: '',
    email: '',
    phone: '',
    profilePic: null,
    workExperience: [],
    education: [],
    skills: []
};

// Add event listeners
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
});

generateResumeButton.addEventListener('click', generateResume);

document.getElementById('add-work-exp')?.addEventListener('click', addWorkExperience);
document.getElementById('add-education')?.addEventListener('click', addEducation);
document.getElementById('add-skill')?.addEventListener('click', addSkill);

// Add work experience input fields dynamically
function addWorkExperience(event: Event) {
    event.preventDefault();
    const workExpDivItem = document.createElement('div');
    workExpDivItem.classList.add('work-exp-item');

    const companyInput = createInput('Company');
    const positionInput = createInput('Position');
    const datesInput = createInput('Dates');
    const descriptionInput = createInput('Description');

    workExpDivItem.append(companyInput, positionInput, datesInput, descriptionInput);
    workExperienceDiv.appendChild(workExpDivItem);
}

// Add education input fields dynamically
function addEducation(event: Event) {
    event.preventDefault();
    const educationDivItem = document.createElement('div');
    educationDivItem.classList.add('education-item');

    const institutionInput = createInput('Institution');
    const degreeInput = createInput('Degree');
    const datesInput = createInput('Dates');

    educationDivItem.append(institutionInput, degreeInput, datesInput);
    educationDiv.appendChild(educationDivItem);
}

// Add skills input fields dynamically
function addSkill(event: Event) {
    event.preventDefault();
    const skillInput = createInput('Skill');
    skillsDiv.appendChild(skillInput);
}

// Helper function to create an input field
function createInput(placeholder: string): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    return input;
}

// Handle profile picture upload
function handleProfilePicUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            resume.profilePic = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
}

// Add event listener to the profile picture input
profilePicInput?.addEventListener('change', handleProfilePicUpload);

// Collect form data and generate the resume
function generateResume(event: Event) {
    event.preventDefault();

    // Collect contact information
    resume.name = (document.getElementById('name') as HTMLInputElement).value;
    resume.email = (document.getElementById('email') as HTMLInputElement).value;
    resume.phone = (document.getElementById('phone') as HTMLInputElement).value;

    // Collect work experience data
    resume.workExperience = [];
    const workExpItems = workExperienceDiv.getElementsByClassName('work-exp-item');
    Array.from(workExpItems).forEach((workExpItem) => {
        const company = (workExpItem.querySelector('input[placeholder="Company"]') as HTMLInputElement).value;
        const position = (workExpItem.querySelector('input[placeholder="Position"]') as HTMLInputElement).value;
        const dates = (workExpItem.querySelector('input[placeholder="Dates"]') as HTMLInputElement).value;
        const description = (workExpItem.querySelector('input[placeholder="Description"]') as HTMLInputElement).value;

        resume.workExperience.push({ company, position, dates, description });
    });

    // Collect education data
    resume.education = [];
    const educationItems = educationDiv.getElementsByClassName('education-item');
    Array.from(educationItems).forEach((educationItem) => {
        const institution = (educationItem.querySelector('input[placeholder="Institution"]') as HTMLInputElement).value;
        const degree = (educationItem.querySelector('input[placeholder="Degree"]') as HTMLInputElement).value;
        const dates = (educationItem.querySelector('input[placeholder="Dates"]') as HTMLInputElement).value;

        resume.education.push({ institution, degree, dates });
    });

    // Collect skills data
    resume.skills = [];
    const skillItems = skillsDiv.getElementsByTagName('input');
    Array.from(skillItems).forEach((skillItem) => {
        const skill = (skillItem as HTMLInputElement).value;
        if (skill.trim()) {
            resume.skills.push(skill);
        }
    });

    // Display the generated resume
    displayResume();
}

// Display the generated resume
function displayResume() {
    let profilePicHTML = resume.profilePic ? `<img src="${resume.profilePic}" alt="Profile Picture" width="100">` : '';

    generatedResumeDiv.innerHTML = `
        <h2>Resume for ${resume.name}</h2>
        ${profilePicHTML}
        <p>Email: ${resume.email}</p>
        <p>Phone: ${resume.phone}</p>

        <h3>Work Experience</h3>
        <ul>
            ${resume.workExperience.map((work) => `
                <li>
                    <strong>${work.position}</strong> at ${work.company} (${work.dates})<br>
                    ${work.description}
                </li>
            `).join('')}
        </ul>

        <h3>Education</h3>
        <ul>
            ${resume.education.map((edu) => `
                <li>
                    <strong>${edu.degree}</strong> from ${edu.institution} (${edu.dates})
                </li>
            `).join('')}
        </ul>

        <h3>Skills</h3>
        <ul>
            ${resume.skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;
}
