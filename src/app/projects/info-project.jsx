import React, { PureComponent } from 'react';
import { Modal, Steps, Button, message } from 'antd';
import "./info-project.less";

const Step = Steps.Step;

const steps = [{
    title: 'Pre Screening',
    content: 'Pre Screening',
  }, {
    title: 'Pipeline',
    content: 'Pipeline',
  }, {
    title: 'Siap Kerja (Mandat)',
    content: 'Siap Kerja (Mandat)',
  }, {
    title: 'Implementasi',
    content: 'Implementasi',
  }, {
    title: 'Closing',
    content: 'Closing',
  }
];
  

class InfoProject extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          current: 0,
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    
      prev() {
        const current = this.state.current - 1;
        this.setState({ current });
      }

    render() {
        const { current } = this.state;
        const {onDone,  ...otherProps } = this.props;
        return(
            <Modal {...otherProps}>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className="steps-content">{steps[current].content}</div>
                    <div className="steps-action">
                    {
                        current < steps.length - 1
                        && <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        current === steps.length - 1
                        && <Button type="primary" onClick={onDone}>Done</Button>
                    }
                    {
                        current > 0
                        && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                        Previous
                        </Button>
                        )
                    }
                    </div>
            </Modal>
        );
    }
}

export default InfoProject;