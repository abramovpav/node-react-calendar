class User {
    constructor({ username, firstName, lastName }) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    isAuthenticated() {
        return !!this.username;
    }
}

const initialState = {
    loaded: false,
    user: new User({})
};

export default (state=initialState, action) => {
    switch(action.type) {
        case 'LOAD_USER': {
            const user = new User(action.payload);
            return {
                ...state,
                loaded: true,
                user: user
            };
        }
        case 'LOAD_USER_FAILED': {
            return {
                ...state,
                loaded: true,
                user: new User({})
            };
        }
        case 'LOGIN_SUCCESS': {
            const user = new User(action.payload);
            return {
                ...state,
                user
            };
        }
        case 'LOGIN_FAILED': {
            return {
                ...state,
                user: new User({})
            };
        }
        case 'LOGOUT': {
            return {
                ...state,
                user: new User({})
            };
        }
        default:
            return state;
    }
}