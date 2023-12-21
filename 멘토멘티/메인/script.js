document.addEventListener('DOMContentLoaded', function () {
    const projectsContainer = document.getElementById('project-container');
    const addProjectBtn = document.getElementById('addproject');

    addProjectBtn.addEventListener('click', function () {
        const projectBox = createProjectBox();
        projectsContainer.appendChild(projectBox);
        saveProjects();
    });

    projectsContainer.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('deleteButton')) {
            const projectBox = target.closest('.projectbox');
            projectsContainer.removeChild(projectBox);
            saveProjects();
        }
    });

    function createProjectBox() {
        const projectBox = document.createElement('div');
        projectBox.className = 'projectbox';

        const projectName = prompt('프로젝트 이름을 입력하세요:');
        const projectDescription = prompt('프로젝트 설명을 입력하세요:');
        const projectImageURL = prompt('프로젝트 이미지 URL을 입력하세요:');
        const creatorName = prompt('창작자 이름을 입력하세요:');
        const uploadDate = new Date().toLocaleDateString();

        const projectContent = `
            <h2>${projectName}</h2>
            <img class="projectimage" src="${projectImageURL}" alt="${projectName}">
            <p>${projectDescription}</p>
            <p><strong>창작자:</strong> ${creatorName}</p>
            <p><strong>업로드 날짜:</strong> ${uploadDate}</p>
        `;

        projectBox.innerHTML = projectContent;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        deleteButton.innerText = '프로젝트 삭제';
        projectBox.appendChild(deleteButton);

        return projectBox;
    }

    function saveProjects() {
        const projectBoxes = projectsContainer.querySelectorAll('.projectbox');
        const projects = [];

        projectBoxes.forEach((box) => {
            const project = {
                name: box.querySelector('h2').innerText,
                description: box.querySelector('p').innerText,
                imageURL: box.querySelector('.projectimage').src,
                creatorName: box.querySelectorAll('p')[1].innerText,
                uploadDate: box.querySelectorAll('p')[2].innerText,
            };

            projects.push(project);
        });

        // 프로젝트 배열을 JSON으로 변환하여 쿠키에 저장
        document.cookie = `projects=${JSON.stringify(projects)}`;
    }

    function loadProjects() {
        const savedProjects = getCookie('projects');

        if (savedProjects) {
            const projects = JSON.parse(savedProjects);

            projects.forEach((project) => {
                const projectBox = document.createElement('div');
                projectBox.className = 'projectbox';

                const projectContent = `
                    <h2>${project.name}</h2>
                    <img class="projectimage" src="${project.imageURL}" alt="${project.name}">
                    <p>${project.description}</p>
                    <p><strong>창작자:</strong> ${project.creatorName}</p>
                    <p><strong>업로드 날짜:</strong> ${project.uploadDate}</p>
                `;

                projectBox.innerHTML = projectContent;

                const deleteButton = document.createElement('button');
                deleteButton.className = 'deleteButton';
                deleteButton.innerText = '프로젝트 삭제';
                projectBox.appendChild(deleteButton);

                projectsContainer.appendChild(projectBox);
            });
        }
    }

    // 페이지 로드 시 프로젝트 로드
    loadProjects();

    // 쿠키 이름으로 쿠키 값을 가져오는 도우미 함수
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
});
