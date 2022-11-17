import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SearchComponent from "../SearchComponent/SearchComponent";
import Sidebar from "../sidebar/Sidebar";
import SidebarMapDetail from "../sidebar/SidebarMapDetail";
import Map from "./Sections/Map";
import "./LandingPage.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Form } from "react-bootstrap";
import { useGlobalContext } from "../../../context";
import { Link } from "react-router-dom";
import { useState } from "react";

export interface propsType {
  searchKeyword: string;
}

export interface AccomodationList {
  placeId: number;
  placeName: string;
  placeType: string;
  addressFullName: string;
  region1DepthName: string;
  region2DepthName: string;
  region3DepthName: string;
  addressCode: string;
  latitude: number;
  longitude: number;
  price: number;
}

const LandingPage = (): JSX.Element => {
  const { isModalOpen, closeModal } = useGlobalContext();
  const [inputForm, setInputForm] = useState({
    MonLow: 0,
    MonHigh: 0,
    MonPer: 0,
    TueLow: 0,
    TueHigh: 0,
    TuePer: 0,
    WedLow: 0,
    WedHigh: 0,
    WedPer: 0,
    ThuLow: 0,
    ThuHigh: 0,
    ThuPer: 0,
    FriLow: 0,
    FriHigh: 0,
    FriPer: 0,
    SatLow: 0,
    SatHigh: 0,
    SatPer: 0,
    SunLow: 0,
    SunHigh: 0,
    SunPer: 0,
    email: "",
  });
  const onChangeInputForm = (e: any) => {
    setInputForm({
      ...inputForm,
      [e.target.id]: e.target.value,
    });
  };
  const SendCalc = () => {};
  function MydModalWithGrid(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            수요예측 AI 기반 컨설팅 보고서 생성
          </Modal.Title>
          <a
            className="btn btn-default glyphicon glyphicon-download"
            href={
              "https://drive.google.com/file/d/1eGh7HZRKlkk6lPceUPyqBaKa2dHyMjam/view?usp=share_link"
            }
          >
            보고서 미리보기
          </a>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={3}></Col>
              <Col xs={3}>최소값</Col>
              <Col xs={3}>최대값</Col>
              <Col xs={3}>판매율</Col>
            </Row>
            <Row>
              <Col xs={3}>월요일</Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="MonLow"
                  name="MonLow"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="MonHigh"
                  name="MonHigh"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="MonPer"
                  name="MonPer"
                  onChange={onChangeInputForm}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={3}>화요일</Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="TueLow"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="TueHigh"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="TuePer"
                  onChange={onChangeInputForm}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={3}>수요일</Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="WedLow"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="WedHigh"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="WedPer"
                  onChange={onChangeInputForm}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={3}>목요일</Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="ThuLow"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="ThuHigh"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="ThuPer"
                  onChange={onChangeInputForm}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>금요일</Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="FriLow"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="FriHigh"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="FriPer"
                  onChange={onChangeInputForm}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>토요일</Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="SatLow"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="SatHigh"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="SatPer"
                  onChange={onChangeInputForm}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>일요일</Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="SunLow"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="SunHigh"
                  onChange={onChangeInputForm}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="text"
                  id="SunPer"
                  onChange={onChangeInputForm}
                />
              </Col>
            </Row>
            <Row></Row>
            <Row>
              <Col xs={12}>
                <Form.Control
                  type="email"
                  placeholder="email"
                  id="email"
                  onChange={onChangeInputForm}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onSubmit}>Submit</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <MydModalWithGrid
        show={isModalOpen}
        onHide={() => closeModal()}
        onSubmit={() => SendCalc()}
      />
      <HeaderComponent />
      <SearchComponent />
      <Sidebar />

      <div className="landing-page">
        <div className="landing-page__inner">
          <Map />
        </div>
      </div>
      <SidebarMapDetail />
    </>
  );
};

export default LandingPage;
