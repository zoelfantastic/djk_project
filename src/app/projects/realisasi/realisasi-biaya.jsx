import React, {PureComponent} from 'react';
import { Table, Modal, Row,
         Col, Card, Form, Menu, Dropdown, message,
        Input, Select,DatePicker, Button } from 'antd';
import { MoreOutlined} from '@ant-design/icons';
import { RealisasiService } from 'api';
import { withAppContext } from 'context';
import './realisasi-biaya.less';

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 10 },
        sm: { span: 12 },
    },
};

const columns_meta = [
    { 
        title :  'No',
        dataIndex : 'id',
        key: 'id',
        width: 150 
    },
    { 
        title :  'Tipe Biaya',
        dataIndex : 'tipe_biaya',
        key: 'tipe_biaya',
        width: 150 
    },
    { 
        title :  'Tanggal Realisasi',
        dataIndex : 'tgl_realisasi',
        key: 'tgl_realisasi',  
        width: 150      
    },
    { 
        title :  'Deskripsi',
        dataIndex : 'deskripsi',
        key: 'deskripsi',       
        width: 150 
    },
    { 
        title :  'Besar Biaya',
        dataIndex : 'besar_biaya',
        key: 'besar_biaya',
        width: 150 ,
        render: e => e.toLocaleString()
    },
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

class RealisasiBiaya extends PureComponent {
    constructor(props) {
        super(props);
        this.realisasiService = new RealisasiService(props.appContext);
        this.formRef = React.createRef();
        this.state={
            selectedRecord: undefined
        }
    }

    handleClickActionMenu = (e) => {
        const id = e.item.props.recordId;
        switch(e.key) {
            case "edit" :
                //this.handleEdit(id);
                break;
            case "delete" :
                //this.handleDelete(id);
                break;
            default: 
                break;
        }
    }


    handleEdit = recordId => {
        this.realisasiService.getDataRealisasiById(recordId)
            .then(result => {
                this.setState({
                    selectedRecord: result,
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

        columns.push({ title: 'Action', key: 'actionColumn', render: this.actionColumnRenderer });

        return columns;
    }

    actionColumnRenderer = (text, record) => {
        const handlers = {
            editHandler: this.handleEdit,
            deleteHandler: this.handleDelete
        }
        return (
           <MenuAction record={record} handlers={handlers} handlerMenu={this.handleClickActionMenu} />
        )
    }

    render() {
        const { dataRealisasi, ...otherProps} = this.props;
        let totalBiaya = 0;
        totalBiaya = dataRealisasi.map(el => el.besar_biaya).reduce((a, b) => {
            return a+b;
        }, 0);
        const a = this.formRef;
        return (
        <Modal {...otherProps} >
            <div className="table-box">
                <Row gutter={4}>
                    <Col span={8}>
                        <Card title="">
                            <Form {...formItemLayout} colon={false} ref={this.formRef}>
                                <Row gutter={8}>
                                    <Col span={24}>
                                        <Form.Item label="Kode Proyek" name="kode_proyek">
                                            <Input size="small" disabled  />
                                        </Form.Item>
                                        <Form.Item label="Tahap" name="tahap">
                                            <Select style={{ width: 160 }}>
                                                    <Option value="1">Perjalanan Dinas</Option>
                                                    <Option value="2">Konsultan</Option>
                                                    <Option value="3">Operational Kantor</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="Tanggal Realisasi" name="tgl_realisasi">
                                            <DatePicker format={'DD-MM-YYYY'} size="small"  />
                                        </Form.Item>
                                        <Form.Item label="Deskripsi" name="deskripsi">
                                            <TextArea rows={2}  />
                                        </Form.Item>
                                        <Form.Item  label=" ">
                                            <Button className="btn-save-realisasi" onClick={this.handleClick}>OK</Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Table  columns={this.getColumns()} 
                                dataSource={dataRealisasi} 
                                rowKey="id"
                                footer={() => {
                                    return (
                                        <div>
                                            <Row gutter={2}>
                                                <Col span={8}></Col>
                                                <Col span={8}>
                                                    <span style={{ fontWeight: 'bold' }}>
                                                        Total Biaya Realisasi
                                                    </span>
                                                </Col>
                                                <Col span={8}>
                                                    <span style={{ fontWeight: 'bold' }}>
                                                        Rp. {totalBiaya.toLocaleString()}
                                                    </span>
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                }}
                        />
                    </Col>
                </Row>
                
            </div>
            
        </Modal>
        )
    }
}

export default withAppContext(RealisasiBiaya);