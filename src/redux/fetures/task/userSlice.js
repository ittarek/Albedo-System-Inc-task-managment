import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "./../../../firebase/firebase.config";


const initialState = {
  name: "",
  email: "",
  photoURL:"",
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ email, password, name }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    console.log(data);

    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    return {
      email: data?.user?.email,
      name: data?.user?.displayName,
    };
  }
);

//   User signIn
export const signIn = createAsyncThunk(
  "userSlice/signIn",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return {
      email: data?.user?.email,
      name: data?.user?.displayName,
    };
  }
);
//   google login
const googleProvider = new GoogleAuthProvider();
export const googleLogin = createAsyncThunk(
  "userSlice/googleLogin",
  async () => {
    const data = await signInWithPopup(auth, googleProvider);
    console.log("google data",data);


    const savedUser = {
      email: data?.email,
      name: data?.displayName,
      photoURL: data?.photoURL,
    };
    fetch("https://task-management-serber.vercel.app/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(savedUser),
    })
      .then((res) => res.json())
      .then(() => {

  
      });
    return {
      email: data?.email,
      name: data?.displayName,
      photoURL: data?.photoURL,
    };
  }
);

export const handleLogOut = createAsyncThunk("userSlice/handleLogOut", () => {
  signOut(auth);
});

// for create user in firebase
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.email = payload.email;
      state.name = payload.name;
      state.photoURL = payload.photoURL
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    logout: state => {
      state.name = "";

      state.email = "";
    },
  },

  extraReducers: builder => {
   builder.addCase(signIn.pending, (state) => {
    state.isLoading = true;

    state.isError = false;
    state.email = "";
    state.name = "";
    state.photoURL = "";
    state.error = "";
    })

    builder.addCase(signIn.fulfilled, (state,{payload}) => {
      state.isLoading = false;

      state.isError = false;
      state.email = payload.email;
      state.name = payload.name;
      state.photoURL = payload.photoURL;
      state.error = "";
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;

      state.isError = false;
      state.email = "";
      state.name = "";
      state.photoURL = "";
      state.error = action.error.message;
    });



    builder.addCase(createUser.pending, state => {
      state.isLoading = true;

      state.isError = false;
      state.email = "";
      state.name = "";
      state.photoURL = "";
      state.error = "";
    });

    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      state.isError = false;
      state.email = payload.email;
      state.name = payload.name;
      state.photoURL = payload.photoURL;
      state.error = "";
    });

    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;

      state.isError = false;
      state.email = "";
      state.name = "";
      state.photoURL = "";
      state.error = action.error.message;
    });
  },
});

export const { logout, setUser, toggleLoading } = userSlice.actions;

export default userSlice.reducer;
