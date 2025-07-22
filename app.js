let groups = JSON.parse(localStorage.getItem('todoGroups')) || [];

function saveGroups() {
  localStorage.setItem('todoGroups', JSON.stringify(groups));
}

function renderGroups() {
  const container = document.getElementById('groups-container');
  container.innerHTML = '';

  groups.forEach((group, groupIndex) => {
    const groupEl = document.createElement('div');
    groupEl.className = 'bg-white rounded-xl shadow p-4';

    const title = document.createElement('h2');
    title.className = 'text-lg font-semibold text-indigo-700 mb-4';
    title.innerText = group.name;
    groupEl.appendChild(title);

    // Task input area
    const taskInputDiv = document.createElement('div');
    taskInputDiv.className = 'flex flex-col sm:flex-row gap-3 mb-4';

    const taskTitleInput = document.createElement('input');
    taskTitleInput.className = 'flex-1 px-3 py-2 border rounded focus:outline-none';
    taskTitleInput.placeholder = 'Task title';

    const taskDescInput = document.createElement('input');
    taskDescInput.className = 'flex-1 px-3 py-2 border rounded focus:outline-none';
    taskDescInput.placeholder = 'Description (optional)';

    const addBtn = document.createElement('button');
    addBtn.className = 'bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700';
    addBtn.innerText = 'Add';
    addBtn.onclick = () => {
      if (!taskTitleInput.value.trim()) return;
      group.tasks.push({
        title: taskTitleInput.value.trim(),
        desc: taskDescInput.value.trim()
      });
      saveGroups();
      renderGroups();
    };

    taskInputDiv.append(taskTitleInput, taskDescInput, addBtn);
    groupEl.appendChild(taskInputDiv);

    // Task list
    group.tasks.forEach((task, taskIndex) => {
      const taskEl = document.createElement('div');
      taskEl.className = 'bg-indigo-50 px-4 py-2 rounded flex justify-between items-start mb-2';

      const taskContent = document.createElement('div');
      taskContent.innerHTML = `<p class="font-medium">${task.title}</p><p class="text-sm text-gray-600">${task.desc}</p>`;

      const delBtn = document.createElement('button');
      delBtn.innerHTML = '🗑️';
      delBtn.className = 'ml-2 text-gray-500 hover:text-red-500';
      delBtn.onclick = () => {
        group.tasks.splice(taskIndex, 1);
        saveGroups();
        renderGroups();
      };

      taskEl.append(taskContent, delBtn);
      groupEl.appendChild(taskEl);
    });

    container.appendChild(groupEl);
  });
}

function addGroup() {
  const input = document.getElementById('new-group-name');
  const name = input.value.trim();
  if (!name) return;

  groups.push({ name, tasks: [] });
  saveGroups();
  input.value = '';
  renderGroups();
}

renderGroups();
