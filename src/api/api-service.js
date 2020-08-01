import axios from "axios";


export default class APIService {
    constructor(appContext) {
        this.appContext = appContext;
    }

    getBaseURL = () => this.appContext.appConfig.backendUrl;

    getData(apiPath) {
        apiPath = this.getBaseURL().concat(apiPath);
        return axios
            .get(apiPath)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                    throw error;
               });
    }

    postData(apiPath, data) {
        apiPath = this.getBaseURL().concat(apiPath);

        return axios
            .post(apiPath, data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

    putData(apiPath, data) {
        apiPath = this.getBaseURL().concat(apiPath);

        return axios.put(apiPath, data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
                    
            });
    }

    deleteData(apiPath){
        apiPath = this.getBaseURL().concat(apiPath);

        return axios
            .delete(apiPath)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
                    
            });
    }
}