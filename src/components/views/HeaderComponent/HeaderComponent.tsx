import logo_icon from "../../../assets/logo_kor.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../../context";
import { Button } from "react-bootstrap";

const HeaderComponent = () => {
  const { openModal } = useGlobalContext();

  return (
    <Header>
      <Link to="/">
        <img src={logo_icon} alt="home" />
      </Link>
      <nav id="headernav">
        <Button
          style={{
            color: "#ffffff",
            background: "#001655",
            border: "#001655",
          }}
          onClick={() => openModal()}
        >
          수요예측 AI 기반 컨설팅 보고서 생성
        </Button>
      </nav>
    </Header>
  );
};

export default HeaderComponent;

const Header = styled.h1`
  margin-bottom: 22px;
  margin-top: 19px;
  font-size: 12px;
  font-weight: 400;
  color: #838383;
  background-color: #ffffff;
  padding-left: 230px;
  padding-right: 230px;
`;
