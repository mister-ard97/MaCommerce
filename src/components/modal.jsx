import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalMaCommerce extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className ? this.props.className : null }>
                <ModalHeader toggle={this.props.toggle}>{this.props.ModalHeader}</ModalHeader>
                <ModalBody>
                    {
                        this.props.successMessage ?
                            <div class="alert alert-success" role="alert">
                                {this.props.successMessage}
                            </div>
                        :
                        null
                    }
                    {
                        this.props.errorMessage ?
                            <div class="alert alert-danger" role="alert">
                                {this.props.errorMessage}
                            </div>
                            :
                            null
                    }
                  {this.props.ModalBody}
          </ModalBody>
                <ModalFooter>
                    <Button 
                        color={this.props.colorOnClick ? this.props.colorOnClick : "primary" } 
                        onClick={this.props.onClickModal ? this.props.onClickModal : null}
                        // type={this.props.type ? this.props.type : null}
                        >
                        {
                            this.props.loading ?
                                <div className="spinner-border text-warning" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            :
                             this.props.buttonClickName
                            
                        }
                    </Button>{' '}
                    {
                        this.props.cancelButton ?
                            <Button color="danger" onClick={this.props.toggle}>{this.props.cancelButton}</Button>
                            :
                            null
                    }
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalMaCommerce;