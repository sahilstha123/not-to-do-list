let taskList = [];
let badList = [];
const handleOnsubmit = (e) => {
  const newform = new FormData(e);
  const Task = newform.get("task");
  const hour = newform.get("hour");
  const id = randomIdGenerator();

  const obj = {
    Task,
    hour,
    id,
  };
  taskList.push(obj);
  displayEntryList();
};
const displayEntryList = () => {
  const addEntrylist = document.getElementById("entryList");
  let str = ``;
  taskList.map((item, i) => {
    str += `
    <tr>
      <td>${i + 1}</td>
      <td>${item.Task}</td>
      <td>${item.hour}hr</td>
      <td class="text-end">
        <button onClick = "handleOnDelete('${item.id}')" class="btn btn-danger">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button onClick = "handleOnArrow('${item.id}')"class="btn btn-success">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </td>
    </tr>`;
  });
  addEntrylist.innerHTML = str;
  const totalhoursEntry = calculateHour(taskList);
  document.getElementById(
    "totalhrentry"
  ).innerText = `Total hours allocate = ${totalhoursEntry}`;
};

// random id generator
const randomIdGenerator = (length = 6) => {
  const str = "qwertyuiopasdfghjklzxcvbnm1234567890";
  let id = ``;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    id += str[randomIndex];
  }
  return id;
};

// delete list item

const handleOnDelete = (id) => {
  if (window.confirm("are you want to delete")) {
    taskList = taskList.filter((item) => item.id !== id);
    displayEntryList();
  }
};
// pushing into the badlist
const handleOnArrow = (id) => {
  const task = taskList.find((item) => item.id === id);
  if (task) {
    badList.push(task);
    taskList = taskList.filter((item) => item.id !== id);
    displayEntryList();
    displaybadList();
  }
};
// displaying the badlist content
const displaybadList = () => {
  const badentry = document.getElementById("badList");
  let badstr = ``;
  badList.map((item, i) => {
    badstr += `
    <tr>
      <td>${i + 1}</td>
      <td>${item.Task}</td>
      <td>${item.hour}hr</td>
      <td class="text-end">
      <button onClick = "handleOnMoveBack('${item.id}')"class="btn btn-warning">
      <i class="fa-solid fa-arrow-left"></i>
      </button>
      <button onClick = "handleOnDeleteBad('${
        item.id
      }')" class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
      </td>
    </tr>`;
  });
  badentry.innerHTML = badstr;
  const totalhourbad = calculateHour(badList);
  document.getElementById(
    "totalhrbad"
  ).innerText = `Total hours you have saved = ${totalhourbad}`;
};
// move back to entry list
const handleOnMoveBack = (id) => {
  const task = badList.find((item) => item.id === id);
  if (task) {
    badList = badList.filter((item) => item.id !== id);
    taskList.push(task);
    displayEntryList();
    displaybadList();
  }
};
// delete badlist item
const handleOnDeleteBad = (id) => {
  if (window.confirm("Are you want to delete bad items")) {
    badList = badList.filter((item) => item.id !== id);
    displaybadList();
  }
};

const calculateHour = (list) => {
  return list.reduce((total, item) => total + parseInt(item.hour), 0);
};
