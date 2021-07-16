
const initialState = {
  users: [],
  loggedUser: {email: '', password: '', gender: '', DOB: ''},
  userLoggedIn: false,
  subscription: false
};
export const authReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'SIGNUP':
      const {id, data} = action.payload;
      let found = false;
      state.users.forEach(i => {
        if (i.email === data.email) {
          found = true;
        }
      });
      if (found) {
        alert('User already exists. Try forget password or use new Email ');
        return state;
      } else {
        return {
          ...state,
          users: [
            ...state.users,
            {
              id: id,
              ...data,
            },
          ],
        };
      }

    case 'SIGNIN':
      
        return {
          ...state,
          loggedUser: action.payload,
          userLoggedIn: true,
        }

    case "SIGNOUT":
      if(state.userLoggedIn){
        return{
          ...state,
          loggedUser: {email: '', password: '', gender: '', DOB: ''},
          userLoggedIn: false
        }
      }
      else{
        alert("No user logged in .")
        return state;
      }
      case "SUBSCRIBE":
        return{
          ...state,
          subscription: true

        }

        case "UNSUBSCRIBE":
        return{
          ...state,
          subscription: false
          
        }
      

    default:
      return state;
  }
};
