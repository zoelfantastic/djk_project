import APIService from './api-service';

export default class ProjectService extends APIService {
    constructor(appContext) {
        super(appContext);
    }

    getDataProject() {
        return super.getData(`project`);
    }

    getDataProjectById(id) {
        return super.getData(`project/${id}`);
    }

    updateDataProject(recordId, record) {
        return super.putData(`project/${recordId}`, record);
    }

    deleteDataProject(recordId){
        return super.deleteData(`project/${recordId}`);
    }

    addDataProject(record){
        return super.postData(`project`, record);
    }
}