import React, { Component } from 'react';
import { FaRegSmileWink } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { getDatabase, ref, child, update, push, onChildAdded } from 'firebase/database';
class ChatRooms extends Component {
  state = {
    show: false,
    name: '',
    description: '',
    chatRoomsRef: ref(getDatabase(), 'chatRooms'), // database에서 가져오기
  };

  componentDidMount() {
    this.AddChatRoomsListeners();
  }

  AddChatRoomsListeners = () => {
    let chatRoomsArray = []; // chatroom 만들 때마다 추가
    onChildAdded(this.state.chatRoomsRef, (DataSnapshot) => {
      chatRoomsArray.push(DataSnapshot.val()); // data가 추가될 때 database에 value 넣어주기
      this.setState({ chatRooms: chatRoomsArray }, () => this.setFirstChatRoom());
      this.addNotificationListener(DataSnapshot.key);
    });
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, description } = this.state;
    if (this.isFormValid(name, description)) {
      this.addChatRoom();
    }
  };

  addChatRoom = async () => {
    const key = push(this.state.chatRoomsRef).key; // push하면 자동으로 key가 생성됨
    const { name, description } = this.state;
    const { user } = this.props;
    const newChatRoom = {
      id: key,
      name: name,
      description: description,
      createBy: {
        name: user.displayName,
        image: user.photoURL,
      },
    };
    try {
      await update(child(this.state.chatRoomsRef, key), newChatRoom); // chatRooms 데이터 업데이트
      this.setState({
        name: '',
        description: '',
        show: false,
      });
    } catch (error) {
      alert(error);
    }
  };

  isFormValid = (name, description) => name && description;

  render() {
    return (
      <div>
        <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
          <FaRegSmileWink style={{ marginRight: 3 }} />
          CHAT ROOS (1)
          <FaPlus
            onClick={this.handleShow}
            style={{ position: 'absolute', right: 0, cursor: 'pointer' }}
          />
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a chat roome</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>방 이름</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ name: e.target.value })}
                  type="text"
                  placeholder="Enter a chat room name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>방 설명</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ description: e.target.value })}
                  type="text"
                  placeholder="Enter a chat room description"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              cloase
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(ChatRooms);
