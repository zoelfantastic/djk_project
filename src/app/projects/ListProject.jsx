import React, { PureComponent } from 'react';
import { Table, Button, message } from 'antd';
import { ProjectService } from 'api/';
import { withAppContext } from 'context';
import {EditOutlined, PlusCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import { AddProjectEditorDialogForm } from './add-project';
import { ProjectEditorDialogForm } from './edit-project';

const ACTION = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
}

const columns_meta = [

{ 
    title :  'Kode Proyek',
    dataIndex : 'id',
    key: 'id',
    width: 150 
},
{ 
    title :  'Klien',
    dataIndex : 'klien',
    key: 'klien',
    width: 150 
},
{ 
    title :  'Proyek',
    dataIndex : 'proyek',
    key: 'proyek',  
    width: 150      
},
{ 
    title :  'Jangka Waktu',
    dataIndex : 'jangka_waktu',
    key: 'jangka_waktu',       
    width: 150 
},
{ 
    title :  'Potensi Pendapatan (Rp Juta)',
    dataIndex : 'potensi_pendapatan',
    key: 'potensi_pendapatan',       
    width: 150
},
{ 
    title :  'Status',
    dataIndex : 'status',
    key: 'status',       
    width: 150 
},
];

const ActionColumn = ({ handlers, record }) => {
    const recordId = record.id;

    return <div>
        <Button size="small" icon={<EditOutlined />} shape="circle" title="Edit" onClick={e => handlers.editHandler(recordId)} />
        <Button size="small" icon={<PlusCircleOutlined />} shape="circle" title="Add" onClick={e => handlers.addHandler()} />
        <Button size="small" icon={<DeleteOutlined />} shape="circle" title="Delete" onClick={e => handlers.deleteHandler(recordId)} />
    </div>;
}

class ListProject extends PureComponent {
    constructor(props) {
        super(props);
        this.projectService = new ProjectService(props.appContext)
        this.state = {
            data: [],
            loading: false,
            editFormVisible: false,
            addFormVisible: false,
            action: undefined,
            selectedRecordId: undefined,
            selectedRecord: undefined,
        }
    }

    handleAdd = () => {
        this.setState({ 
            loading: false, action: ACTION.CREATE, selectedRecord: undefined,
            addFormVisible: true, selectedRecordId: undefined
        });
    }

    handleEdit = recordId => {
        this.projectService.getDataProjectById(recordId)
            .then(result => {
                console.debug("handleEdit", result)
                this.setState({
                    loading: false, action: ACTION.UPDATE, 
                    selectedRecord: result,
                    editFormVisible: true, selectedRecordId: recordId
                });
            })
            .catch(error => {
                this.setState({ loading: false },
                    () => message.error('Terdapat gangguan saat mengunduh data'));
            });
    }

    handleDelete = recordId => {
        this.setState({ loading: true }, () => this.deleteRecord(recordId));
    }

    getColumns = () => {
        const columns = columns_meta.map(e => {
            const { sortFunc, ...colDef } = e; // exclude 'sortFunc' property
            
            return colDef;
        });

        columns.push({ title: '', key: 'actionColumn', render: this.actionColumnRenderer });
        return columns;
    }

    actionColumnRenderer = (text, record) => {
        const handlers = {
            editHandler: this.handleEdit,
            addHandler: this.handleAdd,
            deleteHandler: this.handleDelete
        }
        return <ActionColumn record={record} handlers={handlers} />
    }

    componentDidMount() {
        this.setState({
            loading: true
        }, () => this.fetchData());
    }

    fetchData = () => {
        this.projectService.getDataProject().then(result => {
            this.setState({
             data: result,
             loading: false, 
             selectedRecordId: undefined,
            });
        });
    }

    addRecord = record => {
        const successCallback = () => {
            message.info('Data berhasil disimpan');
            this.fetchData();
        };

        this.projectService.addDataProject(record)
            .then(result => {
                console.debug("addData", result)
                this.setState({ loading: false, selectedRecordId: undefined, addFormVisible: false },
                    successCallback);
            })
            .catch(e => {
                message.error('Data gagal disimpan ' + e.endPoint, 4, () => {
                    this.setState({
                        loading: false, selectedRecordId: undefined
                    })
                })
            });
    }

    updateRecord = record => {
        const successCallback = () => {
            message.info('Data berhasil disimpan');
            this.fetchData();
        };

        this.projectService.updateDataProject(record.id, record)
            .then(result => {
                console.debug("updateData", result)
                this.setState({ loading: false, selectedRecordId: undefined, editFormVisible: false },
                    successCallback);
            })
            .catch(e => {
                message.error('Data gagal disimpan ' + e.endPoint, 4, () => {
                    this.setState({
                        loading: false, selectedRecordId: undefined
                    })
                })
            });
    }

    deleteRecord = recordId => {
        const successCallback = () => {
            message.info('Data berhasil dihapus');
            this.fetchData();
        };

        this.projectService.deleteDataProject(recordId)
            .then(result => {
                console.debug("deleteData", result)
                this.setState({ loading: false, selectedRecordId: undefined },
                    successCallback);
            })
            .catch(e => {
                message.error('Data gagal dihapus ' + e.endPoint, 4, () => {
                    this.setState({
                        loading: false, selectedRecordId: undefined
                    })
                })
            });
    }

    handleEditFormClose = () => {
        this.setState({ editFormVisible: false });
    }

    handleEditFormSaveChange = (record) => {
        this.setState({ loading: true }, () => this.updateRecord(record));
    }

    handleAddFormSaveChange = (record) => {
        this.setState({ loading: true }, () => this.addRecord(record));
    }

    handleAddFormClose = () => {
        this.setState({ addFormVisible: false });
    }

    render() {
        const {data, loading, addFormVisible, editFormVisible, selectedRecord} = this.state;
        return  <div>
                    <Table  
                        columns={this.getColumns()} 
                        dataSource={data} 
                        rowKey="kode_proyek"
                        loading={loading ? { size: "large", tip: "Memuat data..." } : false}/>
                    <ProjectEditorDialogForm className="edit-form-modal" width="880px"
                        title="Edit" visible={editFormVisible}
                        onSaveChange={this.handleEditFormSaveChange}
                        onCancel={this.handleEditFormClose}
                        centered closable destroyOnClose
                        record={selectedRecord} />
                    <AddProjectEditorDialogForm className="edit-form-modal" width="880px"
                        title="Add" visible={addFormVisible}
                        onSaveChange={this.handleAddFormSaveChange}
                        onCancel={this.handleAddFormClose}
                        centered closable destroyOnClose
                        record={undefined} />
                </div>
            
    }
}

export default withAppContext(ListProject);