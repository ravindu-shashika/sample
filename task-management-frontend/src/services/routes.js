import {
  Task,
  Profile,
} from '../views';

const componentsList = [
  {
    name: 'Task',
    value: Task,
    route: 'Task',
  },
  {
    name: 'Profile',
    value: Profile,
    route: 'Profile',
  },
  // Add more components as needed
];

class Routes {
  async routes() {
    let routesList = [];

    // await Promise.all(
    //   componentsList.map(async (component) => {
    //     routesList.push({
    //       name: component.name,
    //       pathURL: component.route,
    //       componentName: component.value,
    //     });
    //   })
    // );

    return routesList;
  }
}

export default new Routes();
