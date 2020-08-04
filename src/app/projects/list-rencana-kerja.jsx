import React, { PureComponent } from 'react';
import { RencanaKerjaService } from 'api';
import { Table,  message, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';


const ACTION = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
}

const columns_meta = [
    { 
        title :  'No',
        dataIndex : 'id',
        key: 'id',
        width: 80 
    },
    { 
        title :  'Nama Task',
        dataIndex : 'nama_task',
        key: 'nama_task',
        width: 150 
    },
    { 
        title :  'Start Date',
        dataIndex : 'start_date',
        key: 'start_date',  
        width: 150      
    },
    { 
        title :  'End Date',
        dataIndex : 'end_date',
        key: 'end_date',       
        width: 150 
    }
];

const MenuAction = ({handlers, record, handlerMenu}) => {
    const recordId = record.id;
    const menu = (
        <Menu onClick={handlerMenu} >
            <Menu.Item key="edit" recordId={recordId} >
                Edit
            </Menu.Item>
            <Menu.Item key="delete" recordId={recordId} >
                Delete
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown
            overlay={menu}>
            <MoreOutlined />
        </Dropdown>
    );
};

class ListRencanaKerja extends PureComponent {
    constructor(props) {
        super(props)
        this.rencanaKerjaService = new RencanaKerjaService(props.appContext)
        this.state = {
            data: [],
            loading: false,
            editFormVisible: false,
            action: undefined,
            selectedRecordId: undefined,
            selectedRecord: undefined
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        }, () => this.fetchData());
    }

    fetchData = () => {
        this.rencanaKerjaService.getDataRencanaKerja().then(result => {
            this.setState({
             data: result,
             loading: false, 
             selectedRecordId: undefined,
            });
        });
    }

    getColumns = () => {
        const columns = columns_meta.map(e => {
            const { sortFunc, ...colDef } = e;
            
            return colDef;
        });

        columns.push({ title: 'Action', key: 'actionColumn', render: this.actionColumnRenderer });
        return columns;
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
    }

    handleAdd = () => {
        this.setState({ 
            loading: false, action: ACTION.CREATE, selectedRecord: undefined,
            addFormVisible: true, selectedRecordId: undefined
        });
    }

    handleEdit = recordId => {
        // this.projectService.getDataProjectById(recordId)
        //     .then(result => {
        //         console.debug("handleEdit", result)
        //         this.setState({
        //             loading: false, action: ACTION.UPDATE, 
        //             selectedRecord: result,
        //             editFormVisible: true, selectedRecordId: recordId
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false },
        //             () => message.error('Terdapat gangguan saat mengunduh data'));
        //     });
    }

    handleDelete = recordId => {
        // this.setState({ loading: true }, () => this.deleteRecord(recordId));
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
            default: 
                break;
        }
    }

    render() {
        const {data, loading} = this.state;
        return  <div>
                    <Table  
                        columns={this.getColumns()} 
                        dataSource={data} 
                        rowKey="kode_proyek"
                        loading={loading ? { size: "large", tip: "Memuat data..." } : false}/>
                </div>
    }

}

export default ListRencanaKerja;