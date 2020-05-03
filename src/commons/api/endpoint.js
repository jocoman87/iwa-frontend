//Developement
const root_url = 'http://localhost:3000/';
const login_url = `${ root_url }auth/login`;
const user_api = `${ root_url }users`;

const todos_api = `${ root_url }todos`;

const todo_items_api = (id) => {
  return `${ root_url }todos/${id}/items`
}

export {
  root_url,
  login_url,
  user_api,
  todos_api,
  todo_items_api
}