import React, {PureComponent} from "react";
import { withAppContext } from 'context';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { Row, Col, Form, Card, Input, Button, Tooltip } from "antd";
import {FileExcelFilled, FilePdfFilled} from '@ant-design/icons';
import './sebaran-proyek.less'


const pieChartOpt1 = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
    },
    title: undefined,
    legend: {
        layout: 'vertical',
        floating: false,
        align: 'left',
        verticalAlign: 'top',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
    accessibility: {
    point: {
        valueSuffix: '%'
    }
    },
    plotOptions: {
        pie: {
            size: 160,
            center: [-100, 150],
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %"
            },
            showInLegend: true
        },

    },
    credits: { enabled: false },
    colors: ['#058DC7', '#f2802e'],
    series: [{
        name: 'Programs',
        colorByPoint: true,
        data: [{
            name: 'Infrastruktur Program Strategis Pemerintah',
            y: 67,
            sliced: true,
            selected: true
          }, {
            name: 'Infrastruktur Non Program Strategis Pemerintah',
            y: 33
          }]
    }]
};

const pieChartOpt2 = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
    },
    title: undefined,
    legend: {
        layout: 'vertical',
        floating: false,
        align: 'left',
        verticalAlign: 'top',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
    accessibility: {
    point: {
        valueSuffix: '%'
    }
    },
    plotOptions: {
        pie: {
            size: 160,
            center: [-100, 150],
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %"
            },
            showInLegend: true
        },

    },
    credits: { enabled: false },
    colors: ['#058DC7', '#f2802e'],
    series: [{
        name: 'Programs',
        colorByPoint: true,
        data: [{
            name: 'Infrastruktur Program Strategis Pemerintah',
            y: 33,
            sliced: true,
            selected: true
          }, {
            name: 'Infrastruktur Non Program Strategis Pemerintah',
            y: 67
          }]
    }]
};

class SebaranProyek extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {

        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 10 },
        };

        return(
            <div className="chart-pane">
                <Row>
                    <Col span={24}>
                        <Card title="">
                                <Row>
                                    <Col span={18}>
                                        <Form.Item style={{ display: 'inline-block', width: '150px' }}>
                                            <Input placeholder="Tahun" />
                                        </Form.Item>
                                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)', margin: '0 8px'}}>
                                            <Button onClick={this.handleClick}>Preview</Button>
                                        </Form.Item>
                                    </Col>
                                    <Col span={6} style={{ textAlign: 'right' }}>
                                         <Tooltip title="Export to Excel">
                                            <Button shape="circle" style={{ marginRight: '5px' }} icon={<FileExcelFilled />}/>
                                        </Tooltip>
                                        <Tooltip title="Export to Pdf">
                                            <Button icon={<FilePdfFilled />} shape="circle" />
                                        </Tooltip>
                                    </Col>
                                </Row>
                        </Card >
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Card title="Total Proyek DJK" style={{ textAlign: "center" }}>
                            <HighchartsReact key="totalProyekDJK" containerProps={{ style: { height: "295px" } }}
                                highcharts={Highcharts} options={pieChartOpt1} />
                        </Card>
                    </Col>
                    <Col span={12}>
                    <Card title="New Project Tahun 2019" style={{ textAlign: "center" }}>
                            <HighchartsReact key="newProjectDJK" containerProps={{ style: { height: "295px" } }}
                                highcharts={Highcharts} options={pieChartOpt2} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withAppContext(SebaranProyek);