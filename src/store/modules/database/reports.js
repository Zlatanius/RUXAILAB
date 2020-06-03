export default {
    state:{
        reports: null
    },
    getters:{

    },
    mutations:{
        setReports(state,payload){
            state.reports = payload
        }
    },
    actions:{
        createReport({dispatch},payload){
            payload = Object.assign(payload, {collection: "reports"})
            let docRef = dispatch("createObject",payload)
            .then((doc)=>{
                return doc.id
            })
            .catch((err)=>{
                console.error("Error to create report ", err)
            })
            return docRef
        },
    }
}