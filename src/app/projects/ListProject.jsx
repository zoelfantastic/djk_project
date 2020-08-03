import React, { PureComponent } from 'react';
import { Table, Button, message, Dropdown, Menu } from 'antd';
import { ProjectService, RealisasiService } from 'api';
import { withAppContext } from 'context';
import {EditOutlined, PlusCircleOutlined, 
        DeleteOutlined, MoreOutlined, LineChartOutlined} from '@ant-design/icons';
import { AddProjectEditorDialogForm } from './add-project';
import { ProjectEditorDialogForm } from './edit-project';
import InfoProject from './info-project';
import {Realisasi} from './realisasi';

const ACTION = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
}

const columns_meta = [

{ 
    title :  'Kode Proyek',
    dataIndex : 'id',
    key: 'id',
    width: 80 
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

const RealisasiAction = ({record, handlerRealisasi}) => {
    const recordId = record.id;
    const menuRealisasi = (
        <Menu onClick={handlerRealisasi} >
            <Menu.Item key="biaya" recordId={recordId}>
                Realisasi Biaya
            </Menu.Item>
            <Menu.Item key="invoice">
                Invoice
            </Menu.Item>
            <Menu.Item key="kerja" recordId={recordId}>
                Realiasi Kerja
            </Menu.Item>
            <Menu.Item key="project-issues" recordId={recordId}>
                Project Issues
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown
            overlay={menuRealisasi}>
            <LineChartOutlined />
        </Dropdown>
    );
}

const MenuAction = ({handlers, record, handlerMenu}) => {
    const recordId = record.id;
    const menu = (
        <Menu onClick={handlerMenu} >
            <Menu.Item key="edit" recordId={recordId} >
                Edit
            </Menu.Item>
            <Menu.Item key="add" >
                Add
            </Menu.Item>
            <Menu.Item key="info" recordId={recordId} >
                Info
            </Menu.Item>
            <Menu.Item key="realisasi" recordId={recordId} >
                Realisasi
            </Menu.Item>
            {/* <Menu.Item key="delete" recordId={recordId} >
                Delete
            </Menu.Item> */}
        </Menu>
    );
    return (
        <Dropdown
            overlay={menu}>
            <MoreOutlined />
        </Dropdown>
    );
};

class ListProject extends PureComponent {
    constructor(props) {
        super(props);
        this.projectService = new ProjectService(props.appContext)
        this.realisasiService = new RealisasiService(props.appContext);

        this.state = {
            data: [],
            dataRealisasi: [],
            loading: false,
            editFormVisible: false,
            addFormVisible: false,
            realisasiFormVisible: false,
            infoFormVisible: false,
            action: undefined,
            selectedRecordId: undefined,
            selectedRecord: undefined,
            selectedProject: undefined
        }
    }

    handleClickActionMenu = (e) => {
        const id = e.item.props.recordId;
        switch(e.key) {
            case "edit" :
                this.handleEdit(id);
                break;
            case "add" :
                this.handleAdd();
                break;
            case "delete" :
                this.handleDelete(id);
                break;
            case "info" :
                this.handleInfo(id);
                break;
            case "realisasi" :
                this.handleRealisasi(id);
                break;
            default: 
                break;
        }
    }

    handleClickRealisasiMenu = (e) => {
        const id = e.item.props.recordId;
        switch(e.key) {
            case "biaya":
                this.handleRealisasiBiaya(id);
                break;
            default:
                break;
        }
    }

    handleRealisasiBiaya = recordId => {
        this.realisasiService.getDataRealisasi(recordId)
            .then(result => {
                this.setState({
                    loading: false, 
                    dataRealisasi: result,
                    realisasiFormVisible: true, 
                    selectedProject: recordId
                });
            })
            .catch(error => {
                this.setState({ loading: false },
                    () => message.error('Terdapat gangguan saat mengunduh data'));
            });
    }

    handleRealisasi = recordId => {
        this.projectService.getDataProjectById(recordId)
            .then(result => {
                this.setState({
                    loading: false, 
                    selectedRecord: result,
                    realisasiFormVisible: true, 
                });
            })
            .catch(error => {
                this.setState({ loading: false },
                    () => message.error('Terdapat gangguan saat mengunduh data'));
            });
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

    handleInfo = recordId => {
        this.setState({
            loading: false, 
            infoFormVisible: true
        });
    }

    getColumns = () => {
        const columns = columns_meta.map(e => {
            const { sortFunc, ...colDef } = e; // exclude 'sortFunc' property
            
            return colDef;
        });

        columns.push({ title: 'Action', key: 'actionColumn', render: this.actionColumnRenderer });
        return columns;
    }

    detailRealisasiColumnRenderer = (text, record) => {
        return (
            <RealisasiAction record={record}  handlerRealisasi={this.handleClickRealisasiMenu} />
         )
    }


    actionColumnRenderer = (text, record) => {
        const handlers = {
            editHandler: this.handleEdit,
            addHandler: this.handleAdd,
            deleteHandler: this.handleDelete
        }
        return (
           <MenuAction record={record} handlers={handlers} handlerMenu={this.handleClickActionMenu} />
        )
        // <ActionColumn record={record} handlers={handlers} />
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

    handleRealisasiFormClose = () => {
        this.setState({ realisasiFormVisible: false });
    }

    handleInfoFormClose = () => {
        this.setState({ infoFormVisible: false });
    }

    render() {
        const { data, loading, addFormVisible, 
                editFormVisible, selectedRecord,
                realisasiFormVisible, dataRealisasi, 
                selectedProject, infoFormVisible} = this.state;
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
                    <Realisasi  width="600px"
                        title="Realisasi" visible={realisasiFormVisible}
                        record={selectedRecord}
                        onCancel={this.handleRealisasiFormClose}
                        centered closable destroyOnClose
                        footer={null} />
                    <InfoProject  width="980px"
                        tahap={1}
                        title="Info" visible={infoFormVisible}
                        onCancel={this.handleInfoFormClose}
                        onDone={this.handleInfoFormClose}
                        destroyOnClose={true}
                        centered 
                        closable
                        footer={null}  />
                </div>
            
    }
}

export default withAppContext(ListProject);