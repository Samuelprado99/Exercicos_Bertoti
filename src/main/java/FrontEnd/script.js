const listButton = document.getElementById("list-button");
const createButton = document.getElementById("create-button");
const editButton = document.getElementById("edit-button");
const deleteButton = document.getElementById("delete-button");

const listTab = document.getElementById("list-tab");
const createTab = document.getElementById("create-tab");
const editTab = document.getElementById("edit-tab");
const deleteTab = document.getElementById("delete-tab");

const listContent = document.getElementById("list-content");
const createNome = document.getElementById("create-nome");
const createMascote = document.getElementById("create-mascote");
const createFundacao = document.getElementById("create-fundacao");
const createSubmit = document.getElementById("create-submit");

const editSelect = document.getElementById("edit-select");
const editNome = document.getElementById("edit-nome");
const editMascote = document.getElementById("edit-mascote");
const editFundacao = document.getElementById("edit-fundacao");
const editSubmit = document.getElementById("edit-submit");

const deleteSelect = document.getElementById("delete-select");
const deleteSubmit = document.getElementById("delete-submit");

let colleges = [];

function closeAllTabs() {
    listTab.classList.remove("active");
    createTab.classList.remove("active");
    editTab.classList.remove("active");
    deleteTab.classList.remove("active");
}

function disableCurrentButton(button) {
    listButton.disabled = false;
    createButton.disabled = false;
    editButton.disabled = false;
    deleteButton.disabled = false;
    button.disabled = true;
}

async function listColleges() {
    try {
        const response = await fetch("http://localhost:8080/colleges");
        colleges = await response.json();
        listContent.innerHTML = "";
        colleges.forEach((college) => {
            const item = document.createElement("div");
            item.classList.add("college-item");

            const info = document.createElement("div");
            info.classList.add("college-info");
            info.innerHTML = `
        <strong>${college.nome}</strong>
        <span>Mascote: ${college.mascote}</span>
        <span>Fundação: ${college.fundacao}</span>
      `;

            item.appendChild(info);
            listContent.appendChild(item);
        });
    } catch (error) {
        console.error("Erro ao buscar colleges:", error);
    }
}

listButton.addEventListener("click", async function () {
    closeAllTabs();
    listTab.classList.add("active");
    disableCurrentButton(listButton);
    await listColleges();
});

createButton.addEventListener("click", function () {
    closeAllTabs();
    createTab.classList.add("active");
    disableCurrentButton(createButton);
});

createSubmit.addEventListener("click", async function () {
    const newCollege = {
        nome: createNome.value,
        mascote: createMascote.value,
        fundacao: createFundacao.value,
    };

    try {
        const response = await fetch("http://localhost:8080/colleges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCollege),
        });
        const data = await response.json();
        colleges.push(data);
        createNome.value = "";
        createMascote.value = "";
        createFundacao.value = "";
        alert("College criado com sucesso!");
    } catch (error) {
        console.error("Erro ao criar college:", error);
    }
});

editButton.addEventListener("click", async function () {
    closeAllTabs();
    editTab.classList.add("active");
    disableCurrentButton(editButton);
    editSelect.innerHTML = "";
    await listColleges();
    colleges.forEach((college) => {
        const option = document.createElement("option");
        option.value = college.id;
        option.textContent = `ID: ${college.id}, Nome: ${college.nome}`;
        editSelect.appendChild(option);
    });
});

editSubmit.addEventListener("click", async function () {
    const selectedCollegeId = editSelect.value;
    const updatedCollege = {
        nome: editNome.value,
        mascote: editMascote.value,
        fundacao: editFundacao.value,
    };

    try {
        const response = await fetch(
            `http://localhost:8080/colleges/${selectedCollegeId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCollege),
            }
        );
        const data = await response.json();
        const index = colleges.findIndex((college) => college.id == selectedCollegeId);
        colleges[index] = data;
        alert("College editado com sucesso!");
    } catch (error) {
        console.error("Erro ao editar college:", error);
    }
});

deleteButton.addEventListener("click", async function () {
    closeAllTabs();
    deleteTab.classList.add("active");
    disableCurrentButton(deleteButton);
    deleteSelect.innerHTML = "";
    await listColleges();
    colleges.forEach((college) => {
        const option = document.createElement("option");
        option.value = college.id;
        option.textContent = `ID: ${college.id}, Nome: ${college.nome}`;
        deleteSelect.appendChild(option);
    });
});

deleteSubmit.addEventListener("click", async function () {
    const selectedCollegeId = deleteSelect.value;

    try {
        await fetch(`http://localhost:8080/colleges/${selectedCollegeId}`, {
            method: "DELETE",
        });
        colleges = colleges.filter((college) => college.id !== selectedCollegeId);
        alert("College deletado com sucesso!");
    } catch (error) {
        console.error("Erro ao deletar college:", error);
    }
});
