let taskList = [];
const handleOnsubmit = (e) => {
  const newform = new FormData(e);
  const Task = newform.get("task");
  const hour = newform.get("hour");

  const obj = {
    Task,
    hour,
  };
  taskList.push(obj);
  displayEntryList();
};
const displayEntryList = () => {
  console.log(taskList);
  const addEntrylist = document.getElementById("entryList");
  let str = ``;
  taskList.map((item, i) => {
    str += `
    <tr>
      <td>${i + 1}</td>
      <td>${item.Task}</td>
      <td>${item.hour}hr</td>
      <td class="text-end">
        <button class="btn btn-danger">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn btn-success">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </td>
    </tr>`
  });
  addEntrylist.innerHTML = str;
};
