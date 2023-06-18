interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  phone: string;
  firstName: string;
  lastName: string;
}

function mapUserToDB(user: User){
  return {
    email: user.email,
    password: user.password,
    username: user.username,
    phone: user.phone,
    first_name: user.firstName,
    last_name: user.lastName
  }
}

export {
  User,
  mapUserToDB
}