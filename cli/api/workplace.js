const axios = require("axios");
const keytar = require("keytar");
const { getUser } = require('./auth');
const { apiSuccess, apiError } = require('../ui/api');
const { addWorkplaceSuccess } = require('../ui/workplace');
const { getProfile } = require('./profile');

const addWorkplace = async (name) => {
  const user = await getUser();
  const token = await keytar.getPassword("doocli", "token");


  if(user) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    const newWorkplace = {
      workplaceName: name,
      collections: [],
      favorites: []
    }

    const body = JSON.stringify(newWorkplace);
    try {
      const res = await axios.post(
        `http://localhost:4000/api/workplace/${user._id}`,
        body,
        config
      );
  
      addWorkplaceSuccess(`New workplace added: ${res.data.createdWorkplace.workplaceName}!`)
    } catch (error) {
      if (error) apiError('Sorry, something went wrong.');
    }
  };
  
}

const getWorkplaces = async () => {
  const user = await getUser();
  const workplacesNames = user.workplacesIds.map(wp => wp.name)
  return workplacesNames;
}

const getWorkplace = async () => {
  const profile = await getProfile();
  const token = await keytar.getPassword("doocli", "token");
  const workplaceId = profile.defaults.workplace;
  
  if(profile && workplaceId) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.get(
        `http://localhost:4000/api/workplace/${workplaceId}`,
        config
      );

      return res.data.workplaceName;
    } catch (error) {
      if (error) apiError('Sorry, something went wrong.');
    }
  }
}

const setWorkplace = async (name) => {
  const user = await getUser();
  const token = await keytar.getPassword("doocli", "token");
  const workplace = user.workplacesIds.filter(wp => wp.name === name);

  if(user && workplace) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    const id = workplace[0].workplaceId;
    const profileId = user.profileId;
    try {
      const res = await axios.get(
        `http://localhost:4000/api/workplace/${id}`,
        config
      );

      // console.log(res.data);
      await axios.patch(
        `http://localhost:4000/api/user/profile/${profileId}`,
        { defaults: { workplace: res.data._id } },
        config,
      );
        
      console.log("workplace added w success");
    } catch (error) {
      if (error) apiError('Sorry, something went wrong.');
    }
  }
}

// update workplace
const updateWorkplace = async (name, newName) => {
  const user = await getUser();
  const token = await keytar.getPassword("doocli", "token");
  const workplace = user.workplacesIds.filter(wp => wp.name === name);

  if(user && workplace) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    const id = workplace[0].workplaceId;
    try {

      // console.log(res.data);
      await axios.patch(
        `http://localhost:4000/api/workplace/${id}`,
        { workplaceName: newName },
        config,
      );
        
      console.log("workplace edited w success");
    } catch (error) {
      console.log(error);
      if (error) apiError('Sorry, something went wrong.');
    }
  }
}


// delete workplace
const deleteWorkplace = async (name) => {
  const user = await getUser();
  const token = await keytar.getPassword("doocli", "token");
  const workplace = user.workplacesIds.filter(wp => wp.name === name);

  if(user && workplace) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    const id = workplace[0].workplaceId;
    
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/workplace/${id}`,
        config
      );
        
      console.log("workplace deleted w success");
    } catch (error) {
      if (error) apiError('Sorry, something went wrong.');
    }
  }
}

module.exports = { getWorkplaces, getWorkplace, addWorkplace, setWorkplace, deleteWorkplace, updateWorkplace };