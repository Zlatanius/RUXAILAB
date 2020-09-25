export default {
  state: {
    reports: null,
  },
  getters: {
    reports(state){
      return state.reports
    },
  },
  mutations: {
    setReports(state, payload) {
      state.reports = payload;
    }
  },
  actions: {
    createReport({ dispatch }, payload) {
      payload = Object.assign(payload, { collection: "reports" });
      let docRef = dispatch("createObject", payload)
        .then((doc) => {
          return doc.id;
        })
        .catch((err) => {
          console.error("Error to create report ", err);
        });
      return docRef;
    },
    deleteReport({ dispatch }, payload) {
      payload = Object.assign(payload, { collection: "reports" });
      dispatch("deleteObject", payload).catch((err) => {
        console.error("Error ", err);
      });
    },
    async getReports({ dispatch, commit }, payload) {
      payload = Object.assign(payload, { collection: "reports" });
      commit("setLoading",true)
      let reps = await dispatch("getObject", payload);
      commit("setReports", reps);
      commit("setLoading",false)
    },
    pushLog({ dispatch }, payload) {
      payload = Object.assign(payload, {
        collection: "reports",
        param: "reports",
      });

      dispatch("pushObject", payload).catch((err) => {
        console.error("Error pushing log ", err);
      });
    },
    updateLog({ dispatch }, payload) {
      payload = Object.assign(payload, {
        collection: "reports",
        field: "reports",
        param: "log",
        identifier: "uid",
      });
      dispatch("updateArrayElement", payload).catch((err) => {
        console.error("Error updating element", err);
      });
    },
    updateTestReport({ dispatch }, payload) {
      payload = Object.assign(payload, { collection: "reports" });
      dispatch("updateObject", payload).catch(() => {
        console.error("Error to update");
      });
    },
    removeReport({ dispatch }, payload) {
      payload = Object.assign(payload, {collection: "reports"});
      dispatch("removeObject", payload)
      .catch((err) => {
        console.error(err);
      })
    }
  },
};
