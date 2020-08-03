import APIService from './api-service';

export default class PipelineService extends APIService {
    constructor(appContext) {
        super(appContext);
    }

    getDataPipeline() {
        return super.getData(`pipeline`);
    }

    getDataPipelineById(id) {
        return super.getData(`pipeline/${id}`);
    }

    updateDataPipeline(recordId, record) {
        return super.putData(`pipeline/${recordId}`, record);
    }

    deleteDataPipeline(recordId){
        return super.deleteData(`pipeline/${recordId}`);
    }

    addDataPipeline(record){
        return super.postData(`pipeline`, record);
    }
}